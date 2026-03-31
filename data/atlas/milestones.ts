import type { Aggregates, EntityEngagement } from '@/lib/progress/schema';
import type { StoryProgressRecord } from '@/lib/story-progress';
import type { I18nString } from '@/core/types';

// ---------------------------------------------------------------------------
// Milestone definitions — declarative predicates over aggregates + story.
// ---------------------------------------------------------------------------

export type MilestoneCategory =
  | 'itinerary'
  | 'chronology'
  | 'people'
  | 'evidence'
  | 'cartography';

export type MilestoneTier = 1 | 2 | 3;

export interface MilestoneDef {
  id: string;
  category: MilestoneCategory;
  tier: MilestoneTier;
  title: I18nString;
  description: I18nString;
  predicate: (
    agg: Aggregates,
    story: Record<string, StoryProgressRecord>,
  ) => boolean;
}

function countKeys(obj: Record<string, unknown>): number {
  return Object.keys(obj).length;
}

function hasKeys(obj: Record<string, unknown>, n: number): boolean {
  return countKeys(obj) >= n;
}

function storyCompleted(story: Record<string, StoryProgressRecord>, key: string): boolean {
  return story[key]?.completed === true;
}

function anyStoryCompleted(story: Record<string, StoryProgressRecord>): boolean {
  return Object.values(story).some((r) => r.completed);
}

function hasAllJourneys(agg: Aggregates, ids: readonly string[]): boolean {
  return ids.every((id) => id in agg.journeys);
}

function hasAllPlaces(agg: Aggregates, ids: readonly string[]): boolean {
  return ids.every((id) => id in agg.places);
}

// ---------------------------------------------------------------------------
// Milestone registry
// ---------------------------------------------------------------------------

