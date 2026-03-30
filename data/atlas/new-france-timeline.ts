import type { I18nString, AtlasCamera } from '@/core/types';

// ---------------------------------------------------------------------------
// New France cross-era phase model (1608–1763)
//
// The atlas keeps three `eraId`s for colonial history (new-france-foundations,
// royal-new-france, atlantic-imprint). This module adds a finer *phase* layer
// keyed by calendar year so the territory overlay and exploration routes can
// evolve within an era.
// ---------------------------------------------------------------------------

export type NewFrancePhaseId =
  | 'early-foothold'
  | 'company-era'
  | 'royal-colony'
  | 'continental-expansion'
  | 'seven-years-war';

export type TerritoryKind = 'core' | 'claim' | 'influence';

export interface NewFrancePhase {
  id: NewFrancePhaseId;
  yearStart: number;
  yearEnd: number;
  label: I18nString;
  narrative: I18nString;
  defaultCamera: AtlasCamera;
}

export const NEW_FRANCE_PHASES: NewFrancePhase[] = [
  {
    id: 'early-foothold',
    yearStart: 1608,
    yearEnd: 1627,
    label: { en: 'Early Foothold', fr: 'Premiers pas', it: 'Primi insediamenti' },
    narrative: {
      en: 'Champlain founded Québec in 1608, establishing a precarious trading post on the St. Lawrence. French presence was limited to a handful of seasonal posts — Tadoussac, Québec — dependent on the fur trade and Indigenous alliances.',
      fr: 'Champlain fonda Québec en 1608, établissant un poste de traite précaire sur le Saint-Laurent. La présence française se limitait à quelques postes saisonniers — Tadoussac, Québec — dépendant du commerce des fourrures et des alliances autochtones.',
      it: 'Champlain fondò Québec nel 1608, creando un avamposto commerciale precario sul San Lorenzo. La presenza francese si limitava a pochi insediamenti stagionali — Tadoussac, Québec — legati al commercio delle pellicce e alle alleanze con le popolazioni indigene.',
    },
    defaultCamera: { center: [-70.0, 47.5], zoom: 5.5 },
  },
  {
    id: 'company-era',
    yearStart: 1627,
    yearEnd: 1663,
    label: {
      en: 'Company of One Hundred Associates',
      fr: 'Compagnie des Cent-Associés',
      it: 'Compagnia dei Cento Associati',
    },
    narrative: {
      en: 'Under the Compagnie des Cent-Associés, the colony was expected to grow through structured recruitment. Progress was slow: the Kirke brothers seized Québec (1629–1632), and Iroquois wars threatened the thin corridor of settlements along the St. Lawrence. Montréal was founded in 1642.',
      fr: 'Sous la Compagnie des Cent-Associés, la colonie devait croître grâce à un recrutement structuré. Les progrès furent lents : les frères Kirke s\'emparèrent de Québec (1629–1632), et les guerres iroquoises menacèrent le mince couloir d\'établissements le long du Saint-Laurent. Montréal fut fondée en 1642.',
      it: 'Sotto la Compagnie des Cent-Associés la colonia doveva crescere con un reclutamento organizzato. I progressi furono lenti: i fratelli Kirke occuparono Québec (1629–1632) e le guerre con gli Irochesi minacciarono il sottile corridoio di insediamenti lungo il San Lorenzo. Montréal fu fondata nel 1642.',
    },
    defaultCamera: { center: [-71.0, 47.0], zoom: 5.0 },
  },
  {
    id: 'royal-colony',
    yearStart: 1663,
    yearEnd: 1701,
    label: { en: 'Royal Colony', fr: 'Colonie royale', it: 'Colonia reale' },
    narrative: {
      en: 'Louis XIV took direct control in 1663, sending the Carignan-Salières Regiment and the Filles du Roi. Intendant Talon organised the seigneurial system. Settlement expanded along the St. Lawrence corridor, and explorers pushed into the Great Lakes.',
      fr: 'Louis XIV prit le contrôle direct en 1663, envoyant le régiment de Carignan-Salières et les Filles du Roi. L\'intendant Talon organisa le système seigneurial. Les établissements s\'étendirent le long du Saint-Laurent, et les explorateurs pénétrèrent dans les Grands Lacs.',
      it: 'Luigi XIV assunse il controllo diretto nel 1663, inviando il reggimento Carignan-Salières e le Filles du Roi. L\'intendente Talon organizzò il sistema signorile. Gli insediamenti si estesero lungo il corridoio del San Lorenzo e gli esploratori penetrarono nei Grandi Laghi.',
    },
    defaultCamera: { center: [-75.0, 46.0], zoom: 4.2 },
  },
  {
    id: 'continental-expansion',
    yearStart: 1701,
    yearEnd: 1754,
    label: { en: 'Continental Expansion', fr: 'Expansion continentale', it: 'Espansione continentale' },
    narrative: {
      en: 'After the Great Peace of Montréal (1701), New France reached its maximum territorial extent. A network of forts, missions, and trading posts stretched from the St. Lawrence through the Great Lakes to the Mississippi delta and Louisiana. Population in the core corridor remained small, but French influence covered a vast interior.',
      fr: 'Après la Grande Paix de Montréal (1701), la Nouvelle-France atteignit son extension territoriale maximale. Un réseau de forts, de missions et de postes de traite s\'étendait du Saint-Laurent aux Grands Lacs jusqu\'au delta du Mississippi et à la Louisiane. La population du corridor principal restait modeste, mais l\'influence française couvrait un vaste intérieur.',
      it: 'Dopo la Grande pace di Montréal (1701), la Nuova Francia raggiunse la massima estensione territoriale. Una rete di forti, missioni e avamposti commerciali si estendeva dal San Lorenzo ai Grandi Laghi fino al delta del Mississippi e alla Louisiana. La popolazione del corridoio centrale restò esigua, ma l\'influenza francese copriva un vasto interno.',
    },
    defaultCamera: { center: [-82.0, 42.0], zoom: 3.5 },
  },
  {
    id: 'seven-years-war',
    yearStart: 1754,
    yearEnd: 1763,
    label: {
      en: 'Seven Years\' War & Loss',
      fr: 'Guerre de Sept Ans et perte',
      it: 'Guerra dei sette anni e perdita',
    },
    narrative: {
      en: 'The Seven Years\' War (French and Indian War in North America) brought the collapse of New France. Louisbourg fell in 1758, Québec in 1759, and Montréal in 1760. The Treaty of Paris (1763) ceded all of New France to Britain.',
      fr: 'La guerre de Sept Ans amena l\'effondrement de la Nouvelle-France. Louisbourg tomba en 1758, Québec en 1759 et Montréal en 1760. Le traité de Paris (1763) céda toute la Nouvelle-France à la Grande-Bretagne.',
      it: 'La guerra dei sette anni (guerra franco-indiana in Nord America) provocò il crollo della Nuova Francia. Louisbourg cadde nel 1758, Québec nel 1759 e Montréal nel 1760. Il trattato di Parigi (1763) cedette l\'intera Nuova Francia alla Gran Bretagna.',
    },
    defaultCamera: { center: [-71.0, 47.0], zoom: 4.5 },
  },
];

