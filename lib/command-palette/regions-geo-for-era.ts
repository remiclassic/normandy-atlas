import { isColonialEra, colonialYearFromEra } from '@/data/atlas/new-france-timeline';
import { VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';
import {
  getAtlasRegionsGeoJsonForEra,
  getAtlasRegionsForColonialYear,
  getAtlasRegionsForVikingSimYear,
} from '@/core/regions/engine';
import { getRegionsGeoJsonForEra } from '@/lib/content-builders';
import type { RegionFeatureCollection } from '@/types';

/** Match MapCanvas region source for command-palette viewport queries. */
export function regionsGeoJsonForCommandPalette(
  eraId: string,
  atlasSimYear: number,
  atlasMode: boolean,
): RegionFeatureCollection {
  if (!atlasMode) {
    return getRegionsGeoJsonForEra(eraId);
  }
  if (isColonialEra(eraId)) {
    return getAtlasRegionsForColonialYear(eraId, colonialYearFromEra(eraId, atlasSimYear));
  }
  if (VIKING_MOVEMENT_ERA_IDS.has(eraId)) {
    return getAtlasRegionsForVikingSimYear(eraId, atlasSimYear);
  }
  return getAtlasRegionsGeoJsonForEra(eraId);
}
