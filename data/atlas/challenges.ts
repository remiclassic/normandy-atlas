import type { I18nString } from '@/core/types';
import type { Aggregates } from '@/lib/progress/schema';
import type { StoryProgressRecord } from '@/lib/story-progress';

// ---------------------------------------------------------------------------
// Weekly challenge definitions — rotated deterministically per week.
// ---------------------------------------------------------------------------

export interface ChallengeObjective {
  id: string;
  label: I18nString;
  /** Pure predicate returning the progress count toward the target. */
  measure: (agg: Aggregates, story: Record<string, StoryProgressRecord>) => number;
  target: number;
}

export interface ChallengeDef {
  id: string;
  title: I18nString;
  description: I18nString;
  objectives: ChallengeObjective[];
}

function countKeys(obj: Record<string, unknown>): number {
  return Object.keys(obj).length;
}

export const atlasChallenges: ChallengeDef[] = [
  {
    id: 'ch-explore-3-places',
    title: { en: 'Pathfinder', fr: 'Explorateur de chemins' },
    description: {
      en: 'Open 3 new places on the map this week.',
      fr: 'Ouvrez 3 nouveaux lieux sur la carte cette semaine.',
    },
    objectives: [
      {
        id: 'places',
        label: { en: 'Places explored', fr: 'Lieux explorés' },
        measure: (agg) => countKeys(agg.places),
        target: 3,
      },
    ],
  },
  {
    id: 'ch-story-arc',
    title: { en: 'Storyteller', fr: 'Conteur' },
    description: {
      en: 'Complete one story arc and explore 2 regions.',
      fr: 'Terminez un arc narratif et explorez 2 régions.',
    },
    objectives: [
      {
        id: 'stories',
        label: { en: 'Stories completed', fr: 'Récits terminés' },
        measure: (_agg, story) => Object.values(story).filter((r) => r.completed).length,
        target: 1,
      },
      {
        id: 'regions',
        label: { en: 'Regions explored', fr: 'Régions explorées' },
        measure: (agg) => countKeys(agg.regions),
        target: 2,
      },
    ],
  },
  {
    id: 'ch-era-explorer',
    title: { en: 'Time Traveller', fr: 'Voyageur du temps' },
    description: {
      en: 'Visit content in 2 different eras this week.',
      fr: 'Consultez du contenu dans 2 époques différentes cette semaine.',
    },
    objectives: [
      {
        id: 'eras',
        label: { en: 'Eras visited', fr: 'Époques visitées' },
        measure: (agg) => countKeys(agg.eraCoverage),
        target: 2,
      },
    ],
  },
  {
    id: 'ch-deep-dive',
    title: { en: 'Deep Dive', fr: 'Plongée en profondeur' },
    description: {
      en: 'Spend 3+ minutes reading and open 2 journeys.',
      fr: 'Passez 3+ minutes en lecture et ouvrez 2 voyages.',
    },
    objectives: [
      {
        id: 'dwell',
        label: { en: 'Reading time (min)', fr: 'Temps de lecture (min)' },
        measure: (agg) => Math.floor(agg.totalSessionMs / 60_000),
        target: 3,
      },
      {
        id: 'journeys',
        label: { en: 'Journeys opened', fr: 'Voyages ouverts' },
        measure: (agg) => countKeys(agg.journeys),
        target: 2,
      },
    ],
  },
  {
    id: 'ch-journal-reader',
    title: { en: 'Scribe', fr: 'Scribe' },
    description: {
      en: 'Read 3 journal sections and explore 1 new place.',
      fr: 'Lisez 3 sections du journal et explorez 1 nouveau lieu.',
    },
    objectives: [
      {
        id: 'journal',
        label: { en: 'Journal sections', fr: 'Sections du journal' },
        measure: (agg) => countKeys(agg.journalSections ?? {}),
        target: 3,
      },
      {
        id: 'places',
        label: { en: 'Places explored', fr: 'Lieux explorés' },
        measure: (agg) => countKeys(agg.places),
        target: 1,
      },
    ],
  },
  {
    id: 'ch-cartographer',
    title: { en: 'Cartographer\'s Week', fr: 'Semaine du cartographe' },
    description: {
      en: 'Explore 5 route segments and 2 journeys.',
      fr: 'Explorez 5 segments de route et 2 voyages.',
    },
    objectives: [
      {
        id: 'segments',
        label: { en: 'Segments explored', fr: 'Segments explorés' },
        measure: (agg) => countKeys(agg.segments),
        target: 5,
      },
      {
        id: 'journeys',
        label: { en: 'Journeys opened', fr: 'Voyages ouverts' },
        measure: (agg) => countKeys(agg.journeys),
        target: 2,
      },
    ],
  },
];
