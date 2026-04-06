import { nfYdnaCombinedGeoJson } from '@/lib/nf-ydna-combined';
import { nfMtdnaGeoJson } from '@/data/atlas/gfna-mtdna-lineages';
import type { GfnaConfidenceStatus } from '@/data/atlas/gfna-dna-types';
import { gfnaFamilySheetUrl } from '@/data/atlas/gfna-dna-types';

const MAX_HITS = 36;

export interface GfnaCatalogHit {
  kind: 'Y' | 'mtDNA';
  id: string;
  label: string;
  haplogroup: string;
  status: GfnaConfidenceStatus;
  familySheetNo?: string;
  /** Query param for map deep link (`ydna` or `mtdna`). */
  mapQuery: { key: 'ydna' | 'mtdna'; value: string };
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
      mapQuery: { key: 'mtdna', value: p.id },
    });
    if (hits.length >= MAX_HITS) return hits;
  }

  return hits;
}

export { gfnaFamilySheetUrl };
