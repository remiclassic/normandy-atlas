/**
 * Adds missing `de:` fields to I18n object literals ({ en, fr?, es?, it? }) in atlas TS files.
 * Uses google-translate-api-x (translate.google.com). Cached in scripts/.cache-de-translations.json
 *
 * Usage: node scripts/fill-de-locales.mjs [file1.ts file2.ts ...]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { translate } from 'google-translate-api-x';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CACHE_PATH = path.join(__dirname, '.cache-de-translations.json');

const DEFAULT_FILES = [
  'data/atlas/glossary.ts',
  'data/atlas/changelog.ts',
  'data/atlas/regions.ts',
  'data/atlas/story-library-meta.ts',
  'data/atlas/challenges.ts',
  'data/atlas/milestones.ts',
  'data/atlas/migration-datasets.ts',
  'data/atlas/timeline-markers.ts',
  'data/atlas/era-arcs.ts',
  'data/atlas/story-beats.ts',
  'data/atlas/viking-timeline-phases.ts',
  'data/atlas/journeys.ts',
  'data/atlas/route-segments.ts',
  'data/atlas/viking-battle-markers.ts',
  'data/atlas/expeditions.ts',
  'data/atlas/curator-picks.ts',
  'data/atlas/eras.ts',
  'data/atlas/flythrough-presets.ts',
  'data/atlas/new-france-timeline.ts',
  'data/atlas/story-beat-illustrations.ts',
  'data/atlas/people.ts',
];

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function chunksForApi(text, maxLen = 420) {
  if (text.length <= maxLen) return [text];
  const parts = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + maxLen, text.length);
    if (end < text.length) {
      const cut = text.lastIndexOf(' ', end);
      if (cut > i + 80) end = cut;
    }
    parts.push(text.slice(i, end));
    i = end;
  }
  return parts;
}

async function translatePair(text, langpair, cache) {
  const from = langpair.startsWith('fr') ? 'fr' : 'en';
  const key = `${from}|de::${text}`;
  if (cache[key]) return cache[key];
  const normalized = text.replace(/\s+/g, ' ').trim() || text;
  const parts = chunksForApi(normalized, 3800);
  const out = [];
  for (const p of parts) {
    if (!p) continue;
    let lastErr;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const r = await translate(p, { from, to: 'de' });
        out.push(r.text);
        lastErr = undefined;
        break;
      } catch (e) {
        lastErr = e;
        await sleep(1200 * attempt);
      }
    }
    if (lastErr) {
      console.warn('translate failed, using source snippet as de:', (p.slice(0, 80) + (p.length > 80 ? '…' : '')).replace(/\s+/g, ' '));
      out.push(p);
    }
    await sleep(200);
  }
  const de = out.join(' ');
  cache[key] = de;
  return de;
}

function tsSingleQuoted(value) {
  return (
    "'" +
    value
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r\n/g, '\n')
      .replace(/\n/g, '\\n') +
    "'"
  );
}

/** Indent/spacing before a property key on its line (handles single-line `{ en: 1, fr: 2 }`). */
function propKeyPrefix(sourceText, propStart) {
  const lineStart = sourceText.lastIndexOf('\n', propStart) + 1;
  return sourceText.slice(lineStart, propStart);
}

function buildDeInsertion(sf, fileText, objNode, lastProp, deText) {
  const props = objNode.properties.filter(ts.isPropertyAssignment);
  const firstProp = props[0];
  const objSrc = objNode.getText(sf);
  const singleLine = !objSrc.includes('\n') && !objSrc.includes('\r\n');
  const q = tsSingleQuoted(deText);
  if (singleLine) {
    return `, de: ${q}`;
  }
  const innerIndent = propKeyPrefix(fileText, firstProp.getStart(sf));
  return `,\n${innerIndent}de: ${q}`;
}

function collectI18nObjects(sf, node, out) {
  if (ts.isObjectLiteralExpression(node)) {
    const props = node.properties.filter(ts.isPropertyAssignment);
    const byName = new Map(props.map((p) => [p.name.getText(sf), p]));
    const hasEn = byName.has('en');
    const hasDe = byName.has('de');
    if (hasEn && !hasDe) {
      const lastProp = props[props.length - 1];
      let src = null;
      let pair = 'en|DE';
      const frP = byName.get('fr');
      const enP = byName.get('en');
      if (frP && ts.isStringLiteralLike(frP.initializer)) {
        src = frP.initializer.text;
        pair = 'fr|DE';
      } else if (enP && ts.isStringLiteralLike(enP.initializer)) {
        src = enP.initializer.text;
      }
      if (src != null && src.length > 0) {
        out.push({ obj: node, lastProp, sourceText: src, pair });
      }
    }
  }
  ts.forEachChild(node, (ch) => collectI18nObjects(sf, ch, out));
}

async function processFile(relPath, cache) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn('skip missing', relPath);
    return 0;
  }
  let fileText = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(abs, fileText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const hits = [];
  collectI18nObjects(sf, sf, hits);
  hits.sort((a, b) => b.lastProp.end - a.lastProp.end);
  let added = 0;
  for (let i = 0; i < hits.length; i++) {
    const { obj, lastProp, sourceText: src, pair } = hits[i];
    const de = await translatePair(src, pair, cache);
    const insertPos = lastProp.end;
    const deLine = buildDeInsertion(sf, fileText, obj, lastProp, de);
    fileText = fileText.slice(0, insertPos) + deLine + fileText.slice(insertPos);
    added++;
    if (added % 10 === 0 || added === hits.length) {
      fs.writeFileSync(abs, fileText);
      console.log(relPath, added, '/', hits.length);
      saveCache(cache);
    }
  }
  if (added === 0) console.log(relPath, 'no gaps');
  else console.log(relPath, '+de fields:', added);
  saveCache(cache);
  return added;
}

async function main() {
  const cache = loadCache();
  const files = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_FILES;
  let total = 0;
  for (const f of files) {
    total += await processFile(f, cache);
  }
  saveCache(cache);
  console.log('done, total insertions:', total);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
