import type { AtlasLocale } from '@/core/types';
import type { NormanOverviewBundle } from './types';
import { bundle as en } from './bundles/en';
import { bundle as fr } from './bundles/fr';
import { bundle as es } from './bundles/es';
import { bundle as it } from './bundles/it';
import { bundle as de } from './bundles/de';
import { bundle as pt } from './bundles/pt';
import { bundle as da } from './bundles/da';
import { bundle as nb } from './bundles/nb';
import { bundle as sv } from './bundles/sv';
import { bundle as nl } from './bundles/nl';

export type { NormanOverviewBundle, NormanOverviewSection } from './types';

const BY_LOCALE: Record<AtlasLocale, NormanOverviewBundle> = {
  en,
  fr,
  es,
  it,
  de,
  pt,
  da,
  nb,
  sv,
  nl,
};

export function getNormanOverviewForLocale(locale: AtlasLocale): NormanOverviewBundle {
  return BY_LOCALE[locale] ?? en;
}
