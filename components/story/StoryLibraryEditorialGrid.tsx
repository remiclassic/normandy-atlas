'use client';

import { memo, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { StoryLibraryRowModel } from '@/lib/story-library-build';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import type { StoryProgressRecord } from '@/lib/story-progress';
import type { StoryCategory } from '@/data/atlas/story-library-meta';
import { STORY_CATEGORY_ORDER } from '@/data/atlas/story-library-meta';
import { t, type UiStringKey } from '@/lib/ui-strings';
import { StoryLibraryGridCard } from '@/components/story/StoryLibraryGridCard';
import type { FilterValue } from '@/components/story/StoryLibraryFilterBar';

const CATEGORY_KEY: Record<StoryCategory, UiStringKey> = {
  Origins: 'storyLibrary.category.origins',
  Conquest: 'storyLibrary.category.conquest',
  Expansion: 'storyLibrary.category.expansion',
  Exploration: 'storyLibrary.category.exploration',
  'New France': 'storyLibrary.category.newFrance',
  People: 'storyLibrary.category.people',
  Legacy: 'storyLibrary.category.legacy',
};

interface Props {
  rows: StoryLibraryRowModel[];
  filter: FilterValue;
  locale: AtlasLocale;
  uiTheme: UiTheme;
  progressMap: Record<string, StoryProgressRecord>;
  selectedKey?: string | null;
  onSelect: (row: StoryLibraryRowModel) => void;
  onHoverEnter?: (row: StoryLibraryRowModel) => void;
  onHoverLeave?: () => void;
  /** In-progress arcs (e.g. continue watching); shown above categories when filter is All and not searching. */
  continueWatchingRows?: StoryLibraryRowModel[];
  /** When true, render a single "Results" section (search mode). */
  searchMode?: boolean;
}

export const StoryLibraryEditorialGrid = memo(function StoryLibraryEditorialGrid({
  rows,
  filter,
  locale,
  uiTheme,
  progressMap,
  selectedKey,
  onSelect,
  onHoverEnter,
  onHoverLeave,
  continueWatchingRows = [],
  searchMode = false,
}: Props) {
  const reducedMotion = useReducedMotion();

  const sections = useMemo(() => {
    if (searchMode) {
      if (rows.length === 0) return [];
      return [
        {
          label: t('storyLibrary.searchResults', locale),
          rows,
        },
      ];
    }
    if (filter === 'all') {
      const result: { label: string; rows: StoryLibraryRowModel[] }[] = [];
      for (const cat of STORY_CATEGORY_ORDER) {
        const filtered = rows.filter((r) => r.meta.category === cat);
        if (filtered.length > 0) {
          result.push({ label: t(CATEGORY_KEY[cat], locale), rows: filtered });
        }
      }
      return result;
    }

    const filtered = rows.filter((r) => r.meta.category === filter);
    if (filtered.length === 0) return [];
    return [{ label: t(CATEGORY_KEY[filter], locale), rows: filtered }];
  }, [rows, filter, locale, searchMode]);

  const showContinue =
    !searchMode &&
    filter === 'all' &&
    continueWatchingRows.length > 0;

  return (
    <div className="space-y-6 px-4 pb-8 lg:px-5">
      {showContinue && (
        <section aria-label={t('storyLibrary.continueWatching', locale)}>
          <h3
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {t('storyLibrary.continueWatching', locale)}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1">
            {continueWatchingRows.map((row) => (
              <div key={row.progressKey} className="w-[min(220px,72vw)] shrink-0">
                <StoryLibraryGridCard
                  row={row}
                  locale={locale}
                  uiTheme={uiTheme}
                  progress={progressMap[row.progressKey]}
                  variant="standard"
                  forceLandscapeAspect
                  isSelected={row.progressKey === selectedKey}
                  onSelect={onSelect}
                  onHoverEnter={onHoverEnter}
                  onHoverLeave={onHoverLeave}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <AnimatePresence mode="popLayout" initial={false}>
        {sections.length === 0 ? (
          <p
            className="py-8 text-center text-[13px]"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {searchMode
              ? t('storyLibrary.searchEmpty', locale)
              : t('storyLibrary.filterEmpty', locale)}
          </p>
        ) : (
          sections.map((section) => (
            <motion.section
              key={section.label}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <h3
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {section.label}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.rows.map((row, i) => (
                  <StoryLibraryGridCard
                    key={row.progressKey}
                    row={row}
                    locale={locale}
                    uiTheme={uiTheme}
                    progress={progressMap[row.progressKey]}
                    variant={searchMode ? 'standard' : i < 2 ? 'medium' : 'standard'}
                    isSelected={row.progressKey === selectedKey}
                    onSelect={onSelect}
                    onHoverEnter={onHoverEnter}
                    onHoverLeave={onHoverLeave}
                  />
                ))}
              </div>
            </motion.section>
          ))
        )}
      </AnimatePresence>
    </div>
  );
});
