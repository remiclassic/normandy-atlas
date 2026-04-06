import type { Feature, FeatureCollection, Point } from 'geojson';
import { getPlaceCoords, searchAtlasPlaces } from '@/core/places/engine';
import type { FamilyTreePerson } from '@/core/ancestry/types';

const PIN_COLORS = {
  birth: '#6ee7b7',
  death: '#fca5a5',
  other: '#c4a574',
} as const;

function pointFeature(
  personId: string,
  kind: 'birth' | 'death',
  coords: [number, number],
  name: string,
): Feature<Point> {
  return {
    type: 'Feature',
    id: `${personId}:${kind}`,
    geometry: { type: 'Point', coordinates: coords },
    properties: {
      id: `${personId}:${kind}`,
      personId,
      pinKind: kind,
      name,
      label: kind === 'birth' ? `${name} · b.` : `${name} · d.`,
      color: kind === 'birth' ? PIN_COLORS.birth : PIN_COLORS.death,
    },
  };
}

export function buildUserAncestryPinsGeoJson(
  people: Record<string, FamilyTreePerson>,
): FeatureCollection {
  const features: Feature[] = [];
  for (const p of Object.values(people)) {
    if (p.birthPlaceId) {
      const c = getPlaceCoords(p.birthPlaceId);
      if (c) features.push(pointFeature(p.id, 'birth', c, p.name));
    }
    if (p.deathPlaceId && p.deathPlaceId !== p.birthPlaceId) {
      const c = getPlaceCoords(p.deathPlaceId);
      if (c) features.push(pointFeature(p.id, 'death', c, p.name));
    }
  }
  return { type: 'FeatureCollection', features };
}

/** Suggest atlas place from freeform (label / id substring match). */
export function suggestAtlasPlaceForFreeform(freeform: string, limit = 8) {
  return searchAtlasPlaces(freeform, limit);
}