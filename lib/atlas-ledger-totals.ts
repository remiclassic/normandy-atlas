import { atlasPlaces } from '@/data/atlas/places';
import { atlasRegions } from '@/data/atlas/regions';
import { atlasJourneys } from '@/data/atlas/journeys';
import { atlasRouteSegments } from '@/data/atlas/route-segments';
import { atlasEras } from '@/data/atlas/eras';
import { storyLibraryMetaList } from '@/data/atlas/story-library-meta';

/** Fixed denominators for Atlas Ledger “coverage” rows (explorable catalog sizes). */
export const LEDGER_COVERAGE_TOTALS = {
  places: atlasPlaces.length,
  regions: atlasRegions.length,
  journeys: atlasJourneys.length,
  segments: atlasRouteSegments.length,
  eras: atlasEras.length,
  /** One library card per completable story path (includes full chronicle). */
  stories: storyLibraryMetaList.length,
} as const;

export type LedgerCoverageTotals = typeof LEDGER_COVERAGE_TOTALS;
