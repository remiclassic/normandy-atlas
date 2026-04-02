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
  onSelect: (row: StoryLibraryRowModel) => void;
  onHoverEnter?: (row: StoryLibraryRowModel) => void;
  onHoverLeave?: () => void;
}

export const StoryLibraryEditorialGrid = memo(function StoryLibraryEditorialGrid({
  rows,
  filter,
  locale,
  uiTheme,
  progressMap,
  onSelect,
  onHoverEnter,
  onHoverLeave,
}: Props) {
  const reducedMotion = useReducedMotion();

  const sections = useMemo(() => {
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
  }, [rows, filter, locale]);

  return (
    <div className="space-y-6 px-4 pb-8 lg:px-5">
      <AnimatePresence mode="popLayout" initial={false}>
        {sections.map((section) => (
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
                  variant={i < 2 ? 'medium' : 'standard'}
                  onSelect={onSelect}
                  onHoverEnter={onHoverEnter}
                  onHoverLeave={onHoverLeave}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </AnimatePresence>
    </div>
  );
});
