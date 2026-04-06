import { listPhylogeographyMapFocusIds } from '@/core';
import type { HaplogroupMajorLetter, PhylogeographyLetterDataset } from '@/core/types';
import { letterRPhylogeography } from '@/data/atlas/lineage/phylogeography/letter-r';
import { LETTERS_PHYLO_EXCEPT_R } from '@/data/atlas/lineage/phylogeography/letters-phylogeography';

export const HAPLOGROUP_MAJOR_LETTERS: readonly HaplogroupMajorLetter[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
] as const;

/** A–Z letter packs for the migration-map UI; each letter has illustrative nodes (see dataset summaries for caveats). */
export const PHYLOGEOGRAPHY_BY_LETTER: Record<HaplogroupMajorLetter, PhylogeographyLetterDataset> = {
  ...LETTERS_PHYLO_EXCEPT_R,
  R: letterRPhylogeography,
};

const NORMAN_NORMANDY_FOCUS = 'norman-normandy' as const;

function buildNormanNormandyPhyloLetterSet(): ReadonlySet<HaplogroupMajorLetter> {
  const s = new Set<HaplogroupMajorLetter>();
  for (const L of HAPLOGROUP_MAJOR_LETTERS) {
    if (listPhylogeographyMapFocusIds(PHYLOGEOGRAPHY_BY_LETTER[L]).includes(NORMAN_NORMANDY_FOCUS)) {
      s.add(L);
    }
  }
  return s;
}

/** Letters whose phylogeography pack defines nodes/edges for the “Norman for Normandy” map focus. */
export const NORMAN_NORMANDY_PHYLO_LETTERS: ReadonlySet<HaplogroupMajorLetter> = buildNormanNormandyPhyloLetterSet();

/**
 * Default letter when opening Norman focus from an incompatible tab or deep link.
 * Prefer `R` (full Cotentin-style composite: R1b, R1a, I1, I2, “other”) when available.
 */
export const FIRST_NORMAN_NORMANDY_PHYLO_LETTER: HaplogroupMajorLetter = (() => {
  if (NORMAN_NORMANDY_PHYLO_LETTERS.has('R')) return 'R';
  for (const L of HAPLOGROUP_MAJOR_LETTERS) {
    if (NORMAN_NORMANDY_PHYLO_LETTERS.has(L)) return L;
  }
  return 'R';
})();

export function getPhylogeographyLetterDataset(letter: HaplogroupMajorLetter): PhylogeographyLetterDataset {
  return PHYLOGEOGRAPHY_BY_LETTER[letter];
}
