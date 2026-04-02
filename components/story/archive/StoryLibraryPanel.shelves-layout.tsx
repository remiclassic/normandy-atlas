'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import {
  buildStoryLibraryRows,
  groupRowsByCategory,
  pickFeaturedRow,
  type StoryLibraryRowModel,
} from '@/lib/story-library-build';
import { STORY_CATEGORY_ORDER } from '@/data/atlas/story-library-meta';
import type { StoryCategory } from '@/data/atlas/story-library-meta';
import { readStoryProgressMap } from '@/lib/story-progress';
import { t, type UiStringKey } from '@/lib/ui-strings';
import { StoryLibraryHero } from '@/components/story/StoryLibraryHero';
import { StoryLibraryShelf } from '@/components/story/StoryLibraryShelf';
import { StoryLibraryPosterTile } from '@/components/story/StoryLibraryPosterTile';
import { StoryLibraryDetailSheet } from '@/components/story/StoryLibraryDetailSheet';
import { X } from 'lucide-react';

export type StoryLibraryHeroCarouselSync = {
  total: number;
  activeIndex: number;
  goTo: (index: number) => void;
};

function categoryLabelKey(c: StoryCategory): UiStringKey {
  const m: Record<StoryCategory, UiStringKey> = {
    Origins: 'storyLibrary.category.origins',
    Conquest: 'storyLibrary.category.conquest',
    Expansion: 'storyLibrary.category.expansion',
    Exploration: 'storyLibrary.category.exploration',
    'New France': 'storyLibrary.category.newFrance',
    People: 'storyLibrary.category.people',
    Legacy: 'storyLibrary.category.legacy',
  };
  return m[c];
}

