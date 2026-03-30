/**
 * Fetches Spanish translations for story beat bodies (en → es) via LibreTranslate.
 * Run: node scripts/generate-story-beat-es.mjs
 * Writes: data/atlas/story-beat-bodies-es.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function parseQuotedString(src, startIdx) {
  if (src[startIdx] !== "'") return null;
  let i = startIdx + 1;
  let out = '';
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') {
      const n = src[i + 1];
      if (n === 'n') {
        out += '\n';
        i += 2;
        continue;
      }
      if (n === "'" || n === '\\') {
        out += n;
        i += 2;
        continue;
      }
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

function escapeForTs(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

const t = fs.readFileSync(path.join(root, 'data/atlas/story-beats.ts'), 'utf8');
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

async function translateLibre(text) {
  const endpoints = [
    'https://libretranslate.de/translate',
    'https://translate.argosopentech.com/translate',
  ];
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'es',
          format: 'text',
        }),
      });
      if (!res.ok) continue;
      const j = await res.json();
      if (j.translatedText) return j.translatedText;
    } catch {
      /* try next */
    }
  }
  return null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const out = {};
for (let i = 0; i < beats.length; i++) {
  const { id, en } = beats[i];
  process.stderr.write(`\r${i + 1}/${beats.length} ${id}                    `);
  let es = await translateLibre(en);
  if (!es) {
    console.error(`\nFailed: ${id}, using English fallback`);
    es = en;
  }
  out[id] = es;
  await sleep(350);
}

const lines = [
  '/** Auto-generated Spanish story beat bodies (en→es). Regenerate: node scripts/generate-story-beat-es.mjs */',
  '',
  'export const STORY_BEAT_BODIES_ES: Record<string, string> = {',
];
for (const id of Object.keys(out)) {
  lines.push(`  '${id}': '${escapeForTs(out[id])}',`);
}
lines.push('};', '');
fs.writeFileSync(path.join(root, 'data/atlas/story-beat-bodies-es.ts'), lines.join('\n'), 'utf8');
console.error('\nWrote data/atlas/story-beat-bodies-es.ts');
