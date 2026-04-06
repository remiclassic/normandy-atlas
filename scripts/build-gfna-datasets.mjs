/**
 * Reads data/atlas/gfna-dna-records.jsonl (one JSON object per line) and emits:
 *   - data/atlas/gfna-ydna-presumed.ts   (Y + status presumed only)
 *   - data/atlas/gfna-mtdna-lineages.ts (mtDNA rows)
 *   - data/atlas/gfna-dna-records.validation.json (counts + errors)
 *
 * Primary triangulated Y catalogue stays in data/atlas/new-france-ydna.ts via
 * scripts/parse-francogene-ydna.mjs — do not duplicate confirmed Y here.
 *
 * Usage: npm run build:gfna
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const INPUT = resolve(ROOT, 'data', 'atlas', 'gfna-dna-records.jsonl');
const OUT_Y_PRESUMED = resolve(ROOT, 'data', 'atlas', 'gfna-ydna-presumed.ts');
const OUT_MT = resolve(ROOT, 'data', 'atlas', 'gfna-mtdna-lineages.ts');
const OUT_VAL = resolve(ROOT, 'data', 'atlas', 'gfna-dna-records.validation.json');

const ANCHORS = [
  { key: 'quebec', lng: -71.2075, lat: 46.8139 },
  { key: 'trois-rivieres', lng: -72.5491, lat: 46.3432 },
  { key: 'montreal', lng: -73.5673, lat: 45.5017 },
  { key: 'st-lawrence', lng: -70.88, lat: 47.1 },
  { key: 'acadia', lng: -65.85, lat: 46.25 },
];

function md5(s) {
  return createHash('md5').update(s).digest('hex');
}

function deterministicJitter(id) {
  const h = createHash('md5').update(id).digest();
  const dx = (((h[0] + h[1] * 256) % 10000) / 10000) * 0.38 - 0.19;
  const dy = (((h[2] + h[3] * 256) % 10000) / 10000) * 0.28 - 0.14;
  return [dx, dy];
}

function anchorForId(id) {
  const h = createHash('md5').update(id).digest();
  return ANCHORS[h[4] % ANCHORS.length];
}

function classifyMajor(hg) {
  const upper = hg.toUpperCase();
  if (upper.startsWith('R1B')) return 'R1b';
  if (upper.startsWith('R1A')) return 'R1a';
  if (upper.startsWith('R-')) return 'R1b';
  if (upper.startsWith('I1')) return 'I1';
  if (upper.startsWith('I2')) return 'I2';
  if (upper.startsWith('I-')) return 'I2';
  if (upper.startsWith('G2') || upper.startsWith('G-')) return 'G2';
  if (upper.startsWith('J2')) return 'J2';
  if (upper.startsWith('J1')) return 'J1';
  if (upper.startsWith('E1B') || upper.startsWith('E1-') || upper.startsWith('E-')) return 'E1b';
  if (upper.startsWith('N1') || upper.startsWith('N-')) return 'N';
  if (upper.startsWith('C1') || upper.startsWith('C2') || upper.startsWith('C-')) return 'C';
  if (upper.startsWith('Q-') || upper.startsWith('Q1')) return 'Q';
  if (upper.startsWith('T-') || upper.startsWith('T1')) return 'T';
  if (upper.startsWith('L1')) return 'L';
  return 'Other';
}

function classifyOrigin(yMajor, yHaplogroup) {
  if (yMajor === 'I1') return { origin: 'scandinavian', confidence: 'high' };
  if (yMajor === 'R1a') {
    if (/Z284/i.test(yHaplogroup)) return { origin: 'scandinavian', confidence: 'medium' };
    return { origin: 'possible-scandinavian', confidence: 'low' };
  }
  if (yMajor === 'I2') return { origin: 'possible-scandinavian', confidence: 'low' };
  if (yMajor === 'R1b') return { origin: 'western-european', confidence: 'high' };
  if (yMajor === 'G2' || yMajor === 'J1' || yMajor === 'J2' || yMajor === 'E1b')
    return { origin: 'mediterranean-neolithic', confidence: 'high' };
  if (yMajor === 'N') return { origin: 'eastern', confidence: 'medium' };
  return { origin: 'other', confidence: 'low' };
}

function parseAncestorName(raw) {
  const cleaned = String(raw || '').trim();
  const commaIdx = cleaned.indexOf(',');
  if (commaIdx > 0) {
    return { surname: cleaned.slice(0, commaIdx).trim(), givenName: cleaned.slice(commaIdx + 1).trim() };
  }
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const given = parts.pop();
    return { surname: parts.join(' '), givenName: given };
  }
  return { surname: cleaned, givenName: '' };
}

function validateRow(row, lineNum) {
  const errs = [];
  if (!row || typeof row !== 'object') return ['invalid object'];
  const req = ['ancestor_name', 'sex_line_type', 'haplogroup', 'status', 'source_page'];
  for (const k of req) {
    if (row[k] == null || row[k] === '') errs.push(`missing ${k}`);
  }
  if (row.sex_line_type && !['Y', 'mtDNA'].includes(row.sex_line_type)) {
    errs.push('sex_line_type must be Y or mtDNA');
  }
  if (row.status && !['confirmed', 'presumed'].includes(row.status)) {
    errs.push('status must be confirmed or presumed');
  }
  return errs.map((e) => `Line ${lineNum}: ${e}`);
}

function readJsonl(path) {
  if (!existsSync(path)) return { lines: [], rawErrors: ['input missing — wrote empty outputs'] };
  const text = readFileSync(path, 'utf-8').trim();
  if (!text) return { lines: [], rawErrors: [] };
  const rows = [];
  const rawErrors = [];
  text.split('\n').forEach((line, i) => {
    const t = line.trim();
    if (!t) return;
    try {
      rows.push({ lineNum: i + 1, data: JSON.parse(t) });
    } catch {
      rawErrors.push(`Line ${i + 1}: invalid JSON`);
    }
  });
  return { lines: rows, rawErrors };
}

function emitYPresumedTs(features) {
  return `// Auto-generated by scripts/build-gfna-datasets.mjs — do not edit by hand.
// Source: data/atlas/gfna-dna-records.jsonl (presumed Y-DNA rows only)
// Re-run:  npm run build:gfna

import type { NfYdnaFeature, NfYdnaCollection } from './new-france-ydna-types';

export const nfYdnaPresumedGeoJson: NfYdnaCollection = ${JSON.stringify(
    { type: 'FeatureCollection', features },
    null,
    2,
  )} as NfYdnaCollection;

export function getNfYdnaPresumedFeature(id: string): NfYdnaFeature | undefined {
  return nfYdnaPresumedGeoJson.features.find((f) => f.properties.id === id);
}
`;
}

function emitMtTs(features) {
  return `// Auto-generated by scripts/build-gfna-datasets.mjs — do not edit by hand.
// Source: data/atlas/gfna-dna-records.jsonl (mtDNA rows)
// Re-run:  npm run build:gfna

import type { NfMtDnaFeature, NfMtDnaCollection } from './gfna-mtdna-types';

export const nfMtdnaGeoJson: NfMtDnaCollection = ${JSON.stringify(
    { type: 'FeatureCollection', features },
    null,
    2,
  )} as NfMtDnaCollection;

export function getNfMtdnaFeature(id: string): NfMtDnaFeature | undefined {
  return nfMtdnaGeoJson.features.find((f) => f.properties.id === id);
}
`;
}

const { lines, rawErrors } = readJsonl(INPUT);
const validationErrors = [...rawErrors];
const counts = {
  totalLines: lines.length,
  yPresumed: 0,
  mtDna: 0,
  yConfirmedSkipped: 0,
  skippedInvalid: 0,
};

const yPresumedFeatures = [];
const mtFeatures = [];

for (const { lineNum, data: row } of lines) {
  const v = validateRow(row, lineNum);
  if (v.length) {
    validationErrors.push(...v);
    counts.skippedInvalid++;
    continue;
  }

  const fp = md5(`${lineNum}|${JSON.stringify(row)}`);
  const anchor = anchorForId(fp);
  const [dx, dy] = deterministicJitter(fp);

  if (row.sex_line_type === 'Y' && row.status === 'confirmed') {
    counts.yConfirmedSkipped++;
    continue;
  }

  if (row.sex_line_type === 'Y' && row.status === 'presumed') {
    const { surname, givenName } = parseAncestorName(row.ancestor_name);
    const displayLabel = givenName ? `${givenName} ${surname}` : surname;
    const id = `nf-ydna-presumed-${fp.slice(0, 10)}`;
    const triMatch = typeof row.tri_id === 'string' ? row.tri_id.match(/TRI\s*0*(\d+)/i) : null;
    const triId = triMatch ? `TRI${triMatch[1].padStart(4, '0')}` : `GFN${fp.slice(0, 6).toUpperCase()}`;
    const marriageYear = typeof row.arrival_year === 'number' ? row.arrival_year : 1650;
    const yHap = String(row.haplogroup).replace(/\s+/g, '');
    const yMajor = classifyMajor(yHap);
    const { origin: geneticOrigin, confidence: geneticConfidence } = classifyOrigin(yMajor, yHap);
    const lng = +(anchor.lng + dx).toFixed(5);
    const lat = +(anchor.lat + dy).toFixed(5);

    yPresumedFeatures.push({
      type: 'Feature',
      properties: {
        id,
        triId,
        surname,
        givenName,
        displayLabel,
        marriageYear,
        spouse: row.spouse != null ? String(row.spouse) : '',
        yHaplogroup: yHap,
        yMajor,
        excludeFromMap: false,
        geneticOrigin,
        geneticConfidence,
        gfnaStatus: 'presumed',
        sourcePage: row.source_page,
        familySheetNo: row.family_sheet_no != null ? String(row.family_sheet_no) : undefined,
        signatureType: row.signature_type,
      },
      geometry: { type: 'Point', coordinates: [lng, lat] },
    });
    counts.yPresumed++;
    continue;
  }

  if (row.sex_line_type === 'mtDNA') {
    const { surname, givenName } = parseAncestorName(row.ancestor_name);
    const displayLabel = givenName ? `${givenName} ${surname}` : surname;
    const id = `nf-mtdna-${fp.slice(0, 10)}`;
    const marriageYear = typeof row.arrival_year === 'number' ? row.arrival_year : 1650;
    const lng = +(anchor.lng + dx * 0.9).toFixed(5);
    const lat = +(anchor.lat + dy * 0.9).toFixed(5);

    mtFeatures.push({
      type: 'Feature',
      properties: {
        id,
        displayLabel,
        surname,
        givenName,
        marriageYear,
        spouse: row.spouse != null ? String(row.spouse) : '',
        mtHaplogroup: String(row.haplogroup).trim(),
        excludeFromMap: false,
        gfnaStatus: row.status,
        sourcePage: row.source_page,
        familySheetNo: row.family_sheet_no != null ? String(row.family_sheet_no) : undefined,
        signatureType: row.signature_type,
      },
      geometry: { type: 'Point', coordinates: [lng, lat] },
    });
    counts.mtDna++;
  }
}

yPresumedFeatures.sort((a, b) => a.properties.marriageYear - b.properties.marriageYear);
mtFeatures.sort((a, b) => a.properties.marriageYear - b.properties.marriageYear);

writeFileSync(OUT_Y_PRESUMED, emitYPresumedTs(yPresumedFeatures), 'utf-8');
writeFileSync(OUT_MT, emitMtTs(mtFeatures), 'utf-8');
writeFileSync(
  OUT_VAL,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      input: existsSync(INPUT) ? 'data/atlas/gfna-dna-records.jsonl' : null,
      counts,
      errors: validationErrors,
    },
    null,
    2,
  ),
  'utf-8',
);

console.log(`GFNA build: ${counts.yPresumed} presumed Y, ${counts.mtDna} mtDNA, ${counts.yConfirmedSkipped} Y-confirmed skipped (use parse-francogene-ydna.mjs)`);
if (validationErrors.length) console.warn('Validation issues:', validationErrors.length);
