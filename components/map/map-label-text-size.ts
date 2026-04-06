import type { Map as MaplibreMap } from 'maplibre-gl';
import type { TextSizeMode } from '@/lib/text-size';

const LABEL_LAYER_IDS: string[] = [
  'regions-labels',
  'settlements-labels',
  'viking-battle-labels',
  'nf-ydna-labels',
  'nf-mtdna-labels',
  'viking-arch-labels',
  'viking-adna-labels',
  'normandy-micro-regions-labels',
  'normandy-expansion-labels',
  'normandy-rivers-labels',
  'normandy-culture-labels',
  'normandy-evidence-labels',
  'normandy-toponymy-labels',
  'prehistoric-sites-labels',
  'hillforts-labels',
  'norman-realms-labels',
  'norman-crusader-labels',
  'norman-influence-labels',
  'norman-nodes-labels',
  'nf-territory-labels',
];

const TEXT_SIZE_FACTOR = 1.25;
const HALO_WIDTH_BOOST = 0.8;
const OPACITY_BOOST = 0.1;

interface LayerSnapshot {
  textSize: unknown;
  haloWidth: unknown;
  textOpacity: unknown;
}

const originals = new Map<string, LayerSnapshot>();

function captureOriginals(map: MaplibreMap): void {
  for (const id of LABEL_LAYER_IDS) {
    if (originals.has(id) || !map.getLayer(id)) continue;
    try {
      originals.set(id, {
        textSize: map.getLayoutProperty(id, 'text-size'),
        haloWidth: map.getPaintProperty(id, 'text-halo-width'),
        textOpacity: map.getPaintProperty(id, 'text-opacity'),
      });
    } catch {
      /* layer removed mid-iteration */
    }
  }
}

/**
 * Apply text-size accessibility scaling to all known symbol layers.
 * Captures original property values on first invocation so toggling back
 * to "standard" always restores the exact original expressions.
 */
export function syncMapLabelTextSize(map: MaplibreMap, mode: TextSizeMode): void {
  captureOriginals(map);

  const isLarge = mode === 'large';

  for (const id of LABEL_LAYER_IDS) {
    if (!map.getLayer(id)) continue;
    const snap = originals.get(id);
    if (!snap) continue;

    // --- text-size ---
    try {
      const scaled = isLarge ? scaleExpr(snap.textSize, TEXT_SIZE_FACTOR) : snap.textSize;
      map.setLayoutProperty(id, 'text-size', scaled);
    } catch {
      /* ok */
    }

    // --- text-halo-width ---
    try {
      if (snap.haloWidth != null) {
        const boosted = isLarge ? boostNumericExpr(snap.haloWidth, HALO_WIDTH_BOOST) : snap.haloWidth;
        map.setPaintProperty(id, 'text-halo-width', boosted);
      }
    } catch {
      /* ok */
    }

    // --- text-opacity ---
    try {
      if (snap.textOpacity != null) {
        const boosted = isLarge ? boostNumericExpr(snap.textOpacity, OPACITY_BOOST, 1) : snap.textOpacity;
        map.setPaintProperty(id, 'text-opacity', boosted);
      }
    } catch {
      /* ok */
    }
  }
}

/**
 * Multiply numeric values inside a MapLibre expression by `factor`.
 * Handles: plain numbers, and `['interpolate', ['linear'], ['zoom'], z1, v1, z2, v2, ...]`.
 */
function scaleExpr(expr: unknown, factor: number): unknown {
  if (typeof expr === 'number') return expr * factor;

  if (Array.isArray(expr) && expr[0] === 'interpolate') {
    // ['interpolate', interpolation, input, z1, v1, z2, v2, ...]
    // Stop values are at indices 3, 5, 7, … (odd offsets from index 3)
    const out = [...expr];
    for (let i = 4; i < out.length; i += 2) {
      if (typeof out[i] === 'number') out[i] = out[i] * factor;
    }
    return out;
  }

  // Fallback: return as-is rather than risk an invalid expression
  return expr;
}

/**
 * Add `delta` to numeric values, clamped to `max`.
 * Handles plain numbers and interpolate stop-value arrays.
 */
function boostNumericExpr(expr: unknown, delta: number, max?: number): unknown {
  const clamp = (v: number) => (max != null ? Math.min(max, v + delta) : v + delta);

  if (typeof expr === 'number') return clamp(expr);

  if (Array.isArray(expr) && expr[0] === 'interpolate') {
    const out = [...expr];
    for (let i = 4; i < out.length; i += 2) {
      if (typeof out[i] === 'number') out[i] = clamp(out[i]);
    }
    return out;
  }

  return expr;
}