export const atlasMilestones: MilestoneDef[] = [
  // ── Chronology (era coverage) ───────────────────────────────────────
  {
    id: 'chrono-first-era',
    category: 'chronology',
    tier: 1,
    title: { en: 'First Steps in Time', fr: 'Premiers pas dans le temps' },
    description: {
      en: 'Explore content in your first era.',
      fr: 'Explorez du contenu dans votre première époque.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 1),
  },
  {
    id: 'chrono-three-eras',
    category: 'chronology',
    tier: 2,
    title: { en: 'Through the Ages', fr: 'À travers les âges' },
    description: {
      en: 'Explore content across three distinct eras.',
      fr: 'Explorez du contenu dans trois époques différentes.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 3),
  },
  {
    id: 'chrono-all-eras',
    category: 'chronology',
    tier: 3,
    title: { en: 'Master of the Timeline', fr: 'Maître de la chronologie' },
    description: {
      en: 'Engage with content in every era of the atlas.',
      fr: 'Consultez du contenu dans chaque époque de l\'atlas.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 14),
  },

  // ── Cartography (places & regions) ──────────────────────────────────
  {
    id: 'carto-first-place',
    category: 'cartography',
    tier: 1,
    title: { en: 'A Place on the Map', fr: 'Un lieu sur la carte' },
    description: {
      en: 'Open the detail panel for your first place.',
      fr: 'Ouvrez le panneau de détail pour votre premier lieu.',
    },
    predicate: (agg) => hasKeys(agg.places, 1),
  },
  {
    id: 'carto-ten-places',
    category: 'cartography',
    tier: 2,
    title: { en: 'Well Travelled', fr: 'Bien parcouru' },
    description: {
      en: 'Explore 10 distinct places on the atlas.',
      fr: 'Explorez 10 lieux distincts sur l\'atlas.',
    },
    predicate: (agg) => hasKeys(agg.places, 10),
  },
  {
    id: 'carto-twentyfive-places',
    category: 'cartography',
    tier: 3,
    title: { en: 'Cartographer\'s Eye', fr: 'L\'œil du cartographe' },
    description: {
      en: 'Explore 25 distinct places.',
      fr: 'Explorez 25 lieux distincts.',
    },
    predicate: (agg) => hasKeys(agg.places, 25),
  },
  {
    id: 'carto-first-region',
    category: 'cartography',
    tier: 1,
    title: { en: 'Regional Survey', fr: 'Étude régionale' },
    description: {
      en: 'Open the detail panel for your first region.',
      fr: 'Ouvrez le panneau de détail pour votre première région.',
    },
    predicate: (agg) => hasKeys(agg.regions, 1),
  },
  {
    id: 'carto-five-regions',
    category: 'cartography',
    tier: 2,
    title: { en: 'Territorial Knowledge', fr: 'Connaissance du territoire' },
    description: {
      en: 'Explore 5 distinct regions.',
      fr: 'Explorez 5 régions distinctes.',
    },
    predicate: (agg) => hasKeys(agg.regions, 5),
  },

  // ── Itinerary (journeys & routes) ───────────────────────────────────
  {
    id: 'itin-first-journey',
    category: 'itinerary',
    tier: 1,
    title: { en: 'First Route Opened', fr: 'Première route ouverte' },
    description: {
      en: 'Open the detail panel for your first journey.',
      fr: 'Ouvrez le panneau de détail pour votre premier voyage.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 1),
  },
  {
    id: 'itin-five-journeys',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Following the Currents', fr: 'Suivre les courants' },
    description: {
      en: 'Explore 5 distinct journeys.',
      fr: 'Explorez 5 voyages distincts.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 5),
  },
  {
    id: 'itin-seine-corridor',
    category: 'itinerary',
    tier: 2,
    title: { en: 'The Seine Corridor', fr: 'Le corridor de la Seine' },
    description: {
      en: 'Open the Seine Raids and Seine Corridor journeys.',
      fr: 'Ouvrez les voyages des raids sur la Seine et du corridor de la Seine.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-seine-raids', 'journey-seine-corridor']),
  },
  {
    id: 'itin-viking-normandy',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Follow the Vikings to Normandy', fr: 'Suivre les Vikings en Normandie' },
    description: {
      en: 'Explore the Danish migration and Viking settlement journeys.',
      fr: 'Explorez les voyages de migration danoise et d\'implantation viking.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-danish-migration', 'journey-viking-settlement']),
  },
  {
    id: 'itin-new-france-path',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Trace the Path to New France', fr: 'Tracer la route vers la Nouvelle-France' },
    description: {
      en: 'Explore the Perche–Québec and Honfleur–Montréal corridors.',
      fr: 'Explorez les corridors Perche–Québec et Honfleur–Montréal.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-perche-quebec', 'journey-honfleur-montreal']),
  },
  {
    id: 'itin-celtic-sea',
    category: 'itinerary',
    tier: 3,
    title: { en: 'The Celtic Sea Route', fr: 'La route de la mer Celtique' },
    description: {
      en: 'Explore the full Celtic sea route from Norway to Normandy.',
      fr: 'Explorez la route maritime celtique de la Norvège à la Normandie.',
    },
    predicate: (agg) => 'journey-celtic-sea-route' in agg.journeys,
  },
  {
    id: 'itin-atlantic-arc',
    category: 'itinerary',
    tier: 3,
    title: { en: 'The Norman Arc', fr: 'L\'arc normand' },
    description: {
      en: 'Explore journeys spanning Vikings, Duchy, Conquest, and New France.',
      fr: 'Explorez des voyages couvrant Vikings, Duché, Conquête et Nouvelle-France.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 10),
  },

  // ── People & stories ────────────────────────────────────────────────
  {
    id: 'people-first-story',
    category: 'people',
    tier: 1,
    title: { en: 'First Chapter', fr: 'Premier chapitre' },
    description: {
      en: 'Complete your first story arc.',
      fr: 'Terminez votre premier arc narratif.',
    },
    predicate: (_agg, story) => anyStoryCompleted(story),
  },
  {
    id: 'people-couture',
    category: 'people',
    tier: 2,
    title: { en: 'Couture\'s Line', fr: 'La lignée Couture' },
    description: {
      en: 'Complete the Guillaume Couture story arc.',
      fr: 'Terminez l\'arc narratif de Guillaume Couture.',
    },
    predicate: (_agg, story) => storyCompleted(story, 'guillaume-couture'),
  },
  {
    id: 'people-three-arcs',
    category: 'people',
    tier: 2,
    title: { en: 'Chronicler', fr: 'Chroniqueur' },
    description: {
      en: 'Complete 3 distinct story arcs.',
      fr: 'Terminez 3 arcs narratifs distincts.',
    },
    predicate: (_agg, story) =>
      Object.values(story).filter((r) => r.completed).length >= 3,
  },
  {
    id: 'people-all-arcs',
    category: 'people',
    tier: 3,
    title: { en: 'Master Chronicler', fr: 'Maître chroniqueur' },
    description: {
      en: 'Complete every story arc in the atlas.',
      fr: 'Terminez chaque arc narratif de l\'atlas.',
    },
    predicate: (_agg, story) =>
      Object.values(story).filter((r) => r.completed).length >= 8,
  },

  // ── Evidence (depth of engagement) ──────────────────────────────────
  {
    id: 'evidence-ten-segments',
    category: 'evidence',
    tier: 1,
    title: { en: 'Route Scholar', fr: 'Spécialiste des routes' },
    description: {
      en: 'Open 10 route segments on the map.',
      fr: 'Ouvrez 10 segments de route sur la carte.',
    },
    predicate: (agg) => hasKeys(agg.segments, 10),
  },
  {
    id: 'evidence-deep-dwell',
    category: 'evidence',
    tier: 2,
    title: { en: 'Deep Reader', fr: 'Lecteur approfondi' },
    description: {
      en: 'Spend over 5 minutes reading detail panels.',
      fr: 'Passez plus de 5 minutes à lire les panneaux de détail.',
    },
    predicate: (agg) => agg.totalSessionMs >= 300_000,
  },
  {
    id: 'evidence-scholar',
    category: 'evidence',
    tier: 3,
    title: { en: 'Atlas Scholar', fr: 'Érudit de l\'atlas' },
    description: {
      en: 'Explore 40+ distinct places, regions, or journeys.',
      fr: 'Explorez plus de 40 lieux, régions ou voyages distincts.',
    },
    predicate: (agg) =>
      countKeys(agg.places) + countKeys(agg.regions) + countKeys(agg.journeys) >= 40,
  },
];
