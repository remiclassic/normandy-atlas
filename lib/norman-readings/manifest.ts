import type { NormanReadingEntry } from './types';
import { PLACE_READING_ENTRIES } from './catalog.generated';

export type { NormanReadingEntry } from './types';

/** Thematic hubs, bibliography, Rouen essay, then all place-tied readings (see catalog.generated.ts). */
const CORE_READINGS: NormanReadingEntry[] = [
  {
    slug: 'norman-identity-themes',
    title: 'Themes in Norman Identity',
    description:
      'Law, lordship, and mobility across the Norman world — a thematic lens not tied to a single map pin.',
    defaultEraId: 'norman-expansion',
    tags: ['essay', 'identity'],
  },
  {
    slug: 'normandy-from-grant-to-duchy',
    title: 'Normandy: From Grant to Duchy',
    description:
      'Treaty traditions, Scandinavian settlement, and the making of ducal authority on the lower Seine and beyond.',
    defaultEraId: 'norman-expansion',
    tags: ['Normandy', 'thematic'],
  },
  {
    slug: 'norman-england-conquest-and-governance',
    title: 'Norman England: Conquest and Governance',
    description:
      '1066, castles, sheriffs, Domesday, and the limits of what “conquest” meant on the ground.',
    defaultEraId: 'norman-expansion',
    tags: ['England', 'thematic'],
  },
  {
    slug: 'normans-in-wales-and-the-march',
    title: 'Normans in Wales and the March',
    description:
      'Marcher lordship, castle chains, and Welsh response — without treating the frontier as a single battle.',
    defaultEraId: 'norman-expansion',
    tags: ['Wales', 'thematic'],
  },
  {
    slug: 'normans-in-ireland-invasion',
    title: 'Anglo-Norman Ireland: Invasion to Lordship',
    description:
      'Leinster exiles, Strongbow, royal intervention, and the shaping of the English lordship of Ireland.',
    defaultEraId: 'norman-expansion',
    tags: ['Ireland', 'thematic'],
  },
  {
    slug: 'hautevilles-southern-italy',
    title: 'The Hautevilles in Southern Italy',
    description:
      'From mercenary bands to county and principality: Apulia, Calabria, and the road to Sicily.',
    defaultEraId: 'norman-expansion',
    tags: ['Italy', 'thematic'],
  },
  {
    slug: 'norman-sicily-kingdom',
    title: 'The Kingdom of Sicily',
    description:
      'Palermo, Roger II, and a plural monarchy — Latin, Greek, and Arabic registers under one crown.',
    defaultEraId: 'norman-expansion',
    tags: ['Sicily', 'thematic'],
  },
  {
    slug: 'normans-crusades-antioch-tripoli',
    title: 'Normans on Crusade: Antioch, Tripoli, Edessa',
    description:
      'Bohemond, Tancred, and the Crusader principalities — politics of kinship, war, and survival.',
    defaultEraId: 'norman-expansion',
    tags: ['Crusades', 'thematic'],
  },
  {
    slug: 'norman-castle-motte-to-stone',
    title: 'Norman Castles: Motte to Stone',
    description:
      'Fortification as administration and spectacle — compare regions without insisting on one “Norman style.”',
    defaultEraId: 'norman-expansion',
    tags: ['military', 'thematic'],
  },
  {
    slug: 'norman-law-and-custom',
    title: 'Norman Law and Custom',
    description:
      'The Custom of Normandy, English law after 1066, and church jurisdiction — institutions the map only hints at.',
    defaultEraId: 'norman-expansion',
    tags: ['law', 'thematic'],
  },
  {
    slug: 'angevin-normandy-frontier',
    title: 'Angevin Normandy and the Capetian Frontier',
    description:
      'Gisors, Château Gaillard, and the pressures that culminated in 1204 — Plantagenet rule and French kingship.',
    defaultEraId: 'norman-expansion',
    tags: ['Angevin', 'France', 'thematic'],
  },
  {
    slug: 'shared-bibliography',
    title: 'Shared Bibliography for Norman Readings',
    description:
      'Survey works and starting points across regions — not exhaustive, but historically mainstream.',
    defaultEraId: 'norman-expansion',
    tags: ['bibliography'],
  },
  {
    slug: 'rouen-ducal-capital',
    title: 'Rouen as Ducal Capital',
    description:
      'How Normandy’s political and ecclesiastical center worked from the grant to Rollo through the high medieval period.',
    linkedNodeId: 'node-rouen',
    defaultEraId: 'norman-expansion',
    tags: ['Normandy', 'cities'],
  },
];

export const NORMAN_READINGS: NormanReadingEntry[] = [...CORE_READINGS, ...PLACE_READING_ENTRIES];

export const NORMAN_READING_SLUGS = NORMAN_READINGS.map((r) => r.slug);

export function getNormanReadingEntry(slug: string): NormanReadingEntry | undefined {
  return NORMAN_READINGS.find((r) => r.slug === slug);
}

export function isNormanReadingSlug(slug: string): boolean {
  return NORMAN_READINGS.some((r) => r.slug === slug);
}
