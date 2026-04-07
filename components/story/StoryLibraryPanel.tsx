'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import {
  buildStoryLibraryRows,
  pickFeaturedRow,
  storyLibraryAtlasErasWithStories,
  storyLibraryRowSearchHaystack,
  type StoryLibraryRowModel,
} from '@/lib/story-library-build';
import {
  libraryCategoryMembership,
  storyLibraryMetaSharesCategory,
} from '@/data/atlas/story-library-meta';
import { readStoryProgressMap } from '@/lib/story-progress';
import { t } from '@/lib/ui-strings';
import { StoryLibraryFeaturedPanel } from '@/components/story/StoryLibraryFeaturedPanel';
import { StoryLibraryFilterBar, type FilterValue } from '@/components/story/StoryLibraryFilterBar';
import {
  StoryLibraryEraFilterBar,
  type EraFilterValue,
} from '@/components/story/StoryLibraryEraFilterBar';
import { StoryLibraryEditorialGrid } from '@/components/story/StoryLibraryEditorialGrid';
import { StoryLibraryDetailSheet } from '@/components/story/StoryLibraryDetailSheet';
import { useIsMobile } from '@/hooks/use-responsive';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GENEALOGY_NORMAN_IDENTITY_PATH } from '@/lib/genealogy-paths';
import {
  clearPendingLegacyAtlanticStoryStepIndex,
  setPendingLegacyAtlanticStoryStepIndex,
} from '@/lib/pending-legacy-atlantic-story';
import { normanAtlanticStory } from '@/data/stories';

