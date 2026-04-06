// ---------------------------------------------------------------------------
// Atlas Core Domain Types
// Self-contained type system for the historical atlas engine.
// ---------------------------------------------------------------------------

export type AtlasLocale = 'en' | 'fr' | 'es' | 'it' | 'de' | 'pt' | 'da' | 'nb' | 'sv' | 'nl';

export type I18nString = { en: string } & Partial<Record<Exclude<AtlasLocale, 'en'>, string>>;

// --- Camera ---

export interface AtlasCamera {
  center: [number, number];
  zoom: number;
  bearing?: number;
  pitch?: number;
  durationMs?: number;
  easing?: string;
}

// --- Eras ---

export type EraTransitionTrigger = 'user' | 'story' | 'auto';

export interface EraTransition {
  toEraId: string;
  trigger: EraTransitionTrigger;
}

export interface AtlasEra {
  id: string;
  label: I18nString;
  range: { start: number; end: number };
  defaultCamera: AtlasCamera;
  transitions: EraTransition[];
  summary?: I18nString;
  timelineGroup?: string;
}

// --- Places ---

export type PlaceKind = 'port' | 'city' | 'settlement' | 'abstract_node' | 'fort' | 'megalith' | 'hillfort' | 'mission' | 'trading_post';
export type PlaceLayer = 'europe' | 'atlantic' | 'americas';
export type VisibilityLevel = 'emphasized' | 'normal' | 'faded' | 'hidden';

export interface PlaceEraState {
  visibility: VisibilityLevel;
  label: string;
  affiliationTags: string[];
  pedagogyIndex: number;
}

export interface Place {
  id: string;
  kind: PlaceKind;
  coordinates?: [number, number];
  regionId: string;
  layer: PlaceLayer;
  eraStates: Record<string, PlaceEraState>;
}

export interface PlaceWithState extends Place {
  currentState: PlaceEraState;
}

// --- Cultural Origins ---

export type CulturalStrand =
  | 'norse'
  | 'frankish'
  | 'breton'
  | 'flemish'
  | 'picard'
  | 'anglo_saxon'
  | 'gallo_roman'
  | 'irish'
  | 'scottish'
  | 'welsh'
  | 'other';

export interface CulturalBlendEntry {
  strand: CulturalStrand;
  weight: number;
}

// --- Regions ---

export type BorderStyle = 'hard' | 'soft' | 'disputed';
export type FillIntent = 'culture' | 'polity' | 'pressure' | 'neutral' | 'frontier' | 'contested' | 'homeland';

export interface RegionEraState {
  visibility: VisibilityLevel;
  borderStyle: BorderStyle;
  fillIntent: FillIntent;
}

export interface AtlasRegion {
  id: string;
  name: I18nString;
  layer: PlaceLayer;
  geometryRef: string;
  eraStates: Record<string, RegionEraState>;
  narrativeByEra?: Record<string, I18nString>;
  culturalInfluenceByEra?: Record<string, CulturalBlendEntry[]>;
}

export interface RegionWithState extends AtlasRegion {
  currentState: RegionEraState;
}

// --- Route Segments ---

export type SegmentKind =
  | 'migration'
  | 'trade'
  | 'exploration'
  | 'military'
  | 'invasion'
  | 'expansion'
  | 'settlement'
  | 'settlement_corridor'
  | 'river_corridor'
  | 'raid'
  | 'incursion'
  | 'maritime_corridor'
  | 'colonial_migration'
  | 'resupply'
  | 'missionary';

export type EvidenceLevel = 'documentary_cluster' | 'synthesis' | 'archaeological' | 'tradition';

// --- Reading Links (curated external references) ---

export type ReadingLinkKind = 'primary' | 'synthesis' | 'popular' | 'museum' | 'database';

export interface AtlasReadingLink {
  label: I18nString;
  url: string;
  note?: I18nString;
  kind?: ReadingLinkKind;
}

