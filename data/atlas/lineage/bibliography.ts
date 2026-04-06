import type { HaplogroupSourceRef } from '@/core/types';

/**
 * Curated public references for haplogroup copy — verify URLs periodically.
 * Use `pickLineageRefs(...)` in profiles to compose bibliography rows.
 */
export const LINEAGE_PUBLIC_REFS = {
  isoggYtree: {
    id: 'isogg-y-tree',
    title: 'ISOGG Y-DNA Haplogroup Tree',
    url: 'https://isogg.org/tree/',
    kind: 'tree' as const,
  },
  yfull: {
    id: 'yfull',
    title: 'YFull experimental tree (compare SNP labels)',
    url: 'https://www.yfull.com/tree',
    kind: 'tree' as const,
  },
  phylotreeMt: {
    id: 'phylotree-mt',
    title: 'PhyloTree.org (mtDNA)',
    url: 'http://www.phylotree.org/',
    kind: 'tree' as const,
  },
  wikiYR1b: {
    id: 'wiki-r1b',
    title: 'Wikipedia — Haplogroup R1b (overview; not a primary source)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_R1b',
    kind: 'review' as const,
  },
  wikiYI1: {
    id: 'wiki-i1',
    title: 'Wikipedia — Haplogroup I-M253 (overview)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_I-M253',
    kind: 'review' as const,
  },
  wikiYR1a: {
    id: 'wiki-r1a',
    title: 'Wikipedia — Haplogroup R1a (overview)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_R1a',
    kind: 'review' as const,
  },
  wikiYJ2: {
    id: 'wiki-j2',
    title: 'Wikipedia — Haplogroup J2 (overview)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_J-M172',
    kind: 'review' as const,
  },
  wikiYE1b: {
    id: 'wiki-e1b',
    title: 'Wikipedia — Haplogroup E1b1b (overview)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_E-M215',
    kind: 'review' as const,
  },
  wikiMtH: {
    id: 'wiki-mt-h',
    title: 'Wikipedia — Haplogroup H (mtDNA) (overview)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_H_(mtDNA)',
    kind: 'review' as const,
  },
  wikiMtU5: {
    id: 'wiki-mt-u5',
    title: 'Wikipedia — Haplogroup U5 (mtDNA) (overview)',
    url: 'https://en.wikipedia.org/wiki/Haplogroup_U5_(mtDNA)',
    kind: 'review' as const,
  },
  reichAadr: {
    id: 'reich-aadr',
    title: 'Allen Ancient DNA Resource (AADR) — Harvard Reich lab',
    url: 'https://reich.hms.harvard.edu/allen-ancient-dna-resource-aadr-downloadable-genotypes-present-day-and-ancient-dna-data-compiled-published-papers',
    kind: 'database' as const,
  },
  ebiHaplogroups: {
    id: 'ebi-haplogroups',
    title: 'EMBL-EBI — introduction to human haplogroups',
    url: 'https://www.ebi.ac.uk/training/online/courses/human-genetic-variation-introduction/resources/haplogroups/',
    kind: 'review' as const,
  },
  ncbiBooksGenomics: {
    id: 'ncbi-genomic',
    title: 'NCBI Bookshelf — genomic medicine (population / lineage context)',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK279861/',
    kind: 'review' as const,
  },
} satisfies Record<string, HaplogroupSourceRef>;

export type LineagePublicRefKey = keyof typeof LINEAGE_PUBLIC_REFS;

export function pickLineageRefs(...keys: LineagePublicRefKey[]): HaplogroupSourceRef[] {
  return keys.map((k) => ({ ...LINEAGE_PUBLIC_REFS[k] }));
}

/** One synthesis row reminding readers to verify against current literature. */
export function atlasLineageSynthesisNote(slug: string): HaplogroupSourceRef {
  return {
    id: `atlas-${slug}`,
    title: 'Norman Atlas synthesis note',
    note: 'Atlas editorial synthesis — verify claims against current phylogenetic trees and open ancient-DNA compendia.',
    kind: 'synthesis',
  };
}
