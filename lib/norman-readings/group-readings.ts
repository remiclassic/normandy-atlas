import type { NormanReadingEntry } from './types';

/** Hub essays (no map pin) vs place-tied readings, sorted by title within places. */
export function splitNormanReadingsForNav(readings: NormanReadingEntry[]): {
  thematic: NormanReadingEntry[];
  places: NormanReadingEntry[];
} {
  const thematic = readings.filter((r) => !r.linkedNodeId);
  const places = [...readings.filter((r) => r.linkedNodeId)].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }),
  );
  return { thematic, places };
}