export interface RouteSegment {
  id: string;
  fromPlaceId: string;
  toPlaceId: string;
  kind: SegmentKind;
  eraIds: string[];
  weight: number;
  evidence: EvidenceLevel;
  journeyId?: string;
  orderInJourney?: number;
  /** Multi-point maritime / coastal path; when set, rendered as a PathLayer instead of arc / straight line. */
  pathCoordinates?: [number, number][];
  /** Per-segment tooltip (hover / pick). */
  segmentTooltip?: I18nString;
  segmentDetail?: I18nString;
  /** Optional sub-era time gate: segment only appears when simYear falls within this range (inclusive). */
  yearRange?: [number, number];
  /** Whether this segment is linked to Norman origins (for Norman-lens filtering). */
  normanRelated?: boolean;
  /** Specific note about the Norman-origin connection (birthplace, affiliation). */
  normanOriginNote?: I18nString;
  readingLinks?: AtlasReadingLink[];
}

export interface ResolvedSegment extends RouteSegment {
  sourceCoords: [number, number];
  targetCoords: [number, number];
}

// --- Journeys ---

export interface Journey {
  id: string;
  name: I18nString;
  eraIds: string[];
  segmentIds: string[];
  summary: I18nString;
  /** Optional long article for detail panels (e.g. guided biography). */
  longForm?: I18nString;
  /** Optional etymology / name sidebar (kept separate from longForm for layout). */
  surnameNote?: I18nString;
  readingLinks?: AtlasReadingLink[];
  culturalOrigins?: CulturalBlendEntry[];
}

export interface ResolvedJourney extends Journey {
  segments: ResolvedSegment[];
}

// --- Story ---

export interface StoryBeatCamera {
  target: 'places' | 'bbox';
  center: [number, number];
  zoom: number;
  durationMs: number;
  easing: string;
}

export interface StoryBeatFocus {
  placeIds: string[];
  regionIds: string[];
  routeSegmentIds: string[];
  journeyIds?: string[];
}

export type RouteHighlightMode = 'kind' | 'journey' | 'none';
export type PulseTarget = 'origins' | 'routes' | 'destinations';

export interface StoryBeatPresentation {
  routeHighlightMode: RouteHighlightMode;
  dimOthers: boolean;
  pulse: PulseTarget[];
}

export interface StoryBeatIllustration {
  src: string;
  alt: I18nString;
  credit?: I18nString;
}

export interface StoryBeatIllustrationSlide extends StoryBeatIllustration {
  /** Place id for geographic anchor — resolved via getPlaceCoords. */
  placeId?: string;
  /** Explicit [lng, lat] anchor when no place exists. */
  center?: [number, number];
  /** Per-slide zoom override; falls back to beat camera zoom. */
  zoom?: number;
}

export interface StoryBeatImpactVariant {
  focus?: Partial<StoryBeatFocus>;
  copy?: { title?: string; body?: I18nString };
  camera?: Partial<StoryBeatCamera>;
}

export interface StoryBeat {
  id: string;
  eraId: string;
  camera: StoryBeatCamera;
  focus: StoryBeatFocus;
  presentation: StoryBeatPresentation;
  copy: {
    title: string;
    body: I18nString;
  };
  aiSlot?: string;
  anchorYear?: number;
  /** Optional arc tag for filtering beats into thematic sub-stories. */
  arcId?: string;
  /** First illustration (backward-compat shorthand for illustrations[0]). */
  illustration?: StoryBeatIllustration;
  /** Gallery of illustrations, each with an optional geographic anchor. */
  illustrations?: StoryBeatIllustrationSlide[];
  /** Alternate focus / copy / camera used when "Historical impact" view is active. */
  impactVariant?: StoryBeatImpactVariant;
  readingLinks?: AtlasReadingLink[];
  /** Short aside about blended cultural identity, rendered below the beat body when present. */
  identityLayerNote?: I18nString;
}

// --- Timeline Markers ---

export type TimelineMarkerKind =
  | 'battle'
  | 'treaty'
  | 'person'
  | 'foundation'
  | 'expansion'
  | 'exploration'
  | 'migration'
  | 'story';

export interface TimelineMarkerAction {
  type: 'flyToPlace' | 'openPerson' | 'openStoryStep' | 'setYearOnly' | 'flyToCamera';
  placeId?: string;
  personId?: string;
  beatIndex?: number;
  center?: [number, number];
  zoom?: number;
}

export interface TimelineMarker {
  id: string;
  kind: TimelineMarkerKind;
  year: number;
  eraIds: string[];
  label: I18nString;
  action?: TimelineMarkerAction;
  detail?: I18nString;
  readingLinks?: AtlasReadingLink[];
}

// --- People ---

