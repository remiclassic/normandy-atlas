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
    title: { en: 'Pathfinder', fr: 'Explorateur de chemins', de: 'Pfad-Explorer' },
    description: {
      en: 'Open 3 new places on the map this week.',
      fr: 'Ouvrez 3 nouveaux lieux sur la carte cette semaine.',
      de: 'Eröffne diese Woche 3 neue Standorte auf der Karte.',
    },
    objectives: [
      {
        id: 'places',
        label: { en: 'Places explored', fr: 'Lieux explorés', de: 'Orte erkundet' },
        measure: (agg) => countKeys(agg.places),
        target: 3,
      },
    ],
  },
  {
    id: 'ch-story-arc',
    title: { en: 'Storyteller', fr: 'Conteur', de: 'Erzähler' },
    description: {
      en: 'Complete one story arc and explore 2 regions.',
      fr: 'Terminez un arc narratif et explorez 2 régions.',
      de: 'Schließe einen Handlungsbogen ab und erkunde zwei Regionen.',
    },
    objectives: [
      {
        id: 'stories',
        label: { en: 'Stories completed', fr: 'Récits terminés', de: 'Abgeschlossene Geschichten' },
        measure: (_agg, story) => Object.values(story).filter((r) => r.completed).length,
        target: 1,
      },
      {
        id: 'regions',
        label: { en: 'Regions explored', fr: 'Régions explorées', de: 'Regionen erkundet' },
        measure: (agg) => countKeys(agg.regions),
        target: 2,
      },
    ],
  },
  {
    id: 'ch-era-explorer',
    title: { en: 'Time Traveller', fr: 'Voyageur du temps', de: 'Zeitreisender' },
    description: {
      en: 'Visit content in 2 different eras this week.',
      fr: 'Consultez du contenu dans 2 époques différentes cette semaine.',
      de: 'Sehen Sie sich diese Woche Inhalte in zwei verschiedenen Epochen an.',
    },
    objectives: [
      {
        id: 'eras',
        label: { en: 'Eras visited', fr: 'Époques visitées', de: 'Besuchte Epochen' },
        measure: (agg) => countKeys(agg.eraCoverage),
        target: 2,
      },
    ],
  },
  {
    id: 'ch-deep-dive',
    title: { en: 'Deep Dive', fr: 'Plongée en profondeur', de: 'Tiefer Tauchgang' },
    description: {
      en: 'Spend 3+ minutes reading and open 2 journeys.',
      fr: 'Passez 3+ minutes en lecture et ouvrez 2 voyages.',
      de: 'Verbringen Sie mehr als 3 Minuten mit Lesen und eröffnen Sie 2 Reisen.',
    },
    objectives: [
      {
        id: 'dwell',
        label: { en: 'Reading time (min)', fr: 'Temps de lecture (min)', de: 'Lesezeit (Min.)' },
        measure: (agg) => Math.floor(agg.totalSessionMs / 60_000),
        target: 3,
      },
      {
        id: 'journeys',
        label: { en: 'Journeys opened', fr: 'Voyages ouverts', de: 'Offene Fahrten' },
        measure: (agg) => countKeys(agg.journeys),
        target: 2,
      },
    ],
  },
  {
    id: 'ch-journal-reader',
    title: { en: 'Scribe', fr: 'Scribe', de: 'Schreiber' },
    description: {
      en: 'Read 3 journal sections and explore 1 new place.',
      fr: 'Lisez 3 sections du journal et explorez 1 nouveau lieu.',
      de: 'Lesen Sie drei Abschnitte des Tagebuchs und erkunden Sie einen neuen Ort.',
    },
    objectives: [
      {
        id: 'journal',
        label: { en: 'Journal sections', fr: 'Sections du journal', de: 'Zeitschriftenabschnitte' },
        measure: (agg) => countKeys(agg.journalSections ?? {}),
        target: 3,
      },
      {
        id: 'places',
        label: { en: 'Places explored', fr: 'Lieux explorés', de: 'Orte erkundet' },
        measure: (agg) => countKeys(agg.places),
        target: 1,
      },
    ],
  },
  {
    id: 'ch-cartographer',
    title: { en: 'Cartographer\'s Week', fr: 'Semaine du cartographe', de: 'Woche des Kartographen' },
    description: {
      en: 'Explore 5 route segments and 2 journeys.',
      fr: 'Explorez 5 segments de route et 2 voyages.',
      de: 'Erkunden Sie 5 Straßenabschnitte und 2 Fahrten.',
    },
    objectives: [
      {
        id: 'segments',
        label: { en: 'Segments explored', fr: 'Segments explorés', de: 'Segmente erkundet' },
        measure: (agg) => countKeys(agg.segments),
        target: 5,
      },
      {
        id: 'journeys',
        label: { en: 'Journeys opened', fr: 'Voyages ouverts', de: 'Offene Fahrten' },
        measure: (agg) => countKeys(agg.journeys),
        target: 2,
      },
    ],
  },
];
