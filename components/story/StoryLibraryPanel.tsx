'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import {
  buildStoryLibraryRows,
  pickFeaturedRow,
  type StoryLibraryRowModel,
} from '@/lib/story-library-build';
import { readStoryProgressMap } from '@/lib/story-progress';
import { t } from '@/lib/ui-strings';
import { StoryLibraryFeaturedPanel } from '@/components/story/StoryLibraryFeaturedPanel';
import { StoryLibraryFilterBar, type FilterValue } from '@/components/story/StoryLibraryFilterBar';
import { StoryLibraryEditorialGrid } from '@/components/story/StoryLibraryEditorialGrid';
import { StoryLibraryDetailSheet } from '@/components/story/StoryLibraryDetailSheet';
import { ArrowLeft } from 'lucide-react';

export default function StoryLibraryPanel({
  open,
  onClose,
  useShellChrome = true,
}: {
  open: boolean;
  onClose: () => void;
  useShellChrome?: boolean;
}) {
  const locale = useLocale();
  const uiTheme = useMapStore((s) => s.uiTheme);
  const startStory = useMapStore((s) => s.startStory);
  const goToStoryStep = useMapStore((s) => s.goToStoryStep);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const [progressEpoch, setProgressEpoch] = useState(0);
  const [activeRow, setActiveRow] = useState<StoryLibraryRowModel | null>(null);
  const [hoverPreviewRow, setHoverPreviewRow] = useState<StoryLibraryRowModel | null>(null);
  const [selectedRow, setSelectedRow] = useState<StoryLibraryRowModel | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterValue>('all');
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rows = useMemo(() => buildStoryLibraryRows(locale), [locale]);
  const progressMap = useMemo(() => {
    void progressEpoch;
    return readStoryProgressMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressEpoch, open]);

  // Initialize activeRow when panel opens
  useEffect(() => {
    if (open) {
      setProgressEpoch((e) => e + 1);
      if (!useShellChrome) {
        queueMicrotask(() => closeRef.current?.focus());
      }
      const featured = pickFeaturedRow(rows);
      setActiveRow(featured ?? rows[0] ?? null);
      setFilterCategory('all');
      setHoverPreviewRow(null);
    } else {
      setSelectedRow(null);
      setHoverPreviewRow(null);
    }
  }, [open, useShellChrome, rows]);

  // Escape key handling
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

  // Clean up hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const displayedRow = hoverPreviewRow ?? activeRow;

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
      setSelectedRow(null);
      onClose();
    },
    [startStory, goToStoryStep, onClose, progressMap],
  );

  const handleCardSelect = useCallback((row: StoryLibraryRowModel) => {
    setActiveRow(row);
    setHoverPreviewRow(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const handleCardHoverEnter = useCallback((row: StoryLibraryRowModel) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoverPreviewRow(row);
    }, 100);
  }, []);

  const handleCardHoverLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoverPreviewRow(null);
  }, []);

  const handlePlay = useCallback(() => {
    if (displayedRow) playRow(displayedRow, false);
  }, [displayedRow, playRow]);

  const handleResume = useCallback(() => {
    if (displayedRow) playRow(displayedRow, true);
  }, [displayedRow, playRow]);

  const handleViewChapters = useCallback(() => {
    if (displayedRow) setSelectedRow(displayedRow);
  }, [displayedRow]);

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
          aria-label={t('storyLibrary.chronicle.title', locale)}
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
            background: 'linear-gradient(145deg, #060812 0%, #0c1022 50%, #060812 100%)',
            paddingTop: useShellChrome ? undefined : 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Standalone header (when not using shell chrome) */}
          {!useShellChrome && (
            <header
              className="sticky top-0 z-[63] flex items-center justify-between gap-3 px-4 py-3 backdrop-blur-md border-b sm:px-10"
              style={{
                background: 'rgba(6,8,18,0.85)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex min-h-11 shrink-0 touch-target items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
                aria-label={t('storyLibrary.backToMap', locale)}
              >
                <ArrowLeft className="h-5 w-5 text-amber-200/90" strokeWidth={2.25} aria-hidden />
                {t('storyLibrary.backToMap', locale)}
              </button>
              <div className="min-w-0 flex-1 text-right">
                <h1 className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                  {t('storyLibrary.chronicle.title', locale)}
                </h1>
                <p className="text-[11px] truncate text-white/40">
                  {t('storyLibrary.subtitle', locale)}
                </p>
              </div>
            </header>
          )}

          {/* Split-screen body */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
            {/* LEFT: Featured story panel */}
            <div className="relative h-[55vh] shrink-0 lg:h-auto lg:flex-[0_0_57%] xl:flex-[0_0_58%]">
              <StoryLibraryFeaturedPanel
                row={displayedRow}
                locale={locale}
                uiTheme={uiTheme}
                progress={displayedRow ? progressMap[displayedRow.progressKey] : undefined}
                onPlay={handlePlay}
                onResume={handleResume}
                onViewChapters={handleViewChapters}
              />
            </div>

            {/* RIGHT: Filter bar + editorial grid */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:border-l" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {/* Title + filter bar */}
              <div className="shrink-0 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between px-4 pt-4 pb-1 lg:px-5">
                  <h2
                    className="font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {t('storyLibrary.chronicle.title', locale)}
                  </h2>
                </div>
                <StoryLibraryFilterBar
                  value={filterCategory}
                  onChange={setFilterCategory}
                  locale={locale}
                />
              </div>

              {/* Scrollable grid */}
              <div className="flex-1 overflow-y-auto scrollbar-thin pt-4">
                <StoryLibraryEditorialGrid
                  rows={rows}
                  filter={filterCategory}
                  locale={locale}
                  uiTheme={uiTheme}
                  progressMap={progressMap}
                  onSelect={handleCardSelect}
                  onHoverEnter={handleCardHoverEnter}
                  onHoverLeave={handleCardHoverLeave}
                />
              </div>
            </div>
          </div>

          {/* Detail sheet for selected story */}
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