export type NarrativeWeight = 'anchor' | 'supporting' | 'minor';
export type MigrationChannel = 'normandy_port' | 'perche' | 'brittany_coast' | 'aunis_saintonge' | 'paris_region' | 'loire_valley' | 'poitou' | 'low_countries' | 'italian_peninsula' | 'english_polity' | 'other';
export type ProvenanceConfidence = 'documented' | 'network' | 'uncertain';

export type SurnameOriginCategory =
  | 'core_norman'
  | 'strongly_norman'
  | 'coastal_maritime'
  | 'norse_influence'
  | 'feudal_trade'
  | 'other';

/** Structured Norman/atlas framing for the person detail panel. */
export type AtlasThroughline =
  | { kind: 'norman'; descriptor?: I18nString }
  | { kind: 'inclusion'; rationale: I18nString; identityLabel?: I18nString };

export interface Person {
  id: string;
  displayName: string;
  birthYear: number;
  deathYear: number;
  roles: string[];
  originPlaceId: string;
  destinationPlaceIds: string[];
  narrativeWeight: NarrativeWeight;
  bio: I18nString;
  legacy: I18nString;
  relevantEraIds?: string[];
  originLabel?: I18nString;
  migrationChannel?: MigrationChannel;
  confidence?: ProvenanceConfidence;
  surname?: string;
  surnameEtymology?: I18nString;
  surnameOriginCategory?: SurnameOriginCategory;
  relatedJourneyIds?: string[];
  relatedSettlementIds?: string[];
  relatedEventIds?: string[];
  /** When set, the person detail panel shows a CTA to launch this guided story arc. */
  guidedStoryArcId?: string;
  /** Norman identity or atlas-inclusion rationale, surfaced in the person detail panel. */
  atlasThroughline?: AtlasThroughline;
  readingLinks?: AtlasReadingLink[];
  culturalOrigins?: CulturalBlendEntry[];
}

// --- Methodology / Atlas Contract ---

export interface AtlasContract {
  id: string;
  rules: string[];
  forbiddenClaims: string[];
}

// --- Presentation Styles (output types for the visual layer) ---

export interface RouteVisualStyle {
  color: [number, number, number];
  width: number;
  opacity: number;
  animated: boolean;
}

export interface RegionVisualStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeWidth: number;
  strokeOpacity: number;
}

export interface PlaceVisualStyle {
  radius: number;
  color: string;
  opacity: number;
  glowRadius: number;
  glowOpacity: number;
}

// --- AI Context ---

export interface AIContext {
  currentEra: {
    id: string;
    label: I18nString;
    range: { start: number; end: number };
    summary?: I18nString;
  };
  selectedPlaces: Array<{
    id: string;
    label: string;
    kind: PlaceKind;
    affiliationTags: string[];
  }>;
  visibleRoutes: Array<{
    id: string;
    kind: SegmentKind;
    fromPlaceId: string;
    toPlaceId: string;
  }>;
  visibleRegions: Array<{
    id: string;
    name: I18nString;
    state: RegionEraState;
  }>;
  notablePeople: Array<{
    id: string;
    displayName: string;
    roles: string[];
    confidence?: ProvenanceConfidence;
  }>;
  methodologyRules: string[];
  forbiddenClaims: string[];
  activeMigration?: {
    cohortId: MigrationCohortId;
    branch: MigrationBranchId;
    mapMode: MigrationMapMode;
    metricLabel: string;
    yearRange: [number, number];
  };
}

// --- Migration Explorer ---

export type MigrationCohortId =
  | 'all_immigrants'
  | 'founding_immigrants'
  | 'engages'
  | 'filles_du_roi'
  | 'carignan_salieres';

export type MigrationBranchId = 'st_lawrence' | 'acadia';
export type MigrationMapMode = 'origins' | 'ports' | 'colonies';
export type StatConfidence = 'high' | 'medium' | 'low';

export interface MigrationSource {
  shortCitation: string;
  url?: string;
}

export interface MigrationMetricDefinition {
  label: I18nString;
  description: I18nString;
}

export type MigrationShareRowKind = 'metric' | 'callout';

export interface MigrationShareRow {
  entityId: string;
  label: I18nString;
  /** `callout` rows explain context without a % bar and are excluded from the ~100% validation sum. */
  kind?: MigrationShareRowKind;
  percent?: number;
  percentRange?: [number, number];
  confidence: StatConfidence;
  note?: I18nString;
}

