/**
 * Downloads FrancoGene GFNA / triangulation mtDNA sources and merges mtDNA rows into
 * data/atlas/gfna-dna-records.jsonl (preserves existing non-mtDNA lines).
 *
 * Sources:
 *   - https://www.francogene.com/gfna/gfna/998/adnmt.html   (HTML table, person links)
 *   - https://www.francogene.com/gfna/gfna/998/adnmt2.html  (presumed)
 *   - https://www.francogene.com/triangulation/mt.php      (newer triangulation index)
 *
 * Options:
 *   --enrich   Fetch each unique GFNA person .php page to fill family_sheet_no (gfangfna.php?no=)
 *              and signature_type when RSRS vs rCRS blocks are unambiguous.
 *
 * Then run: npm run build:gfna (or rely on npm prebuild before next build)
 *
 * See scripts/gfna-extraction-blueprint.md for schema and compliance notes.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'data', 'atlas', 'gfna-dna-records.jsonl');
const ENRICH_CACHE = resolve(ROOT, 'data', 'atlas', 'gfna-mtdna-enrich-cache.json');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const MT_PHP = 'https://www.francogene.com/triangulation/mt.php';

const HTML_SOURCES = [
  {
    url: 'https://www.francogene.com/gfna/gfna/998/adnmt.html',
    status: 'confirmed',
    collection: 'gfna-mt-confirmed',
  },
  {
    url: 'https://www.francogene.com/gfna/gfna/998/adnmt2.html',
    status: 'presumed',
    collection: 'gfna-mt-presumed',
  },
];

const ENRICH = process.argv.includes('--enrich');

async function fetchText(url) {
  const r = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-CA,en;q=0.9,fr;q=0.8',
    },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r.text();
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeBasicEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]{2,12});/gi, (full, name) => {
      const map = {
        amp: '&',
        lt: '<',
        gt: '>',
        quot: '"',
        apos: "'",
        nbsp: ' ',
        eacute: 'é',
        Eacute: 'É',
        egrave: 'è',
        agrave: 'à',
        acirc: 'â',
        ecirc: 'ê',
        icirc: 'î',
        ocirc: 'ô',
        ucirc: 'û',
        ccedil: 'ç',
        oelig: 'œ',
        aelig: 'æ',
        laquo: '«',
        raquo: '»',
      };
      return map[name] ?? full;
    });
}

function extractLink(cellHtml) {
  const m = cellHtml.match(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
  if (!m) return { href: null, text: stripTags(cellHtml) };
  return { href: m[1].trim(), text: stripTags(m[2]) };
}

function firstYearInParens(text) {
  const m = text.match(/\((\d{4})\)/);
  return m ? parseInt(m[1], 10) : undefined;
}

function inferSignatureFromRemarks(remarksHtml) {
  const t = stripTags(remarksHtml).toLowerCase();
  const hasRsrs = /\brsrs\b/.test(t);
  const hasRcrs = /\brcrs\b/.test(t);
  if (hasRsrs && !hasRcrs) return 'RSRS';
  if (hasRcrs && !hasRsrs) return 'rCRS';
  return undefined;
}

function parseMtdnaTable(html, pageUrl, status, collection) {
  const rows = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  while ((m = trRe.exec(html)) !== null) {
    const trInner = m[1];
    if (!/mtDNA\s*=/i.test(trInner)) continue;

    const tdMatches = [...trInner.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
    if (tdMatches.length < 6) continue;

    const nameCell = tdMatches[1][1];
    const spouseCell = tdMatches[2][1];
    const remarksCell = tdMatches[5][1];

    const hgMatch = remarksCell.match(/mtDNA\s*=\s*([^\s<]+)/i);
    if (!hgMatch) continue;
    const haplogroup = hgMatch[1].trim();
    if (!haplogroup) continue;

    const { href: rel, text: ancestor_name } = extractLink(nameCell);
    if (!ancestor_name) continue;

    const spouse = stripTags(spouseCell) || undefined;
    const arrival_year = spouse ? firstYearInParens(spouse) : undefined;

    let source_page;
    if (rel) {
      try {
        source_page = new URL(rel, pageUrl).href;
      } catch {
        source_page = pageUrl;
      }
    } else {
      source_page = pageUrl;
    }

    const sigTable = inferSignatureFromRemarks(remarksCell);

    rows.push({
      ancestor_name,
      sex_line_type: 'mtDNA',
      haplogroup,
      status,
      source_page,
      collection,
      source_organization: 'FrancoGene',
      ...(spouse ? { spouse } : {}),
      ...(typeof arrival_year === 'number' ? { arrival_year } : {}),
      signature_type: sigTable ?? 'unknown',
    });
  }
  return rows;
}

function normKeyPart(s) {
  return decodeBasicEntities(String(s || ''))
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normHaplo(h) {
  return String(h || '')
    .toUpperCase()
    .replace(/\s+/g, '');
}

function mergeLookupKey(row) {
  return `${normKeyPart(row.ancestor_name)}|${row.arrival_year ?? ''}|${normHaplo(row.haplogroup)}`;
}

/** Parse mt.php list: <li><a href="TRInnnn.php">text</a> [haplogroup]</li> */
function parseMtPhpList(html, listPageUrl) {
  const rows = [];
  const liRe = /<li>\s*<a\s+href="(TRI\d+\.php)"[^>]*>([\s\S]*?)<\/a>\s*\[([^\]]*)\]\s*<\/li>/gi;
  let m;
  while ((m = liRe.exec(html)) !== null) {
    const rel = m[1];
    let inner = m[2].replace(/<i[\s\S]*?<\/i>/gi, '');
    inner = decodeBasicEntities(stripTags(inner));
    const hgBracket = m[3].trim();
    const haplogroup = hgBracket.replace(/^\s+|\s+$/g, '');
    if (!haplogroup) continue;

    inner = inner.replace(/\s*\(TRI\d+\)\s*$/i, '').trim();
    inner = inner.replace(/\s*\[[+-]?\d+\]\s*$/g, '').trim();
    inner = inner.replace(/\s*\[optimal\]\s*/gi, ' ').trim();

    const mar = inner.match(/^(.+?)\bm\d*\s+(\d{4})\b/);
    let ancestor_name = inner;
    let arrival_year;
    let spouse;
    if (mar) {
      ancestor_name = mar[1].trim();
      arrival_year = parseInt(mar[2], 10);
      spouse = inner.slice(mar.index + mar[0].length).trim();
      spouse = spouse.replace(/\s*\[.*\]$/s, '').trim();
      spouse = spouse.replace(/\s*\(TRI\d+\)\s*$/i, '').trim();
    }

    let source_page;
    try {
      source_page = new URL(rel, listPageUrl).href;
    } catch {
      continue;
    }

    const triMatch = rel.match(/^(TRI\d+)\.php$/i);
    const tri_id = triMatch ? triMatch[1].toUpperCase() : undefined;

    rows.push({
      ancestor_name,
      sex_line_type: 'mtDNA',
      haplogroup,
      status: 'confirmed',
      source_page,
      collection: 'gfna-mt-confirmed',
      source_organization: 'FrancoGene',
      ...(spouse ? { spouse } : {}),
      ...(typeof arrival_year === 'number' ? { arrival_year } : {}),
      signature_type: 'unknown',
      ...(tri_id ? { tri_id } : {}),
    });
  }
  return rows;
}

