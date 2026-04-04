import type { Map as MaplibreMap, RasterDEMSourceSpecification } from 'maplibre-gl';
import { readStoredReduceMotionForced, computeEffectiveReducedMotion } from '@/lib/reduced-motion';

/**
 * Terrain 3D infrastructure for MapLibre.
 *
 * Extension points (not yet implemented):
 * - River highlights: add a vector/GeoJSON source + line layer between hillshade and region fills.
 * - Animated clouds: raster/image source above hillshade, below first symbol layer.
 * - Historical contour overlays: vector DEM or GeoJSON line layer with terrain-following opacity.
 *
 * Use TERRAIN_HILLSHADE_LAYER as `beforeId` anchor when inserting new layers that should
 * sit above the relief but below atlas data layers.
 */

export const TERRAIN_DEM_SOURCE = 'terrain-source';
export const TERRAIN_HILLSHADE_LAYER = 'hillshade-layer';

/** Basemap + UI stay comfortable at z14; terrain mode unlocks z15 for full DEM resolution. */
export const MAP_MAX_ZOOM_FLAT = 14;
export const MAP_MAX_ZOOM_TERRAIN = 15;

type BasemapMode = 'dark' | 'parchment';

interface TerrainApplyOptions {
  basemapMode: BasemapMode;
  skipCameraAnimation?: boolean;
}

function firstSymbolLayerId(map: MaplibreMap): string | undefined {
  const layers = map.getStyle()?.layers;
  if (!layers) return undefined;
  for (const layer of layers) {
    if (layer.type === 'symbol') return layer.id;
  }
  return undefined;
}

/**
 * Idempotently add the raster-dem source and hillshade layer.
 * Safe to call on every style rebuild — skips if already present.
 */
export function ensureTerrainInfrastructure(map: MaplibreMap): void {
  if (!map.getSource(TERRAIN_DEM_SOURCE)) {
    map.addSource(TERRAIN_DEM_SOURCE, {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: MAP_MAX_ZOOM_TERRAIN,
    } as RasterDEMSourceSpecification);
  }

  if (!map.getLayer(TERRAIN_HILLSHADE_LAYER)) {
    const beforeId = firstSymbolLayerId(map);
    map.addLayer(
      {
        id: TERRAIN_HILLSHADE_LAYER,
        type: 'hillshade',
        source: TERRAIN_DEM_SOURCE,
        layout: { visibility: 'none' },
        paint: {
          'hillshade-illumination-anchor': 'map',
          'hillshade-illumination-direction': 315,
          'hillshade-shadow-color': '#000000',
          'hillshade-highlight-color': '#ffffff',
          'hillshade-accent-color': '#555555',
          'hillshade-exaggeration': 0.92,
        },
      },
      beforeId,
    );
  }
}

/**
 * Apply or remove terrain 3D state (terrain exaggeration, hillshade visibility, camera).
 * `skipCameraAnimation` should be true when restoring state after a style switch to avoid
 * re-orbiting the camera every time the basemap changes.
 */
export function applyTerrainRuntimeState(
  map: MaplibreMap,
  enabled: boolean,
  { basemapMode, skipCameraAnimation = false }: TerrainApplyOptions,
): void {
  if (enabled) {
    map.setMaxZoom(MAP_MAX_ZOOM_TERRAIN);
    map.setTerrain({ source: TERRAIN_DEM_SOURCE, exaggeration: 2.5 });
    map.setLayoutProperty(TERRAIN_HILLSHADE_LAYER, 'visibility', 'visible');

    if (basemapMode === 'parchment') {
      map.setPaintProperty(TERRAIN_HILLSHADE_LAYER, 'hillshade-exaggeration', 0.82);
    } else {
      map.setPaintProperty(TERRAIN_HILLSHADE_LAYER, 'hillshade-exaggeration', 0.92);
    }

    if (!skipCameraAnimation) {
      const rm = computeEffectiveReducedMotion(readStoredReduceMotionForced());
      if (rm) map.jumpTo({ pitch: 52, bearing: -20 });
      else map.easeTo({ pitch: 52, bearing: -20, duration: 1200 });
    }
  } else {
    map.setTerrain(null);
    map.setLayoutProperty(TERRAIN_HILLSHADE_LAYER, 'visibility', 'none');

    const z = map.getZoom();
    if (z > MAP_MAX_ZOOM_FLAT) {
      map.setZoom(MAP_MAX_ZOOM_FLAT);
    }
    map.setMaxZoom(MAP_MAX_ZOOM_FLAT);

    if (!skipCameraAnimation) {
      const rm = computeEffectiveReducedMotion(readStoredReduceMotionForced());
      if (rm) map.jumpTo({ pitch: 0, bearing: 0 });
      else map.easeTo({ pitch: 0, bearing: 0, duration: 800 });
    }
  }
}
