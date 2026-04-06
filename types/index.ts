import type { Feature, FeatureCollection, Polygon, MultiPolygon, LineString } from 'geojson';

// --- Geographic scope ---

export type GeographicScope = 'old_world' | 'atlantic' | 'new_world' | 'caribbean' | 'global';

// --- Camera ---

export interface CameraPreset {
  center: [number, number];
  zoom: number;
  bearing?: number;
  pitch?: number;
  duration?: number;
}

// --- Historical naming ---

export interface HistoricalName {
  eraId: string;
  name: string;
  language?: string;
}

// --- Eras ---

export interface Era {
  id: string;
  label: string;
  yearRange: [number, number];
  summary: string;
  visibleLayerDefaults: string[];
  sortOrder?: number;
  geographicScope?: GeographicScope | GeographicScope[];
  visibleRegionIds?: string[];
  camera?: CameraPreset;
  bounds?: [number, number, number, number];
  timelineGroup?: string;
}

// --- Regions ---

export interface RegionProperties {
  id: string;
  name: string;
  namesByEra: Record<string, string>;
  color?: string;
  fillIntent?: string;
  /** Historical presence overlay (macro regions) */
  presenceColor?: string;
  presenceOpacity?: number;
  confidenceTier?: string;
  hoverSummary?: string;
  dominantGroupId?: string;
  lowConfidenceHatch?: number;
}

export type RegionFeature = Feature<Polygon | MultiPolygon, RegionProperties>;
export type RegionFeatureCollection = FeatureCollection<Polygon | MultiPolygon, RegionProperties>;

export interface RegionRecord {
  id: string;
  slug: string;
  historicalNames: HistoricalName[];
  eraVisibility: string[];
  politicalEntity: Record<string, string>;
  ruler: Record<string, string>;
  summary: Record<string, string>;
  article: Record<string, string>;
  notableSettlements: string[];
  relatedEventIds: string[];
  relatedRouteIds: string[];
}

// --- Settlements ---

export type SettlementCategory = 'city' | 'fort' | 'mission' | 'colony' | 'port' | 'trading_post' | 'other';

export interface Settlement {
  id: string;
  slug?: string;
  name: string;
  historicalNames: HistoricalName[];
  alternateNames?: string[];
  coordinates: [number, number];
  eraVisibility: string[];
  regionId: string;
  description: string;
  summary?: string;
  historicalNotes?: string;
  category?: SettlementCategory;
  foundingEraId?: string;
  foundingYear?: number;
  colonialAffiliation?: string;
  relatedRouteIds?: string[];
  relatedPeopleIds?: string[];
  relatedEventIds?: string[];
}

// --- Routes ---

export type RouteKind =
  | 'migration'
  | 'invasion'
  | 'trade'
  | 'expansion'
  | 'settlement'
  | 'exploration'
  | 'military'
  | 'settlement_corridor'
  | 'river_corridor'
  | 'maritime_corridor'
  | 'colonial_migration'
  | 'resupply'
  | 'missionary';

export type RouteCategory = RouteKind;
export type RouteGeometry = 'arc' | 'path';

export interface RouteRecord {
  id: string;
  kind: RouteKind;
  eraId: string;
  eraIds?: string[];
  title: string;
  summary: string;
  geometry?: RouteGeometry;
  source: [number, number];
  target: [number, number];
  waypoints?: [number, number][];
  coordinates?: [number, number][];
  animated: boolean;
  animationSpeed?: number;
  color: [number, number, number];
  width: number;
  highlightWeight?: number;
}

// --- Events ---

export interface EventRecord {
  id: string;
  eraId: string;
  title: string;
  year: number;
  summary: string;
  relatedRegionIds: string[];
  relatedRouteIds: string[];
  relatedSettlementIds?: string[];
  relatedPeopleIds?: string[];
  geographicScope?: GeographicScope;
}

// --- Story ---

export interface StoryStep {
  id: string;
  eraId: string;
  chapterId?: string;
  chapterTitle?: string;
  title: string;
  body: string;
  focus: {
    type: 'bbox' | 'region' | 'route' | 'settlement' | 'multi';
    bbox?: [number, number, number, number];
    regionIds?: string[];
    routeIds?: string[];
    settlementIds?: string[];
  };
  camera?: CameraPreset;
  highlightRouteIds?: string[];
  highlightSettlementIds?: string[];
  highlightRegionIds?: string[];
  imageUrl?: string;
  imageCaption?: string;
}

// --- Layers ---

export type LayerCategory =
  | 'borders'
  | 'labels'
  | 'routes'
  | 'settlements'
  | 'events'
  | 'terrain'
  | 'claims'
  | 'normandy'
  | 'norman-expansion'
  | 'prehistory'
  | 'new-france'
  | 'exploration'
  | 'colonial'
  | 'viking-world'
  | 'identity';

export interface LayerConfig {
  id: string;
  label: string;
  category: LayerCategory;
  defaultOn: boolean;
  mapLayerIds: string[];
  deckLayer?: boolean;
  dependsOnEra?: boolean;
  /** Legacy route filter: controls deck.gl route layers by RouteKind from routeRecords. */
  routeFilter?: RouteKind[];
  settlementFilter?: SettlementCategory[];
  /** Atlas route filter: controls atlas RouteSegment visibility via getHiddenSegmentKinds in MapCanvas. */
  atlasSegmentKinds?: import('@/core/types').SegmentKind[];
}

// --- Route GeoJSON ---

export interface RouteProperties {
  id: string;
  name: string;
  kind: RouteKind;
  eraId: string;
}

export type RouteFeature = Feature<LineString, RouteProperties>;
export type RouteFeatureCollection = FeatureCollection<LineString, RouteProperties>;

// --- People (stub for future expansion) ---

export interface PersonRecord {
  id: string;
  slug: string;
  name: string;
  surname?: string;
  summary: string;
  surnameEtymology?: string;
  surnameOriginCategory?: import('@/core/types').SurnameOriginCategory;
  relatedSettlementIds?: string[];
  relatedRouteIds?: string[];
  relatedEventIds?: string[];
  relatedJourneyIds?: string[];
}

// --- Selection ---

export type SelectionKind = 'region' | 'settlement' | 'evidence' | 'norman-site' | 'era-info' | 'prehistoric-site' | 'atlas-person' | 'atlas-route' | 'atlas-journey' | 'nf-ydna-lineage' | 'nf-mtdna-lineage' | 'viking-adna-site' | 'viking-archaeology-site' | 'atlas-timeline-marker' | 'historical-macro-region' | 'user-ancestry-pin';

export type NormanSiteKind =
  | 'city'
  | 'castle'
  | 'fortress'
  | 'port'
  | 'crusader'
  | 'monastery'
  | 'battlefield';

export interface SelectionTarget {
  kind: SelectionKind;
  id: string;
}
