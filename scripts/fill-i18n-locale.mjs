/**
 * Adds missing locale fields (e.g. nb, sv, da) to I18n object literals with `en:` in TS files.
 * Translation: translate.googleapis.com `client=gtx`. Cache: scripts/.cache-i18n-locale.json
 *
 * Usage: node scripts/fill-i18n-locale.mjs <locale> [file1.ts file2.ts ...]
 * Refill: node scripts/fill-i18n-locale.mjs <locale> --refill [files...]
 *   Re-translates existing locale fields when the value equals English (by normalized whitespace).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ts = require('typescript');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CACHE_PATH = path.join(__dirname, '.cache-i18n-locale.json');

const DEFAULT_FILES = [
  'lib/ui-strings.ts',
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

/** Google Translate `client=gtx` `tl` codes (Atlas `nb` → `no`). */
const GTX_TL = { nb: 'no', sv: 'sv', da: 'da' };

function parseGtxJson(text) {
  const data = JSON.parse(text);
  const chunks = data[0];
  if (!Array.isArray(chunks)) return '';
  return chunks.map((row) => (Array.isArray(row) ? row[0] : '')).join('');
}

async function translateText(text, toLang, cache) {
  const key = `en|${toLang}::${text}`;
  if (cache[key]) return cache[key];
  const tl = GTX_TL[toLang];
  if (!tl) {
    console.warn('unsupported locale for autofill:', toLang);
    cache[key] = text;
    return text;
  }
  const normalized = text.replace(/\s+/g, ' ').trim() || text;
  const parts = chunksForApi(normalized, 1800);
  const out = [];
  for (const p of parts) {
    if (!p) continue;
    let piece = p;
    for (let attempt = 1; attempt <= 6; attempt++) {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(p)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const raw = await res.text();
        piece = parseGtxJson(raw);
        if (!piece) throw new Error('empty gtx');
        break;
      } catch (e) {
        if (attempt === 6) {
          console.warn('gtx translate failed:', e?.message ?? e, p.slice(0, 50));
          piece = p;
        } else {
          await sleep(350 * attempt);
        }
      }
    }
    out.push(piece);
    await sleep(120);
  }
  const result = out.join(' ');
  cache[key] = result;
  return result;
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

function propKeyPrefix(sourceText, propStart) {
  const lineStart = sourceText.lastIndexOf('\n', propStart) + 1;
  return sourceText.slice(lineStart, propStart);
}

function buildLocaleInsertion(sf, fileText, objNode, lastProp, localeKey, translatedText) {
  const props = objNode.properties.filter(ts.isPropertyAssignment);
  const firstProp = props[0];
  const objSrc = objNode.getText(sf);
  const singleLine = !objSrc.includes('\n') && !objSrc.includes('\r\n');
  const q = tsSingleQuoted(translatedText);
  if (singleLine) {
    return `, ${localeKey}: ${q}`;
  }
  const innerIndent = propKeyPrefix(fileText, firstProp.getStart(sf));
  return `,\n${innerIndent}${localeKey}: ${q}`;
}

function normWs(s) {
  return s.replace(/\s+/g, ' ').trim();
}

/** Skip single-word / short loanwords where en === locale is often correct (Database, Chapters, …). */
function shouldTryRefill(enText) {
  const n = normWs(enText);
  if (n.includes('\n')) return true;
  if (n.length >= 44) return true;
  if (n.includes(' ') && n.length >= 12) return true;
  return false;
}

/** Earliest `{ locale: '…' }` string literal in source order where text matches `en` (stale machine fill). */
function findFirstRefillHit(sf, targetLocale) {
  let best = null;
  function visit(n) {
    if (ts.isObjectLiteralExpression(n)) {
      const props = n.properties.filter(ts.isPropertyAssignment);
      const byName = new Map(props.map((p) => [p.name.getText(sf), p]));
      const enP = byName.get('en');
      const locP = byName.get(targetLocale);
      if (enP && locP && ts.isStringLiteralLike(enP.initializer) && ts.isStringLiteralLike(locP.initializer)) {
        const et = enP.initializer.text;
        const lt = locP.initializer.text;
        if (et && normWs(et) === normWs(lt) && shouldTryRefill(et)) {
          const init = locP.initializer;
          const pos = init.getStart(sf);
          if (!best || pos < best.replaceStart) {
            best = { replaceStart: pos, replaceEnd: init.getEnd(sf), sourceText: et };
          }
        }
      }
    }
    ts.forEachChild(n, visit);
  }
  visit(sf);
  return best;
}

