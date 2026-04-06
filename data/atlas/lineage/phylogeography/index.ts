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

export function getPhylogeographyLetterDataset(letter: HaplogroupMajorLetter): PhylogeographyLetterDataset {
  return PHYLOGEOGRAPHY_BY_LETTER[letter];
}