export type MigrationFlowTier = 'primary' | 'secondary';

export interface MigrationFlowEdge {
  originRegionId: string;
  portPlaceId: string;
  colonyZoneId: string;
  weight: number;
  confidence: StatConfidence;
  /** Thinner, lower-opacity arcs on the map — illustrative links, not primary census-weighted corridors. */
  tier?: MigrationFlowTier;
}

export interface MigrationDataset {
  id: string;
  eraIds: string[];
  branch: MigrationBranchId;
  cohortId: MigrationCohortId;
  yearRange: [number, number];
  metricDefinition: MigrationMetricDefinition;
  sources: MigrationSource[];
  origins: MigrationShareRow[];
  ports: MigrationShareRow[];
  colonies: MigrationShareRow[];
  flowEdges?: MigrationFlowEdge[];
}

export interface MigrationOverlayContext {
  mapMode: MigrationMapMode;
  dataset: MigrationDataset;
}

// --- Historical peoples / cultural presence (macro-regions, time-sliced) ---

export type HistoricalGroupKind = 'people' | 'polity' | 'cultural-sphere' | 'legacy-population';

/** Relative prominence in region (0–1), not genetic percentage. */
export type PresenceConfidenceLevel = 'high' | 'medium' | 'low';

export type PresenceProvenance =
  | 'polity_control'
  | 'chronicler'
  | 'archaeology'
  | 'inferred_sphere';

export type HistoricalSourceKind = 'tree' | 'review' | 'database' | 'synthesis';

export interface HistoricalSourceRef {
  id: string;
  title: string;
  url?: string;
  note?: string;
  kind?: HistoricalSourceKind;
}

export interface RegionalPresence {
  regionId: string;
  startYear: number;
  endYear: number;
  /** Relative prominence in this region for the time slice (0–1). */
  weight: number;
  confidence: PresenceConfidenceLevel;
  provenance?: PresenceProvenance;
  notes?: string;
  sources: HistoricalSourceRef[];
}

export interface HistoricalGroup {
  id: string;
  name: I18nString;
  kind: HistoricalGroupKind;
  color: string;
  startYear: number;
  endYear: number;
  parentGroupId?: string;
  aliases?: string[];
  description: I18nString;
  presences: RegionalPresence[];
  /** Optional story arcs for “follow on map” from group detail. */
  storyArcIds?: string[];
}

export type HistoricalPresenceView = 'peoples' | 'polities' | 'legacy';

export interface RankedPresenceRow {
  group: HistoricalGroup;
  presence: RegionalPresence;
}

// --- Genetic Lineage Explorer (haplogroups — not ethnicity; soft-linked to atlas) ---

export type LineageType = 'paternal' | 'maternal';

export type LineageConfidenceLevel = 'high' | 'medium' | 'low';

export type LineageRegionRelevance =
  | 'origin'
  | 'migration'
  | 'presence'
  | 'later-concentration'
  | 'possible-link';

export type HaplogroupSourceKind = HistoricalSourceKind;

export interface HaplogroupSourceRef {
  id: string;
  title: string;
  url?: string;
  note?: string;
  kind?: HaplogroupSourceKind;
}

export interface HaplogroupRegionLink {
  regionId: string;
  relevanceType: LineageRegionRelevance;
  confidence: LineageConfidenceLevel;
  notes?: I18nString;
  startYear?: number;
  endYear?: number;
  sources: HaplogroupSourceRef[];
}

export interface HaplogroupTimelineEvent {
  id: string;
  title: I18nString;
  startYear?: number;
  endYear?: number;
  description: I18nString;
  confidence: LineageConfidenceLevel;
  sources: HaplogroupSourceRef[];
}

export type NormanAtlasLineageFocus =
  | 'viking_age_scandinavia'
  | 'frankish_regions'
  | 'normandy'
  | 'anglo_norman'
  | 'british_isles'
  | 'new_france'
  | 'baltic_slavic'
  | 'eastern_steppe_corridors';

export type LineageMapLayerKey =
  | 'lineage-origin'
  | 'lineage-corridor'
  | 'lineage-node'
  | 'lineage-uncertainty';

export type LineageEraLens = 'deep' | 'antiquity' | 'early_medieval' | 'high_medieval' | 'colonial';

