import type { StoryCategory } from '@/data/atlas/story-library-meta';

/** Paths under `public/story/`; same form as `meta.thumb` (leading slash). */
const PATH = {
  atlanticCrossing: '/story/age-of-exploration/atlantic-crossing-16th-century.jpg',
  dieppe: '/story/age-of-exploration/dieppe-port.jpg',
  gaspe: '/story/age-of-exploration/gaspe-point-newport.jpg',
  honfleur: '/story/age-of-exploration/honfleur-port.jpg',
  havre: '/story/age-of-exploration/le-havre-bassin-manche.jpg',
  crusade: '/story/norman-expansion/crusade-jerusalem-1099.jpg',
  cyprus: '/story/norman-expansion/richard-cyprus-limassol-1191.jpg',
  portRoyal: '/story/new-france-foundations/port-royal-habitation.jpg',
  saintMalo: '/story/new-france-foundations/saint-malo-historical-engraving.png',
  vikingLongship: '/story/viking-age/oseberg-ship-viking-longship.jpg',
  bayeuxFleet: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
  wolfeQuebec: '/story/atlantic-imprint/benjamin-west-death-of-general-wolfe.jpg',
} as const;

const DEFAULT_LAST_RESORT = PATH.atlanticCrossing;

/** Every path this module may assign as a thematic fallback (for credit suppression). */
const THEMATIC_FALLBACK_PATHS = new Set<string>([
  PATH.atlanticCrossing,
  PATH.dieppe,
  PATH.gaspe,
  PATH.honfleur,
  PATH.havre,
  PATH.crusade,
  PATH.cyprus,
  PATH.portRoyal,
  PATH.saintMalo,
  PATH.vikingLongship,
  PATH.bayeuxFleet,
  PATH.wolfeQuebec,
]);

const ERA_POSTER: Record<string, string> = {
  'neolithic-normandy': PATH.honfleur,
  'bronze-age-channel': PATH.honfleur,
  'iron-age-gaul': PATH.saintMalo,
  'roman-gaul': PATH.saintMalo,
  'post-roman-gaul': PATH.saintMalo,
  neustria: PATH.honfleur,
  'frankish-carolingian': PATH.saintMalo,
  'viking-age': PATH.vikingLongship,
  'norman-origins': PATH.honfleur,
  'norman-expansion': PATH.crusade,
  'age-of-exploration': PATH.dieppe,
  'new-france-foundations': PATH.portRoyal,
  'royal-new-france': PATH.portRoyal,
  'atlantic-imprint': PATH.wolfeQuebec,
};

const CATEGORY_POSTER: Record<StoryCategory, string> = {
  Origins: PATH.honfleur,
  Conquest: PATH.bayeuxFleet,
  Expansion: PATH.cyprus,
  Exploration: PATH.havre,
  'New France': PATH.portRoyal,
  People: PATH.honfleur,
  Legacy: PATH.atlanticCrossing,
};

export function isThematicFallbackPoster(resolvedSrc: string | null): boolean {
  if (!resolvedSrc) return false;
  return THEMATIC_FALLBACK_PATHS.has(resolvedSrc);
}

export function fallbackPosterForAtlasEraId(eraId: string | undefined | null): string | null {
  if (!eraId) return null;
  return ERA_POSTER[eraId] ?? DEFAULT_LAST_RESORT;
}

export function fallbackPosterForCategory(category: StoryCategory): string | null {
  return CATEGORY_POSTER[category] ?? DEFAULT_LAST_RESORT;
}
