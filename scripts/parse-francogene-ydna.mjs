/**
 * Parse the Francogene Y-DNA triangulation catalogue into a typed GeoJSON
 * dataset for the Norman Atlas New France settler lineage layer.
 *
 * Usage:  node scripts/parse-francogene-ydna.mjs
 * Input:  reads from stdin or the hardcoded path below
 * Output: data/atlas/new-france-ydna.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT = 'C:\\Users\\Remi Couture\\Downloads\\Pasted text (2).txt';
const OUTPUT = resolve(__dirname, '..', 'data', 'atlas', 'new-france-ydna.ts');

// ── Corridor anchors (Québec / Trois-Rivières / Montréal / Acadia / generic)
const ANCHORS = [
  { key: 'quebec',         lng: -71.2075, lat: 46.8139 },
  { key: 'trois-rivieres', lng: -72.5491, lat: 46.3432 },
  { key: 'montreal',       lng: -73.5673, lat: 45.5017 },
  { key: 'st-lawrence',    lng: -70.8800, lat: 47.1000 },
  { key: 'acadia',         lng: -65.8500, lat: 46.2500 },
];

function deterministicJitter(id) {
  const h = createHash('md5').update(id).digest();
  const dx = ((h[0] + h[1] * 256) % 10000) / 10000 * 0.38 - 0.19;
  const dy = ((h[2] + h[3] * 256) % 10000) / 10000 * 0.28 - 0.14;
  return [dx, dy];
}

function anchorForId(id) {
  const h = createHash('md5').update(id).digest();
  return ANCHORS[h[4] % ANCHORS.length];
}

function classifyMajor(hg) {
  const upper = hg.toUpperCase();
  if (upper.startsWith('R1B'))  return 'R1b';
  if (upper.startsWith('R1A'))  return 'R1a';
  if (upper.startsWith('R-'))   return 'R1b'; // R-xxx subclades usually R1b in this dataset
  if (upper.startsWith('I1'))   return 'I1';
  if (upper.startsWith('I2'))   return 'I2';
  if (upper.startsWith('I-'))   return 'I2';
  if (upper.startsWith('G2') || upper.startsWith('G-')) return 'G2';
  if (upper.startsWith('J2'))   return 'J2';
  if (upper.startsWith('J1'))   return 'J1';
  if (upper.startsWith('E1B') || upper.startsWith('E1-') || upper.startsWith('E-')) return 'E1b';
  if (upper.startsWith('N1') || upper.startsWith('N-'))  return 'N';
  if (upper.startsWith('C1') || upper.startsWith('C2') || upper.startsWith('C-')) return 'C';
  if (upper.startsWith('Q-') || upper.startsWith('Q1'))  return 'Q';
  if (upper.startsWith('T-') || upper.startsWith('T1'))  return 'T';
  if (upper.startsWith('L1'))   return 'L';
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

// Exclusion: non-colonial figures (royalty etc.)
const EXCLUDE_TRI = new Set([
  'TRI0106', // Louis XIII - not a settler
]);

// ── Main line regex
// Pattern: SURNAME_BLOCK, GIVEN_NAME m YEAR SPOUSE_BLOCK (TRIxxxx) [HAPLOGROUP]
const LINE_RE =
  /^(.+?)\s+m\s+(\d{4})\s+(.+?)\s+\(TRI(\d+)\)\s+\[([^\]]+)\]\s*$/;

// Alternate pattern for oddly formatted lines (e.g. "BAUDOUIN Jacques, m 1671 ...")
const ALT_RE =
  /^(.+?),?\s+m\s+(\d{4})\s+(.+?)\s+\(TRI(\d+)\)\s+\[([^\]]+)\]\s*$/;

// Special patterns like MARTINEAU 1 - MARTINEAU dit SAINTONGE ...
const SPECIAL_RE =
  /^(.+?)\s+(\d{4})\s+(.+?)\s+\(TRI(\d+)\)\s+\[([^\]]+)\]\s*$/;

function parseName(raw) {
  // "SURNAME dit ALIAS, GivenName" or "SURNAME, GivenName"
  // Clean up numbering artifacts like "LEBEL 1, " or "VEILLEUX 1 - VEILLEUX, "
  let cleaned = raw.replace(/\d+\s*-\s*/, '').trim();
  // Remove trailing comma if present
  cleaned = cleaned.replace(/,\s*$/, '');

  const commaIdx = cleaned.indexOf(',');
  if (commaIdx > 0) {
    const surname = cleaned.slice(0, commaIdx).trim();
    const given = cleaned.slice(commaIdx + 1).trim();
    return { surname, givenName: given };
  }
  // Fallback: last word is given name
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    const given = parts.pop();
    return { surname: parts.join(' '), givenName: given };
  }
  return { surname: cleaned, givenName: '' };
}

