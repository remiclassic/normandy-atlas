import { getPlace, getPlaceEraState } from '@/core';
import { pickI18n } from '@/lib/locale';
import type { MigrationChannel, Person, AtlasLocale } from '@/core/types';

export type BadgeTone = 'norman' | 'perche' | 'brittany' | 'aunis' | 'paris' | 'neutral';

export interface ChannelBadge {
  label: string;
  tone: BadgeTone;
}

export const CHANNEL_BADGES: Record<MigrationChannel, ChannelBadge> = {
  normandy_port:     { label: 'Norman',           tone: 'norman' },
  perche:            { label: 'Percheron',         tone: 'perche' },
  brittany_coast:    { label: 'Breton',            tone: 'brittany' },
  aunis_saintonge:   { label: 'Aunis–Saintonge',   tone: 'aunis' },
  paris_region:      { label: 'Paris region',       tone: 'paris' },
  loire_valley:      { label: 'Loire Valley',       tone: 'neutral' },
  poitou:            { label: 'Poitou',             tone: 'neutral' },
  low_countries:     { label: 'Low Countries',      tone: 'neutral' },
  italian_peninsula: { label: 'Italian',            tone: 'neutral' },
  english_polity:    { label: 'English realm',      tone: 'neutral' },
  other:             { label: 'Other French',       tone: 'neutral' },
};

const CHANNEL_ORDER: MigrationChannel[] = [
  'normandy_port', 'perche', 'brittany_coast', 'aunis_saintonge', 'paris_region',
  'loire_valley', 'poitou', 'low_countries', 'italian_peninsula', 'english_polity', 'other',
];

export function getMigrationChannelBadge(channel?: MigrationChannel): ChannelBadge {
  if (channel && CHANNEL_BADGES[channel]) return CHANNEL_BADGES[channel];
  return { label: 'Origins', tone: 'neutral' };
}

export interface FilterOption {
  channel: MigrationChannel;
  label: string;
  tone: BadgeTone;
  count: number;
}

export function getAvailableFilters(people: Person[]): FilterOption[] {
  const counts = new Map<MigrationChannel, number>();
  for (const p of people) {
    const ch = p.migrationChannel ?? 'other';
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  return CHANNEL_ORDER
    .filter((ch) => counts.has(ch))
    .map((ch) => ({
      channel: ch,
      label: CHANNEL_BADGES[ch].label,
      tone: CHANNEL_BADGES[ch].tone,
      count: counts.get(ch)!,
    }));
}

export function filterPeopleByChannel(
  people: Person[],
  activeFilter: MigrationChannel | null,
): Person[] {
  if (!activeFilter) return people;
  return people.filter((p) => (p.migrationChannel ?? 'other') === activeFilter);
}

export const BADGE_CLASSES: Record<BadgeTone, string> = {
  norman:   'text-blue-300/70  bg-blue-400/[0.06]  border-blue-400/15',
  perche:   'text-amber-300/70 bg-amber-400/[0.06] border-amber-400/15',
  brittany: 'text-cyan-300/70  bg-cyan-400/[0.06]  border-cyan-400/15',
  aunis:    'text-rose-300/70  bg-rose-400/[0.06]  border-rose-400/15',
  paris:    'text-violet-300/70 bg-violet-400/[0.06] border-violet-400/15',
  neutral:  'text-text-dim/50  bg-white/[0.02]     border-white/[0.06]',
};

/**
 * Build a "From <place>" display string for the person's origin,
 * preferring era-specific place labels when an eraId is available.
 */
export function getOriginDisplayLine(person: Person, eraId?: string, locale?: AtlasLocale): string | undefined {
  if (eraId) {
    const eraState = getPlaceEraState(person.originPlaceId, eraId);
    if (eraState) return `From ${eraState.label}`;
  }

  const place = getPlace(person.originPlaceId);
  if (place) {
    const firstState = Object.values(place.eraStates)[0];
    if (firstState) return `From ${firstState.label}`;
  }

  if (person.originLabel) return pickI18n(person.originLabel, locale ?? 'en');

  return undefined;
}
