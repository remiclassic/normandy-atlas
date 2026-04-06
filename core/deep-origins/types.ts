import type { I18nString } from '@/core/types';

/** Blair–style ancient components shown in the deep-origins explorer (not a DNA test). */
export type DeepOriginComponentId =
  | 'hunter_gatherer'
  | 'early_farmer'
  | 'metal_age'
  | 'non_european'
  | 'archaeology';

export type DeepOriginIconKey = 'bow' | 'wheat' | 'anvil' | 'globe' | 'shovel';

export interface DeepOriginCategoryDef {
  id: DeepOriginComponentId;
  label: I18nString;
  shortLabel: I18nString;
  accentColor: string;
  icon: DeepOriginIconKey;
  /** Optional hero under `/public` (e.g. `/deep-origins/hunter-gatherer-hero.png`) */
  heroImage?: string;
  /** Illustrative percentage when no user blend is saved */
  demoPercent: number;
  body: I18nString[];
  /** Show migrations for this category on the map */
  showMigrations: boolean;
  /** Narrative-only category (e.g. non-European framing) */
  mapLinked: boolean;
}

export interface DeepOriginSiteDef {
  id: string;
  lng: number;
  lat: number;
  name: string;
  country: I18nString;
  /** Years before present (approx.); used for timeline filter */
  approxYearBP: number;
  categoryIds: DeepOriginComponentId[];
  blurb: I18nString;
  href?: string;
}

export interface DeepOriginMigrationDef {
  id: string;
  categoryId: Exclude<DeepOriginComponentId, 'non_european' | 'archaeology'>;
  /** [lng, lat] vertices */
  coordinates: [number, number][];
  minYearBP: number;
  maxYearBP: number;
}
