export {
  getAtlasEra,
  getAtlasEras,
  getAtlasEraIds,
  getDefaultAtlasEraId,
  getAvailableTransitions,
  isValidAtlasEra,
  getEraLabel,
  getEraRange,
  resolveAtlasEraIdForYear,
} from './era/engine';

export {
  getPlace,
  getPlaceCoords,
  getPlaceEraState,
  getVisiblePlaces,
  getPlacesForRegion,
  getPlacesByLayer,
  buildPlacesGeoJson,
  searchAtlasPlaces,
} from './places/engine';

export {
  getAtlasRegion,
  getRegionEraState,
  getVisibleRegions,
  getAtlasRegionsGeoJsonForEra,
  getAtlasRegionsForColonialYear,
  getAtlasRegionsForVikingSimYear,
  getVikingTerritoryFadeStates,
  getVikingTerritoryFadeRegionIds,
  getRegionsByLayer,
  enrichRegionsWithCulturalOrigins,
} from './regions/engine';

export {
  getSegment,
  getActiveSegments,
  getSegmentsByKind,
  getSegmentsForJourney,
  getJourney,
  getActiveJourneys,
  getAllJourneys,
  isOceanCrossing,
  type GetActiveSegmentsOptions,
} from './routes/engine';

export {
  getStoryBeats,
  getBeat,
  getBeatCount,
  getStoryStepForBeatId,
  getEffectiveStoryBeat,
  resolveStoryIllustrationLngLat,
  resolveSlideAnchor,
  resolveStoryFocus,
} from './story/engine';

export {
  getPerson,
  getPeopleForEra,
  getPeopleForPlace,
  getPeopleForRegion,
} from './people/engine';

export {
  getRouteStyle,
  getRouteHighlightStyle,
  getRouteDimStyle,
  getRouteStyleWithEvidence,
  getRouteHighlightStyleWithEvidence,
  getRouteDimStyleWithEvidence,
  EVIDENCE_LABELS,
  getRegionStyle,
  getPlaceStyle,
} from './presentation/styles';

export {
  buildAIContext,
} from './ai/context';

export {
  HISTORICAL_PRESENCE_YEAR_PRESETS,
  buildHistoricalPresenceGeoJson,
  compareRankedPresences,
  explainProvenance,
  getHistoricalGroup,
  getRankedPresencesForRegion,
  listHistoricalGroups,
  summarizePresenceDelta,
  type HistoricalPresenceYearPreset,
  type PresenceDeltaItem,
  type PresenceDeltaKind,
} from './peoples/engine';

export {
  isMigrationEra,
  listCohortsForEra,
  listBranchesForEra,
  getDefaultDataset,
  resolveDataset,
  getDatasetById,
  getSharesForMode,
  getShareForEntity,
  buildMigrationWeightMap,
  resolveFlowArcs,
  validateDatasets,
} from './migration/engine';

export {
  listHaplogroupProfiles,
  getHaplogroupProfile,
  getHaplogroupChildren,
  getHaplogroupParent,
  normalizeHaplogroupQuery,
  buildHaplogroupAliasMap,
  getAncestorChain,
} from './lineage/engine';

export {
  searchHaplogroupProfiles,
  resolveHaplogroupQuery,
  type HaplogroupSearchFilters,
} from './lineage/search';

export {
  buildLineageMapGeoJson,
  bboxForLineageFeatures,
  getRegionCentroid,
  isValidLineageEraLens,
} from './lineage/geo';

export {
  buildPhylogeographyGeoJson,
  phylogeographyDatasetHasGeometry,
  bboxForPhylogeographyFeatures,
  isHaplogroupMajorLetter,
  isPhylogeographyMapFocusId,
  listPhylogeographyMapFocusIds,
} from './lineage/phylogeography-geo';

export {
  resolveLineageHistoricalGroups,
  resolveLineageRegions,
  resolveLineageJourneys,
  resolveLineageRouteSegments,
  resolveLineageStoryArcs,
  type ResolvedStoryArcLink,
} from './lineage/related';

export {
  REGIONAL_HAPLOGROUP_PIE_REGION_IDS,
  listRegionalHaplogroupSnapshots,
  getRegionalHaplogroupSnapshotsForRegion,
  regionalHaplogroupPieAllowlistHas,
} from './lineage/regional-haplogroup-snapshots';

export type {
  FamilyTreePerson,
  UserAncestryProfile,
  AncestryJourneyStep,
  AncestryJourneyPlan,
  NormanDetectionResult,
} from './ancestry/types';
export { runNormanDetection } from './ancestry/norman-detection';
export { buildAncestryJourneyPlan } from './ancestry/journey';
export { buildUserAncestryPinsGeoJson, suggestAtlasPlaceForFreeform } from './ancestry/geo';
