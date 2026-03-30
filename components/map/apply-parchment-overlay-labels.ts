import type { Map as MaplibreMap } from 'maplibre-gl';
import type { MapDataTheme } from './map-layers';
import {
  MICRO_REGION_LABELS,
  EXPANSION_LABELS,
  RIVER_LABELS,
  CULTURE_LABELS,
  EVIDENCE_LABELS,
  EVIDENCE_ICONS,
  TOPONYMY_LABELS,
} from './normandy-layers';
import { NF_TERRITORY_LABELS } from './new-france-territory-layers';
import { PREHISTORIC_SITES_LABELS, HILLFORTS_LABELS } from './prehistory-layers';

/** Carto/Voyager glyph stacks — Semibold improves legibility on busy parchment. */
const PARCHMENT_FONT: string[] = ['Open Sans Semibold', 'Noto Sans Regular'];

const INK = '#140e0c';
const CREAM_HALO = 'rgba(255, 247, 235, 0.98)';

const READABLE: Record<string, string | number> = {
  'text-color': INK,
  'text-halo-color': CREAM_HALO,
  'text-halo-width': 3,
  'text-halo-blur': 0.45,
  'text-opacity': 0.98,
};

function paintSymbolLayer(map: MaplibreMap, layerId: string, paint: Record<string, string | number>) {
  if (!map.getLayer(layerId)) return;
  for (const [key, val] of Object.entries(paint)) {
    map.setPaintProperty(layerId, key as 'text-color', val as never);
  }
}

function semiboldIfSymbol(map: MaplibreMap, layerId: string) {
  if (!map.getLayer(layerId)) return;
  try {
    map.setLayoutProperty(layerId, 'text-font', PARCHMENT_FONT);
  } catch {
    /* non-symbol layer */
  }
}

/**
 * Normandy / New France / prehistory overlays default to dark-mode halos.
 * On parchment, switch to ink + cream halo without threading theme through every add*().
 */
export function applyParchmentOverlayLabelStyles(map: MaplibreMap, theme: MapDataTheme) {
  if (theme === 'dark') return;

  const inkLabels = [
    MICRO_REGION_LABELS,
    EXPANSION_LABELS,
    EVIDENCE_LABELS,
    TOPONYMY_LABELS,
    NF_TERRITORY_LABELS,
    PREHISTORIC_SITES_LABELS,
    HILLFORTS_LABELS,
  ];

  for (const id of inkLabels) {
    paintSymbolLayer(map, id, READABLE);
    semiboldIfSymbol(map, id);
  }

  if (map.getLayer(RIVER_LABELS)) {
    paintSymbolLayer(map, RIVER_LABELS, {
      'text-color': '#0c2a38',
      'text-halo-color': CREAM_HALO,
      'text-halo-width': 3,
      'text-halo-blur': 0.45,
      'text-opacity': 0.94,
    });
    semiboldIfSymbol(map, RIVER_LABELS);
  }

  if (map.getLayer(CULTURE_LABELS)) {
    map.setPaintProperty(CULTURE_LABELS, 'text-halo-color', CREAM_HALO);
    map.setPaintProperty(CULTURE_LABELS, 'text-halo-width', 3);
    map.setPaintProperty(CULTURE_LABELS, 'text-halo-blur', 0.45);
    semiboldIfSymbol(map, CULTURE_LABELS);
  }

  if (map.getLayer(EVIDENCE_ICONS)) {
    paintSymbolLayer(map, EVIDENCE_ICONS, {
      'text-color': INK,
      'text-halo-color': 'rgba(255, 247, 235, 0.96)',
      'text-halo-width': 2.2,
      'text-halo-blur': 0.35,
      'text-opacity': 1,
    });
    semiboldIfSymbol(map, EVIDENCE_ICONS);
  }
}