function cleanSpouse(raw) {
  // Strip quality annotations like [-1], [+2], [optimal], (GFAN ...)
  return raw
    .replace(/\s*\[-?\d+\]\s*/g, ' ')
    .replace(/\s*\[optimal\]\s*/gi, ' ')
    .replace(/\s*\(GFAN\s+\d+\)\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Parse
const raw = readFileSync(INPUT, 'utf-8');
const lines = raw.split('\n');
const byTri = new Map();
let skipped = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('Catalogue') || trimmed.startsWith('ADN')
      || trimmed.startsWith('Accueil') || trimmed.startsWith('Home')) continue;

  let m = trimmed.match(LINE_RE) || trimmed.match(ALT_RE) || trimmed.match(SPECIAL_RE);
  if (!m) {
    skipped++;
    continue;
  }

  const [, namePart, yearStr, spousePart, triNum, haplogroup] = m;
  const triId = `TRI${triNum.padStart(4, '0')}`;
  const marriageYear = parseInt(yearStr, 10);
  const { surname, givenName } = parseName(namePart);
  const spouse = cleanSpouse(spousePart);
  const yMajor = classifyMajor(haplogroup);
  const excludeFromMap = EXCLUDE_TRI.has(triId);

  // Keep earliest marriage per TRI (first settler in lineage)
  if (!byTri.has(triId) || marriageYear < byTri.get(triId).marriageYear) {
    byTri.set(triId, {
      triId,
      surname,
      givenName,
      marriageYear,
      spouse,
      yHaplogroup: haplogroup.replace(/\s+/g, ''),
      yMajor,
      excludeFromMap,
    });
  }
}

// ── Build GeoJSON features
const features = [];
for (const rec of byTri.values()) {
  const id = `nf-ydna-${rec.triId.toLowerCase()}`;
  const anchor = anchorForId(id);
  const [dx, dy] = deterministicJitter(id);
  const lng = +(anchor.lng + dx).toFixed(5);
  const lat = +(anchor.lat + dy).toFixed(5);

  const displayLabel = rec.givenName
    ? `${rec.givenName} ${rec.surname}`
    : rec.surname;

  const { origin: geneticOrigin, confidence: geneticConfidence } = classifyOrigin(rec.yMajor, rec.yHaplogroup);

  features.push({
    type: 'Feature',
    properties: {
      id,
      triId: rec.triId,
      surname: rec.surname,
      givenName: rec.givenName,
      displayLabel,
      marriageYear: rec.marriageYear,
      spouse: rec.spouse,
      yHaplogroup: rec.yHaplogroup,
      yMajor: rec.yMajor,
      excludeFromMap: rec.excludeFromMap,
      geneticOrigin,
      geneticConfidence,
    },
    geometry: {
      type: 'Point',
      coordinates: [lng, lat],
    },
  });
}

features.sort((a, b) => a.properties.marriageYear - b.properties.marriageYear);

console.log(`Parsed ${lines.length} lines → ${features.length} unique lineages (${skipped} skipped)`);

// ── Write output
const ts = `// Auto-generated by scripts/parse-francogene-ydna.mjs — do not edit by hand.
// Source: Francogene Y-DNA Triangulation Catalogue (https://www.francogene.com/triangulation/y.php)
// Re-run:  node scripts/parse-francogene-ydna.mjs

import type { NfYdnaFeature, NfYdnaCollection } from './new-france-ydna-types';

export const nfYdnaGeoJson: NfYdnaCollection = ${JSON.stringify({ type: 'FeatureCollection', features }, null, 2)} as NfYdnaCollection;

export function getNfYdnaFeature(id: string): NfYdnaFeature | undefined {
  return nfYdnaGeoJson.features.find((f) => f.properties.id === id);
}

export function getNfYdnaFeatureByTri(triId: string): NfYdnaFeature | undefined {
  return nfYdnaGeoJson.features.find((f) => f.properties.triId === triId);
}
`;

writeFileSync(OUTPUT, ts, 'utf-8');
console.log(`Wrote ${OUTPUT}`);
