/**
 * Builds data/atlas/story-beat-titles-de.ts from Italian titles (it → de).
 * Caches per Italian string in scripts/.cache-beat-titles-de.json for resumability.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from 'google-translate-api-x';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const IT_PATH = path.join(ROOT, 'data', 'atlas', 'story-beat-bodies-it.ts');
const OUT_PATH = path.join(ROOT, 'data', 'atlas', 'story-beat-titles-de.ts');
const CACHE_PATH = path.join(__dirname, '.cache-beat-titles-de.json');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(c) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(c, null, 2) + '\n');
}

function tsQuote(s) {
  return (
    "'" +
    s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r\n/g, '\n').replace(/\n/g, '\\n') +
    "'"
  );
}

function writeOut(record) {
  const keys = Object.keys(record).sort();
  const lines = [
    '/** German story beat titles (locale `de`). Generated from STORY_BEAT_TITLES_IT. */',
    'export const STORY_BEAT_TITLES_DE: Readonly<Record<string, string>> = {',
  ];
  for (const k of keys) {
    lines.push(`  ${tsQuote(k)}: ${tsQuote(record[k])},`);
  }
  lines.push('};');
  lines.push('');
  fs.writeFileSync(OUT_PATH, lines.join('\n'));
}

function parseTitlesBlock(src) {
  const start = src.indexOf('export const STORY_BEAT_TITLES_IT');
  if (start === -1) throw new Error('STORY_BEAT_TITLES_IT not found');
  const brace = src.indexOf('{', start);
  const depth = { v: 0 };
  let i = brace;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth.v++;
    else if (src[i] === '}') {
      depth.v--;
      if (depth.v === 0) break;
    }
  }
  const body = src.slice(brace + 1, i);
  const entries = [];
  const lineRe = /^\s*'([^']+)':\s*'((?:\\'|[^'])*)',?\s*$/gm;
  let m;
  while ((m = lineRe.exec(body))) {
    const key = m[1];
    const raw = m[2].replace(/\\'/g, "'").replace(/\\n/g, '\n');
    entries.push([key, raw]);
  }
  return entries;
}

async function translateItDe(it, cache) {
  const ckey = `it|de::${it}`;
  if (cache[ckey]) return cache[ckey];
  let de = it;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const r = await translate(it, { from: 'it', to: 'de' });
      de = r.text;
      break;
    } catch {
      await sleep(400 * attempt);
    }
  }
  cache[ckey] = de;
  return de;
}

async function main() {
  const cache = loadCache();
  const src = fs.readFileSync(IT_PATH, 'utf8');
  const entries = parseTitlesBlock(src);
  const record = {};

  let n = 0;
  for (const [key, it] of entries) {
    record[key] = await translateItDe(it, cache);
    n++;
    if (n % 10 === 0) {
      saveCache(cache);
      console.log(n, '/', entries.length);
    }
    await sleep(200);
  }
  saveCache(cache);
  writeOut(record);
  console.log('wrote', OUT_PATH, 'keys', entries.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
