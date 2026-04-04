import type { AtlasLocale } from '@/core/types';
import { DEFAULT_LOCALE } from '@/lib/locale';

/** Non-HttpOnly cookie set by middleware so the layout bootstrap script can seed localStorage on first visit. */
export const NORMAN_GEO_LOCALE_COOKIE = 'norman_geo_locale';

const FR = new Set([
  'FR',
  'BE',
  'LU',
  'MC',
  'RE',
  'GP',
  'MQ',
  'GF',
  'YT',
  'MF',
  'BL',
  'PM',
  'WF',
  'NC',
  'PF',
  'TF',
]);

const ES = new Set([
  'ES',
  'MX',
  'AR',
  'CO',
  'PE',
  'VE',
  'CL',
  'EC',
  'GT',
  'CU',
  'BO',
  'DO',
  'HN',
  'PY',
  'SV',
  'NI',
  'CR',
  'PA',
  'UY',
  'GQ',
]);

const IT = new Set(['IT', 'SM', 'VA']);

/** True when subdivision indicates Quebec (Vercel: `x-vercel-ip-country-region` = QC for CA). */
function isQuebecCanada(country: string | undefined | null, region: string | undefined | null): boolean {
  const c = country?.length === 2 ? country.toUpperCase() : '';
  if (c !== 'CA') return false;
  const r = (region ?? '').trim().toUpperCase();
  if (!r) return false;
  return r === 'QC' || r === 'CA-QC' || r.endsWith('-QC');
}

/**
 * Map visitor country (ISO 3166-1 alpha-2) to a UI locale.
 * Returns fr / es / it / nb / sv / da when the country is mapped; otherwise English.
 */
export function localeFromCountryCode(country: string | undefined | null): AtlasLocale {
  if (!country || country.length !== 2) return DEFAULT_LOCALE;
  const c = country.toUpperCase();
  if (FR.has(c)) return 'fr';
  if (ES.has(c)) return 'es';
  if (IT.has(c)) return 'it';
  if (c === 'NO') return 'nb';
  if (c === 'SE') return 'sv';
  if (c === 'DK') return 'da';
  return DEFAULT_LOCALE;
}

/**
 * Country + optional first-level subdivision (e.g. Vercel `x-vercel-ip-country-region`).
 * Quebec (CA + QC) → French; rest of Canada → English unless another rule applies.
 */
export function localeFromGeo(
  country: string | undefined | null,
  region: string | undefined | null,
): AtlasLocale {
  if (isQuebecCanada(country, region)) return 'fr';
  return localeFromCountryCode(country);
}

/** Locale we persist on the geo cookie when it matches a suggested UI language. */
export function geoCookieLocaleValue(
  country: string | undefined | null,
  region?: string | undefined | null,
): 'fr' | 'es' | 'it' | 'nb' | 'sv' | 'da' | null {
  const loc = localeFromGeo(country, region ?? null);
  if (loc === 'fr' || loc === 'es' || loc === 'it' || loc === 'nb' || loc === 'sv' || loc === 'da') return loc;
  return null;
}
