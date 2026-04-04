/**
 * Shareable map-view URL encoding / decoding.
 *
 * Packs the current view (camera, era, timeline year, basemap, layer delta,
 * optional selection) into a compact base64url query parameter.
 */

import { layerConfigs, getDefaultLayerState, getAtlasLayerPreset } from '@/data/layers';
import type { SelectionKind } from '@/types';
import type { BasemapMode } from '@/lib/store';
import { buildPublicShareUrl } from '@/lib/progress/share';
import { readMapView } from '@/lib/map-view-reader';
import { useMapStore } from '@/lib/store';

// ── Payload shape (v1) ──────────────────────────────────────────────

export interface ViewPayloadV1 {
  v: 1;
  cam?: { lng: number; lat: number; z: number; b?: number; p?: number };
  ay?: number;
  ny?: number;
  base?: BasemapMode;
  /** Layer ids whose state differs from the era baseline. */
  ly?: Record<string, boolean>;
  sel?: { id: string; kind: SelectionKind };
}

// ── Validation sets ─────────────────────────────────────────────────

const VALID_LAYER_IDS = new Set(layerConfigs.map((c) => c.id));

const VALID_SELECTION_KINDS: ReadonlySet<string> = new Set<SelectionKind>([
  'region', 'settlement', 'evidence', 'norman-site', 'era-info',
  'prehistoric-site', 'atlas-person', 'atlas-route', 'atlas-journey',
  'nf-ydna-lineage', 'viking-adna-site', 'viking-archaeology-site',
  'atlas-timeline-marker',
]);

const VALID_BASEMAPS: ReadonlySet<string> = new Set(['dark', 'parchment']);

// ── Base64url helpers ───────────────────────────────────────────────

function toBase64Url(json: string): string {
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(b64: string): string {
  const padded = b64.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(padded)));
}

// ── Encode ──────────────────────────────────────────────────────────

/** Round to N decimal places. */
function r(n: number, d = 4): number {
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

export interface CurrentMapState {
  eraId: string;
  atlasSimYear: number;
  normandySimYear: number;
  basemapMode: BasemapMode;
  layers: Record<string, boolean>;
  selectedFeatureId: string | null;
  selectionKind: SelectionKind | null;
}

export interface CameraSnapshot {
  lng: number;
  lat: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

/**
 * Build the base64url `view` string from current state + camera.
 * Returns `null` when the state is entirely default (no point sharing).
 */
export function encodeMapView(
  state: CurrentMapState,
  camera: CameraSnapshot | null,
): string | null {
  const payload: ViewPayloadV1 = { v: 1 };

  if (camera) {
    payload.cam = {
      lng: r(camera.lng, 5),
      lat: r(camera.lat, 5),
      z: r(camera.zoom, 2),
    };
    if (Math.abs(camera.bearing) > 0.5) payload.cam.b = r(camera.bearing, 1);
    if (camera.pitch > 0.5) payload.cam.p = r(camera.pitch, 1);
  }

  if (state.atlasSimYear !== 0) payload.ay = state.atlasSimYear;
  if (state.normandySimYear !== 0) payload.ny = state.normandySimYear;
  if (state.basemapMode !== 'dark') payload.base = state.basemapMode;

  const baseline = { ...getDefaultLayerState(), ...getAtlasLayerPreset(state.eraId) };
  const delta: Record<string, boolean> = {};
  let hasDelta = false;
  for (const [id, on] of Object.entries(state.layers)) {
    if (!VALID_LAYER_IDS.has(id)) continue;
    if (on !== (baseline[id] ?? false)) {
      delta[id] = on;
      hasDelta = true;
    }
  }
  if (hasDelta) payload.ly = delta;

  if (state.selectedFeatureId && state.selectionKind) {
    payload.sel = { id: state.selectedFeatureId, kind: state.selectionKind };
  }

  const hasContent = payload.cam || payload.ay || payload.ny || payload.base || payload.ly || payload.sel;
  if (!hasContent) return null;

  return toBase64Url(JSON.stringify(payload));
}

// ── Decode ──────────────────────────────────────────────────────────

/**
 * Parse and validate a `view` query-parameter value.
 * Returns `null` when the payload is missing, malformed, or has wrong version.
 */
export function decodeMapView(encoded: string): ViewPayloadV1 | null {
  try {
    const raw = JSON.parse(fromBase64Url(encoded));
    if (!raw || typeof raw !== 'object' || raw.v !== 1) return null;

    const result: ViewPayloadV1 = { v: 1 };

    if (raw.cam && typeof raw.cam === 'object') {
      const { lng, lat, z, b, p } = raw.cam;
      if (typeof lng === 'number' && typeof lat === 'number' && typeof z === 'number') {
        result.cam = { lng, lat, z };
        if (typeof b === 'number') result.cam.b = b;
        if (typeof p === 'number') result.cam.p = p;
      }
    }

    if (typeof raw.ay === 'number') result.ay = raw.ay;
    if (typeof raw.ny === 'number') result.ny = raw.ny;
    if (typeof raw.base === 'string' && VALID_BASEMAPS.has(raw.base)) {
      result.base = raw.base as BasemapMode;
    }

    if (raw.ly && typeof raw.ly === 'object') {
      const ly: Record<string, boolean> = {};
      let any = false;
      for (const [id, val] of Object.entries(raw.ly)) {
        if (VALID_LAYER_IDS.has(id) && typeof val === 'boolean') {
          ly[id] = val;
          any = true;
        }
      }
      if (any) result.ly = ly;
    }

    if (raw.sel && typeof raw.sel === 'object') {
      const { id, kind } = raw.sel;
      if (typeof id === 'string' && typeof kind === 'string' && VALID_SELECTION_KINDS.has(kind)) {
        result.sel = { id, kind: kind as SelectionKind };
      }
    }

    return result;
  } catch {
    return null;
  }
}

// ── Build a full shareable URL from current app state ───────────────

export function buildCurrentViewShareUrl(): string {
  const s = useMapStore.getState();
  const camera = readMapView();
  const view = encodeMapView(
    {
      eraId: s.eraId,
      atlasSimYear: s.atlasSimYear,
      normandySimYear: s.normandySimYear,
      basemapMode: s.basemapMode,
      layers: s.layers,
      selectedFeatureId: s.selectedFeatureId,
      selectionKind: s.selectionKind,
    },
    camera,
  );
  return buildPublicShareUrl({ era: s.eraId, view: view ?? undefined });
}
