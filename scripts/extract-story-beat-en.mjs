/**
 * One-off: extract id + en body from story-beats.ts for reference.
 * Run: node scripts/extract-story-beat-en.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const t = fs.readFileSync(path.join(root, 'data/atlas/story-beats.ts'), 'utf8');

/** Parse single-quoted TS string with escapes */
function parseQuotedString(src, startIdx) {
  if (src[startIdx] !== "'") return null;
  let i = startIdx + 1;
  let out = '';
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') {
      const n = src[i + 1];
      if (n === 'n') { out += '\n'; i += 2; continue; }
      if (n === "'" || n === '\\') { out += n; i += 2; continue; }
      out += n;
      i += 2;
      continue;
    }
    if (c === "'") return { value: out, end: i + 1 };
    out += c;
    i++;
  }
  return null;
}

const beats = [];
let pos = 0;
while (pos < t.length) {
  const idM = t.indexOf("id: '", pos);
  if (idM === -1) break;
  const idStart = idM + 5;
  const idEnd = t.indexOf("'", idStart);
  const id = t.slice(idStart, idEnd);
  const bodyKey = t.indexOf('body:', idEnd);
  if (bodyKey === -1 || bodyKey > idM + 8000) {
    pos = idEnd + 1;
    continue;
  }
  const enKey = t.indexOf('en:', bodyKey);
  if (enKey === -1 || enKey > bodyKey + 400) {
    pos = idEnd + 1;
    continue;
  }
  const q = t.indexOf("'", enKey + 3);
  const parsed = parseQuotedString(t, q);
  if (!parsed) {
    pos = idEnd + 1;
    continue;
  }
  beats.push({ id, en: parsed.value });
  pos = parsed.end;
}

fs.writeFileSync(
  path.join(root, 'data/atlas/story-beat-en-extract.json'),
  JSON.stringify(beats, null, 2),
  'utf8',
);
console.log('wrote data/atlas/story-beat-en-extract.json', beats.length);