export interface HaplogroupProfile {
  id: string;
  name: string;
  lineageType: LineageType;
  parentId?: string;
  aliases?: string[];
  shortSummary: I18nString;
  longSummary: I18nString;
  estimatedOriginTime?: I18nString;
  estimatedOriginRegion?: I18nString;
  migrationSummary?: I18nString;
  confidenceNotes?: I18nString[];
  cautionNotes?: I18nString[];
  associatedHistoricalGroupIds?: string[];
  associatedStoryArcIds?: string[];
  associatedSegmentIds?: string[];
  associatedJourneyIds?: string[];
  associatedRegionLinks?: HaplogroupRegionLink[];
  timelineEvents?: HaplogroupTimelineEvent[];
  childCladeIds?: string[];
  sources: HaplogroupSourceRef[];
  /** Hints for map styling — not the same as UI layer toggles in data/layers.ts */
  mapLayerHints?: LineageMapLayerKey[];
  normanAtlasFocus?: NormanAtlasLineageFocus[];
  tier?: 'major' | 'sub';
  phylogenyVersionNote?: I18nString;
  /** ISO date (YYYY-MM-DD) of last editorial review of this profile. */
  lastReviewed?: string;
  /** Public phylogeny menus we align naming against (not a genetic match claim). */
  phylogenyAlignedTo?: I18nString;
}

/** How a regional haplogroup pie was produced (methodology badge). */
export type RegionalHaplogroupEvidenceKind =
  | 'ancient-dna-aggregated'
  | 'modern-cohort-proxy'
  | 'synthesis-estimate';

export interface RegionalHaplogroupTimeWindow {
  startYear: number;
  endYear: number;
  label: I18nString;
}

export interface RegionalHaplogroupSlice {
  label: string;
  /** Share of successfully typed lineages in the cohort (0–100). */
  pct: number;
  color?: string;
  /** Optional link to a curated [`HaplogroupProfile.id`](/lineage-explorer). */
  lineageProfileId?: string;
}

export interface RegionalHaplogroupSnapshot {
  id: string;
  regionId: string;
  lineageType: LineageType;
  window: RegionalHaplogroupTimeWindow;
  evidenceKind: RegionalHaplogroupEvidenceKind;
  confidence: LineageConfidenceLevel;
  /** Individuals in the cohort (ancient samples, triangulated patrilines, etc.). */
  sampleN?: number;
  slices: RegionalHaplogroupSlice[];
  methodologyNote: I18nString;
  sources: HaplogroupSourceRef[];
}

export type LineageDepthFilter = 'major' | 'sub' | 'all';

export type LineageLineageFilter = 'all' | 'paternal' | 'maternal';

export interface ResolvedHaplogroupMatch {
  profile: HaplogroupProfile;
  /** When the query matched a missing subclade, the profile is the nearest parent with curated copy. */
  fallbackFromQuery?: string;
  matchRank: number;
}

/** Major haplogroup letter for A–Z picker (Y-DNA paternal naming convention). */
export type HaplogroupMajorLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

/** Optional editorial “lens” on the migration map (e.g. Norman Y-DNA framing). */
export type PhylogeographyMapFocusId = 'norman-normandy';

/** Single illustrative node on the phylogeographic map (not a precise coordinate claim). */
export interface PhylogeographyNode {
  id: string;
  label: string;
  lat: number;
  lng: number;
  /** Optional link to [`HaplogroupProfile.id`](/lineage-explorer). */
  profileId?: string;
  /** If set, this node appears only when that map focus is selected (hidden in the default “all branches” view). */
  onlyWhenFocus?: PhylogeographyMapFocusId;
  /** If set, this node is hidden when that focus is active (still shown in the default view). */
  omitWhenFocus?: PhylogeographyMapFocusId;
}

export interface PhylogeographyEdge {
  fromId: string;
  toId: string;
  onlyWhenFocus?: PhylogeographyMapFocusId;
  omitWhenFocus?: PhylogeographyMapFocusId;
}

/** Curated dataset for one letter tab; empty nodes/edges means “not yet mapped”. */
export interface PhylogeographyLetterDataset {
  letter: HaplogroupMajorLetter;
  title: I18nString;
  summary: I18nString;
  nodes: PhylogeographyNode[];
  edges: PhylogeographyEdge[];
  sources: HaplogroupSourceRef[];
}
