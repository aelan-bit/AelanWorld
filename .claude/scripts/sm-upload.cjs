#!/usr/bin/env node
/**
 * sm-upload.cjs — Upload files to Supermemory REST API without loading content into Claude's context.
 *
 * Requires a Supermemory API key (sm_...) from https://supermemory.ai/settings
 *
 * Usage:
 *   node .claude/scripts/sm-upload.cjs "path/to/file.md"
 *   node .claude/scripts/sm-upload.cjs --manifest .claude/scripts/sm-manifest-new.txt
 *   node .claude/scripts/sm-upload.cjs --manifest .claude/scripts/sm-manifest-update.txt --delay 800
 *
 * The API key can also be set via environment variable: SUPERMEMORY_API_KEY=sm_xxx
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const { execSync } = require('child_process');

// --- Config ---
const CONTAINER_TAG = 'aelan-world';
const CREDENTIALS_PATH = path.join(os.homedir(), '.claude', '.credentials.json');
const DEFAULT_DELAY_MS = 600;

// On Windows, env vars set via SetEnvironmentVariable aren't inherited by the current process.
// Read them from the registry via PowerShell as fallback.
function readWindowsUserEnv(name) {
  try {
    return execSync(`powershell -Command "[System.Environment]::GetEnvironmentVariable('${name}', 'User')"`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null;
  } catch { return null; }
}

// --- Parse args ---
const args = process.argv.slice(2);
let manifestPath = null;
let singleFile = null;
let delayMs = DEFAULT_DELAY_MS;
let apiKey = process.env.SUPERMEMORY_AELAN_KEY
  || process.env.SUPERMEMORY_API_KEY
  || (os.platform() === 'win32' ? readWindowsUserEnv('SUPERMEMORY_AELAN_KEY') : null)
  || null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--manifest' && args[i + 1]) manifestPath = args[++i];
  else if (args[i] === '--delay' && args[i + 1]) delayMs = parseInt(args[++i], 10);
  else if (args[i] === '--api-key' && args[i + 1]) apiKey = args[++i];
  else if (!args[i].startsWith('--')) singleFile = args[i];
}

// --- Helpers ---
function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// --- Token management ---
function loadCredentials() {
  try {
    const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    // The Supermemory entry is inside mcpOAuth under a key like "supermemory|..."
    const mcpOAuth = raw.mcpOAuth || {};
    const key = Object.keys(mcpOAuth).find(k => k.toLowerCase().startsWith('supermemory'));
    if (!key) throw new Error('Supermemory OAuth entry not found in credentials');
    return { _raw: raw, _key: key, ...mcpOAuth[key] };
  } catch (e) {
    throw new Error(`Cannot read credentials from ${CREDENTIALS_PATH}: ${e.message}`);
  }
}

function saveCredentials(creds) {
  const raw = creds._raw;
  const key = creds._key;
  raw.mcpOAuth[key].accessToken = creds.accessToken;
  raw.mcpOAuth[key].expiresAt = creds.expiresAt;
  raw.mcpOAuth[key].refreshToken = creds.refreshToken;
  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(raw, null, 2));
}

async function refreshToken(creds) {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: creds.refreshToken,
    client_id: creds.clientId,
  }).toString();

  const res = await httpsRequest({
    hostname: 'api.supermemory.ai',
    path: '/api/auth/mcp/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);

  if (res.status !== 200) {
    throw new Error(`Token refresh failed: ${res.status} ${res.body}`);
  }
  const json = JSON.parse(res.body);
  return json;
}

async function getValidToken(creds) {
  const now = Date.now();
  if (creds.expiresAt && now < creds.expiresAt - 60000) {
    return creds.accessToken;
  }
  console.log('  [auth] Token expired or near-expiry, refreshing...');
  const tokens = await refreshToken(creds);
  creds.accessToken = tokens.access_token;
  if (tokens.refresh_token) creds.refreshToken = tokens.refresh_token;
  creds.expiresAt = Date.now() + (tokens.expires_in || 3600) * 1000;
  saveCredentials(creds);
  console.log('  [auth] Token refreshed.');
  return creds.accessToken;
}

// --- Upload ---
async function uploadFile(filePath, token, index, total) {
  const label = path.basename(filePath).padEnd(50);
  const prefix = `[${String(index).padStart(String(total).length)}/${total}]`;

  if (!fs.existsSync(filePath)) {
    console.log(`${prefix}  SKIP  ${label} (file not found)`);
    return { ok: false, skipped: true };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  if (content.trim().length === 0) {
    console.log(`${prefix}  SKIP  ${label} (empty)`);
    return { ok: false, skipped: true };
  }

  // Extract title: prefer frontmatter title/aliases, fall back to filename
  let title = path.basename(filePath, '.md');
  const fmTitle = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const fmAlias = content.match(/^aliases:\s*\n\s+-\s+["']?(.+?)["']?/m);
  if (fmTitle) title = fmTitle[1].trim();
  else if (fmAlias) title = fmAlias[1].trim();

  const bodyObj = {
    content,
    containerTag: CONTAINER_TAG,
    filepath: filePath.replace(/\\/g, '/'),
    metadata: { title },
    entityContext: `Aelan World D&D campaign — ${title}`,
  };
  const bodyStr = JSON.stringify(bodyObj);

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await httpsRequest({
      hostname: 'api.supermemory.ai',
      path: '/v3/documents',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    }, bodyStr);

    if (res.status === 200 || res.status === 201) {
      let id = '?';
      try { id = JSON.parse(res.body).id || '?'; } catch {}
      console.log(`${prefix}  OK    ${label} id:${id}`);
      return { ok: true };
    }

    if (res.status === 429) {
      const wait = attempt * 2000;
      console.log(`${prefix}  WAIT  ${label} rate limited, retry in ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }

    if (res.status === 401 && attempt === 1) {
      console.log(`${prefix}  AUTH  ${label} 401 — token may be stale`);
      return { ok: false, authError: true };
    }

    console.log(`${prefix}  FAIL  ${label} HTTP ${res.status}: ${res.body.slice(0, 120)}`);
    return { ok: false };
  }

  console.log(`${prefix}  FAIL  ${label} max retries exceeded`);
  return { ok: false };
}

// --- Load manifest ---
function loadManifest(manifestFile) {
  const lines = fs.readFileSync(manifestFile, 'utf8').split('\n');
  return lines
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));
}

// --- Main ---
async function main() {
  let token;
  if (apiKey) {
    token = apiKey;
    console.log('  [auth] Using provided API key.');
  } else {
    const creds = loadCredentials();
    token = await getValidToken(creds);
  }

  let files = [];
  if (manifestPath) {
    files = loadManifest(manifestPath);
  } else if (singleFile) {
    files = [singleFile];
  } else {
    console.error('Usage: node sm-upload.js "file.md" | --manifest manifest.txt [--delay ms]');
    process.exit(1);
  }

  console.log(`\nUploading ${files.length} file(s) to Supermemory [container: ${CONTAINER_TAG}]`);
  console.log(`Delay between calls: ${delayMs}ms\n`);

  let ok = 0, fail = 0, skip = 0;

  for (let i = 0; i < files.length; i++) {
    const result = await uploadFile(files[i], token, i + 1, files.length);

    if (result.authError) {
      console.log('  [auth] 401 with API key — check that SUPERMEMORY_AELAN_KEY is correct.');
      fail++;
    } else if (result.ok) {
      ok++;
    } else if (result.skipped) {
      skip++;
    } else {
      fail++;
    }

    if (i < files.length - 1) await sleep(delayMs);
  }

  console.log(`\nDone: ${ok} uploaded, ${fail} failed, ${skip} skipped.`);
  if (fail > 0) process.exit(1);
}

main().catch(e => { console.error(e.message); process.exit(1); });
