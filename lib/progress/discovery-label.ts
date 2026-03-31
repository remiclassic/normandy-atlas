import type { AtlasEventType } from './schema';
import type { AtlasLocale } from '@/core/types';
import { getPlace, getAtlasRegion, getJourney, getSegment } from '@/core';
import { pickI18n } from '@/lib/locale';

// ---------------------------------------------------------------------------
// Human-readable discovery labels resolved from entity IDs + core data.
// ---------------------------------------------------------------------------

function bestPlaceLabel(placeId: string): string | undefined {
  const place = getPlace(placeId);
  if (!place) return undefined;
  const states = Object.values(place.eraStates);
  for (const s of states) {
    if (s.label) return s.label;
  }
  return undefined;
}

export function resolveEntityLabel(type: AtlasEventType, id: string, locale: AtlasLocale): string {
  switch (type) {
    case 'place_open': {
      const label = bestPlaceLabel(id);
      if (label) return label;
      break;
    }
    case 'region_open': {
      const region = getAtlasRegion(id);
      if (region) return pickI18n(region.name, locale);
      break;
    }
    case 'journey_open': {
      const journey = getJourney(id);
      if (journey) return pickI18n(journey.name, locale);
      break;
    }
    case 'segment_open': {
      const segment = getSegment(id);
      if (segment) {
        const from = bestPlaceLabel(segment.fromPlaceId);
        const to = bestPlaceLabel(segment.toPlaceId);
        if (from && to) return `${from} → ${to}`;
      }
      break;
    }
  }
  return id.replace(/^(seg-|journey-|region-)/, '').replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}
