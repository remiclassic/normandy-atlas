import { getPlaceCoords } from '@/core/places/engine';
import { isValidAtlasEra } from '@/core/era/engine';
import type { UiStringKey } from '@/lib/ui-strings';

export type NormanIdentityMapBeat = {
  /** i18n body: normanIdentity.storyBeat.{storyKey} */
  storyKey: 'celtic' | 'roman' | 'frankish' | 'viking' | 'norman';
  eraId: string;
  placeId: string;
  zoom: number;
  durationMs: number;
};

function assertEra(id: string): string {
  if (!isValidAtlasEra(id)) {
    throw new Error(`norman-identity-story-beats: invalid eraId ${id}`);
  }
  return id;
}

/**
 * Five map-synced beats aligned with atlas places and eras.
 * Bodies are localized via ui-strings (`normanIdentity.storyBeat.*`).
 */
export const NORMAN_IDENTITY_MAP_BEATS: NormanIdentityMapBeat[] = [
  {
    storyKey: 'celtic',
    eraId: assertEra('iron-age-gaul'),
    placeId: 'rouen',
    zoom: 6.2,
    durationMs: 2200,
  },
  {
    storyKey: 'roman',
    eraId: assertEra('roman-gaul'),
    placeId: 'paris',
    zoom: 6.4,
    durationMs: 2200,
  },
  {
    storyKey: 'frankish',
    eraId: assertEra('neustria'),
    placeId: 'paris',
    zoom: 5.9,
    durationMs: 2400,
  },
  {
    storyKey: 'viking',
    eraId: assertEra('viking-age'),
    placeId: 'seine-estuary',
    zoom: 6.8,
    durationMs: 2600,
  },
  {
    storyKey: 'norman',
    eraId: assertEra('norman-origins'),
    placeId: 'rouen',
    zoom: 6.5,
    durationMs: 2600,
  },
];

export function uiKeyForStoryBeat(storyKey: NormanIdentityMapBeat['storyKey']): UiStringKey {
  return `normanIdentity.storyBeat.${storyKey}` as UiStringKey;
}

export function resolveBeatCenter(beat: NormanIdentityMapBeat): [number, number] {
  const c = getPlaceCoords(beat.placeId);
  if (!c) {
    throw new Error(`norman-identity-story-beats: missing coords for ${beat.placeId}`);
  }
  return c;
}
