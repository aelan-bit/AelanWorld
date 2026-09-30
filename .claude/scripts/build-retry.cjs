#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const outputFile = process.argv[2];
const outManifest = process.argv[3];

const output = fs.readFileSync(outputFile, 'utf8');
const lines = output.split('\n').filter(l => l.includes('FAIL'));
const names = lines.map(l => {
  const m = l.match(/FAIL\s+(.+?\.md)\s+HTTP/);
  return m ? m[1].trim() : null;
}).filter(Boolean);

function findFile(name, dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { const r = findFile(name, full); if (r) return r; }
    else if (e.name === name) return full;
  }
  return null;
}

const paths = names.map(n => findFile(n, 'content')).filter(Boolean).map(p => p.replace(/\\/g, '/'));
fs.writeFileSync(outManifest, paths.join('\n'));
console.log('Retry manifest saved:', paths.length, 'files');
paths.forEach(p => console.log(' ', p));
