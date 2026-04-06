import { buildMapHref } from '@/lib/map-deep-link';

import type { NormanReadingEntry } from './types';

/** Deep link back to the map for a reading entry (node + era, or era only). */
export function buildNormanReadingMapHref(entry: NormanReadingEntry): string | null {
  if (entry.linkedNodeId) {
    return buildMapHref({
      normanSite: entry.linkedNodeId,
      era: entry.defaultEraId ?? 'norman-expansion',
    });
  }
  if (entry.defaultEraId) {
    return buildMapHref({ era: entry.defaultEraId });
  }
  return null;
}
