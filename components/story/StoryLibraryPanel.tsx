'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
import { StoryLibraryCard } from '@/components/story/StoryLibraryCard';

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
}: {
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale();
  const uiTheme = useMapStore((s) => s.uiTheme);
  const startStory = useMapStore((s) => s.startStory);
  const goToStoryStep = useMapStore((s) => s.goToStoryStep);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [progressEpoch, setProgressEpoch] = useState(0);

  useEffect(() => {
    if (open) {
      setProgressEpoch((e) => e + 1);
      queueMicrotask(() => closeRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const rows = useMemo(() => buildStoryLibraryRows(locale), [locale]);
  const progressMap = useMemo(() => {
    void progressEpoch;
    return readStoryProgressMap();
  }, [progressEpoch, open]);

  const featured = useMemo(() => pickFeaturedRow(rows), [rows]);

  const excludeKeys = useMemo(() => {
    const s = new Set<string>();
    if (featured) s.add(featured.progressKey);
    return s;
  }, [featured]);

  const grouped = useMemo(
    () => groupRowsByCategory(rows, excludeKeys, locale),
    [rows, excludeKeys, locale],
  );

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

  const playRow = useCallback(
    (row: StoryLibraryRowModel, resume: boolean) => {
      const key = row.progressKey;
      const saved = resume ? progressMap[key]?.lastStep ?? 0 : 0;
      if (row.meta.arcId === null) {
        startStory();
      } else {
        startStory(row.meta.arcId);
      }
      if (resume && saved > 0) {
        queueMicrotask(() => goToStoryStep(saved));
      }
      setProgressEpoch((e) => e + 1);
      onClose();
    },
    [startStory, goToStoryStep, onClose, progressMap],
  );

  if (typeof document === 'undefined') return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[62] bg-black/45 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('storyLibrary.title', locale)}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 z-[63] flex w-full max-w-[440px] flex-col border-l border-chrome-border-strong bg-background/92 shadow-2xl"
            style={{
              backdropFilter: 'blur(24px) saturate(1.15)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.15)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-chrome-border px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-parchment tracking-wide">
                  {t('storyLibrary.title', locale)}
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-dim mt-0.5">
                  {t('storyLibrary.subtitle', locale)}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-colors touch-target"
                aria-label={t('storyLibrary.aria.close', locale)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-5 space-y-10">
              {featured ? (
                <section className="space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                    {t('storyLibrary.featured', locale)}
                  </p>
                  <StoryLibraryCard
                    row={featured}
                    locale={locale}
                    uiTheme={uiTheme}
                    variant="hero"
                    progress={progressMap[featured.progressKey]}
                    onPlay={() => playRow(featured, false)}
                    onResume={() => playRow(featured, true)}
                  />
                </section>
              ) : null}

              {continueRows.length > 0 ? (
                <section className="space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                    {t('storyLibrary.continueWatching', locale)}
                  </p>
                  <div className="space-y-4">
                    {continueRows.map((row) => (
                      <StoryLibraryCard
                        key={row.progressKey}
                        row={row}
                        locale={locale}
                        uiTheme={uiTheme}
                        variant="default"
                        progress={progressMap[row.progressKey]}
                        onPlay={() => playRow(row, false)}
                        onResume={() => playRow(row, true)}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="space-y-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  {t('storyLibrary.browseByCategory', locale)}
                </p>
                {STORY_CATEGORY_ORDER.map((cat) => {
                  const list = grouped.get(cat) ?? [];
                  if (list.length === 0) {
                    return (
                      <div key={cat}>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 mb-2">
                          {t(categoryLabelKey(cat), locale)}
                        </h3>
                        <p className="text-[12px] text-text-dim/70 pl-0.5">—</p>
                      </div>
                    );
                  }
                  return (
                    <div key={cat} className="space-y-3">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-parchment/90">
                        {t(categoryLabelKey(cat), locale)}
                      </h3>
                      <div className="space-y-4">
                        {list.map((row) => (
                          <StoryLibraryCard
                            key={row.progressKey}
                            row={row}
                            locale={locale}
                            uiTheme={uiTheme}
                            variant="default"
                            progress={progressMap[row.progressKey]}
                            onPlay={() => playRow(row, false)}
                            onResume={() => playRow(row, true)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
