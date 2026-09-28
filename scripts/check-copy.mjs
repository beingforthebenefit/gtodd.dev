// Fails the build if any em dash (U+2014) slips into the site's copy.
// Gerald's rule: no em dashes, anywhere. Models forget; this doesn't.
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const roots = ['src', 'public', 'scripts', 'README.md'];
const textTypes = new Set(['.astro', '.ts', '.js', '.mjs', '.css', '.md', '.txt', '.json', '.svg', '.html']);
const offenders = [];

async function walk(dir) {
  if (extname(dir)) return check(dir);
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (textTypes.has(extname(entry.name))) await check(path);
  }
}

async function check(path) {
  const lines = (await readFile(path, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    if (line.includes('\u2014')) offenders.push(`${path}:${i + 1}: ${line.trim()}`);
  });
}

for (const root of roots) await walk(root);

if (offenders.length) {
  console.error(`Found ${offenders.length} em dash(es). Rewrite the sentence instead:\n`);
  console.error(offenders.join('\n'));
  process.exit(1);
}
console.log('check:copy passed: no em dashes.');