export default function StoryLibraryPanel({
  open,
  onClose,
  pathnameOverride,
  useShellChrome = true,
  bootstrap = null,
  onBootstrapConsumed,
  allRowsOverride,
}: {
  open: boolean;
  onClose: () => void;
  /** When the story library is used outside `/`, set this so “Map chronicle” can still deep-link home. */
  pathnameOverride?: string;
  useShellChrome?: boolean;
  bootstrap?: {
    focusProgressKey?: string;
    openDetail?: boolean;
    focusEraId?: string;
  } | null;
  onBootstrapConsumed?: () => void;
  /** Standalone page: catalog is fixed; skip rebuild when locale updates if not needed. */
  allRowsOverride?: StoryLibraryRowModel[];
}) {
  const locale = useLocale();
  const router = useRouter();
  const routerPathname = usePathname();
  const pathname = pathnameOverride ?? routerPathname;
  const uiTheme = useMapStore((s) => s.uiTheme);
  const startStory = useMapStore((s) => s.startStory);
  const setAtlasMode = useMapStore((s) => s.setAtlasMode);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const [progressEpoch, setProgressEpoch] = useState(0);
  const [activeRow, setActiveRow] = useState<StoryLibraryRowModel | null>(null);
  const [hoverPreviewRow, setHoverPreviewRow] = useState<StoryLibraryRowModel | null>(null);
  const [selectedRow, setSelectedRow] = useState<StoryLibraryRowModel | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterValue>('all');
  const [filterEraId, setFilterEraId] = useState<EraFilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appliedBootstrapSigRef = useRef<string | null>(null);
  const skipFeaturedOnceRef = useRef(false);
  const wasOpenRef = useRef(false);

  const rows = useMemo(
    () => allRowsOverride ?? buildStoryLibraryRows(locale),
    [allRowsOverride, locale],
  );
  const progressMap = useMemo(() => {
    void progressEpoch;
    return readStoryProgressMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressEpoch, open]);

  const erasWithStories = useMemo(
    () => storyLibraryAtlasErasWithStories(rows),
    [rows],
  );

  useEffect(() => {
    if (
      filterEraId !== 'all' &&
      !erasWithStories.some((e) => e.id === filterEraId)
    ) {
      setFilterEraId('all');
    }
  }, [erasWithStories, filterEraId]);

  const afterCategory = useMemo(() => {
    if (filterCategory === 'all') return rows;
    return rows.filter((r) => libraryCategoryMembership(r.meta).includes(filterCategory));
  }, [rows, filterCategory]);

  const filteredRows = useMemo(() => {
    if (filterEraId === 'all') return afterCategory;
    return afterCategory.filter((r) => r.relatedEraIds.includes(filterEraId));
  }, [afterCategory, filterEraId]);

  const searchNorm = searchQuery.trim().toLowerCase();
  const gridRows = useMemo(() => {
    if (!searchNorm) return filteredRows;
    return filteredRows.filter((r) =>
      storyLibraryRowSearchHaystack(r, locale).includes(searchNorm),
    );
  }, [filteredRows, searchNorm, locale]);

  const continueWatchingRows = useMemo(() => {
    return filteredRows
      .filter((r) => {
        const p = progressMap[r.progressKey];
        return Boolean(p && !p.completed && p.lastStep > 0);
      })
      .sort(
        (a, b) =>
          (progressMap[b.progressKey]?.lastPlayedAt ?? 0) -
          (progressMap[a.progressKey]?.lastPlayedAt ?? 0),
      );
  }, [filteredRows, progressMap]);

  const activeIndex = useMemo(() => {
    if (!activeRow) return 0;
    const idx = filteredRows.findIndex((r) => r.progressKey === activeRow.progressKey);
    return idx >= 0 ? idx : 0;
  }, [filteredRows, activeRow]);

  useEffect(() => {
    if (!activeRow) return;
    if (!filteredRows.some((r) => r.progressKey === activeRow.progressKey)) {
      setActiveRow(filteredRows[0] ?? null);
      setHoverPreviewRow(null);
    }
  }, [filteredRows, activeRow]);

  useEffect(() => {
    if (!open) {
      wasOpenRef.current = false;
      setSelectedRow(null);
      setHoverPreviewRow(null);
      appliedBootstrapSigRef.current = null;
      setSearchQuery('');
      return;
    }

    const justOpened = !wasOpenRef.current;
    if (!wasOpenRef.current) {
      wasOpenRef.current = true;
      setProgressEpoch((e) => e + 1);
      if (!useShellChrome) {
        queueMicrotask(() => closeRef.current?.focus());
      }
    }
    setFilterCategory('all');
    setHoverPreviewRow(null);

    if (
      bootstrap?.focusEraId &&
      erasWithStories.some((e) => e.id === bootstrap.focusEraId)
    ) {
      setFilterEraId(bootstrap.focusEraId);
    } else if (justOpened && !bootstrap?.focusEraId) {
      setFilterEraId('all');
    }

    if (bootstrap) {
      const sig = JSON.stringify(bootstrap);
      if (appliedBootstrapSigRef.current !== sig) {
        appliedBootstrapSigRef.current = sig;
        if (bootstrap.focusProgressKey != null) {
          const row = rows.find((r) => r.progressKey === bootstrap.focusProgressKey);
          if (row) {
            setActiveRow(row);
            if (bootstrap.openDetail) setSelectedRow(row);
            else setSelectedRow(null);
          } else {
            setActiveRow(pickFeaturedRow(rows) ?? rows[0] ?? null);
            setSelectedRow(null);
          }
        } else if (bootstrap.focusEraId) {
          const inEra = rows.filter((r) =>
            r.relatedEraIds.includes(bootstrap.focusEraId!),
          );
          setActiveRow(
            pickFeaturedRow(inEra) ??
              inEra[0] ??
              pickFeaturedRow(rows) ??
              rows[0] ??
              null,
          );
          setSelectedRow(null);
        } else {
          setActiveRow(pickFeaturedRow(rows) ?? rows[0] ?? null);
          setSelectedRow(null);
        }
        onBootstrapConsumed?.();
      }
      skipFeaturedOnceRef.current = true;
      return;
    }

    if (skipFeaturedOnceRef.current) {
      skipFeaturedOnceRef.current = false;
      return;
    }

    appliedBootstrapSigRef.current = null;
    const featured = pickFeaturedRow(rows);
    setActiveRow(featured ?? rows[0] ?? null);
  }, [open, useShellChrome, rows, bootstrap, onBootstrapConsumed, erasWithStories]);

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

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const displayedRow = hoverPreviewRow ?? activeRow;

  const launchLegacyAtlanticChronicle = useCallback(
    (stepIndex: number) => {
      if (pathname === '/stories') {
        setPendingLegacyAtlanticStoryStepIndex(stepIndex);
        onClose();
        return;
      }
      clearPendingLegacyAtlanticStoryStepIndex();
      if (useMapStore.getState().atlasMode) setAtlasMode(false);
      startStory(null, { stepIndex });
      onClose();
    },
    [pathname, onClose, setAtlasMode, startStory],
  );

  const playRow = useCallback(
    (row: StoryLibraryRowModel, resume: boolean) => {
      if (row.meta.rowKind === 'normandyFigure') {
        const slug = row.meta.normanReadingSlug;
        const stepId = row.meta.legacyAtlanticStoryStepId;
        if (slug) {
          clearPendingLegacyAtlanticStoryStepIndex();
          router.push(`/norman-readings/${slug}`);
          setSelectedRow(null);
          onClose();
          return;
        }
        if (stepId) {
          const idx = normanAtlanticStory.findIndex((s) => s.id === stepId);
          if (idx >= 0) {
            launchLegacyAtlanticChronicle(idx);
            setSelectedRow(null);
            return;
          }
        }
        return;
      }

      clearPendingLegacyAtlanticStoryStepIndex();
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
    [startStory, onClose, progressMap, router, launchLegacyAtlanticChronicle],
  );

  const handleCardSelect = useCallback(
    (row: StoryLibraryRowModel) => {
      setActiveRow(row);
      setHoverPreviewRow(null);
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      if (isMobile) {
        scrollBodyRef.current?.scrollTo({
          top: 0,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [isMobile, reducedMotion],
  );

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

  const goToNextHero = useCallback(() => {
    if (filteredRows.length === 0) return;
    const next = (activeIndex + 1) % filteredRows.length;
    setActiveRow(filteredRows[next]);
    setHoverPreviewRow(null);
  }, [filteredRows, activeIndex]);

  const goToPrevHero = useCallback(() => {
    if (filteredRows.length === 0) return;
    const prev = (activeIndex - 1 + filteredRows.length) % filteredRows.length;
    setActiveRow(filteredRows[prev]);
    setHoverPreviewRow(null);
  }, [filteredRows, activeIndex]);

  const handlePlay = useCallback(() => {
    if (!displayedRow) return;
    if (
      displayedRow.meta.rowKind === 'normandyFigure' &&
      !displayedRow.meta.normanReadingSlug &&
      !displayedRow.meta.legacyAtlanticStoryStepId
    ) {
      setSelectedRow(displayedRow);
      return;
    }
    playRow(displayedRow, false);
  }, [displayedRow, playRow]);

  const handleResume = useCallback(() => {
    if (displayedRow) playRow(displayedRow, true);
  }, [displayedRow, playRow]);

  const handleViewChapters = useCallback(() => {
    if (displayedRow) setSelectedRow(displayedRow);
  }, [displayedRow]);

  const handleDetailClose = useCallback(() => setSelectedRow(null), []);

  const handleDetailPlay = useCallback(() => {
    if (!selectedRow) return;
    if (
      selectedRow.meta.rowKind === 'normandyFigure' &&
      !selectedRow.meta.normanReadingSlug &&
      !selectedRow.meta.legacyAtlanticStoryStepId
    ) {
      return;
    }
    playRow(selectedRow, false);
  }, [selectedRow, playRow]);

  const handleDetailResume = useCallback(() => {
    if (!selectedRow || selectedRow.meta.rowKind === 'normandyFigure') return;
    playRow(selectedRow, true);
  }, [selectedRow, playRow]);

  const playFigureMapChronicle = useCallback(
    (row: StoryLibraryRowModel) => {
      if (row.meta.rowKind !== 'normandyFigure') return;
      const stepId = row.meta.legacyAtlanticStoryStepId;
      if (!stepId) return;
      const idx = normanAtlanticStory.findIndex((s) => s.id === stepId);
      if (idx >= 0) {
        launchLegacyAtlanticChronicle(idx);
        setSelectedRow((r) => (r?.progressKey === row.progressKey ? null : r));
      }
    },
    [launchLegacyAtlanticChronicle],
  );

  const relatedRows = useMemo(() => {
    if (!selectedRow) return [];
    return rows
      .filter(
        (r) =>
          r.progressKey !== selectedRow.progressKey &&
          storyLibraryMetaSharesCategory(r.meta, selectedRow.meta),
      )
      .slice(0, 4);
  }, [rows, selectedRow]);

  const resolveRowTitle = useCallback(
    (row: StoryLibraryRowModel) => {
      if (row.meta.displayTitle) return pickI18n(row.meta.displayTitle, locale);
      if (row.arcEntry) return pickI18n(row.arcEntry.label, locale);
      return '';
    },
    [locale],
  );

  const handleRelatedSelect = useCallback(
    (row: StoryLibraryRowModel) => {
      setSelectedRow(row);
      setActiveRow(row);
      setHoverPreviewRow(null);
    },
    [],
  );

  if (typeof document === 'undefined') return null;

  const motionDuration = reducedMotion ? 0 : 0.25;
  const searchMode = searchNorm.length > 0;
  const isLight = uiTheme === 'light';
  const shellBackground = isLight
    ? 'linear-gradient(145deg, var(--color-background-warm) 0%, var(--color-background) 42%, var(--color-background-warm) 100%)'
    : 'linear-gradient(145deg, #060812 0%, #0c1022 50%, #060812 100%)';

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
            background: shellBackground,
            paddingTop: useShellChrome ? undefined : 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {!useShellChrome && (
            <header
              className={`sticky top-0 z-[63] flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur-md sm:px-10 ${
                isLight
                  ? 'border-border bg-surface-elevated/95'
                  : 'border-white/[0.08] bg-[rgba(6,8,18,0.85)]'
              }`}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className={`flex min-h-11 shrink-0 touch-target items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                  isLight
                    ? 'border-chrome-border bg-chrome-fill text-foreground hover:bg-chrome-fill-hover'
                    : 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                }`}
                    aria-label={t('storyLibrary.backToMap', locale)}
              >
                <ArrowLeft
                  className={`h-5 w-5 stroke-[2.25] ${isLight ? 'text-gold' : 'text-amber-200/90'}`}
                  aria-hidden
                />
                {t('storyLibrary.backToMap', locale)}
              </button>
              <div className="min-w-0 flex-1 text-right">
                <h1
                  className={`font-display text-base sm:text-lg font-bold tracking-tight ${
                    isLight ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {t('storyLibrary.chronicle.title', locale)}
                </h1>
                <p
                  className={`truncate text-[11px] ${isLight ? 'text-text-muted' : 'text-white/40'}`}
                >
                  {t('storyLibrary.subtitle', locale)}
                </p>
              </div>
            </header>
          )}

          <div
            ref={scrollBodyRef}
            className="flex-1 min-h-0 flex flex-col overflow-y-auto overscroll-y-contain lg:flex-row lg:overflow-hidden"
          >
            <div className="relative h-[55vh] shrink-0 lg:h-auto lg:flex-[0_0_57%] xl:flex-[0_0_58%]">
              <StoryLibraryFeaturedPanel
                row={displayedRow}
                locale={locale}
                uiTheme={uiTheme}
                progress={
                  displayedRow ? progressMap[displayedRow.progressKey] : undefined
                }
                onPlay={handlePlay}
                onResume={handleResume}
                onViewChapters={handleViewChapters}
                isMobile={isMobile}
                activeIndex={activeIndex}
                totalCount={filteredRows.length}
                onSwipeNext={goToNextHero}
                onSwipePrev={goToPrevHero}
                onPlayFigureMapChronicle={
                  displayedRow?.meta.rowKind === 'normandyFigure' &&
                  displayedRow.meta.normanReadingSlug &&
                  displayedRow.meta.legacyAtlanticStoryStepId
                    ? () => playFigureMapChronicle(displayedRow)
                    : undefined
                }
              />
            </div>

            <div
              className={`flex flex-col border-t lg:border-t-0 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:border-l ${
                isLight ? 'border-border' : 'border-white/[0.06]'
              }`}
            >
              <div
                className={`shrink-0 border-b px-4 py-3 lg:px-5 ${isLight ? 'border-border' : 'border-white/[0.06]'}`}
              >
                <Link
                  href={GENEALOGY_NORMAN_IDENTITY_PATH}
                  className={
                    isLight
                      ? 'block rounded-lg border border-cyan-800/20 bg-cyan-950/[0.06] px-3 py-2.5 text-[12px] font-semibold leading-snug text-cyan-950 transition-colors hover:border-cyan-800/35 hover:bg-cyan-950/[0.09]'
                      : 'block rounded-none border border-cyan-400/25 bg-cyan-400/8 px-3 py-2.5 text-[12px] font-semibold leading-snug text-cyan-100/95 transition-colors hover:border-cyan-400/45 hover:bg-cyan-400/12'
                  }
                >
                  <span
                    className={`block text-[10px] font-bold uppercase tracking-[0.18em] ${
                      isLight ? 'text-cyan-900/90' : 'text-cyan-200/80'
                    }`}
                  >
                    {t('normanIdentity.cta.discover', locale)}
                  </span>
                  <span
                    className={`mt-1 block text-[11px] font-normal ${
                      isLight ? 'text-text-muted' : 'text-white/70'
                    }`}
                  >
                    {t('normanIdentity.banner.storyLibrary', locale)}
                  </span>
                </Link>
              </div>
              <div
                className={`shrink-0 border-b ${isLight ? 'border-border' : 'border-white/[0.06]'}`}
              >
                <div className="flex flex-col gap-2 px-4 pt-4 pb-1 lg:px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <h2
                    className={`font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] ${
                      isLight ? 'text-text-dim' : 'text-white/35'
                    }`}
                  >
                    {t('storyLibrary.chronicle.title', locale)}
                  </h2>
                  <div className="relative flex min-h-10 w-full sm:max-w-xs">
                    <Search
                      className={`pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${
                        isLight ? 'text-text-dim' : 'text-white/35'
                      }`}
                      aria-hidden
                    />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('storyLibrary.searchPlaceholder', locale)}
                      aria-label={t('storyLibrary.searchAria', locale)}
                      className={`w-full rounded-lg border py-2 pl-8 pr-9 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 ${
                        isLight
                          ? 'border-chrome-border bg-chrome-fill text-foreground placeholder:text-text-dim'
                          : 'border-white/12 bg-white/[0.06] text-white placeholder:text-white/35'
                      }`}
                    />
                    {searchQuery.trim() !== '' && (
                      <button
                        type="button"
                        className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 ${
                          isLight
                            ? 'text-text-muted hover:text-foreground'
                            : 'text-white/45 hover:text-white/80'
                        }`}
                        aria-label={t('storyLibrary.clearSearch', locale)}
                        onClick={() => {
                          setSearchQuery('');
                          searchInputRef.current?.focus();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <StoryLibraryFilterBar
                  value={filterCategory}
                  onChange={setFilterCategory}
                  locale={locale}
                  uiTheme={uiTheme}
                />
                <StoryLibraryEraFilterBar
                  eras={erasWithStories}
                  value={filterEraId}
                  onChange={setFilterEraId}
                  locale={locale}
                  uiTheme={uiTheme}
                />
              </div>

              <div className="pt-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain scrollbar-thin">
                <StoryLibraryEditorialGrid
                  rows={gridRows}
                  filter={filterCategory}
                  locale={locale}
                  uiTheme={uiTheme}
                  progressMap={progressMap}
                  selectedKey={activeRow?.progressKey ?? null}
                  onSelect={handleCardSelect}
                  onHoverEnter={handleCardHoverEnter}
                  onHoverLeave={handleCardHoverLeave}
                  continueWatchingRows={continueWatchingRows}
                  searchMode={searchMode}
                />
              </div>
            </div>
          </div>

          <StoryLibraryDetailSheet
            row={selectedRow}
            locale={locale}
            uiTheme={uiTheme}
            progress={
              selectedRow ? progressMap[selectedRow.progressKey] : undefined
            }
            onClose={handleDetailClose}
            onPlay={handleDetailPlay}
            onResume={handleDetailResume}
            relatedRows={relatedRows}
            onSelectRelated={handleRelatedSelect}
            resolveRowTitle={resolveRowTitle}
            onPlayFigureMapChronicle={
              selectedRow?.meta.rowKind === 'normandyFigure' &&
              selectedRow.meta.normanReadingSlug &&
              selectedRow.meta.legacyAtlanticStoryStepId
                ? () => playFigureMapChronicle(selectedRow)
                : undefined
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
