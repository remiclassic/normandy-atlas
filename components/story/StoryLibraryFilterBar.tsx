'use client';

import { memo, useCallback, useRef } from 'react';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import type { StoryCategory } from '@/data/atlas/story-library-meta';
import { STORY_CATEGORY_ORDER } from '@/data/atlas/story-library-meta';
import { t, type UiStringKey } from '@/lib/ui-strings';

const CATEGORY_KEY: Record<StoryCategory, UiStringKey> = {
  Origins: 'storyLibrary.category.origins',
  Conquest: 'storyLibrary.category.conquest',
  Expansion: 'storyLibrary.category.expansion',
  Exploration: 'storyLibrary.category.exploration',
  'New France': 'storyLibrary.category.newFrance',
  People: 'storyLibrary.category.people',
  Legacy: 'storyLibrary.category.legacy',
};

export type FilterValue = StoryCategory | 'all';

interface Props {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  locale: AtlasLocale;
  uiTheme: UiTheme;
}

const ALL_FILTERS: FilterValue[] = ['all', ...STORY_CATEGORY_ORDER];

export const StoryLibraryFilterBar = memo(function StoryLibraryFilterBar({
  value,
  onChange,
  locale,
  uiTheme,
}: Props) {
  const isLight = uiTheme === 'light';
  const barRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = ALL_FILTERS.indexOf(value);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = ALL_FILTERS[(idx + 1) % ALL_FILTERS.length];
        onChange(next);
        focusPill(barRef.current, next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = ALL_FILTERS[(idx - 1 + ALL_FILTERS.length) % ALL_FILTERS.length];
        onChange(prev);
        focusPill(barRef.current, prev);
      }
    },
    [value, onChange],
  );

  return (
    <div
      ref={barRef}
      role="tablist"
      aria-label={t('storyLibrary.aria.filterBar', locale)}
      className="flex flex-wrap gap-1.5 px-4 py-3 lg:px-5"
      onKeyDown={handleKeyDown}
    >
      {ALL_FILTERS.map((filter) => {
        const active = filter === value;
        const label =
          filter === 'all'
            ? t('storyLibrary.filter.all', locale)
            : t(CATEGORY_KEY[filter], locale);

        return (
          <button
            key={filter}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            data-filter={filter}
            onClick={() => onChange(filter)}
            className={`
              rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]
              transition-all duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent
              ${
                isLight
                  ? active
                    ? 'border border-chrome-border-strong bg-chrome-fill-pressed text-foreground shadow-sm'
                    : 'border border-transparent bg-chrome-fill text-text-muted hover:bg-chrome-fill-hover hover:text-text'
                  : active
                    ? 'bg-white/15 text-white shadow-[0_0_12px_rgba(255,255,255,0.08)] border border-white/25'
                    : 'bg-white/[0.04] text-white/50 border border-transparent hover:bg-white/[0.08] hover:text-white/70'
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
});

function focusPill(container: HTMLElement | null, filter: FilterValue) {
  if (!container) return;
  const btn = container.querySelector(`[data-filter="${filter}"]`) as HTMLElement | null;
  btn?.focus();
}
