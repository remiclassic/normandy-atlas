export type UiTheme = 'dark' | 'light';

export const DEFAULT_UI_THEME: UiTheme = 'dark';
export const UI_THEME_STORAGE_KEY = 'norman-atlas-ui-theme';

export function isUiTheme(v: unknown): v is UiTheme {
  return v === 'dark' || v === 'light';
}

export function readStoredUiTheme(): UiTheme {
  if (typeof window === 'undefined') return DEFAULT_UI_THEME;
  try {
    const raw = localStorage.getItem(UI_THEME_STORAGE_KEY);
    if (raw && isUiTheme(raw)) return raw;
  } catch {
    /* SSR / quota */
  }
  return DEFAULT_UI_THEME;
}

export function persistUiTheme(theme: UiTheme): void {
  try {
    localStorage.setItem(UI_THEME_STORAGE_KEY, theme);
  } catch {
    /* quota */
  }
}

/** Sync `<html data-ui-theme>` for CSS variables (call on client only). */
export function applyUiThemeToDocument(theme: UiTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.uiTheme = theme;
}