export default function StoryLibraryPanel({
  open,
  onClose,
  useShellChrome = true,
  onHeroCarouselSync,
}: {
  open: boolean;
  onClose: () => void;
  /** When true, no duplicate top bar — shell header provides chrome (Netflix-style). */
  useShellChrome?: boolean;
  /** Sync featured-hero carousel index with the shell header segment strip. */
  onHeroCarouselSync?: (state: StoryLibraryHeroCarouselSync | null) => void;
}) {
  const locale = useLocale();
  const uiTheme = useMapStore((s) => s.uiTheme);
  const startStory = useMapStore((s) => s.startStory);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const [selectedRow, setSelectedRow] = useState<StoryLibraryRowModel | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (open) {
      setProgressEpoch((e) => e + 1);
      if (!useShellChrome) {
        queueMicrotask(() => closeRef.current?.focus());
      }
    } else {
      setSelectedRow(null);
    }
  }, [open, useShellChrome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedRow) {
          setSelectedRow(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, selectedRow]);

  const rows = useMemo(() => buildStoryLibraryRows(locale), [locale]);
  const progressMap = useMemo(() => {
    void progressEpoch;
    return readStoryProgressMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressEpoch, open]);

  const featured = useMemo(() => pickFeaturedRow(rows), [rows]);

  useEffect(() => {
    if (!open) return;
    const f = pickFeaturedRow(rows);
    const i = f ? rows.findIndex((r) => r.progressKey === f.progressKey) : 0;
    setHeroIndex(i >= 0 ? i : 0);
  }, [open, rows]);

  const continueRows = useMemo(() => {
    return rows
      .filter((r) => {
        if (featured && r.progressKey === featured.progressKey) return false;
        const p = progressMap[r.progressKey];
        return Boolean(p && !p.completed && p.lastStep > 0);
      })
      .sort(
        (a, b) =>
          (progressMap[b.progressKey]?.lastPlayedAt ?? 0) -
          (progressMap[a.progressKey]?.lastPlayedAt ?? 0),
      );
  }, [rows, progressMap, featured]);

  const continueKeySet = useMemo(() => {
    const s = new Set<string>();
    for (const r of continueRows) s.add(r.progressKey);
    return s;
  }, [continueRows]);

  const excludeKeys = useMemo(() => {
    const s = new Set<string>(continueKeySet);
    if (featured) s.add(featured.progressKey);
    return s;
  }, [featured, continueKeySet]);

  const grouped = useMemo(
    () => groupRowsByCategory(rows, excludeKeys, locale),
    [rows, excludeKeys, locale],
  );

  const playRow = useCallback(
    (row: StoryLibraryRowModel, resume: boolean) => {
      const key = row.progressKey;
      const saved = resume ? progressMap[key]?.lastStep ?? 0 : 0;
      if (row.meta.arcId === null) {
        startStory(null, { stepIndex: saved });
      } else {
        startStory(row.meta.arcId, { stepIndex: saved });
      }
      setProgressEpoch((e) => e + 1);
      setSelectedRow(null);
      onClose();
    },
    [startStory, onClose, progressMap],
  );

  const handleTileSelect = useCallback((row: StoryLibraryRowModel) => {
    setSelectedRow(row);
  }, []);

  const advanceHero = useCallback(() => {
    setHeroIndex((i) => {
      if (rows.length <= 1) return i;
      return (i + 1) % rows.length;
    });
  }, [rows.length]);

  const goToHeroIndex = useCallback((i: number) => {
    setHeroIndex((prev) => {
      const max = rows.length - 1;
      if (max < 0) return prev;
      return Math.max(0, Math.min(max, i));
    });
  }, [rows.length]);

  useEffect(() => {
    if (!onHeroCarouselSync) return;
    if (!open) {
      onHeroCarouselSync(null);
      return;
    }
    if (rows.length === 0) {
      onHeroCarouselSync(null);
      return;
    }
    onHeroCarouselSync({
      total: rows.length,
      activeIndex: heroIndex,
      goTo: goToHeroIndex,
    });
  }, [open, rows.length, heroIndex, goToHeroIndex, onHeroCarouselSync]);

  const getStoryProgress = useCallback(
    (key: string) => progressMap[key],
    [progressMap],
  );

  const handleMoreInfo = useCallback(() => {
    const r = rows[heroIndex];
    if (r) setSelectedRow(r);
  }, [rows, heroIndex]);

  const handleDetailClose = useCallback(() => setSelectedRow(null), []);

  const handleDetailPlay = useCallback(() => {
    if (selectedRow) playRow(selectedRow, false);
  }, [selectedRow, playRow]);

  const handleDetailResume = useCallback(() => {
    if (selectedRow) playRow(selectedRow, true);
  }, [selectedRow, playRow]);

  if (typeof document === 'undefined') return null;

  const motionDuration = reducedMotion ? 0 : 0.25;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="story-library-fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label={t('storyLibrary.title', locale)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDuration }}
          className={
            useShellChrome
              ? 'absolute inset-0 z-[62] flex flex-col overflow-hidden'
              : 'fixed inset-0 z-[62] flex flex-col overflow-hidden'
          }
          style={{
            background: 'linear-gradient(180deg, var(--color-background) 0%, var(--color-background-warm) 100%)',
            paddingTop: useShellChrome ? undefined : 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {!useShellChrome && (
            <header
              className="sticky top-0 z-[63] flex items-center justify-between px-6 sm:px-10 py-3 backdrop-blur-md border-b"
              style={{
                background: 'color-mix(in srgb, var(--color-background) 85%, transparent)',
                borderColor: 'var(--color-chrome-border)',
              }}
            >
              <div className="min-w-0">
                <h1
                  className="font-display text-base sm:text-lg font-bold tracking-tight"
                  style={{ color: 'var(--color-text)' }}
                >
                  {t('storyLibrary.title', locale)}
                </h1>
                <p className="text-[11px] truncate" style={{ color: 'var(--color-text-dim)' }}>
                  {t('storyLibrary.subtitle', locale)}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{
                  background: 'var(--color-chrome-fill)',
                  color: 'var(--color-text-muted)',
                }}
                aria-label={t('storyLibrary.aria.close', locale)}
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </header>
          )}

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {/* Hero billboard */}
            {rows.length > 0 && (
              <StoryLibraryHero
                rows={rows}
                activeIndex={heroIndex}
                onAdvanceCarousel={advanceHero}
                locale={locale}
                uiTheme={uiTheme}
                getStoryProgress={getStoryProgress}
                onPlay={() => {
                  const r = rows[heroIndex];
                  if (r) playRow(r, false);
                }}
                onResume={() => {
                  const r = rows[heroIndex];
                  if (r) playRow(r, true);
                }}
                onMoreInfo={handleMoreInfo}
              />
            )}

            <div className="space-y-8 py-8">
              {/* Continue watching */}
              {continueRows.length > 0 && (
                <StoryLibraryShelf title={t('storyLibrary.continueWatching', locale)} locale={locale}>
                  {continueRows.map((row) => (
                    <StoryLibraryPosterTile
                      key={row.progressKey}
                      row={row}
                      locale={locale}
                      uiTheme={uiTheme}
                      progress={progressMap[row.progressKey]}
                      onSelect={handleTileSelect}
                    />
                  ))}
                </StoryLibraryShelf>
              )}

              {/* Category rows */}
              {STORY_CATEGORY_ORDER.map((cat) => {
                const list = grouped.get(cat) ?? [];
                if (list.length === 0) return null;
                return (
                  <StoryLibraryShelf key={cat} title={t(categoryLabelKey(cat), locale)} locale={locale}>
                    {list.map((row) => (
                      <StoryLibraryPosterTile
                        key={row.progressKey}
                        row={row}
                        locale={locale}
                        uiTheme={uiTheme}
                        progress={progressMap[row.progressKey]}
                        onSelect={handleTileSelect}
                      />
                    ))}
                  </StoryLibraryShelf>
                );
              })}
            </div>
          </div>

          {/* Detail sheet for selected tile */}
          <StoryLibraryDetailSheet
            row={selectedRow}
            locale={locale}
            uiTheme={uiTheme}
            progress={selectedRow ? progressMap[selectedRow.progressKey] : undefined}
            onClose={handleDetailClose}
            onPlay={handleDetailPlay}
            onResume={handleDetailResume}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