/** Map mergeLookupKey -> { tri_id, tri_source_page } (first wins) */
function buildTriIndex(mtRows) {
  const map = new Map();
  for (const r of mtRows) {
    const k = mergeLookupKey(r);
    if (!r.tri_id || map.has(k)) continue;
    map.set(k, { tri_id: r.tri_id, tri_source_page: r.source_page });
  }
  return map;
}

function attachTriIdsToTableRows(tableRows, triIndex) {
  for (const r of tableRows) {
    if (r.status !== 'confirmed' || r.tri_id) continue;
    const hit = triIndex.get(mergeLookupKey(r));
    if (hit) {
      r.tri_id = hit.tri_id;
    }
  }
}

function mergeMtPhpOnlyRows(tableRows, mtRows) {
  const covered = new Set(tableRows.map((r) => mergeLookupKey(r)));
  const extra = [];
  for (const r of mtRows) {
    if (covered.has(mergeLookupKey(r))) continue;
    extra.push(r);
  }
  return extra;
}

function loadEnrichCache() {
  if (!existsSync(ENRICH_CACHE)) return {};
  try {
    return JSON.parse(readFileSync(ENRICH_CACHE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveEnrichCache(obj) {
  writeFileSync(ENRICH_CACHE, JSON.stringify(obj, null, 2), 'utf-8');
}

function parsePersonPageEnrichment(html) {
  const mNo = html.match(/gfangfna\.php\?no=(\d+)/i);
  const family_sheet_no = mNo ? mNo[1] : undefined;

  const hasRsrs = /Haplotype\s*\(\s*RSRS\s*\)/i.test(html);
  const hasRcrs = /Haplotype\s*\(\s*rCRS\s*\)/i.test(html);
  let signature_type;
  if (hasRsrs && !hasRcrs) signature_type = 'RSRS';
  else if (hasRcrs && !hasRsrs) signature_type = 'rCRS';

  return { family_sheet_no, signature_type };
}

function enrichCacheEntryComplete(c) {
  if (!c) return false;
  if (c.error) return true;
  return Boolean(c.family_sheet_no || c.signature_type);
}

async function enrichGfnaPersonRows(rows) {
  const urls = [
    ...new Set(
      rows
        .map((r) => r.source_page)
        .filter((u) => typeof u === 'string' && /\/gfna\/gfna\/\d+\/\d+\.php(?:\?|$)/i.test(u)),
    ),
  ];
  if (!urls.length) return;

  const cache = loadEnrichCache();
  let fetched = 0;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const pending = urls.filter((u) => !enrichCacheEntryComplete(cache[u]));
  const CONCURRENCY = 4;

  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const batch = pending.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (url) => {
        try {
          const html = await fetchText(url);
          const parsed = parsePersonPageEnrichment(html);
          cache[url] = { ...cache[url], ...parsed, fetchedAt: new Date().toISOString() };
          fetched++;
        } catch (e) {
          cache[url] = { ...cache[url], error: String(e?.message || e), fetchedAt: new Date().toISOString() };
          console.error('Enrich failed:', url, e?.message || e);
        }
      }),
    );
    if (i + CONCURRENCY < pending.length) await delay(180);
  }

  saveEnrichCache(cache);

  for (const r of rows) {
    const u = r.source_page;
    if (!u || !cache[u]) continue;
    const c = cache[u];
    if (c.family_sheet_no && !r.family_sheet_no) r.family_sheet_no = String(c.family_sheet_no);
    if (c.signature_type && (!r.signature_type || r.signature_type === 'unknown')) {
      r.signature_type = c.signature_type;
    }
  }

  console.error(
    `Enrichment: ${urls.length} GFNA person URLs (${pending.length} fetched this run), cache: data/atlas/gfna-mtdna-enrich-cache.json`,
  );
}

/** Carry family_sheet_no / signature from previous JSONL when URLs still match */
function carryForwardFromPreviousMtdna(newRows, previousMtdnaLines) {
  const byUrl = new Map();
  for (const line of previousMtdnaLines) {
    try {
      const o = JSON.parse(line);
      if (o.source_page && (o.family_sheet_no || (o.signature_type && o.signature_type !== 'unknown'))) {
        byUrl.set(o.source_page, {
          family_sheet_no: o.family_sheet_no,
          signature_type: o.signature_type,
        });
      }
    } catch {
      /* skip */
    }
  }
  for (const r of newRows) {
    const prev = byUrl.get(r.source_page);
    if (!prev) continue;
    if (prev.family_sheet_no && !r.family_sheet_no) r.family_sheet_no = String(prev.family_sheet_no);
    if (prev.signature_type && prev.signature_type !== 'unknown' && (!r.signature_type || r.signature_type === 'unknown')) {
      r.signature_type = prev.signature_type;
    }
  }
}

function loadExistingNonMtdna() {
  if (!existsSync(OUT)) return { kept: [], prevMtdna: [] };
  const text = readFileSync(OUT, 'utf-8').trim();
  if (!text) return { kept: [], prevMtdna: [] };
  const kept = [];
  const prevMtdna = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    try {
      const o = JSON.parse(t);
      if (o.sex_line_type !== 'mtDNA') kept.push(t);
      else prevMtdna.push(t);
    } catch {
      kept.push(t);
    }
  }
  return { kept, prevMtdna };
}

