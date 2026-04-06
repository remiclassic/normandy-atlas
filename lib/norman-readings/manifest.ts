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
    mapFocus: { center: [12, 42.5], zoom: 4.4 },
    tags: ['essay', 'identity'],
  },
  {
    slug: 'normandy-from-grant-to-duchy',
    title: 'Normandy: From Grant to Duchy',
    description:
      'Treaty traditions, Scandinavian settlement, and the making of ducal authority on the lower Seine and beyond.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [-0.35, 49.05], zoom: 6.6 },
    tags: ['Normandy', 'thematic'],
  },
  {
    slug: 'norman-england-conquest-and-governance',
    title: 'Norman England: Conquest and Governance',
    description:
      '1066, castles, sheriffs, Domesday, and the limits of what “conquest” meant on the ground.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [-1.2, 52.2], zoom: 5.9 },
    tags: ['England', 'thematic'],
  },
  {
    slug: 'normans-in-wales-and-the-march',
    title: 'Normans in Wales and the March',
    description:
      'Marcher lordship, castle chains, and Welsh response — without treating the frontier as a single battle.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [-3.4, 52.1], zoom: 6.4 },
    tags: ['Wales', 'thematic'],
  },
  {
    slug: 'normans-in-ireland-invasion',
    title: 'Anglo-Norman Ireland: Invasion to Lordship',
    description:
      'Leinster exiles, Strongbow, royal intervention, and the shaping of the English lordship of Ireland.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [-7.2, 53.25], zoom: 6.1 },
    tags: ['Ireland', 'thematic'],
  },
  {
    slug: 'hautevilles-southern-italy',
    title: 'The Hautevilles in Southern Italy',
    description:
      'From mercenary bands to county and principality: Apulia, Calabria, and the road to Sicily.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [15.5, 40.2], zoom: 6.2 },
    tags: ['Italy', 'thematic'],
  },
  {
    slug: 'norman-sicily-kingdom',
    title: 'The Kingdom of Sicily',
    description:
      'Palermo, Roger II, and a plural monarchy — Latin, Greek, and Arabic registers under one crown.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [14.1, 37.6], zoom: 6.5 },
    tags: ['Sicily', 'thematic'],
  },
  {
    slug: 'normans-crusades-antioch-tripoli',
    title: 'Normans on Crusade: Antioch, Tripoli, Edessa',
    description:
      'Bohemond, Tancred, and the Crusader principalities — politics of kinship, war, and survival.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [36.2, 35.8], zoom: 5.6 },
    tags: ['Crusades', 'thematic'],
  },
  {
    slug: 'norman-castle-motte-to-stone',
    title: 'Norman Castles: Motte to Stone',
    description:
      'Fortification as administration and spectacle — compare regions without insisting on one “Norman style.”',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [-0.5, 50.5], zoom: 5.5 },
    tags: ['military', 'thematic'],
  },
  {
    slug: 'norman-law-and-custom',
    title: 'Norman Law and Custom',
    description:
      'The Custom of Normandy, English law after 1066, and church jurisdiction — institutions the map only hints at.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [-0.15, 49.85], zoom: 5.8 },
    tags: ['law', 'thematic'],
  },
  {
    slug: 'angevin-normandy-frontier',
    title: 'Angevin Normandy and the Capetian Frontier',
    description:
      'Gisors, Château Gaillard, and the pressures that culminated in 1204 — Plantagenet rule and French kingship.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [0.45, 49.35], zoom: 6.8 },
    tags: ['Angevin', 'France', 'thematic'],
  },
  {
    slug: 'shared-bibliography',
    title: 'Shared Bibliography for Norman Readings',
    description:
      'Survey works and starting points across regions — not exhaustive, but historically mainstream.',
    defaultEraId: 'norman-expansion',
    mapFocus: { center: [10, 45], zoom: 4.5 },
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
