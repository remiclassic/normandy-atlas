// ---------------------------------------------------------------------------
// Atlas Core Domain Types
// Self-contained type system for the historical atlas engine.
// ---------------------------------------------------------------------------

export type AtlasLocale = 'en' | 'fr' | 'es' | 'it' | 'de' | 'pt' | 'da' | 'nl';

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
