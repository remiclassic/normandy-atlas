import { atlasPeople } from '@/data/atlas/people';
import type { MigrationChannel } from '@/core/types';

const NEW_FRANCE_ERAS = new Set(['new-france-foundations', 'royal-new-france']);
const NORMAN_MIGRATION: MigrationChannel[] = ['normandy_port', 'perche'];

export type NormanAtlasMigrationChannel = 'normandy_port' | 'perche';

/**
 * Normalized surname key for matching Francogene catalogue strings to atlas `Person.surname`.
 * Strips accents, parentheticals, "dit …", common particles.
 */
export function normalizeSurnameKey(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toUpperCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+dit\s+.*/i, '')
    .replace(/^([LD])\s+/i, '')
    .replace(/^L'\s*/i, '')
    .trim()
    .replace(/\s+/g, ' ');
}

const surnameToChannels = new Map<string, Set<NormanAtlasMigrationChannel>>();

for (const p of atlasPeople) {
  const ch = p.migrationChannel;
  if (!ch || (ch !== 'normandy_port' && ch !== 'perche')) continue;
  if (!p.relevantEraIds?.some((e) => NEW_FRANCE_ERAS.has(e))) continue;
  const sur = p.surname?.trim();
  if (!sur) continue;
  const key = normalizeSurnameKey(sur);
  if (!key) continue;
  let set = surnameToChannels.get(key);
  if (!set) {
    set = new Set();
    surnameToChannels.set(key, set);
  }
  set.add(ch);
}

export interface GfnaNormanAtlasMatch {
  matched: boolean;
  /** Distinct atlas migration channels for founders with this surname key. */
  channels: NormanAtlasMigrationChannel[];
}

export function getGfnaNormanAtlasMatch(surname: string): GfnaNormanAtlasMatch {
  const key = normalizeSurnameKey(surname);
  if (!key) return { matched: false, channels: [] };
  const set = surnameToChannels.get(key);
  if (!set?.size) return { matched: false, channels: [] };
  const channels = [...set].sort((a, b) => a.localeCompare(b)) as NormanAtlasMigrationChannel[];
  return { matched: true, channels };
}
