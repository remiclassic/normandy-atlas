import type { Map as MaplibreMap } from 'maplibre-gl';

const CARTO_SOURCE_ID = 'carto';

/**
 * True for Carto GL basemap layers that show present-day admin boundaries and typography
 * (cities, roads, POIs, water names). Atlas GeoJSON layers use other sources and are untouched.
 */
export function isCartoModernOverlayLayer(layer: { id: string; source?: string }): boolean {
  if (layer.source !== CARTO_SOURCE_ID) return false;
  const { id } = layer;
  if (id.startsWith('boundary_')) return true;
  if (id.startsWith('place_')) return true;
  if (id.startsWith('watername')) return true;
  if (id === 'waterway_label') return true;
  if (id.startsWith('roadname_')) return true;
  if (id === 'housenumber') return true;
  if (id.startsWith('poi_')) return true;
  return false;
}

/** Show or hide modern Carto labels and political boundaries (both Dark Matter and Voyager/parchment). */
export function setCartoModernBasemapOverlaysVisible(map: MaplibreMap, visible: boolean) {
  const style = map.getStyle();
  if (!style?.layers) return;
  const v = visible ? 'visible' : 'none';
  for (const layer of style.layers) {
    if (!isCartoModernOverlayLayer(layer)) continue;
    if (!map.getLayer(layer.id)) continue;
    try {
      map.setLayoutProperty(layer.id, 'visibility', v);
    } catch {
      /* layer may not support visibility */
    }
  }
}
