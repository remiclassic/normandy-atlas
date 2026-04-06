import { nfYdnaCombinedGeoJson } from '@/lib/nf-ydna-combined';
import { nfMtdnaGeoJson } from '@/data/atlas/gfna-mtdna-lineages';
import type { GfnaConfidenceStatus } from '@/data/atlas/gfna-dna-types';
import type { YdnaMajor } from '@/data/atlas/new-france-ydna-types';
import { gfnaFamilySheetUrl } from '@/data/atlas/gfna-dna-types';
import { getGfnaNormanAtlasMatch, type GfnaNormanAtlasMatch } from '@/lib/gfna-norman-atlas-match';

const MAX_HITS = 36;

const Y_MAJOR_BROWSE_ORDER: readonly YdnaMajor[] = [
  'R1b',
  'R1a',
  'I1',
  'I2',
  'G2',
  'J1',
  'J2',
  'E1b',
  'N',
  'C',
  'Q',
  'T',
  'L',
  'Other',
] as const;

export interface GfnaCatalogHit {
  kind: 'Y' | 'mtDNA';
  id: string;
  label: string;
  haplogroup: string;
  status: GfnaConfidenceStatus;
  familySheetNo?: string;
  /** mtDNA triangulation catalogue id when known. */
  triId?: string;
  /** Query param for map deep link (`ydna` or `mtdna`). */
  mapQuery: { key: 'ydna' | 'mtdna'; value: string };
  /** Y-DNA major clade; mtDNA rows omit. */
  yMajor?: YdnaMajor;
  /** Proxy date for sorting (marriage / arrival year). */
  marriageYear?: number;
  /** Surname matches an atlas New France founder tagged Normandy ports or Perche migration. */
  normanAtlas: GfnaNormanAtlasMatch;
}

let allHitsCache: GfnaCatalogHit[] | null = null;

/** Full static catalogue for browse UI (built once). */
export function getAllGfnaCatalogHits(): GfnaCatalogHit[] {
  if (allHitsCache) return allHitsCache;
  const hits: GfnaCatalogHit[] = [];
  for (const f of nfYdnaCombinedGeoJson.features) {
    const p = f.properties;
    hits.push({
      kind: 'Y',
      id: p.id,
      label: p.displayLabel,
      haplogroup: p.yHaplogroup,
      status: p.gfnaStatus ?? 'confirmed',
      familySheetNo: p.familySheetNo,
      mapQuery: { key: 'ydna', value: p.id },
      yMajor: p.yMajor,
      marriageYear: p.marriageYear,
      normanAtlas: getGfnaNormanAtlasMatch(p.surname),
    });
  }
  for (const f of nfMtdnaGeoJson.features) {
    const p = f.properties;
    hits.push({
      kind: 'mtDNA',
      id: p.id,
      label: p.displayLabel,
      haplogroup: p.mtHaplogroup,
      status: p.gfnaStatus,
      familySheetNo: p.familySheetNo,
      triId: p.triId,
      mapQuery: { key: 'mtdna', value: p.id },
      marriageYear: p.marriageYear,
      normanAtlas: getGfnaNormanAtlasMatch(p.surname),
    });
  }
  allHitsCache = hits;
  return hits;
}

/** Distinct Y major groups for browse filter chips (stable order). */
export function getGfnaBrowseYMajorOptions(): YdnaMajor[] {
  const seen = new Set<YdnaMajor>();
  for (const f of nfYdnaCombinedGeoJson.features) {
    seen.add(f.properties.yMajor);
  }
  return Y_MAJOR_BROWSE_ORDER.filter((m) => seen.has(m));
}

function norm(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * Lightweight client-side search over ingested Francogene/GFNA-derived features (static bundles).
 */
export function searchGfnaCatalog(raw: string): GfnaCatalogHit[] {
  const q = norm(raw);
  if (q.length < 2) return [];

  const hits: GfnaCatalogHit[] = [];

  for (const f of nfYdnaCombinedGeoJson.features) {
    const p = f.properties;
    const blob = norm(
      `${p.displayLabel} ${p.surname} ${p.givenName} ${p.yHaplogroup} ${p.triId} ${p.spouse}`,
    );
    if (!blob.includes(q)) continue;
    hits.push({
      kind: 'Y',
      id: p.id,
      label: p.displayLabel,
      haplogroup: p.yHaplogroup,
      status: p.gfnaStatus ?? 'confirmed',
      familySheetNo: p.familySheetNo,
      mapQuery: { key: 'ydna', value: p.id },
      yMajor: p.yMajor,
      marriageYear: p.marriageYear,
      normanAtlas: getGfnaNormanAtlasMatch(p.surname),
    });
    if (hits.length >= MAX_HITS) return hits;
  }

  for (const f of nfMtdnaGeoJson.features) {
    const p = f.properties;
    const blob = norm(
      `${p.displayLabel} ${p.surname} ${p.givenName} ${p.mtHaplogroup} ${p.spouse}`,
    );
    if (!blob.includes(q)) continue;
    hits.push({
      kind: 'mtDNA',
      id: p.id,
      label: p.displayLabel,
      haplogroup: p.mtHaplogroup,
      status: p.gfnaStatus,
      familySheetNo: p.familySheetNo,
      triId: p.triId,
      mapQuery: { key: 'mtdna', value: p.id },
      marriageYear: p.marriageYear,
      normanAtlas: getGfnaNormanAtlasMatch(p.surname),
    });
    if (hits.length >= MAX_HITS) return hits;
  }

  return hits;
}

export { gfnaFamilySheetUrl };