function collectMissingLocale(sf, node, targetLocale, out) {
  if (ts.isObjectLiteralExpression(node)) {
    const props = node.properties.filter(ts.isPropertyAssignment);
    const byName = new Map(props.map((p) => [p.name.getText(sf), p]));
    const hasEn = byName.has('en');
    const hasTarget = byName.has(targetLocale);
    if (hasEn && !hasTarget) {
      const lastProp = props[props.length - 1];
      const enP = byName.get('en');
      let src = null;
      if (enP && ts.isStringLiteralLike(enP.initializer)) {
        src = enP.initializer.text;
      }
      if (src != null && src.length > 0) {
        out.push({ obj: node, lastProp, sourceText: src });
      }
    }
  }
  ts.forEachChild(node, (ch) => collectMissingLocale(sf, ch, targetLocale, out));
}

async function processFile(relPath, targetLocale, cache) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn('skip missing', relPath);
    return 0;
  }
  let fileText = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(abs, fileText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const hits = [];
  collectMissingLocale(sf, sf, targetLocale, hits);
  hits.sort((a, b) => b.lastProp.end - a.lastProp.end);
  let added = 0;
  for (let i = 0; i < hits.length; i++) {
    const { lastProp, sourceText: src } = hits[i];
    const translated = await translateText(src, targetLocale, cache);
    const insertPos = lastProp.end;
    const objNode = hits[i].obj;
    const line = buildLocaleInsertion(sf, fileText, objNode, lastProp, targetLocale, translated);
    fileText = fileText.slice(0, insertPos) + line + fileText.slice(insertPos);
    added++;
    if (added % 10 === 0 || added === hits.length) {
      fs.writeFileSync(abs, fileText);
      console.log(relPath, added, '/', hits.length);
      saveCache(cache);
    }
  }
  if (added === 0) console.log(relPath, 'no gaps');
  else console.log(relPath, `+${targetLocale} fields:`, added);
  saveCache(cache);
  return added;
}

async function processRefillFile(relPath, targetLocale, cache) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn('skip missing', relPath);
    return 0;
  }
  let total = 0;
  for (;;) {
    const fileText = fs.readFileSync(abs, 'utf8');
    const sf = ts.createSourceFile(abs, fileText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const hit = findFirstRefillHit(sf, targetLocale);
    if (!hit) break;
    const cacheKey = `en|${targetLocale}::${hit.sourceText}`;
    let translated = await translateText(hit.sourceText, targetLocale, cache);
    if (normWs(translated) === normWs(hit.sourceText)) {
      delete cache[cacheKey];
      translated = await translateText(hit.sourceText, targetLocale, cache);
    }
    if (normWs(translated) === normWs(hit.sourceText)) {
      console.warn(relPath, 'refill: still English after retry, stopping');
      break;
    }
    const q = tsSingleQuoted(translated);
    const next = fileText.slice(0, hit.replaceStart) + q + fileText.slice(hit.replaceEnd);
    fs.writeFileSync(abs, next);
    total++;
    if (total % 10 === 0) {
      console.log(relPath, 'refill', total);
      saveCache(cache);
    }
    await sleep(120);
  }
  saveCache(cache);
  if (total) console.log(relPath, `~${targetLocale} refills:`, total);
  return total;
}

async function main() {
  const raw = process.argv.slice(2);
  const refill = raw.includes('--refill');
  const posArgs = raw.filter((a) => a !== '--refill');
  const targetLocale = posArgs[0];
  if (!targetLocale || targetLocale === 'en') {
    console.error('Usage: node scripts/fill-i18n-locale.mjs <locale> [--refill] [files...]');
    process.exit(1);
  }
  const files = posArgs.slice(1).length ? posArgs.slice(1) : DEFAULT_FILES;
  const cache = loadCache();
  let total = 0;
  for (const f of files) {
    if (refill) total += await processRefillFile(f, targetLocale, cache);
    else total += await processFile(f, targetLocale, cache);
  }
  saveCache(cache);
  console.log('done, total operations:', total);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
