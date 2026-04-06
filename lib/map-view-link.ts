/**
 * Shareable map-view URL encoding / decoding.
 *
 * Packs the current view (camera, era, timeline year, basemap, layer delta,
 * optional selection) into a compact base64url query parameter.
 */

import { layerConfigs, getDefaultLayerState, getAtlasLayerPreset } from '@/data/layers';
import type { SelectionKind } from '@/types';
import type { BasemapMode } from '@/lib/store';
import type { HistoricalPresenceView } from '@/core/types';
import { buildPublicShareUrl } from '@/lib/progress/share';
import { readMapView } from '@/lib/map-view-reader';
import { useMapStore } from '@/lib/store';

// ── Payload shape (v1) ──────────────────────────────────────────────

/** Historical peoples (macro) slice for share URLs — years clamped 500–1100 CE. */
export interface ViewPayloadHistoricalPresence {
  y: number;
  v: HistoricalPresenceView;
  ce?: boolean;
  cy?: number;
}

export interface ViewPayloadV1 {
  v: 1;
  cam?: { lng: number; lat: number; z: number; b?: number; p?: number };
  ay?: number;
  ny?: number;
  base?: BasemapMode;
  /** Layer ids whose state differs from the era baseline. */
  ly?: Record<string, boolean>;
  sel?: { id: string; kind: SelectionKind };
  hp?: ViewPayloadHistoricalPresence;
}

// ── Validation sets ─────────────────────────────────────────────────

const VALID_LAYER_IDS = new Set(layerConfigs.map((c) => c.id));

const VALID_SELECTION_KINDS: ReadonlySet<string> = new Set<SelectionKind>([
  'region', 'settlement', 'evidence', 'norman-site', 'era-info',
  'prehistoric-site', 'atlas-person', 'atlas-route', 'atlas-journey',
  'nf-ydna-lineage', 'nf-mtdna-lineage', 'viking-adna-site', 'viking-archaeology-site',
  'atlas-timeline-marker', 'historical-macro-region', 'user-ancestry-pin',
]);

const VALID_BASEMAPS: ReadonlySet<string> = new Set(['dark', 'parchment']);

const VALID_HP_VIEWS: ReadonlySet<string> = new Set<HistoricalPresenceView>(['peoples', 'polities', 'legacy']);

function clampHpYear(y: number): number {
  return Math.max(500, Math.min(1100, Math.round(y)));
}

const HP_DEFAULT_YEAR = 800;
const HP_DEFAULT_VIEW: HistoricalPresenceView = 'peoples';
const HP_DEFAULT_COMPARE_YEAR = 1000;

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

/**
 * Compact `view` query value with camera only (e.g. Norman readings without a map pin).
 */
export function encodeReadingMapViewCam(center: [number, number], zoom: number): string {
  const payload: ViewPayloadV1 = {
    v: 1,
    cam: { lng: r(center[0], 5), lat: r(center[1], 5), z: r(zoom, 2) },
  };
  return toBase64Url(JSON.stringify(payload));
}

export interface CurrentMapState {
  eraId: string;
  atlasSimYear: number;
  normandySimYear: number;
  basemapMode: BasemapMode;
  layers: Record<string, boolean>;
  selectedFeatureId: string | null;
  selectionKind: SelectionKind | null;
  historicalPresenceYear: number;
  historicalPresenceView: HistoricalPresenceView;
  historicalPresenceCompareEnabled: boolean;
  historicalPresenceCompareYear: number;
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

  const macroOn = state.layers['historical-presence'] ?? false;
  const hpDiffersFromDefaults =
    state.historicalPresenceYear !== HP_DEFAULT_YEAR ||
    state.historicalPresenceView !== HP_DEFAULT_VIEW ||
    state.historicalPresenceCompareEnabled ||
    state.historicalPresenceCompareYear !== HP_DEFAULT_COMPARE_YEAR;

  if (macroOn || hpDiffersFromDefaults) {
    const y = clampHpYear(state.historicalPresenceYear);
    const v = VALID_HP_VIEWS.has(state.historicalPresenceView)
      ? state.historicalPresenceView
      : HP_DEFAULT_VIEW;
    payload.hp = {
      y,
      v,
      ...(state.historicalPresenceCompareEnabled
        ? { ce: true, cy: clampHpYear(state.historicalPresenceCompareYear) }
        : {}),
    };
  }

  const hasContent =
    payload.cam || payload.ay || payload.ny || payload.base || payload.ly || payload.sel || payload.hp;
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

    if (raw.hp && typeof raw.hp === 'object') {
      const h = raw.hp as Record<string, unknown>;
      const y = typeof h.y === 'number' ? clampHpYear(h.y) : HP_DEFAULT_YEAR;
      const vRaw = typeof h.v === 'string' ? h.v : HP_DEFAULT_VIEW;
      const v = VALID_HP_VIEWS.has(vRaw) ? (vRaw as HistoricalPresenceView) : HP_DEFAULT_VIEW;
      const ce = h.ce === true;
      let cy = typeof h.cy === 'number' ? clampHpYear(h.cy) : HP_DEFAULT_COMPARE_YEAR;
      if (ce && cy === y) cy = Math.min(1100, y + 100);
      result.hp = { y, v, ...(ce ? { ce: true, cy } : {}) };
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
      historicalPresenceYear: s.historicalPresenceYear,
      historicalPresenceView: s.historicalPresenceView,
      historicalPresenceCompareEnabled: s.historicalPresenceCompareEnabled,
      historicalPresenceCompareYear: s.historicalPresenceCompareYear,
    },
    camera,
  );
  return buildPublicShareUrl({ era: s.eraId, view: view ?? undefined });
}

/**
 * Optional `macro=1`, `hpY`, `hpV`, `hpCompare`, `hpCY` query params (editorial / hub links).
 */
export function parseHistoricalPresenceSearchParams(
  params: URLSearchParams,
): ViewPayloadHistoricalPresence | null {
  if (params.get('macro') !== '1' && !params.has('hpY') && !params.has('hpV')) return null;
  const yRaw = Number(params.get('hpY'));
  const y = Number.isFinite(yRaw) ? clampHpYear(yRaw) : HP_DEFAULT_YEAR;
  const vRaw = params.get('hpV') ?? HP_DEFAULT_VIEW;
  const v = VALID_HP_VIEWS.has(vRaw) ? (vRaw as HistoricalPresenceView) : HP_DEFAULT_VIEW;
  const ce = params.get('hpCompare') === '1';
  const cyRaw = Number(params.get('hpCY'));
  let cy = Number.isFinite(cyRaw) ? clampHpYear(cyRaw) : HP_DEFAULT_COMPARE_YEAR;
  if (ce && cy === y) cy = Math.min(1100, y + 100);
  return { y, v, ...(ce ? { ce: true, cy } : {}) };
}
