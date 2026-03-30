import { atlasPeople } from '@/data/atlas/people';
import { getAtlasEra } from '@/core/era/engine';
import { getPlace } from '@/core/places/engine';
import type { Person } from '@/core/types';

const personMap = new Map<string, Person>(atlasPeople.map((p) => [p.id, p]));

export function getPerson(id: string): Person | undefined {
  return personMap.get(id);
}

export function getPeopleForEra(eraId: string): Person[] {
  const era = getAtlasEra(eraId);
  if (!era) return [];

  const results: Person[] = [];
  for (const person of atlasPeople) {
    if (person.relevantEraIds?.length) {
      if (person.relevantEraIds.includes(eraId)) results.push(person);
    } else if (person.birthYear < era.range.end && person.deathYear > era.range.start) {
      results.push(person);
    }
  }
  return results;
}

export function getPeopleForPlace(placeId: string, eraId: string): Person[] {
  const eraPeople = getPeopleForEra(eraId);
  return eraPeople.filter(
    (p) => p.originPlaceId === placeId || p.destinationPlaceIds.includes(placeId),
  );
}

function placeInRegion(placeId: string, regionId: string): boolean {
  return getPlace(placeId)?.regionId === regionId;
}

export function getPeopleForRegion(regionId: string, eraId: string): Person[] {
  const eraPeople = getPeopleForEra(eraId);
  return eraPeople.filter(
    (p) =>
      placeInRegion(p.originPlaceId, regionId) ||
      p.destinationPlaceIds.some((d) => placeInRegion(d, regionId)),
  );
}
