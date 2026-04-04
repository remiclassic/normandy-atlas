export type UiTheme = 'dark' | 'light';

/** User preference: explicit light/dark or auto (system + optional ambient boost). */
export type UiThemeMode = 'dark' | 'light' | 'auto';

export const DEFAULT_UI_THEME: UiTheme = 'dark';
export const DEFAULT_UI_THEME_MODE: UiThemeMode = 'dark';
export const UI_THEME_STORAGE_KEY = 'norman-atlas-ui-theme';

/** Bright enough (lux) to switch from dark→light when OS is dark. */
export const AMBIENT_LUX_ON = 220;
/** Dim enough to switch from light→dark (must be < AMBIENT_LUX_ON). */
export const AMBIENT_LUX_OFF = 90;

export function isUiTheme(v: unknown): v is UiTheme {
  return v === 'dark' || v === 'light';
}

export function isUiThemeMode(v: unknown): v is UiThemeMode {
  return v === 'dark' || v === 'light' || v === 'auto';
}

/** Client only: sync `prefers-color-scheme` baseline. */
export function getSystemPrefersLight(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  } catch {
    return false;
  }
}

/**
 * Resolved theme without ambient sensor (blocking script, SSR-safe store init, hydration).
 * Auto ⇒ follows system light/dark only.
 */
export function resolveAppliedUiTheme(mode: UiThemeMode, systemPrefersLight: boolean): UiTheme {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';
  return systemPrefersLight ? 'light' : 'dark';
}

/**
 * Auto mode + system dark + trusted lux readings. Hysteresis between AMBIENT_LUX_OFF and AMBIENT_LUX_ON.
 * Call only when `mode === 'auto'` and `!systemPrefersLight`. System light is handled upstream (always light).
 */
export function resolveAutoThemeWithAmbient(
  lux: number,
  ambientTrusted: boolean,
  previousResolved: UiTheme,
): UiTheme {
  if (!ambientTrusted || !Number.isFinite(lux)) return 'dark';

  if (previousResolved === 'dark') {
    if (lux > AMBIENT_LUX_ON) return 'light';
    return 'dark';
  }
  // previous light while OS dark → sensor-boosted
  if (lux < AMBIENT_LUX_OFF) return 'dark';
  return 'light';
}

export function readStoredUiThemeMode(): UiThemeMode {
  if (typeof window === 'undefined') return DEFAULT_UI_THEME_MODE;
  try {
    const raw = localStorage.getItem(UI_THEME_STORAGE_KEY);
    if (raw && isUiThemeMode(raw)) return raw;
  } catch {
    /* SSR / quota */
  }
  return DEFAULT_UI_THEME_MODE;
}

export function persistUiThemeMode(mode: UiThemeMode): void {
  try {
    localStorage.setItem(UI_THEME_STORAGE_KEY, mode);
  } catch {
    /* quota */
  }
}

/** Sync `<html data-ui-theme>` for CSS variables (call on client only). Always the resolved palette. */
export function applyUiThemeToDocument(theme: UiTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.uiTheme = theme;
}
