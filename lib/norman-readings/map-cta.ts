import { buildMapHref } from '@/lib/map-deep-link';
import { encodeReadingMapViewCam } from '@/lib/map-view-link';

import type { NormanReadingEntry } from './types';

/** Deep link back to the map for a reading entry (node + era, or era + optional camera). */
export function buildNormanReadingMapHref(entry: NormanReadingEntry): string | null {
  if (entry.linkedNodeId) {
    return buildMapHref({
      normanSite: entry.linkedNodeId,
      era: entry.defaultEraId ?? 'norman-expansion',
    });
  }
  if (entry.defaultEraId) {
    const view = entry.mapFocus
      ? encodeReadingMapViewCam(entry.mapFocus.center, entry.mapFocus.zoom)
      : undefined;
    return buildMapHref({ era: entry.defaultEraId, ...(view ? { view } : {}) });
  }
  return null;
}
