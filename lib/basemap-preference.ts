import { AMBIENT_LUX_OFF, AMBIENT_LUX_ON } from '@/lib/ui-theme';

/** Effective map base style. */
export type BasemapMode = 'dark' | 'parchment';

/** User preference including auto (system + optional ambient boost to manuscript style). */
export type BasemapModePreference = 'dark' | 'parchment' | 'auto';

export const DEFAULT_BASEMAP_MODE: BasemapMode = 'dark';
export const DEFAULT_BASEMAP_MODE_PREFERENCE: BasemapModePreference = 'dark';
export const BASEMAP_MODE_STORAGE_KEY = 'norman-atlas-basemap-mode';

export function isBasemapMode(v: unknown): v is BasemapMode {
  return v === 'dark' || v === 'parchment';
}

export function isBasemapModePreference(v: unknown): v is BasemapModePreference {
  return v === 'dark' || v === 'parchment' || v === 'auto';
}

/**
 * Resolve stored preference without ambient sensor.
 * Auto: system light → manuscript (parchment); system dark → cartographic dark.
 */
export function resolveAppliedBasemap(
  preference: BasemapModePreference,
  systemPrefersLight: boolean,
): BasemapMode {
  if (preference === 'parchment') return 'parchment';
  if (preference === 'dark') return 'dark';
  return systemPrefersLight ? 'parchment' : 'dark';
}

/**
 * Auto + system dark + lux. Boost to parchment in bright light with hysteresis.
 */
export function resolveAutoBasemapWithAmbient(
  lux: number,
  ambientTrusted: boolean,
  previousResolved: BasemapMode,
): BasemapMode {
  if (!ambientTrusted || !Number.isFinite(lux)) return 'dark';

  if (previousResolved === 'dark') {
    if (lux > AMBIENT_LUX_ON) return 'parchment';
    return 'dark';
  }
  if (lux < AMBIENT_LUX_OFF) return 'dark';
  return 'parchment';
}

export function readStoredBasemapModePreference(): BasemapModePreference {
  if (typeof window === 'undefined') return DEFAULT_BASEMAP_MODE_PREFERENCE;
  try {
    const raw = localStorage.getItem(BASEMAP_MODE_STORAGE_KEY);
    if (raw && isBasemapModePreference(raw)) return raw;
  } catch {
    /* SSR / quota */
  }
  return DEFAULT_BASEMAP_MODE_PREFERENCE;
}

export function persistBasemapModePreference(preference: BasemapModePreference): void {
  try {
    localStorage.setItem(BASEMAP_MODE_STORAGE_KEY, preference);
  } catch {
    /* quota */
  }
}
