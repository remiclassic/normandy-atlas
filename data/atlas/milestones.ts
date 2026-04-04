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
    title: { en: 'First Steps in Time', fr: 'Premiers pas dans le temps', de: 'Erste Schritte rechtzeitig', nb: 'Første skritt i tid', sv: 'Första stegen i tiden', da: 'Første skridt i tiden' },
    description: {
      en: 'Explore content in your first era.',
      fr: 'Explorez du contenu dans votre première époque.',
      de: 'Entdecken Sie Inhalte in Ihrer ersten Ära.',
      nb: 'Utforsk innhold i din første æra.',
      sv: 'Utforska innehåll i din första era.',
      da: 'Udforsk indhold i din første æra.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 1),
  },
  {
    id: 'chrono-three-eras',
    category: 'chronology',
    tier: 2,
    title: { en: 'Through the Ages', fr: 'À travers les âges', de: 'Im Wandel der Zeit', nb: 'Gjennom tidene', sv: 'Genom tiderna', da: 'Gennem Tiderne' },
    description: {
      en: 'Explore content across three distinct eras.',
      fr: 'Explorez du contenu dans trois époques différentes.',
      de: 'Entdecken Sie Inhalte aus drei verschiedenen Epochen.',
      nb: 'Utforsk innhold på tvers av tre forskjellige tidsepoker.',
      sv: 'Utforska innehåll i tre olika epoker.',
      da: 'Udforsk indhold på tværs af tre forskellige epoker.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 3),
  },
  {
    id: 'chrono-all-eras',
    category: 'chronology',
    tier: 3,
    title: { en: 'Master of the Timeline', fr: 'Maître de la chronologie', de: 'Timeline-Meister', nb: 'Master of the Timeline', sv: 'Tidslinjens mästare', da: 'Tidslinjens mester' },
    description: {
      en: 'Engage with content in every era of the atlas.',
      fr: 'Consultez du contenu dans chaque époque de l\'atlas.',
      de: 'Sehen Sie sich Inhalte in jeder Epoche des Atlas an.',
      nb: 'Engasjer deg med innhold i hver æra av atlaset.',
      sv: 'Engagera dig med innehåll i varje era av atlasen.',
      da: 'Engager dig med indhold i enhver æra af atlasset.',
    },
    predicate: (agg) => hasKeys(agg.eraCoverage, 14),
  },

  // ── Cartography (places & regions) ──────────────────────────────────
  {
    id: 'carto-first-place',
    category: 'cartography',
    tier: 1,
    title: { en: 'A Place on the Map', fr: 'Un lieu sur la carte', de: 'Ein Ort auf der Karte', nb: 'Et sted på kartet', sv: 'En plats på kartan', da: 'Et sted på kortet' },
    description: {
      en: 'Open the detail panel for your first place.',
      fr: 'Ouvrez le panneau de détail pour votre premier lieu.',
      de: 'Öffnen Sie das Detailfenster für Ihren ersten Standort.',
      nb: 'Åpne detaljpanelet for din første plass.',
      sv: 'Öppna detaljpanelen för din första plats.',
      da: 'Åbn detaljepanelet for din førsteplads.',
    },
    predicate: (agg) => hasKeys(agg.places, 1),
  },
  {
    id: 'carto-ten-places',
    category: 'cartography',
    tier: 2,
    title: { en: 'Well Travelled', fr: 'Bien parcouru', de: 'Gut gereist', nb: 'Godt reist', sv: 'Väl rest', da: 'Godt rejst' },
    description: {
      en: 'Explore 10 distinct places on the atlas.',
      fr: 'Explorez 10 lieux distincts sur l\'atlas.',
      de: 'Erkunden Sie 10 verschiedene Orte im Atlas.',
      nb: 'Utforsk 10 forskjellige steder på atlaset.',
      sv: 'Utforska 10 distinkta platser på atlasen.',
      da: 'Udforsk 10 forskellige steder på atlasset.',
    },
    predicate: (agg) => hasKeys(agg.places, 10),
  },
  {
    id: 'carto-twentyfive-places',
    category: 'cartography',
    tier: 3,
    title: { en: 'Cartographer\'s Eye', fr: 'L\'œil du cartographe', de: 'Das Auge des Kartographen', nb: 'Kartografens øye', sv: 'Kartografens öga', da: 'Kartografens øje' },
    description: {
      en: 'Explore 25 distinct places.',
      fr: 'Explorez 25 lieux distincts.',
      de: 'Erkunden Sie 25 verschiedene Orte.',
      nb: 'Utforsk 25 forskjellige steder.',
      sv: 'Utforska 25 olika platser.',
      da: 'Udforsk 25 forskellige steder.',
    },
    predicate: (agg) => hasKeys(agg.places, 25),
  },
  {
    id: 'carto-first-region',
    category: 'cartography',
    tier: 1,
    title: { en: 'Regional Survey', fr: 'Étude régionale', de: 'Regionalstudie', nb: 'Regional undersøkelse', sv: 'Regional undersökning', da: 'Regional Undersøgelse' },
    description: {
      en: 'Open the detail panel for your first region.',
      fr: 'Ouvrez le panneau de détail pour votre première région.',
      de: 'Öffnen Sie das Detailfenster für Ihre erste Region.',
      nb: 'Åpne detaljpanelet for din første region.',
      sv: 'Öppna detaljpanelen för din första region.',
      da: 'Åbn detaljepanelet for din første region.',
    },
    predicate: (agg) => hasKeys(agg.regions, 1),
  },
  {
    id: 'carto-five-regions',
    category: 'cartography',
    tier: 2,
    title: { en: 'Territorial Knowledge', fr: 'Connaissance du territoire', de: 'Kenntnis des Territoriums', nb: 'Territoriell kunnskap', sv: 'Territoriell kunskap', da: 'Territorial viden' },
    description: {
      en: 'Explore 5 distinct regions.',
      fr: 'Explorez 5 régions distinctes.',
      de: 'Erkunden Sie 5 verschiedene Regionen.',
      nb: 'Utforsk 5 forskjellige regioner.',
      sv: 'Utforska 5 distinkta regioner.',
      da: 'Udforsk 5 forskellige regioner.',
    },
    predicate: (agg) => hasKeys(agg.regions, 5),
  },

  // ── Itinerary (journeys & routes) ───────────────────────────────────
  {
    id: 'itin-first-journey',
    category: 'itinerary',
    tier: 1,
    title: { en: 'First Route Opened', fr: 'Première route ouverte', de: 'Erste Straße eröffnet', nb: 'Første rute åpnet', sv: 'Första rutten öppnad', da: 'Første rute åbnet' },
    description: {
      en: 'Open the detail panel for your first journey.',
      fr: 'Ouvrez le panneau de détail pour votre premier voyage.',
      de: 'Öffnen Sie das Detailfenster für Ihre erste Reise.',
      nb: 'Åpne detaljpanelet for din første reise.',
      sv: 'Öppna detaljpanelen för din första resa.',
      da: 'Åbn detaljepanelet for din første rejse.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 1),
  },
  {
    id: 'itin-five-journeys',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Following the Currents', fr: 'Suivre les courants', de: 'Folgen Sie den Strömungen', nb: 'Følger strømmene', sv: 'Följer strömmarna', da: 'Følger Strømmen' },
    description: {
      en: 'Explore 5 distinct journeys.',
      fr: 'Explorez 5 voyages distincts.',
      de: 'Entdecken Sie 5 verschiedene Reisen.',
      nb: 'Utforsk 5 forskjellige reiser.',
      sv: 'Utforska 5 olika resor.',
      da: 'Udforsk 5 forskellige rejser.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 5),
  },
  {
    id: 'itin-seine-corridor',
    category: 'itinerary',
    tier: 2,
    title: { en: 'The Seine Corridor', fr: 'Le corridor de la Seine', de: 'Der Seine-Korridor', nb: 'Seine-korridoren', sv: 'Seinekorridoren', da: 'Seine-korridoren' },
    description: {
      en: 'Open the Seine Raids and Seine Corridor journeys.',
      fr: 'Ouvrez les voyages des raids sur la Seine et du corridor de la Seine.',
      de: 'Öffnen Sie die Fahrten Seine Raid und Seine Corridor.',
      nb: 'Åpne Seine Raids og Seine Corridor-reiser.',
      sv: 'Öppna Seine Raids och Seine Corridor resor.',
      da: 'Åbn Seine Raids og Seine Corridor-rejserne.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-seine-raids', 'journey-seine-corridor']),
  },
  {
    id: 'itin-viking-normandy',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Follow the Vikings to Normandy', fr: 'Suivre les Vikings en Normandie', de: 'Folgen Sie den Wikingern in der Normandie', nb: 'Følg vikingene til Normandie', sv: 'Följ vikingarna till Normandie', da: 'Følg vikingerne til Normandiet' },
    description: {
      en: 'Explore the Danish migration and Viking settlement journeys.',
      fr: 'Explorez les voyages de migration danoise et d\'implantation viking.',
      de: 'Entdecken Sie die Reisen der dänischen Migration und der Besiedlung durch die Wikinger.',
      nb: 'Utforsk den danske migrasjons- og vikingreisene.',
      sv: 'Utforska den danska migrationen och vikingatida bosättningsresorna.',
      da: 'Udforsk de danske migrations- og vikingerejser.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-danish-migration', 'journey-viking-settlement']),
  },
  {
    id: 'itin-new-france-path',
    category: 'itinerary',
    tier: 2,
    title: { en: 'Trace the Path to New France', fr: 'Tracer la route vers la Nouvelle-France', de: 'Kartierung der Route nach Neu-Frankreich', nb: 'Spor veien til New France', sv: 'Spåra vägen till Nya Frankrike', da: 'Spor vejen til New France' },
    description: {
      en: 'Explore the Perche–Québec and Honfleur–Montréal corridors.',
      fr: 'Explorez les corridors Perche–Québec et Honfleur–Montréal.',
      de: 'Erkunden Sie die Korridore Perche–Québec und Honfleur–Montreal.',
      nb: 'Utforsk korridorene Perche–Québec og Honfleur–Montréal.',
      sv: 'Utforska korridorerna Perche–Québec och Honfleur–Montréal.',
      da: 'Udforsk korridorerne Perche–Québec og Honfleur–Montréal.',
    },
    predicate: (agg) =>
      hasAllJourneys(agg, ['journey-perche-quebec', 'journey-honfleur-montreal']),
  },
  {
    id: 'itin-celtic-sea',
    category: 'itinerary',
    tier: 3,
    title: { en: 'The Celtic Sea Route', fr: 'La route de la mer Celtique', de: 'Die Keltische Seeroute', nb: 'Den keltiske sjøruten', sv: 'Den keltiska sjövägen', da: 'Den keltiske sørute' },
    description: {
      en: 'Explore the full Celtic sea route from Norway to Normandy.',
      fr: 'Explorez la route maritime celtique de la Norvège à la Normandie.',
      de: 'Erkunden Sie den keltischen Seeweg von Norwegen in die Normandie.',
      nb: 'Utforsk hele den keltiske sjøruten fra Norge til Normandie.',
      sv: 'Utforska hela den keltiska sjövägen från Norge till Normandie.',
      da: 'Udforsk hele den keltiske havrute fra Norge til Normandiet.',
    },
    predicate: (agg) => 'journey-celtic-sea-route' in agg.journeys,
  },
  {
    id: 'itin-atlantic-arc',
    category: 'itinerary',
    tier: 3,
    title: { en: 'The Norman Arc', fr: 'L\'arc normand', de: 'Der normannische Bogen', nb: 'Den normanniske buen', sv: 'Normanbågen', da: 'Den normanniske bue' },
    description: {
      en: 'Explore journeys spanning Vikings, Duchy, Conquest, and New France.',
      fr: 'Explorez des voyages couvrant Vikings, Duché, Conquête et Nouvelle-France.',
      de: 'Entdecken Sie Reisen zu den Themen Wikinger, Herzogtum, Eroberung und Neufrankreich.',
      nb: 'Utforsk reiser som spenner over vikinger, hertugdømmet, erobringen og New France.',
      sv: 'Utforska resor som sträcker sig över Vikings, Duchy, Conquest och New France.',
      da: 'Udforsk rejser, der spænder over vikinger, hertugdømmet, erobring og New France.',
    },
    predicate: (agg) => hasKeys(agg.journeys, 10),
  },

  // ── People & stories ────────────────────────────────────────────────
  {
    id: 'people-first-story',
    category: 'people',
    tier: 1,
    title: { en: 'First Chapter', fr: 'Premier chapitre', de: 'Erstes Kapitel', nb: 'Første kapittel', sv: 'Första kapitlet', da: 'Første kapitel' },
    description: {
      en: 'Complete your first story arc.',
      fr: 'Terminez votre premier arc narratif.',
      de: 'Vervollständigen Sie Ihren ersten Handlungsbogen.',
      nb: 'Fullfør din første historiebue.',
      sv: 'Slutför din första berättelsebåge.',
      da: 'Fuldfør din første historiebue.',
    },
    predicate: (_agg, story) => anyStoryCompleted(story),
  },
  {
    id: 'people-couture',
    category: 'people',
    tier: 2,
    title: { en: 'Couture\'s Line', fr: 'La lignée Couture', de: 'Die Couture-Linie', nb: 'Coutures linje', sv: 'Coutures linje', da: 'Coutures linje' },
    description: {
      en: 'Complete the Guillaume Couture story arc.',
      fr: 'Terminez l\'arc narratif de Guillaume Couture.',
      de: 'Vervollständigen Sie den Handlungsbogen von Guillaume Couture.',
      nb: 'Fullfør Guillaume Couture-historiebuen.',
      sv: 'Slutför Guillaume Couture-berättelsebågen.',
      da: 'Gennemfør Guillaume Couture-historiebuen.',
    },
    predicate: (_agg, story) => storyCompleted(story, 'guillaume-couture'),
  },
  {
    id: 'people-three-arcs',
    category: 'people',
    tier: 2,
    title: { en: 'Chronicler', fr: 'Chroniqueur', de: 'Kolumnist', nb: 'Chronicler', sv: 'Krönikör', da: 'Kronikør' },
    description: {
      en: 'Complete 3 distinct story arcs.',
      fr: 'Terminez 3 arcs narratifs distincts.',
      de: 'Schließe 3 separate Handlungsstränge ab.',
      nb: 'Fullfør 3 distinkte historiebuer.',
      sv: 'Komplettera 3 distinkta berättelsebågar.',
      da: 'Gennemfør 3 forskellige historiebuer.',
    },
    predicate: (_agg, story) =>
      Object.values(story).filter((r) => r.completed).length >= 3,
  },
  {
    id: 'people-all-arcs',
    category: 'people',
    tier: 3,
    title: { en: 'Master Chronicler', fr: 'Maître chroniqueur', de: 'Meisterchronist', nb: 'Mesterkrøniker', sv: 'Krönikemästare', da: 'Kronikmester' },
    description: {
      en: 'Complete every story arc in the atlas.',
      fr: 'Terminez chaque arc narratif de l\'atlas.',
      de: 'Vervollständigen Sie jeden Handlungsbogen im Atlas.',
      nb: 'Fullfør hver historiebue i atlaset.',
      sv: 'Slutför varje berättelsebåge i atlasen.',
      da: 'Fuldfør hver historiebue i atlasset.',
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
    title: { en: 'Route Scholar', fr: 'Spécialiste des routes', de: 'Straßenspezialist', nb: 'Ruteforsker', sv: 'Route Scholar', da: 'Rutelærer' },
    description: {
      en: 'Open 10 route segments on the map.',
      fr: 'Ouvrez 10 segments de route sur la carte.',
      de: 'Öffnen Sie 10 Straßensegmente auf der Karte.',
      nb: 'Åpne 10 rutesegmenter på kartet.',
      sv: 'Öppna 10 ruttavsnitt på kartan.',
      da: 'Åbn 10 rutesegmenter på kortet.',
    },
    predicate: (agg) => hasKeys(agg.segments, 10),
  },
  {
    id: 'evidence-deep-dwell',
    category: 'evidence',
    tier: 2,
    title: { en: 'Deep Reader', fr: 'Lecteur approfondi', de: 'Ausführlicher Leser', nb: 'Deep Reader', sv: 'Deep Reader', da: 'Deep Reader' },
    description: {
      en: 'Spend over 5 minutes reading detail panels.',
      fr: 'Passez plus de 5 minutes à lire les panneaux de détail.',
      de: 'Nehmen Sie sich mehr als 5 Minuten Zeit, um die Detailschilder zu lesen.',
      nb: 'Bruk over 5 minutter på å lese detaljpaneler.',
      sv: 'Lägg över 5 minuter på att läsa detaljpaneler.',
      da: 'Brug over 5 minutter på at læse detaljepaneler.',
    },
    predicate: (agg) => agg.totalSessionMs >= 300_000,
  },
  {
    id: 'evidence-scholar',
    category: 'evidence',
    tier: 3,
    title: { en: 'Atlas Scholar', fr: 'Érudit de l\'atlas', de: 'Atlas-Gelehrter', nb: 'Atlas Scholar', sv: 'Atlas Scholar', da: 'Atlas lærd' },
    description: {
      en: 'Explore 40+ distinct places, regions, or journeys.',
      fr: 'Explorez plus de 40 lieux, régions ou voyages distincts.',
      de: 'Entdecken Sie über 40 verschiedene Orte, Regionen oder Reisen.',
      nb: 'Utforsk 40+ forskjellige steder, regioner eller reiser.',
      sv: 'Utforska 40+ olika platser, regioner eller resor.',
      da: 'Udforsk mere end 40 forskellige steder, regioner eller rejser.',
    },
    predicate: (agg) =>
      countKeys(agg.places) + countKeys(agg.regions) + countKeys(agg.journeys) >= 40,
  },

  // ── Depth milestones (dwell-time quality) ────────────────────────────
  {
    id: 'depth-patient-reader',
    category: 'evidence',
    tier: 2,
    title: { en: 'Patient Reader', fr: 'Lecteur patient', de: 'Geduldiger Leser', nb: 'Pasientleser', sv: 'Tålmodig läsare', da: 'Patient læser' },
    description: {
      en: 'Spend 30+ seconds reading 5 different place panels.',
      fr: 'Passez 30 s+ à lire 5 panneaux de lieux différents.',
      de: 'Verbringen Sie mindestens 30 Sekunden damit, 5 verschiedene Ortsschilder zu lesen.',
      nb: 'Bruk 30+ sekunder på å lese 5 forskjellige stedspaneler.',
      sv: 'Lägg över 30 sekunder på att läsa 5 olika platspaneler.',
      da: 'Brug mere end 30 sekunder på at læse 5 forskellige stedspaneler.',
    },
    predicate: (agg) => countEntitiesAboveDwell(agg.places, 30_000) >= 5,
  },
  {
    id: 'depth-immersed',
    category: 'evidence',
    tier: 3,
    title: { en: 'Deeply Immersed', fr: 'Profondément immergé', de: 'Tief eingetaucht', nb: 'Dypt nedsenket', sv: 'Djupt nedsänkt', da: 'Dybt fordybet' },
    description: {
      en: 'Spend over 15 minutes total reading detail panels.',
      fr: 'Passez plus de 15 minutes au total à lire les panneaux.',
      de: 'Verbringen Sie insgesamt mehr als 15 Minuten damit, die Schilder zu lesen.',
      nb: 'Bruk over 15 minutter totalt på å lese detaljpaneler.',
      sv: 'Spendera totalt 15 minuter på att läsa detaljpaneler.',
      da: 'Brug over 15 minutter i alt på at læse detaljepaneler.',
    },
    predicate: (agg) => agg.totalSessionMs >= 900_000,
  },

  // ── Journal milestones ──────────────────────────────────────────────
  {
    id: 'journal-first-section',
    category: 'evidence',
    tier: 1,
    title: { en: 'Journal Entry', fr: 'Entrée de journal', de: 'Tagebucheintrag', nb: 'Journaloppføring', sv: 'Journalanteckning', da: 'Journalindførsel' },
    description: {
      en: 'Read your first journal section.',
      fr: 'Lisez votre première section du journal.',
      de: 'Lesen Sie Ihren ersten Abschnitt des Tagebuchs.',
      nb: 'Les din første journaldel.',
      sv: 'Läs ditt första journalavsnitt.',
      da: 'Læs dit første dagbogsafsnit.',
    },
    predicate: (agg) => countKeys(agg.journalSections ?? {}) >= 1,
  },
  {
    id: 'journal-five-sections',
    category: 'evidence',
    tier: 2,
    title: { en: 'Avid Reader', fr: 'Lecteur assidu', de: 'Begeisterter Leser', nb: 'Ivrig leser', sv: 'Avid Reader', da: 'ivrig læser' },
    description: {
      en: 'Read 5 journal sections.',
      fr: 'Lisez 5 sections du journal.',
      de: 'Lesen Sie 5 Abschnitte der Zeitung.',
      nb: 'Les 5 journalseksjoner.',
      sv: 'Läs 5 journalavsnitt.',
      da: 'Læs 5 journalafsnit.',
    },
    predicate: (agg) => countKeys(agg.journalSections ?? {}) >= 5,
  },

  // ── Streak milestones ───────────────────────────────────────────────
  {
    id: 'streak-three',
    category: 'chronology',
    tier: 1,
    title: { en: 'Three-Day Voyage', fr: 'Voyage de trois jours', de: 'Dreitägige Reise', nb: 'Tre-dagers reise', sv: 'Tre dagars resa', da: 'Tre-dages rejse' },
    description: {
      en: 'Explore the atlas 3 days in a row.',
      fr: 'Explorez l\'atlas 3 jours de suite.',
      de: 'Erkunden Sie den Atlas 3 Tage hintereinander.',
      nb: 'Utforsk atlaset 3 dager på rad.',
      sv: 'Utforska atlasen 3 dagar i rad.',
      da: 'Udforsk atlasset 3 dage i træk.',
    },
    predicate: (_agg, _story, gam) => (gam?.streaks.currentStreak ?? 0) >= 3,
  },
  {
    id: 'streak-seven',
    category: 'chronology',
    tier: 2,
    title: { en: 'Week-Long Expedition', fr: 'Expédition d\'une semaine', de: 'Eine Woche Versand', nb: 'Ukelang ekspedisjon', sv: 'Veckolång expedition', da: 'Ugelang ekspedition' },
    description: {
      en: 'Maintain a 7-day exploration streak.',
      fr: 'Maintenez une série d\'exploration de 7 jours.',
      de: 'Halten Sie eine 7-tägige Kriechsträhne ein.',
      nb: 'Oppretthold en 7-dagers letingsrekke.',
      sv: 'Behåll en 7-dagars utforskningsserie.',
      da: 'Oprethold en 7-dages udforskningsrække.',
    },
    predicate: (_agg, _story, gam) => (gam?.streaks.longestStreak ?? 0) >= 7,
  },
  {
    id: 'streak-thirty',
    category: 'chronology',
    tier: 3,
    title: { en: 'Month of Discovery', fr: 'Mois de découvertes', de: 'Monat der Entdeckungen', nb: 'Oppdagelsesmåned', sv: 'Upptäcktsmånad', da: 'Opdagelsesmåned' },
    description: {
      en: 'Achieve a 30-day exploration streak.',
      fr: 'Atteignez une série d\'exploration de 30 jours.',
      de: 'Erreichen Sie eine 30-tägige Erkundungssträhne.',
      nb: 'Oppnå en 30-dagers leteserie.',
      sv: 'Uppnå en 30-dagars utforskningsserie.',
      da: 'Opnå en 30-dages udforskningsrække.',
    },
    reveal: 'secret',
    predicate: (_agg, _story, gam) => (gam?.streaks.longestStreak ?? 0) >= 30,
  },

  // ── Hidden / secret milestones ──────────────────────────────────────
  {
    id: 'secret-night-owl',
    category: 'evidence',
    tier: 2,
    title: { en: 'Night Owl', fr: 'Oiseau de nuit', de: 'Nachteule', nb: 'Natugle', sv: 'Nattuggla', da: 'Natugle' },
    description: {
      en: 'Explore the atlas between midnight and 4 AM.',
      fr: 'Explorez l\'atlas entre minuit et 4 h du matin.',
      de: 'Erkunden Sie den Atlas zwischen Mitternacht und 4 Uhr morgens.',
      nb: 'Utforsk atlaset mellom midnatt og 04.00.',
      sv: 'Utforska atlasen mellan midnatt och 04.00.',
      da: 'Udforsk atlasset mellem midnat og kl. 04.00.',
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
    title: { en: 'Completionist', fr: 'Complétionniste', de: 'Vervollständiger', nb: 'Completitionist', sv: 'Completitionist', da: 'Completionist' },
    description: {
      en: 'Explore every place, region, and journey in the atlas.',
      fr: 'Explorez chaque lieu, région et voyage de l\'atlas.',
      de: 'Entdecken Sie jeden Ort, jede Region und jede Reise im Atlas.',
      nb: 'Utforsk alle steder, regioner og reiser i atlaset.',
      sv: 'Utforska varje plats, region och resa i atlasen.',
      da: 'Udforsk alle steder, regioner og rejser i atlasset.',
    },
    reveal: 'secret',
    predicate: (agg) =>
      countKeys(agg.places) >= 40 &&
      countKeys(agg.regions) >= 10 &&
      countKeys(agg.journeys) >= 10,
  },
];
