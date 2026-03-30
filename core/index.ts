export {
  getAtlasEra,
  getAtlasEras,
  getAtlasEraIds,
  getDefaultAtlasEraId,
  getAvailableTransitions,
  isValidAtlasEra,
  getEraLabel,
  getEraRange,
} from './era/engine';

export {
  getPlace,
  getPlaceCoords,
  getPlaceEraState,
  getVisiblePlaces,
  getPlacesForRegion,
  getPlacesByLayer,
  buildPlacesGeoJson,
} from './places/engine';

export {
  getAtlasRegion,
  getRegionEraState,
  getVisibleRegions,
  getAtlasRegionsGeoJsonForEra,
  getAtlasRegionsForColonialYear,
  getRegionsByLayer,
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
