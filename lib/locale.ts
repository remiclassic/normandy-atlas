import type { AtlasLocale, I18nString } from '@/core/types';

export const ALL_LOCALES: AtlasLocale[] = ['en', 'fr', 'es', 'it', 'de', 'pt', 'da', 'nb', 'sv', 'nl'];

/** Locales exposed in the UI switcher — expand as phases ship. */
export const ENABLED_UI_LOCALES: AtlasLocale[] = ['en', 'fr', 'es', 'it', 'de', 'da', 'nb', 'sv'];

export const DEFAULT_LOCALE: AtlasLocale = 'en';
export const LOCALE_STORAGE_KEY = 'norman-atlas-locale';

const LOCALE_SET = new Set<string>(ALL_LOCALES);

export function isAtlasLocale(v: unknown): v is AtlasLocale {
  return typeof v === 'string' && LOCALE_SET.has(v);
}

export function readStoredLocale(): AtlasLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw && isAtlasLocale(raw)) return raw;
  } catch { /* SSR / quota */ }
  return DEFAULT_LOCALE;
}

export function persistLocale(locale: AtlasLocale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch { /* quota */ }
}

/**
 * Resolve a localised string. Uses the requested locale when present, otherwise
 * falls back to English. (We do not fall back to French for Spanish or other
 * locales — that made “Español” show French text everywhere `es` was missing.)
 */
export function pickI18n(str: I18nString, locale: AtlasLocale): string {
  const direct = str[locale];
  if (direct) return direct;
  return str.en;
}

/** Human-readable native label for each locale. */
export const LOCALE_LABELS: Record<AtlasLocale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  de: 'Deutsch',
  pt: 'Português',
  da: 'Dansk',
  nb: 'Norsk (bokmål)',
  sv: 'Svenska',
  nl: 'Nederlands',
};
