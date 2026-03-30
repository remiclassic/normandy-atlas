// Finite set of atlas point-of-interest icon types.
// Every map marker and timeline summary badge maps to exactly one of these.

export type AtlasIconId =
  | 'settlement'
  | 'city'
  | 'fortress'
  | 'religious'
  | 'battle'
  | 'port'
  | 'trade'
  | 'burial'
  | 'megalith'
  | 'palace'
  | 'expedition'
  | 'person'
  | 'artifact'
  | 'militaryCamp'
  | 'cultural'
  | 'hillfort'
  | 'generic';

export const ALL_ATLAS_ICON_IDS: readonly AtlasIconId[] = [
  'city',
  'settlement',
  'fortress',
  'religious',
  'battle',
  'port',
  'trade',
  'burial',
  'megalith',
  'palace',
  'expedition',
  'person',
  'artifact',
  'militaryCamp',
  'cultural',
  'hillfort',
  'generic',
] as const;

/** MapLibre image name for a given icon + theme. */
export function atlasIconImageName(id: AtlasIconId, theme: 'dark' | 'parchment' = 'dark'): string {
  return `atlas-icon-${id}-${theme}`;
}
