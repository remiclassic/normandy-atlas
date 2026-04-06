import type { DeepOriginMigrationDef } from '@/core/deep-origins/types';

/** Schematic Bézier-like polylines for teaching — not GPS trajectories. */
export const DEEP_ORIGIN_MIGRATIONS: DeepOriginMigrationDef[] = [
  {
    id: 'hg-main-north',
    categoryId: 'hunter_gatherer',
    minYearBP: 35_000,
    maxYearBP: 42_000,
    coordinates: [
      [31.2, 26.4],
      [34.8, 32.2],
      [36.5, 37.5],
      [28.5, 41.2],
      [19.2, 48.5],
      [13.4, 52.4],
    ],
  },
  {
    id: 'hg-branch-france',
    categoryId: 'hunter_gatherer',
    minYearBP: 35_000,
    maxYearBP: 42_000,
    coordinates: [
      [19.2, 48.5],
      [8.2, 46.8],
      [2.3, 46.2],
    ],
  },
  {
    id: 'hg-branch-iberia',
    categoryId: 'hunter_gatherer',
    minYearBP: 35_000,
    maxYearBP: 42_000,
    coordinates: [
      [19.2, 48.5],
      [1.5, 43.2],
      [-3.7, 42.8],
    ],
  },
  {
    id: 'farmer-anatolia',
    categoryId: 'early_farmer',
    minYearBP: 8000,
    maxYearBP: 9500,
    coordinates: [
      [39.8, 37.2],
      [30.5, 39.5],
      [24.2, 42.8],
      [19.2, 47.5],
    ],
  },
  {
    id: 'farmer-carpathian',
    categoryId: 'early_farmer',
    minYearBP: 7500,
    maxYearBP: 9000,
    coordinates: [
      [39.8, 37.2],
      [32.5, 45.2],
      [19.2, 47.5],
    ],
  },
  {
    id: 'metal-steppe-northwest',
    categoryId: 'metal_age',
    minYearBP: 4500,
    maxYearBP: 5200,
    coordinates: [
      [44.5, 42.6],
      [35.2, 46.2],
      [24.5, 50.2],
      [14.2, 51.4],
    ],
  },
  {
    id: 'metal-steppe-balkans',
    categoryId: 'metal_age',
    minYearBP: 4500,
    maxYearBP: 5200,
    coordinates: [
      [44.5, 42.6],
      [29.2, 45.5],
      [24.8, 44.5],
    ],
  },
];
