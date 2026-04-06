import type { PhylogeographyLetterDataset } from '@/core/types';
import { atlasLineageSynthesisNote, pickLineageRefs } from '@/data/atlas/lineage/bibliography';

/**
 * Pilot dataset for letter R: illustrative topology similar to common textbook summaries.
 * Coordinates are editorial approximations for teaching — not copied from any vendor map.
 */
export const letterRPhylogeography: PhylogeographyLetterDataset = {
  letter: 'R',
  title: {
    en: 'Haplogroup R — illustrative branches',
    fr: 'Haplogroupe R — branches illustratives',
  },
  summary: {
    en: 'Haplogroup R is widely discussed as radiating from inner / Central Asia into multiple corridors. Major downstream markers such as M343 and M420 name important forks in public trees; exact routes and dates remain research topics. This overlay sketches those ideas, not your personal pedigree.',
    fr: 'Le haplogroupe R est souvent présenté comme rayonnant de l’Asie intérieure / centrale vers plusieurs corridors. Des marqueurs en aval comme M343 et M420 désignent des bifurcations importantes dans les arbres publics ; itinéraires et dates exacts restent objet de recherche. Cette surcouche schématise ces idées, pas votre filiation personnelle.',
  },
  nodes: [
    {
      id: 'y-ill-deep',
      label: 'Deep African stem (illustrative)',
      lat: 10,
      lng: 40.5,
      omitWhenFocus: 'norman-normandy',
    },
    {
      id: 'y-ill-levant',
      label: 'Southwest Asia (illustrative hub)',
      lat: 33.5,
      lng: 44.2,
      omitWhenFocus: 'norman-normandy',
    },
    {
      id: 'r-node',
      label: 'R',
      lat: 49.2,
      lng: 67.8,
      omitWhenFocus: 'norman-normandy',
    },
    {
      id: 'r-m420',
      label: 'R-M420',
      lat: 57.5,
      lng: 82,
      omitWhenFocus: 'norman-normandy',
    },
    {
      id: 'r-m343',
      label: 'R-M343',
      lat: 49.5,
      lng: 8.5,
      profileId: 'y-r1b',
      omitWhenFocus: 'norman-normandy',
    },
    {
      id: 'r-m479',
      label: 'R-M479',
      lat: 27,
      lng: 78,
      omitWhenFocus: 'norman-normandy',
    },
    {
      id: 'norman-r1b-substrate-ill',
      label: 'R1b — Atlantic / Frankish substrate (illustrative)',
      lat: 48.15,
      lng: 0.2,
      profileId: 'y-r1b',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      id: 'norman-i1-ill',
      label: 'I1 — Norse–Scandinavian-associated (illustrative)',
      lat: 59.55,
      lng: 8.35,
      profileId: 'y-i1',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      id: 'norman-r1a-ill',
      label: 'R1a — scarcer eastern Norse / Baltic signal (illustrative)',
      lat: 57.25,
      lng: 12.4,
      profileId: 'y-r1a',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      id: 'norman-i2-ill',
      label: 'I2 — North Sea / Germanic layers (illustrative)',
      lat: 53.85,
      lng: 9.45,
      onlyWhenFocus: 'norman-normandy',
    },
    {
      id: 'norman-other-pools-ill',
      label: 'Other lineages — Mediterranean & deep European pools (illustrative)',
      lat: 43.55,
      lng: 4.85,
      onlyWhenFocus: 'norman-normandy',
    },
    {
      id: 'norman-cotentin-ill',
      label: 'Normandy — Cotentin-style survey frame (illustrative)',
      lat: 49.08,
      lng: -1.55,
      onlyWhenFocus: 'norman-normandy',
    },
  ],
  edges: [
    { fromId: 'y-ill-deep', toId: 'y-ill-levant', omitWhenFocus: 'norman-normandy' },
    { fromId: 'y-ill-levant', toId: 'r-node', omitWhenFocus: 'norman-normandy' },
    { fromId: 'r-node', toId: 'r-m420', omitWhenFocus: 'norman-normandy' },
    { fromId: 'r-node', toId: 'r-m343', omitWhenFocus: 'norman-normandy' },
    { fromId: 'r-node', toId: 'r-m479', omitWhenFocus: 'norman-normandy' },
    {
      fromId: 'norman-r1b-substrate-ill',
      toId: 'norman-cotentin-ill',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      fromId: 'norman-i1-ill',
      toId: 'norman-cotentin-ill',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      fromId: 'norman-r1a-ill',
      toId: 'norman-cotentin-ill',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      fromId: 'norman-i2-ill',
      toId: 'norman-cotentin-ill',
      onlyWhenFocus: 'norman-normandy',
    },
    {
      fromId: 'norman-other-pools-ill',
      toId: 'norman-cotentin-ill',
      onlyWhenFocus: 'norman-normandy',
    },
  ],
  sources: [
    ...pickLineageRefs('isoggYtree', 'yfull', 'ebiHaplogroups'),
    atlasLineageSynthesisNote('phylo-letter-r'),
  ],
};
