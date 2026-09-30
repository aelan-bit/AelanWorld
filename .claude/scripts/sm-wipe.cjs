#!/usr/bin/env node
/**
 * sm-wipe.cjs — Delete ALL documents from the aelan-world container in Supermemory.
 *
 * Usage:
 *   node .claude/scripts/sm-wipe.cjs
 *   node .claude/scripts/sm-wipe.cjs --yes   (skip confirmation prompt)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const { execSync } = require('child_process');
const readline = require('readline');

const CONTAINER_TAG = 'aelan-world';
const CREDENTIALS_PATH = path.join(os.homedir(), '.claude', '.credentials.json');

function readWindowsUserEnv(name) {
  try {
    return execSync(`powershell -Command "[System.Environment]::GetEnvironmentVariable('${name}', 'User')"`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null;
  } catch { return null; }
}

let apiKey = process.env.SUPERMEMORY_AELAN_KEY
  || process.env.SUPERMEMORY_API_KEY
  || (os.platform() === 'win32' ? readWindowsUserEnv('SUPERMEMORY_AELAN_KEY') : null)
  || null;

const skipConfirm = process.argv.includes('--yes');
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--api-key' && process.argv[i + 1]) apiKey = process.argv[++i];
}

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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- Auth (same as sm-upload.cjs) ---
function loadCredentials() {
  try {
    const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
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
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  if (res.status !== 200) throw new Error(`Token refresh failed: ${res.status} ${res.body}`);
  return JSON.parse(res.body);
}

async function getValidToken(creds) {
  const now = Date.now();
  if (creds.expiresAt && now < creds.expiresAt - 60000) return creds.accessToken;
  console.log('  [auth] Token expired, refreshing...');
  const tokens = await refreshToken(creds);
  creds.accessToken = tokens.access_token;
  if (tokens.refresh_token) creds.refreshToken = tokens.refresh_token;
  creds.expiresAt = Date.now() + (tokens.expires_in || 3600) * 1000;
  saveCredentials(creds);
  console.log('  [auth] Token refreshed.');
  return creds.accessToken;
}

// --- List documents ---
async function listDocuments(token, page = 1, limit = 100) {
  const qs = `containerTag=${encodeURIComponent(CONTAINER_TAG)}&page=${page}&limit=${limit}`;
  const res = await httpsRequest({
    hostname: 'api.supermemory.ai',
    path: `/v3/documents?${qs}`,
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (res.status !== 200) throw new Error(`List failed: ${res.status} ${res.body.slice(0, 200)}`);
  return JSON.parse(res.body);
}

// --- Delete document ---
async function deleteDocument(token, id) {
  const res = await httpsRequest({
    hostname: 'api.supermemory.ai',
    path: `/v3/documents/${encodeURIComponent(id)}`,
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.status;
}

// --- Confirm prompt ---
function confirm(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, ans => { rl.close(); resolve(ans.trim().toLowerCase()); });
  });
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

  // Collect all document IDs
  console.log(`\nFetching documents from container: ${CONTAINER_TAG} ...`);
  let allIds = [];
  let page = 1;
  while (true) {
    const data = await listDocuments(token, page, 100);
    // Handle different response shapes
    const items = data.documents || data.data || data.items || (Array.isArray(data) ? data : []);
    if (items.length === 0) break;
    allIds = allIds.concat(items.map(d => d.id || d.documentId || d._id));
    console.log(`  Page ${page}: ${items.length} documents (total so far: ${allIds.length})`);
    if (items.length < 100) break;
    page++;
    await sleep(300);
  }

  if (allIds.length === 0) {
    console.log('\nContainer is already empty.');
    return;
  }

  console.log(`\nFound ${allIds.length} documents.`);

  if (!skipConfirm) {
    const ans = await confirm(`\nDelete ALL ${allIds.length} documents from "${CONTAINER_TAG}"? (yes/no): `);
    if (ans !== 'yes' && ans !== 'y') {
      console.log('Aborted.');
      return;
    }
  }

  console.log('\nDeleting...');
  let deleted = 0, failed = 0;
  for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i];
    const status = await deleteDocument(token, id);
    const prefix = `[${String(i + 1).padStart(String(allIds.length).length)}/${allIds.length}]`;
    if (status === 200 || status === 204 || status === 202) {
      deleted++;
      if ((i + 1) % 20 === 0 || i === allIds.length - 1) {
        console.log(`${prefix}  deleted ${deleted} so far...`);
      }
    } else {
      failed++;
      console.log(`${prefix}  FAIL id:${id} HTTP ${status}`);
    }
    await sleep(150);
  }

  console.log(`\nDone: ${deleted} deleted, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch(e => { console.error(e.message); process.exit(1); });
