import { atlasPlaces } from '@/data/atlas/places';
import type { Place, PlaceEraState, PlaceWithState } from '@/core/types';
import { getFeatureIconType } from '@/lib/atlas/getFeatureIconType';

const placeMap = new Map<string, Place>(atlasPlaces.map((p) => [p.id, p]));

/** Search atlas settlements by id or any era label (case-insensitive substring). */
export function searchAtlasPlaces(query: string, limit = 24): Place[] {
  const q = query.trim().toLowerCase();
  if (!q) return atlasPlaces.slice(0, limit);
  const out: Place[] = [];
  for (const p of atlasPlaces) {
    if (p.id.toLowerCase().includes(q)) {
      out.push(p);
      if (out.length >= limit) break;
      continue;
    }
    let hit = false;
    for (const st of Object.values(p.eraStates)) {
      if (st.label.toLowerCase().includes(q)) {
        hit = true;
        break;
      }
    }
    if (hit) {
      out.push(p);
      if (out.length >= limit) break;
    }
  }
  return out;
}

export function getPlace(placeId: string): Place | undefined {
  return placeMap.get(placeId);
}

export function getPlaceCoords(placeId: string): [number, number] | undefined {
  return placeMap.get(placeId)?.coordinates;
}

export function getPlaceEraState(placeId: string, eraId: string): PlaceEraState | undefined {
  return placeMap.get(placeId)?.eraStates[eraId];
}

export function getVisiblePlaces(eraId: string): PlaceWithState[] {
  const results: PlaceWithState[] = [];
  for (const place of atlasPlaces) {
    const state = place.eraStates[eraId];
    if (state && state.visibility !== 'hidden') {
      results.push({ ...place, currentState: state });
    }
  }
  return results;
}

export function getPlacesForRegion(regionId: string, eraId: string): PlaceWithState[] {
  const results: PlaceWithState[] = [];
  for (const place of atlasPlaces) {
    if (place.regionId !== regionId) continue;
    const state = place.eraStates[eraId];
    if (state && state.visibility !== 'hidden') {
      results.push({ ...place, currentState: state });
    }
  }
  return results;
}

export function getPlacesByLayer(layer: string, eraId: string): PlaceWithState[] {
  const results: PlaceWithState[] = [];
  for (const place of atlasPlaces) {
    if (place.layer !== layer) continue;
    const state = place.eraStates[eraId];
    if (state && state.visibility !== 'hidden') {
      results.push({ ...place, currentState: state });
    }
  }
  return results;
}

export function buildPlacesGeoJson(places: PlaceWithState[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: places
      .filter((p) => p.coordinates)
      .map((p) => ({
        type: 'Feature' as const,
        properties: {
          id: p.id,
          name: p.currentState.label,
          kind: p.kind,
          regionId: p.regionId,
          layer: p.layer,
          visibility: p.currentState.visibility,
          pedagogyIndex: p.currentState.pedagogyIndex,
          atlasIcon: getFeatureIconType({
            kind: p.kind,
            tags: p.currentState.affiliationTags,
            label: p.currentState.label,
          }),
        },
        geometry: {
          type: 'Point' as const,
          coordinates: p.coordinates!,
        },
      })),
  };
}
