import { atlasPeople } from '@/data/atlas/people';
import type { Person, SurnameOriginCategory, I18nString, AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';

export interface NormanNameEntry {
  id: string;
  displayName: string;
  surname: string;
  category: SurnameOriginCategory;
  etymology: I18nString | undefined;
  birthYear: number;
  deathYear: number;
  roles: string[];
  originPlaceId: string;
  destinationPlaceIds: string[];
  bio: I18nString;
  legacy: I18nString;
  originLabel: I18nString | undefined;
}

let _cache: NormanNameEntry[] | null = null;

function buildEntries(): NormanNameEntry[] {
  const out: NormanNameEntry[] = [];
  for (const p of atlasPeople) {
    if (!p.surname || !p.surnameOriginCategory) continue;
    out.push({
      id: p.id,
      displayName: p.displayName,
      surname: p.surname,
      category: p.surnameOriginCategory,
      etymology: p.surnameEtymology,
      birthYear: p.birthYear,
      deathYear: p.deathYear,
      roles: p.roles,
      originPlaceId: p.originPlaceId,
      destinationPlaceIds: p.destinationPlaceIds,
      bio: p.bio,
      legacy: p.legacy,
      originLabel: p.originLabel,
    });
  }
  out.sort((a, b) => a.surname.localeCompare(b.surname));
  return out;
}

export function getNormanNameEntries(): NormanNameEntry[] {
  if (!_cache) _cache = buildEntries();
  return _cache;
}

export const CATEGORY_META: Record<SurnameOriginCategory, { label: I18nString; color: string }> = {
  core_norman: {
    label: { en: 'Core Norman', fr: 'Normand de souche' },
    color: 'var(--color-gold)',
  },
  strongly_norman: {
    label: { en: 'Strongly Norman', fr: 'Fortement normand' },
    color: 'var(--color-gold-bright)',
  },
  coastal_maritime: {
    label: { en: 'Coastal / Maritime', fr: 'Côtier / Maritime' },
    color: 'var(--color-blue-bright)',
  },
  norse_influence: {
    label: { en: 'Norse Influence', fr: 'Influence scandinave' },
    color: 'var(--color-ember)',
  },
  feudal_trade: {
    label: { en: 'Feudal & Trade', fr: 'Féodal & Commerce' },
    color: 'var(--color-text-muted)',
  },
  other: {
    label: { en: 'Other', fr: 'Autre' },
    color: 'var(--color-text-dim)',
  },
};

export function resolveCategoryLabel(cat: SurnameOriginCategory, locale: AtlasLocale): string {
  return pickI18n(CATEGORY_META[cat].label, locale);
}
