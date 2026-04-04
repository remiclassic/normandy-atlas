import type { Aggregates, EntityEngagement, Gamification } from '@/lib/progress/schema';
import type { StoryProgressRecord } from '@/lib/story-progress';
import { arcIdToProgressKey } from '@/lib/story-progress';
import type { I18nString } from '@/core/types';
import { storyLibraryMetaList } from '@/data/atlas/story-library-meta';
import { getBeatCount } from '@/core/story/engine';

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

export type MilestoneReveal = 'always' | 'secret';

export interface MilestoneDef {
  id: string;
  category: MilestoneCategory;
  tier: MilestoneTier;
  title: I18nString;
  description: I18nString;
  /** 'secret' hides title/description until unlocked (default: 'always'). */
  reveal?: MilestoneReveal;
  predicate: (
    agg: Aggregates,
    story: Record<string, StoryProgressRecord>,
    gamification?: Gamification,
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

function countEntitiesAboveDwell(
  bucket: Record<string, EntityEngagement>,
  minDwellMs: number,
): number {
  let count = 0;
  for (const e of Object.values(bucket)) {
    if (e.dwellMs >= minDwellMs) count++;
  }
  return count;
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
    title: { en: 'First Steps in Time', fr: 'Premiers pas dans le temps', de: 'Erste Schritte rechtzeitig' },
    description: {
      en: 'Explore content in your first era.',
      fr: 'Explorez du contenu dans votre première époque.',
      de: 'Entdecken Sie Inhalte in Ihrer ersten Ära.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 1),
  },
  {
    id: 'chrono-three-eras',
    category: 'chronology',
    tier: 2,
    title: { en: 'Through the Ages', fr: 'À travers les âges', de: 'Im Wandel der Zeit' },
    description: {
      en: 'Explore content across three distinct eras.',
      fr: 'Explorez du contenu dans trois époques différentes.',
      de: 'Entdecken Sie Inhalte aus drei verschiedenen Epochen.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 3),
  },
  {
    id: 'chrono-all-eras',
    category: 'chronology',
    tier: 3,
    title: { en: 'Master of the Timeline', fr: 'Maître de la chronologie', de: 'Timeline-Meister' },
    description: {
      en: 'Engage with content in every era of the atlas.',
      fr: 'Consultez du contenu dans chaque époque de l\'atlas.',
      de: 'Sehen Sie sich Inhalte in jeder Epoche des Atlas an.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 14),
  },

  // ── Cartography (places & regions) ──────────────────────────────────
  {
    id: 'carto-first-place',
    category: 'cartography',
    tier: 1,
    title: { en: 'A Place on the Map', fr: 'Un lieu sur la carte', de: 'Ein Ort auf der Karte' },
    description: {
      en: 'Open the detail panel for your first place.',
      fr: 'Ouvrez le panneau de détail pour votre premier lieu.',
      de: 'Öffnen Sie das Detailfenster für Ihren ersten Standort.',
    },
    predicate: (agg) => hasKeys(agg.places, 1),
  },
  {
    id: 'carto-ten-places',
    category: 'cartography',
    tier: 2,
    title: { en: 'Well Travelled', fr: 'Bien parcouru', de: 'Gut gereist' },
    description: {
      en: 'Explore 10 distinct places on the atlas.',
      fr: 'Explorez 10 lieux distincts sur l\'atlas.',
      de: 'Erkunden Sie 10 verschiedene Orte im Atlas.',
    },
    predicate: (agg) => hasKeys(agg.places, 10),
  },
  {
    id: 'carto-twentyfive-places',
    category: 'cartography',
    tier: 3,
    title: { en: 'Cartographer\'s Eye', fr: 'L\'œil du cartographe', de: 'Das Auge des Kartographen' },
    description: {
      en: 'Explore 25 distinct places.',
      fr: 'Explorez 25 lieux distincts.',
      de: 'Erkunden Sie 25 verschiedene Orte.',
    },
    predicate: (agg) => hasKeys(agg.places, 25),
  },
  {
    id: 'carto-first-region',
    category: 'cartography',
    tier: 1,
    title: { en: 'Regional Survey', fr: 'Étude régionale', de: 'Regionalstudie' },
    description: {
      en: 'Open the detail panel for your first region.',
      fr: 'Ouvrez le panneau de détail pour votre première région.',
      de: 'Öffnen Sie das Detailfenster für Ihre erste Region.',
    },
    predicate: (agg) => hasKeys(agg.regions, 1),
  },
  {
    id: 'carto-five-regions',
    category: 'cartography',
    tier: 2,
    title: { en: 'Territorial Knowledge', fr: 'Connaissance du territoire', de: 'Kenntnis des Territoriums' },
    description: {
      en: 'Explore 5 distinct regions.',
      fr: 'Explorez 5 régions distinctes.',
      de: 'Erkunden Sie 5 verschiedene Regionen.',
    },
    predicate: (agg) => hasKeys(agg.regions, 5),
  },

  // ── Itinerary (journeys & routes) ───────────────────────────────────
  {
    id: 'itin-first-journey',
    category: 'itinerary',
    tier: 1,
    title: { en: 'First Route Opened', fr: 'Première route ouverte', de: 'Erste Straße eröffnet' },
    description: {
      en: 'Open the detail panel for your first journey.',
      fr: 'Ouvrez le panneau de détail pour votre premier voyage.',
      de: 'Öffnen Sie das Detailfenster für Ihre erste Reise.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 1),
  },
  {
    id: 'itin-five-journeys',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Following the Currents', fr: 'Suivre les courants', de: 'Folgen Sie den Strömungen' },
    description: {
      en: 'Explore 5 distinct journeys.',
      fr: 'Explorez 5 voyages distincts.',
      de: 'Entdecken Sie 5 verschiedene Reisen.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 5),
  },
  {
    id: 'itin-seine-corridor',
    category: 'itinerary',
    tier: 2,
    title: { en: 'The Seine Corridor', fr: 'Le corridor de la Seine', de: 'Der Seine-Korridor' },
    description: {
      en: 'Open the Seine Raids and Seine Corridor journeys.',
      fr: 'Ouvrez les voyages des raids sur la Seine et du corridor de la Seine.',
      de: 'Öffnen Sie die Fahrten Seine Raid und Seine Corridor.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-seine-raids', 'journey-seine-corridor']),
  },
  {
    id: 'itin-viking-normandy',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Follow the Vikings to Normandy', fr: 'Suivre les Vikings en Normandie', de: 'Folgen Sie den Wikingern in der Normandie' },
    description: {
      en: 'Explore the Danish migration and Viking settlement journeys.',
      fr: 'Explorez les voyages de migration danoise et d\'implantation viking.',
      de: 'Entdecken Sie die Reisen der dänischen Migration und der Besiedlung durch die Wikinger.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-danish-migration', 'journey-viking-settlement']),
  },
  {
    id: 'itin-new-france-path',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Trace the Path to New France', fr: 'Tracer la route vers la Nouvelle-France', de: 'Kartierung der Route nach Neu-Frankreich' },
    description: {
      en: 'Explore the Perche–Québec and Honfleur–Montréal corridors.',
      fr: 'Explorez les corridors Perche–Québec et Honfleur–Montréal.',
      de: 'Erkunden Sie die Korridore Perche–Québec und Honfleur–Montreal.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-perche-quebec', 'journey-honfleur-montreal']),
  },
  {
    id: 'itin-celtic-sea',
    category: 'itinerary',
    tier: 3,
    title: { en: 'The Celtic Sea Route', fr: 'La route de la mer Celtique', de: 'Die Keltische Seeroute' },
    description: {
      en: 'Explore the full Celtic sea route from Norway to Normandy.',
      fr: 'Explorez la route maritime celtique de la Norvège à la Normandie.',
      de: 'Erkunden Sie den keltischen Seeweg von Norwegen in die Normandie.',
    },
    predicate: (agg) => 'journey-celtic-sea-route' in agg.journeys,
  },
  {
    id: 'itin-atlantic-arc',
    category: 'itinerary',
    tier: 3,
    title: { en: 'The Norman Arc', fr: 'L\'arc normand', de: 'Der normannische Bogen' },
    description: {
      en: 'Explore journeys spanning Vikings, Duchy, Conquest, and New France.',
      fr: 'Explorez des voyages couvrant Vikings, Duché, Conquête et Nouvelle-France.',
      de: 'Entdecken Sie Reisen zu den Themen Wikinger, Herzogtum, Eroberung und Neufrankreich.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 10),
  },

  // ── People & stories ────────────────────────────────────────────────
  {
    id: 'people-first-story',
    category: 'people',
    tier: 1,
    title: { en: 'First Chapter', fr: 'Premier chapitre', de: 'Erstes Kapitel' },
    description: {
      en: 'Complete your first story arc.',
      fr: 'Terminez votre premier arc narratif.',
      de: 'Vervollständigen Sie Ihren ersten Handlungsbogen.',
    },
    predicate: (_agg, story) => anyStoryCompleted(story),
  },
  {
    id: 'people-couture',
    category: 'people',
    tier: 2,
    title: { en: 'Couture\'s Line', fr: 'La lignée Couture', de: 'Die Couture-Linie' },
    description: {
      en: 'Complete the Guillaume Couture story arc.',
      fr: 'Terminez l\'arc narratif de Guillaume Couture.',
      de: 'Vervollständigen Sie den Handlungsbogen von Guillaume Couture.',
    },
    predicate: (_agg, story) => storyCompleted(story, 'guillaume-couture'),
  },
  {
    id: 'people-three-arcs',
    category: 'people',
    tier: 2,
    title: { en: 'Chronicler', fr: 'Chroniqueur', de: 'Kolumnist' },
    description: {
      en: 'Complete 3 distinct story arcs.',
      fr: 'Terminez 3 arcs narratifs distincts.',
      de: 'Schließe 3 separate Handlungsstränge ab.',
    },
    predicate: (_agg, story) =>
      Object.values(story).filter((r) => r.completed).length >= 3,
  },
  {
    id: 'people-all-arcs',
    category: 'people',
    tier: 3,
    title: { en: 'Master Chronicler', fr: 'Maître chroniqueur', de: 'Meisterchronist' },
    description: {
      en: 'Complete every story arc in the atlas.',
      fr: 'Terminez chaque arc narratif de l\'atlas.',
      de: 'Vervollständigen Sie jeden Handlungsbogen im Atlas.',
    },
    predicate: (_agg, story) => {
      const namedArcs = storyLibraryMetaList.filter(
        (m) => m.arcId != null && getBeatCount(m.arcId) > 0,
      );
      return namedArcs.every(
        (m) => story[arcIdToProgressKey(m.arcId)]?.completed === true,
      );
    },
  },

  // ── Evidence (depth of engagement) ──────────────────────────────────
  {
    id: 'evidence-ten-segments',
    category: 'evidence',
    tier: 1,
    title: { en: 'Route Scholar', fr: 'Spécialiste des routes', de: 'Straßenspezialist' },
    description: {
      en: 'Open 10 route segments on the map.',
      fr: 'Ouvrez 10 segments de route sur la carte.',
      de: 'Öffnen Sie 10 Straßensegmente auf der Karte.',
    },
    predicate: (agg) => hasKeys(agg.segments, 10),
  },
  {
    id: 'evidence-deep-dwell',
    category: 'evidence',
    tier: 2,
    title: { en: 'Deep Reader', fr: 'Lecteur approfondi', de: 'Ausführlicher Leser' },
    description: {
      en: 'Spend over 5 minutes reading detail panels.',
      fr: 'Passez plus de 5 minutes à lire les panneaux de détail.',
      de: 'Nehmen Sie sich mehr als 5 Minuten Zeit, um die Detailschilder zu lesen.',
    },
    predicate: (agg) => agg.totalSessionMs >= 300_000,
  },
  {
    id: 'evidence-scholar',
    category: 'evidence',
    tier: 3,
    title: { en: 'Atlas Scholar', fr: 'Érudit de l\'atlas', de: 'Atlas-Gelehrter' },
    description: {
      en: 'Explore 40+ distinct places, regions, or journeys.',
      fr: 'Explorez plus de 40 lieux, régions ou voyages distincts.',
      de: 'Entdecken Sie über 40 verschiedene Orte, Regionen oder Reisen.',
    },
    predicate: (agg) =>
      countKeys(agg.places) + countKeys(agg.regions) + countKeys(agg.journeys) >= 40,
  },

  // ── Depth milestones (dwell-time quality) ────────────────────────────
  {
    id: 'depth-patient-reader',
    category: 'evidence',
    tier: 2,
    title: { en: 'Patient Reader', fr: 'Lecteur patient', de: 'Geduldiger Leser' },
    description: {
      en: 'Spend 30+ seconds reading 5 different place panels.',
      fr: 'Passez 30 s+ à lire 5 panneaux de lieux différents.',
      de: 'Verbringen Sie mindestens 30 Sekunden damit, 5 verschiedene Ortsschilder zu lesen.',
    },
    predicate: (agg) => countEntitiesAboveDwell(agg.places, 30_000) >= 5,
  },
  {
    id: 'depth-immersed',
    category: 'evidence',
    tier: 3,
    title: { en: 'Deeply Immersed', fr: 'Profondément immergé', de: 'Tief eingetaucht' },
    description: {
      en: 'Spend over 15 minutes total reading detail panels.',
      fr: 'Passez plus de 15 minutes au total à lire les panneaux.',
      de: 'Verbringen Sie insgesamt mehr als 15 Minuten damit, die Schilder zu lesen.',
    },
    predicate: (agg) => agg.totalSessionMs >= 900_000,
  },

  // ── Journal milestones ──────────────────────────────────────────────
  {
    id: 'journal-first-section',
    category: 'evidence',
    tier: 1,
    title: { en: 'Journal Entry', fr: 'Entrée de journal', de: 'Tagebucheintrag' },
    description: {
      en: 'Read your first journal section.',
      fr: 'Lisez votre première section du journal.',
      de: 'Lesen Sie Ihren ersten Abschnitt des Tagebuchs.',
    },
    predicate: (agg) => countKeys(agg.journalSections ?? {}) >= 1,
  },
  {
    id: 'journal-five-sections',
    category: 'evidence',
    tier: 2,
    title: { en: 'Avid Reader', fr: 'Lecteur assidu', de: 'Begeisterter Leser' },
    description: {
      en: 'Read 5 journal sections.',
      fr: 'Lisez 5 sections du journal.',
      de: 'Lesen Sie 5 Abschnitte der Zeitung.',
    },
    predicate: (agg) => countKeys(agg.journalSections ?? {}) >= 5,
  },

  // ── Streak milestones ───────────────────────────────────────────────
  {
    id: 'streak-three',
    category: 'chronology',
    tier: 1,
    title: { en: 'Three-Day Voyage', fr: 'Voyage de trois jours', de: 'Dreitägige Reise' },
    description: {
      en: 'Explore the atlas 3 days in a row.',
      fr: 'Explorez l\'atlas 3 jours de suite.',
      de: 'Erkunden Sie den Atlas 3 Tage hintereinander.',
    },
    predicate: (_agg, _story, gam) => (gam?.streaks.currentStreak ?? 0) >= 3,
  },
  {
    id: 'streak-seven',
    category: 'chronology',
    tier: 2,
    title: { en: 'Week-Long Expedition', fr: 'Expédition d\'une semaine', de: 'Eine Woche Versand' },
    description: {
      en: 'Maintain a 7-day exploration streak.',
      fr: 'Maintenez une série d\'exploration de 7 jours.',
      de: 'Halten Sie eine 7-tägige Kriechsträhne ein.',
    },
    predicate: (_agg, _story, gam) => (gam?.streaks.longestStreak ?? 0) >= 7,
  },
  {
    id: 'streak-thirty',
    category: 'chronology',
    tier: 3,
    title: { en: 'Month of Discovery', fr: 'Mois de découvertes', de: 'Monat der Entdeckungen' },
    description: {
      en: 'Achieve a 30-day exploration streak.',
      fr: 'Atteignez une série d\'exploration de 30 jours.',
      de: 'Erreichen Sie eine 30-tägige Erkundungssträhne.',
    },
    reveal: 'secret',
    predicate: (_agg, _story, gam) => (gam?.streaks.longestStreak ?? 0) >= 30,
  },

  // ── Hidden / secret milestones ──────────────────────────────────────
  {
    id: 'secret-night-owl',
    category: 'evidence',
    tier: 2,
    title: { en: 'Night Owl', fr: 'Oiseau de nuit', de: 'Nachteule' },
    description: {
      en: 'Explore the atlas between midnight and 4 AM.',
      fr: 'Explorez l\'atlas entre minuit et 4 h du matin.',
      de: 'Erkunden Sie den Atlas zwischen Mitternacht und 4 Uhr morgens.',
    },
    reveal: 'secret',
    predicate: (agg) => {
      for (const e of Object.values(agg.places)) {
        const h = new Date(e.firstSeen).getHours();
        if (h >= 0 && h < 4) return true;
      }
      return false;
    },
  },
  {
    id: 'secret-completionist',
    category: 'cartography',
    tier: 3,
    title: { en: 'Completionist', fr: 'Complétionniste', de: 'Vervollständiger' },
    description: {
      en: 'Explore every place, region, and journey in the atlas.',
      fr: 'Explorez chaque lieu, région et voyage de l\'atlas.',
      de: 'Entdecken Sie jeden Ort, jede Region und jede Reise im Atlas.',
    },
    reveal: 'secret',
    predicate: (agg) =>
      countKeys(agg.places) >= 40 &&
      countKeys(agg.regions) >= 10 &&
      countKeys(agg.journeys) >= 10,
  },
];
