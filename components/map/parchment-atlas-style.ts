import type { LayerSpecification, StyleSpecification } from 'maplibre-gl';

/** Carto Voyager GL style — fetched and patched for manuscript look (same vector tiles). */
export const VOYAGER_STYLE_URL = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

const PARCHMENT_BG = '#e8dcc2';
const WATER_FILL = '#b4c4ca';
const WATER_SHADOW = 'rgba(168, 184, 190, 0.88)';
const WATERWAY_LINE = '#9eb4bc';
const INK_LINE = '#4a3d32';
const INK_LINE_SOFT = '#6b5a48';
const LAND_TINT = 'rgba(148, 132, 108, 0.14)';
const LAND_TINT_STRONG = 'rgba(138, 122, 98, 0.22)';

/** Increment when basemap label/contrast patches change (invalidates session cache). */
const PARCHMENT_STYLE_CACHE_REV = 2;

let cache: { rev: number; style: StyleSpecification } | null = null;

function hideModernInfrastructure(layer: LayerSpecification) {
  const id = layer.id;
  if (
    /^(road_|tunnel_|bridge_|rail|rail_dash|aeroway-)/.test(id) ||
    id === 'building' ||
    id === 'building-top'
  ) {
    if (!layer.layout) layer.layout = {};
    (layer.layout as { visibility?: string }).visibility = 'none';
  }
}

function patchLandFill(layer: LayerSpecification) {
  if (layer.type !== 'fill' || !layer.paint) return;
  const sl = (layer as { 'source-layer'?: string })['source-layer'];
  if (!sl || !['landcover', 'park', 'landuse'].includes(sl)) return;
  const paint = layer.paint as Record<string, unknown>;
  paint['fill-color'] = sl === 'landcover' ? LAND_TINT : LAND_TINT_STRONG;
  paint['fill-opacity'] = 1;
}

function patchSymbolForParchment(layer: LayerSpecification) {
  if (layer.type !== 'symbol' || !layer.paint) return;
  const paint = layer.paint as Record<string, unknown>;
  const tc = paint['text-color'];
  if (typeof tc !== 'string') return;
  const id = layer.id;
  if (id.startsWith('watername') || id === 'waterway_label') {
    paint['text-color'] = '#0c2834';
    paint['text-halo-color'] = 'rgba(255, 247, 235, 0.96)';
    paint['text-halo-width'] = 2.8;
    paint['text-halo-blur'] = 0.35;
    if (typeof paint['icon-color'] === 'string') {
      paint['icon-color'] = '#0c2834';
    }
    return;
  }
  if (id.startsWith('place_')) {
    paint['text-color'] = '#120d0a';
    paint['text-halo-color'] = 'rgba(255, 247, 235, 0.98)';
    paint['text-halo-width'] = 3;
    paint['text-halo-blur'] = 0.4;
    if (typeof paint['icon-color'] === 'string') {
      paint['icon-color'] = '#120d0a';
    }
  }
}

function patchBoundaryInk(layer: LayerSpecification) {
  if (layer.type !== 'line' || !layer.paint) return;
  const id = layer.id;
  const paint = layer.paint as Record<string, unknown>;
  if (id === 'boundary_county' || id === 'boundary_state') {
    paint['line-color'] = INK_LINE_SOFT;
    paint['line-opacity'] = 0.55;
  }
  if (id === 'boundary_country_outline') {
    paint['line-color'] = 'rgba(74, 61, 50, 0.35)';
    paint['line-opacity'] = 0.65;
    paint['line-width'] = 10;
  }
  if (id === 'boundary_country_inner') {
    paint['line-color'] = INK_LINE;
  }
}

/**
 * Deep-clones Voyager and retints for a CK3-adjacent parchment atlas basemap.
 * Roads / rails / buildings hidden; water and ink-toned boundaries emphasized.
 */
export function buildParchmentAtlasStyle(base: StyleSpecification): StyleSpecification {
  const style = structuredClone(base) as StyleSpecification;

  for (const layer of style.layers) {
    hideModernInfrastructure(layer);

    if (layer.type === 'background' && layer.paint) {
      (layer.paint as { 'background-color'?: string })['background-color'] = PARCHMENT_BG;
    }

    if (layer.id === 'water' && layer.paint) {
      (layer.paint as { 'fill-color'?: string })['fill-color'] = WATER_FILL;
    }
    if (layer.id === 'water_shadow' && layer.paint) {
      (layer.paint as { 'fill-color'?: string })['fill-color'] = WATER_SHADOW;
    }
    if (layer.id === 'waterway' && layer.paint) {
      (layer.paint as { 'line-color'?: string })['line-color'] = WATERWAY_LINE;
    }

    patchLandFill(layer);
    patchBoundaryInk(layer);
    patchSymbolForParchment(layer);
  }

  return style;
}

export async function loadParchmentAtlasStyle(): Promise<StyleSpecification> {
  if (cache?.rev === PARCHMENT_STYLE_CACHE_REV) return structuredClone(cache.style);

  const res = await fetch(VOYAGER_STYLE_URL);
  if (!res.ok) throw new Error(`Failed to fetch Voyager style: ${res.status}`);
  const json = (await res.json()) as StyleSpecification;
  const style = buildParchmentAtlasStyle(json);
  cache = { rev: PARCHMENT_STYLE_CACHE_REV, style };
  return structuredClone(style);
}

export function clearParchmentStyleCache() {
  cache = null;
}