// -- Colonial era set (matches the three eraIds in eras.ts) -----------------

export const COLONIAL_ERA_IDS = new Set([
  'new-france-foundations',
  'royal-new-france',
  'atlantic-imprint',
]);

/** Unified simulation range spanning all colonial eras (1608–1763). */
export const COLONIAL_SIM_YEAR_RANGE = { start: 1608, end: 1763 } as const;

export function isColonialEra(eraId: string): boolean {
  return COLONIAL_ERA_IDS.has(eraId);
}

// -- Phase helpers -----------------------------------------------------------

export function getPhaseForYear(year: number): NewFrancePhase | undefined {
  return NEW_FRANCE_PHASES.find((p) => year >= p.yearStart && year < p.yearEnd)
    ?? (year >= 1763 ? NEW_FRANCE_PHASES[NEW_FRANCE_PHASES.length - 1] : undefined);
}

export function getPhaseIndex(year: number): number {
  const idx = NEW_FRANCE_PHASES.findIndex((p) => year >= p.yearStart && year < p.yearEnd);
  if (idx >= 0) return idx;
  return year >= 1763 ? NEW_FRANCE_PHASES.length - 1 : 0;
}

export function getPhaseById(id: NewFrancePhaseId): NewFrancePhase | undefined {
  return NEW_FRANCE_PHASES.find((p) => p.id === id);
}

/** Map an era + atlasSimYear pair to a colonial year within 1608–1763. */
export function colonialYearFromEra(eraId: string, simYear: number): number {
  if (!COLONIAL_ERA_IDS.has(eraId)) return 1608;
  return Math.max(1608, Math.min(1763, simYear));
}
