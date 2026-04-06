/**
 * Canonical FrancoGene / GFNA haplogroup rows for ingestion (JSONL) and UI.
 * Map features extend this with GeoJSON `id`, jittered coordinates, and Y-major classification.
 */

export type GfnaSexLineType = 'Y' | 'mtDNA';

/** Mirrors FrancoGene’s triangulated vs presumed distinction — do not merge without retaining. */
export type GfnaConfidenceStatus = 'confirmed' | 'presumed';

export type GfnaSignatureType = 'SNP' | 'STR' | 'rCRS' | 'RSRS' | 'unknown';

export type GfnaCollectionId =
  | 'gfna-y-confirmed'
  | 'gfna-y-presumed'
  | 'gfna-mt-confirmed'
  | 'gfna-mt-presumed'
  | 'family-sheet'
  | 'royal-descents'
  | 'other';

/** Cautious regional bucket for New France / Canada contexts (often `unspecified` when not derived). */
export type GfnaNewFranceRegion =
  | 'quebec-corridor'
  | 'acadia'
  | 'great-lakes'
  | 'unspecified';

/** One row in `gfna-dna-records.jsonl` (ingest / agent output). */
export interface GfnaDnaRecord {
  /** Display name for the pioneer / ancestor (normalized). */
  ancestor_name: string;
  sex_line_type: GfnaSexLineType;
  haplogroup: string;
  status: GfnaConfidenceStatus;
  signature_type?: GfnaSignatureType;
  spouse?: string;
  /** Immigration year, first NA event, or marriage year (note in `notes` if ambiguous). */
  arrival_year?: number;
  region_in_new_france?: GfnaNewFranceRegion;
  /** Exact page URL where the row was taken from. */
  source_page: string;
  collection?: GfnaCollectionId;
  descendant_context?: string;
  notes?: string;
  tri_id?: string;
  family_sheet_no?: string;
  source_row_fingerprint?: string;
  source_organization?: string;
}

export function gfnaFamilySheetUrl(familySheetNo: string | number): string {
  const n = String(familySheetNo).trim();
  return `https://www.francogene.com/ymtx/gfangfna.php?no=${encodeURIComponent(n)}`;
}

/** Map UI filter for Francogene Y-DNA dots (confirmed vs presumed vs all). */
export type GfnaYdnaMapConfidenceFilter = 'all' | 'confirmed' | 'presumed';
