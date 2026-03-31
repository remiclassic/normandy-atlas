import type { I18nString } from '@/core/types';

export type StoryCategory =
  | 'Origins'
  | 'Conquest'
  | 'Expansion'
  | 'Exploration'
  | 'New France'
  | 'People'
  | 'Legacy';

export const STORY_CATEGORY_ORDER: StoryCategory[] = [
  'Origins',
  'Conquest',
  'Expansion',
  'Exploration',
  'New France',
  'People',
  'Legacy',
];

export type StoryTone = 'epic' | 'dark' | 'exploratory' | 'foundational' | 'personal';

export interface StoryLibraryMeta {
  arcId: string | null;
  category: StoryCategory;
  displayTitle?: I18nString;
  blurb: I18nString;
  hook?: I18nString;
  featured?: boolean;
  isNew?: boolean;
  thumb?: string;
  estimatedMinutes?: number;
  tone?: StoryTone;
  sortOrder?: number;
  recommendedEraId?: string;
}

/**
 * One meta row per library card. `arcId: null` is the full chronological atlas story.
 * Merge with `atlasEraArcs` for labels and chrome; scene counts come from `getBeatCount`.
 */
export const storyLibraryMetaList: StoryLibraryMeta[] = [
  {
    arcId: null,
    category: 'Legacy',
    sortOrder: 0,
    displayTitle: {
      en: 'Full atlas chronicle',
      fr: 'Chronique complète de l’atlas',
      es: 'Crónica completa del atlas',
      it: 'Cronaca completa dell’atlante',
    },
    blurb: {
      en: 'Walk the entire deep-time timeline in one continuous journey—from the first stone monuments to the Atlantic imprint.',
      fr: 'Parcourez toute la ligne du temps en un seul récit — des premiers monuments de pierre à l’empreinte atlantique.',
      es: 'Recorre toda la línea temporal en un solo relato continuo.',
      it: 'Percorri l’intera linea del tempo in un unico racconto continuo.',
    },
    hook: {
      en: 'Every era, one uninterrupted narrative across the map.',
      fr: 'Chaque ère, un récit sans coupure sur la carte.',
      es: 'Cada época, una sola narrativa sobre el mapa.',
      it: 'Ogni epoca, un’unica narrazione sulla mappa.',
    },
    estimatedMinutes: 45,
    tone: 'epic',
  },
  {
    arcId: 'normandy-to-new-world',
    category: 'Legacy',
    featured: true,
    sortOrder: 1,
    recommendedEraId: 'norman-origins',
    displayTitle: {
      en: 'From Vikings to the New World',
      fr: 'Des Vikings au Nouveau Monde',
      es: 'De vikingos al Nuevo Mundo',
      it: 'Dai vichinghi al Nuovo Mondo',
    },
    hook: {
      en: 'How raiders became rulers—and how Normandy reached across the Atlantic.',
      fr: 'Comment des raiders devinrent princes — et comment la Normandie franchit l’Atlantique.',
      es: 'De incursiones vikingas a un ducado que se proyectó al Atlántico.',
      it: 'Da predoni vichinghi a duchi che posarono sul Nuovo Mondo.',
    },
    blurb: {
      en: 'The flagship arc: Scandinavian settlement, Norman statecraft, expansion, exploration, and New France—told as one braided story.',
      fr: 'L’arc phare : installation scandinave, État normand, expansion, exploration et Nouvelle-France — comme un seul récit tressé.',
      es: 'El gran arco normando: del asentamiento escandinavo al Atlántico.',
      it: 'Il grande arco: dallo scandinavo al mondo atlantico.',
    },
    estimatedMinutes: 18,
    tone: 'epic',
  },
  {
    arcId: 'neolithic-normandy',
    category: 'Origins',
    sortOrder: 10,
    blurb: {
      en: 'Megaliths and the first farmers—the deepest layer of human presence in the landscape.',
      fr: 'Mégalithes et premiers agriculteurs — la couche la plus profonde du paysage.',
    },
    estimatedMinutes: 4,
    tone: 'foundational',
  },
  {
    arcId: 'bronze-age-channel',
    category: 'Origins',
    sortOrder: 11,
    blurb: {
      en: 'The Channel as a Bronze Age highway—metal, exchange, and coastal nodes that prefigure later seafaring.',
      fr: 'La Manche comme route de l’âge du bronze — métaux, échanges et rivages qui annoncent la navigation.',
    },
    estimatedMinutes: 4,
    tone: 'exploratory',
  },
  {
    arcId: 'iron-age-gaul',
    category: 'Origins',
    sortOrder: 12,
    blurb: {
      en: 'Tribes, oppida, and river corridors before Rome remade the map.',
      fr: 'Tribus, oppida et corridors fluviaux avant que Rome remodele la carte.',
    },
    estimatedMinutes: 5,
    tone: 'foundational',
  },
  {
    arcId: 'roman-gaul',
    category: 'Origins',
    sortOrder: 13,
    blurb: {
      en: 'Provinces, roads, and Rotomagus—Roman infrastructure over a Celtic landscape.',
      fr: 'Provinces, voies et Rotomagus — la couche romaine sur un paysage celte.',
    },
    estimatedMinutes: 5,
    tone: 'foundational',
  },
  {
    arcId: 'post-roman-gaul',
    category: 'Origins',
    sortOrder: 14,
    blurb: {
      en: 'After the legions: fragmented power, rising elites, and the shaping of what comes next.',
      fr: 'Après les légions : pouvoir fragmenté, élites nouvelles et préparation des siècles suivants.',
    },
    estimatedMinutes: 4,
    tone: 'dark',
  },
  {
    arcId: 'neustria',
    category: 'Origins',
    sortOrder: 15,
    blurb: {
      en: 'The Frankish coastal march: theaters of raid, treaty, and negotiation on the Seine.',
      fr: 'La marche côtière franque : raids, traités et négociations sur la Seine.',
    },
    estimatedMinutes: 4,
    tone: 'dark',
  },
  {
    arcId: 'frankish-carolingian',
    category: 'Origins',
    sortOrder: 16,
    blurb: {
      en: 'Carolingian frontiers and coastal defense before the longships returned in force.',
      fr: 'Frontières carolingiennes et défense côtière avant le retour des longs navires.',
    },
    estimatedMinutes: 4,
    tone: 'foundational',
  },
  {
    arcId: 'viking-age',
    category: 'Conquest',
    sortOrder: 20,
    blurb: {
      en: 'Raiding, river ascents, and the scramble for tribute along the Channel coast.',
      fr: 'Incursions, remontées de fleuves et quête de tribut le long de la Manche.',
    },
    estimatedMinutes: 6,
    tone: 'epic',
  },
  {
    arcId: 'norman-origins',
    category: 'Conquest',
    sortOrder: 21,
    hook: {
      en: 'From the treaty of Saint-Clair-sur-Epte to a Christian Norman polity.',
      fr: 'Du traité de Saint-Clair-sur-Epte à une Normandie chrétienne et structurée.',
    },
    blurb: {
      en: 'Rollo’s world: settlement, conversion, and the forging of a hybrid maritime duchy.',
      fr: 'Le monde de Rollo : installation, conversion et forge d’un duché maritime hybride.',
    },
    estimatedMinutes: 7,
    tone: 'epic',
  },
  {
    arcId: 'norman-expansion',
    category: 'Expansion',
    sortOrder: 30,
    blurb: {
      en: 'Norman arms and ambition beyond the duchy—England, the Mediterranean, and the wider medieval stage.',
      fr: 'Les armes et l’ambition normandes hors du duché — Angleterre, Méditerranée et scène médiévale.',
    },
    estimatedMinutes: 8,
    tone: 'epic',
  },
  {
    arcId: 'age-of-exploration',
    category: 'Exploration',
    sortOrder: 40,
    blurb: {
      en: 'Maritime discovery, Atlantic crossings, and the geographic imagination of early modern Europe.',
      fr: 'Découvertes maritimes, traversées de l’Atlantique et imaginaire géographique de l’Europe moderne naissante.',
    },
    estimatedMinutes: 6,
    tone: 'exploratory',
  },
  {
    arcId: 'new-france',
    category: 'New France',
    sortOrder: 50,
    blurb: {
      en: 'Foundations, royal colony, and the cultural imprint of French North America.',
      fr: 'Fondations, colonie royale et empreinte culturelle de l’Amérique française.',
    },
    estimatedMinutes: 7,
    tone: 'foundational',
  },
  {
    arcId: 'guillaume-couture',
    category: 'People',
    sortOrder: 60,
    isNew: true,
    blurb: {
      en: 'One documented life—capture, negotiation, and belonging—etched onto the map.',
      fr: 'Une vie documentée — capture, négociation et appartenance — inscrite sur la carte.',
    },
    estimatedMinutes: 5,
    tone: 'personal',
  },
];
