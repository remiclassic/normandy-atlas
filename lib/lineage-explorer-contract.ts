import type { I18nString } from '@/core/types';

/** Editorial rules surfaced in the Genetic Lineage Explorer UI. */
export const LINEAGE_EXPLORER_RULES: I18nString[] = [
  {
    en: 'Haplogroups trace one paternal (Y-DNA) or one maternal (mtDNA) line—not full ancestry, culture, or identity.',
    fr: 'Les haplogroupes tracent une lignée paternelle (ADN-Y) ou une lignée maternelle (ADNmt) — pas l’ascendance entière, la culture ou l’identité.',
  },
  {
    en: 'Wording stays probabilistic: “associated with”, “found among”, “may connect to”, “possible historical relevance.”',
    fr: 'Les formulations restent probabilistes : « associé à », « retrouvé parmi », « peut relier à », « pertinence historique possible ».',
  },
  {
    en: 'Confidence labels and sources belong on regional or migratory claims; broad labels alone are never proof.',
    fr: 'Les niveaux de confiance et les sources doivent accompagner les affirmations régionales ou migratoires ; des étiquettes larges seules ne prouvent rien.',
  },
];

export const LINEAGE_EXPLORER_FORBIDDEN: I18nString[] = [
  { en: 'You are Norman / Viking / Frank because of this haplogroup.', fr: 'Vous êtes normand / viking / franc à cause de cet haplogroupe.' },
  { en: 'This DNA proves you descend from a specific medieval polity or king.', fr: 'Cet ADN prouve que vous descendez d’une régence ou d’un roi médiéval précis.' },
];
