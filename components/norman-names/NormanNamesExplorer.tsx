'use client';

import { useState, useMemo, useCallback, memo, type ChangeEvent } from 'react';
import { Search, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { pickI18n } from '@/lib/locale';
import {
  getNormanNameEntries,
  CATEGORY_META,
  resolveCategoryLabel,
  type NormanNameEntry,
} from '@/lib/norman-names';
import type { SurnameOriginCategory, AtlasLocale } from '@/core/types';

const CATEGORY_ORDER: SurnameOriginCategory[] = [
  'core_norman',
  'strongly_norman',
  'coastal_maritime',
  'norse_influence',
  'feudal_trade',
  'other',
];

const NameCard = memo(function NameCard({
  entry,
  locale,
  expanded,
  onToggle,
}: {
  entry: NormanNameEntry;
  locale: string;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const meta = CATEGORY_META[entry.category];
  const etymologyText = entry.etymology ? pickI18n(entry.etymology, locale as AtlasLocale) : null;
  const bioText = pickI18n(entry.bio, locale as AtlasLocale);
  const legacyText = pickI18n(entry.legacy, locale as AtlasLocale);
  const handleClick = useCallback(() => onToggle(entry.id), [onToggle, entry.id]);

  return (
    <div
      className="group rounded-lg border transition-colors"
      style={{
        borderColor: expanded ? meta.color : 'var(--color-border)',
        background: expanded ? 'var(--color-surface)' : 'transparent',
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="w-full text-left px-5 py-4 flex items-center gap-4 cursor-pointer"
      >
        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.color }} />
        <div className="flex-1 min-w-0">
          <span className="font-display text-[16px] font-semibold" style={{ color: 'var(--color-parchment)' }}>
            {entry.surname}
          </span>
          <span className="ml-2 text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
            {entry.displayName}
          </span>
          <span className="ml-2 text-[11px]" style={{ color: 'var(--color-text-dim)' }}>
            {entry.birthYear}\u2013{entry.deathYear}
          </span>
        </div>
        <span
          className="text-[10px] font-medium uppercase tracking-[0.12em] shrink-0 px-2 py-0.5 rounded"
          style={{
            color: meta.color,
            background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
          }}
        >
          {resolveCategoryLabel(entry.category, locale as AtlasLocale)}
        </span>
        {expanded ? (
          <ChevronUp size={14} style={{ color: 'var(--color-text-dim)' }} />
        ) : (
          <ChevronDown size={14} style={{ color: 'var(--color-text-dim)' }} />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3">
          {etymologyText && (
            <div className="rounded-md px-4 py-3" style={{ background: 'var(--color-surface-hover)' }}>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--color-gold-muted)' }}>
                {locale === 'fr' ? '\u00c9tymologie du nom' : 'Surname Etymology'}
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {etymologyText}
              </p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--color-gold-muted)' }}>
              {locale === 'fr' ? 'Biographie' : 'Biography'}
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {bioText}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--color-gold-muted)' }}>
              {locale === 'fr' ? 'H\u00e9ritage' : 'Legacy'}
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {legacyText}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <MapPin size={12} style={{ color: 'var(--color-blue-bright)' }} />
            <span className="text-[11px]" style={{ color: 'var(--color-text-dim)' }}>
              {entry.originPlaceId.replace(/-/g, ' ')} \u2192 {entry.destinationPlaceIds.map((d) => d.replace(/-/g, ' ')).join(', ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

const CategoryLegend = memo(function CategoryLegend({ locale }: { locale: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORY_ORDER.map((cat) => {
        const meta = CATEGORY_META[cat];
        return (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: meta.color }} />
            <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
              {resolveCategoryLabel(cat, locale as AtlasLocale)}
            </span>
          </div>
        );
      })}
    </div>
  );
});

export default function NormanNamesExplorer({ locale }: { locale: AtlasLocale }) {
  const allEntries = useMemo(() => getNormanNameEntries(), []);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<SurnameOriginCategory | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = allEntries;
    if (activeFilter) {
      list = list.filter((e) => e.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.surname.toLowerCase().includes(q) ||
          e.displayName.toLowerCase().includes(q),
      );
    }
    return list;
  }, [allEntries, activeFilter, search]);

  const handleToggle = useCallback(
    (id: string) => setExpandedId((prev) => (prev === id ? null : id)),
    [],
  );

  const handleFilterClick = useCallback(
    (cat: SurnameOriginCategory) =>
      setActiveFilter((prev) => (prev === cat ? null : cat)),
    [],
  );

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );

  return (
    <div className="space-y-4">
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        {locale === 'fr'
          ? 'Ces patronymes normands ont \u00e9t\u00e9 port\u00e9s par les colons de Normandie vers la Nouvelle-France. Explorez leurs origines, \u00e9tymologies et les personnes qui les ont port\u00e9s \u00e0 travers l\u2019Atlantique.'
          : 'These Norman-origin surnames were carried by settlers from Normandy to New France. Explore their origins, etymologies, and the people who brought them across the Atlantic.'}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-dim)' }}
          />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder={locale === 'fr' ? 'Rechercher un nom\u2026' : 'Search names\u2026'}
            className="w-full pl-9 pr-3 py-2 rounded-md text-[13px] outline-none border transition-colors"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_ORDER.map((cat) => {
            const active = activeFilter === cat;
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterClick(cat)}
                className="text-[10px] font-medium uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-md border transition-colors cursor-pointer"
                style={{
                  borderColor: active ? meta.color : 'var(--color-border)',
                  background: active ? `color-mix(in srgb, ${meta.color} 15%, transparent)` : 'transparent',
                  color: active ? meta.color : 'var(--color-text-muted)',
                }}
              >
                {resolveCategoryLabel(cat, locale)}
              </button>
            );
          })}
        </div>
      </div>

      <CategoryLegend locale={locale} />

      <p className="text-[12px]" style={{ color: 'var(--color-text-dim)' }}>
        {filtered.length} {locale === 'fr' ? 'noms' : 'names'}
      </p>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-[13px] py-12 text-center" style={{ color: 'var(--color-text-dim)' }}>
            {locale === 'fr' ? 'Aucun r\u00e9sultat.' : 'No results found.'}
          </p>
        )}
        {filtered.map((entry) => (
          <NameCard
            key={entry.id}
            entry={entry}
            locale={locale}
            expanded={expandedId === entry.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