function finalDedupe(rows) {
  const seen = new Set();
  const out = [];
  for (const r of rows) {
    const k = `${r.source_page}|${normHaplo(r.haplogroup)}|${r.status}|${normKeyPart(r.ancestor_name)}|${r.arrival_year ?? ''}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out;
}

async function main() {
  const allMt = [];

  console.error('Fetching', MT_PHP);
  const mtHtml = await fetchText(MT_PHP);
  const mtParsed = parseMtPhpList(mtHtml, MT_PHP);
  console.error(`  mt.php -> ${mtParsed.length} rows`);

  const triIndex = buildTriIndex(mtParsed);

  for (const src of HTML_SOURCES) {
    console.error('Fetching', src.url);
    const html = await fetchText(src.url);
    const parsed = parseMtdnaTable(html, src.url, src.status, src.collection);
    console.error(`  -> ${parsed.length} rows`);
    allMt.push(...parsed);
  }

  attachTriIdsToTableRows(allMt, triIndex);

  const mtOnly = mergeMtPhpOnlyRows(allMt, mtParsed);
  console.error(`  mt.php-only (not in HTML tables by key): ${mtOnly.length}`);
  allMt.push(...mtOnly);

  const { kept, prevMtdna } = loadExistingNonMtdna();
  carryForwardFromPreviousMtdna(allMt, prevMtdna);

  if (ENRICH) {
    await enrichGfnaPersonRows(allMt);
  }

  const deduped = finalDedupe(allMt);

  const newLines = deduped.map((r) => JSON.stringify(r));
  const body = [...kept, ...newLines].join('\n');
  writeFileSync(OUT, body ? `${body}\n` : '', 'utf-8');
  console.error(
    `Wrote ${deduped.length} mtDNA rows to data/atlas/gfna-dna-records.jsonl (${kept.length} non-mtDNA lines preserved)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
