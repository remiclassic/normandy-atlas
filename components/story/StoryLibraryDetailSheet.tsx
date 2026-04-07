'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { StoryLibraryRowModel, FocusStats } from '@/lib/story-library-build';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import type { StoryProgressRecord } from '@/lib/story-progress';
import type { StoryCategory, StoryTone } from '@/data/atlas/story-library-meta';
import { arcChromeStyle } from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { buildMapHref } from '@/lib/map-deep-link';
import { copyToClipboard } from '@/lib/progress/share';
import { t, type UiStringKey } from '@/lib/ui-strings';
import { getAtlasEra } from '@/core/era/engine';
import { reliabilityLabelKey } from '@/lib/normandy-story-figures';
import { X, Play, RotateCcw, Link2, ChevronDown, MapPin, Globe, Route } from 'lucide-react';

const CATEGORY_KEY: Record<StoryCategory, UiStringKey> = {
  Origins: 'storyLibrary.category.origins',
  Conquest: 'storyLibrary.category.conquest',
  Expansion: 'storyLibrary.category.expansion',
  Exploration: 'storyLibrary.category.exploration',
  'New France': 'storyLibrary.category.newFrance',
  People: 'storyLibrary.category.people',
  Legacy: 'storyLibrary.category.legacy',
};

const TONE_KEY: Record<StoryTone, UiStringKey> = {
  epic: 'storyLibrary.tone.epic',
  dark: 'storyLibrary.tone.dark',
  exploratory: 'storyLibrary.tone.exploratory',
  foundational: 'storyLibrary.tone.foundational',
  personal: 'storyLibrary.tone.personal',
};

function replaceCount(template: string, count: number | string): string {
  return template.replace(/\{count\}/g, String(count));
}

function replacePct(template: string, pct: number): string {
  return template.replace(/\{pct\}/g, String(Math.round(pct)));
}

function replaceEra(template: string, era: string): string {
  return template.replace(/\{era\}/g, era);
}

function formatTimelineRange(range: { start: number; end: number }): string {
  const fmt = (y: number) => {
    if (y < 0) return `${Math.abs(y)} BCE`;
    return `${y} CE`;
  };
  return `${fmt(range.start)} – ${fmt(range.end)}`;
}

const CHAPTER_COLLAPSE_THRESHOLD = 8;

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  row: StoryLibraryRowModel | null;
  locale: AtlasLocale;
  uiTheme: UiTheme;
  progress?: StoryProgressRecord;
  onClose: () => void;
  onPlay: () => void;
  onResume: () => void;
  relatedRows?: StoryLibraryRowModel[];
  onSelectRelated?: (row: StoryLibraryRowModel) => void;
  resolveRowTitle?: (row: StoryLibraryRowModel) => string;
  /** When a figure has both a reading slug and a map chronicle id, secondary entry to the chronicle. */
  onPlayFigureMapChronicle?: () => void;
}

export const StoryLibraryDetailSheet = memo(function StoryLibraryDetailSheet({
  row,
  locale,
  uiTheme,
  progress,
  onClose,
  onPlay,
  onResume,
  relatedRows = [],
  onSelectRelated,
  resolveRowTitle,
  onPlayFigureMapChronicle,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState<'playback' | 'library' | null>(null);
  const [chaptersExpanded, setChaptersExpanded] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (row) {
      setChaptersExpanded(false);
      queueMicrotask(() => closeRef.current?.focus());
    }
  }, [row]);

  useEffect(() => {
    if (!row) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [row, onClose]);

  const copyPlaybackLink = useCallback(() => {
    if (!row || typeof window === 'undefined') return;
    if (row.meta.rowKind === 'normandyFigure') {
      const slug = row.meta.normanReadingSlug;
      if (!slug) return;
      const u = `${window.location.origin}/norman-readings/${slug}`;
      void copyToClipboard(u).then((ok) => {
        if (!ok) return;
        setCopied('playback');
        window.setTimeout(() => setCopied((c) => (c === 'playback' ? null : c)), 2000);
      });
      return;
    }
    const u = new URL(window.location.origin + window.location.pathname);
    u.searchParams.set('story', row.meta.arcId ?? '');
    u.searchParams.set('step', String(progress?.lastStep ?? 0));
    void copyToClipboard(u.toString()).then((ok) => {
      if (!ok) return;
      setCopied('playback');
      window.setTimeout(() => setCopied((c) => (c === 'playback' ? null : c)), 2000);
    });
  }, [row, progress?.lastStep]);

  const copyLibraryLink = useCallback(() => {
    if (!row || typeof window === 'undefined') return;
    const arcForLibrary =
      row.meta.rowKind === 'normandyFigure'
        ? row.meta.arcId ?? row.progressKey
        : row.meta.arcId === null
          ? ''
          : row.meta.arcId;
    const href = buildMapHref(
      {
        library: true,
        libraryArc: arcForLibrary,
        libraryDetail: true,
      },
      window.location.pathname === '/stories' ? '/stories' : '/',
    );
    const u = new URL(href, window.location.origin);
    void copyToClipboard(u.toString()).then((ok) => {
      if (!ok) return;
      setCopied('library');
      window.setTimeout(() => setCopied((c) => (c === 'library' ? null : c)), 2000);
    });
  }, [row]);

  const toggleChapters = useCallback(() => setChaptersExpanded((v) => !v), []);

  const derived = useMemo(() => {
    if (!row) return null;

    const title = row.meta.displayTitle
      ? pickI18n(row.meta.displayTitle, locale)
      : row.arcEntry
        ? pickI18n(row.arcEntry.label, locale)
        : '';

    const blurb = pickI18n(row.meta.blurb, locale);
    const figureLinked =
      row.meta.rowKind === 'normandyFigure' &&
      Boolean(row.meta.normanReadingSlug || row.meta.legacyAtlanticStoryStepId);
    const hook = row.meta.hook
      ? pickI18n(row.meta.hook, locale)
      : figureLinked
        ? t('storyLibrary.figure.linkedArcHook', locale)
        : '';
    const synopsis = row.meta.synopsisExtended
      ? pickI18n(row.meta.synopsisExtended, locale)
      : null;
    const poster = row.resolvedPosterSrc ? publicAssetUrl(row.resolvedPosterSrc) : null;
    const canResume = Boolean(progress && !progress.completed && progress.lastStep > 0);
    const completed = Boolean(progress?.completed);
    const pct =
      row.sceneCount > 0 && progress
        ? ((progress.lastStep + 1) / row.sceneCount) * 100
        : 0;

    const recommended =
      row.meta.recommendedEraId != null
        ? (() => {
            const era = getAtlasEra(row.meta.recommendedEraId);
            if (!era) return null;
            return replaceEra(t('storyLibrary.startsInEra', locale), pickI18n(era.label, locale));
          })()
        : null;

    const chrome = row.arcEntry ? arcChromeStyle(row.arcEntry, uiTheme) : null;
    const categoryLabel = t(CATEGORY_KEY[row.meta.category], locale);
    const toneLabel = row.meta.tone ? t(TONE_KEY[row.meta.tone], locale) : null;
    const durationLabel = row.meta.estimatedMinutes != null
      ? replaceCount(t('storyLibrary.durationMinutes', locale), row.meta.estimatedMinutes)
      : null;
    let scenesLabel: string;
    if (row.meta.rowKind !== 'normandyFigure') {
      scenesLabel = replaceCount(t('storyLibrary.scenes', locale), row.sceneCount);
    } else if (row.chapterTitlesExtended.length > 0) {
      const parts: string[] = [];
      if (row.meta.normandyFigureReliability) {
        parts.push(t(reliabilityLabelKey(row.meta.normandyFigureReliability), locale));
      }
      parts.push(
        t('storyLibrary.figure.arcStagesCount', locale).replace(
          '{count}',
          String(row.chapterTitlesExtended.length),
        ),
      );
      scenesLabel = parts.join(' · ');
    } else if (row.meta.normandyFigureReliability) {
      scenesLabel = t(reliabilityLabelKey(row.meta.normandyFigureReliability), locale);
    } else {
      scenesLabel = t('storyLibrary.figure.cardMeta', locale);
    }
    const timelineLabel = row.timelineRange ? formatTimelineRange(row.timelineRange) : null;

    return {
      title, blurb, hook, synopsis, poster, canResume, completed, pct,
      recommended, chrome, categoryLabel, toneLabel, durationLabel, scenesLabel, timelineLabel,
    };
  }, [row, locale, uiTheme, progress]);

  if (!row || !derived) return null;

  const {
    title, blurb, hook, synopsis, poster, canResume, completed, pct,
    recommended, chrome, categoryLabel, toneLabel, durationLabel, scenesLabel, timelineLabel,
  } = derived;

  const figurePlayBlocked =
    row.meta.rowKind === 'normandyFigure' &&
    !row.meta.normanReadingSlug &&
    !row.meta.legacyAtlanticStoryStepId;
  const showPlaybackLinkCopy =
    row.meta.rowKind !== 'normandyFigure' || Boolean(row.meta.normanReadingSlug);

  const chapters = row.chapterTitlesExtended;
  const needsCollapse = chapters.length > CHAPTER_COLLAPSE_THRESHOLD;
  const visibleChapters = needsCollapse && !chaptersExpanded
    ? chapters.slice(0, CHAPTER_COLLAPSE_THRESHOLD)
    : chapters;

  const containerVariants = reducedMotion
    ? undefined
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06, delayChildren: 0.1 },
        },
      };

  return (
    <AnimatePresence>
      {row && (
        <>
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="fixed inset-0 z-[65] bg-black/60"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="sheet-content"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={reducedMotion
              ? { duration: 0 }
              : { type: 'spring', damping: 32, stiffness: 350 }
            }
            className="fixed inset-x-0 bottom-0 z-[66] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:rounded-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            style={{
              background: 'var(--color-chrome-popover)',
              borderTop: chrome ? undefined : '1px solid var(--color-chrome-border)',
              border: chrome ? undefined : '1px solid var(--color-chrome-border)',
            }}
          >
            {/* Arc accent strip */}
            {chrome && (
              <div className={`h-[3px] shrink-0 ${chrome.iconBg}`} />
            )}

            {/* Header image — always dark cinematic overlay for text readability */}
            <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden">
              {poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
              )}
              {/* Dark gradient for text readability over any image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white backdrop-blur-sm transition-colors"
                aria-label={t('storyLibrary.aria.close', locale)}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-1">
                  {categoryLabel}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
                  {title}
                </h3>
              </div>

              {/* Image credit */}
              {row.posterCredit && (
                <p className="absolute bottom-1 right-3 text-[8px] text-white/35">
                  {t('storyLibrary.imageCredit', locale).replace('{credit}', row.posterCredit)}
                </p>
              )}
            </div>

            {/* Body — two-column on sm+ */}
            <motion.div
              className="flex-1 overflow-y-auto px-5 pb-6 pt-3 scrollbar-thin"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="sm:grid sm:grid-cols-[1fr_auto] sm:gap-6">
                {/* Left column: overview + chapters */}
                <div className="space-y-4 min-w-0">
                  {/* Badges row */}
                  <motion.div
                    className="flex flex-wrap gap-1.5"
                    variants={reducedMotion ? {} : sectionVariants}
                  >
                    {row.meta.featured && (
                      <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{ background: 'var(--color-gold-glow)', color: 'var(--color-gold)' }}
                      >
                        {t('storyLibrary.badge.featured', locale)}
                      </span>
                    )}
                    {row.meta.isNew && (
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{
                          background: 'color-mix(in srgb, var(--color-blue) 18%, transparent)',
                          color: 'var(--color-blue-bright)',
                        }}
                      >
                        {t('storyLibrary.badge.new', locale)}
                      </span>
                    )}
                    {canResume && (
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{
                          background: 'color-mix(in srgb, var(--color-gold) 20%, transparent)',
                          color: 'var(--color-gold-bright)',
                        }}
                      >
                        {t('storyLibrary.badge.inProgress', locale)}
                      </span>
                    )}
                    {completed && (
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{
                          background:
                            uiTheme === 'light'
                              ? 'color-mix(in srgb, #047857 14%, transparent)'
                              : 'color-mix(in srgb, #34d399 14%, transparent)',
                          color: uiTheme === 'light' ? '#065f46' : '#a7f3d0',
                        }}
                      >
                        {t('storyLibrary.badge.completed', locale)}
                      </span>
                    )}
                  </motion.div>

                  {/* Overview section */}
                  <motion.div className="space-y-2" variants={reducedMotion ? {} : sectionVariants}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: 'var(--color-text-dim)' }}
                    >
                      {t('storyLibrary.section.overview', locale)}
                    </p>
                    {hook && (
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {hook}
                      </p>
                    )}
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                      {blurb}
                    </p>
                    {synopsis && (
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                        {synopsis}
                      </p>
                    )}
                  </motion.div>

                  {/* Chapters section */}
                  {chapters.length > 0 && (
                    <motion.div variants={reducedMotion ? {} : sectionVariants}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
                        style={{ color: 'var(--color-text-dim)' }}
                      >
                        {t('storyLibrary.section.chapters', locale)}
                      </p>
                      <ul className="space-y-1 text-[12px] list-disc list-inside max-h-[200px] overflow-y-auto scrollbar-thin"
                        style={{ color: 'var(--color-text-dim)' }}
                      >
                        {visibleChapters.map((ch, i) => (
                          <li key={i}>{ch}</li>
                        ))}
                      </ul>
                      {needsCollapse && (
                        <button
                          type="button"
                          onClick={toggleChapters}
                          className="mt-1.5 flex items-center gap-1 text-[11px] font-medium transition-colors"
                          style={{ color: 'var(--color-gold)' }}
                        >
                          <ChevronDown
                            className="h-3 w-3 transition-transform duration-200"
                            style={{ transform: chaptersExpanded ? 'rotate(180deg)' : undefined }}
                          />
                          {chaptersExpanded
                            ? t('storyLibrary.showLess', locale)
                            : t('storyLibrary.showMore', locale)}
                        </button>
                      )}
                    </motion.div>
                  )}

                  {relatedRows.length > 0 && onSelectRelated && (
                    <motion.div className="space-y-2" variants={reducedMotion ? {} : sectionVariants}>
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: 'var(--color-text-dim)' }}
                      >
                        {t('storyLibrary.section.related', locale)}
                      </p>
                      <ul className="space-y-1.5">
                        {relatedRows.map((r) => {
                          const relatedTitle = resolveRowTitle
                            ? resolveRowTitle(r)
                            : r.meta.displayTitle
                              ? pickI18n(r.meta.displayTitle, locale)
                              : r.arcEntry
                                ? pickI18n(r.arcEntry.label, locale)
                                : '';
                          const relatedPoster = r.resolvedPosterSrc
                            ? publicAssetUrl(r.resolvedPosterSrc)
                            : null;
                          return (
                            <li key={r.progressKey}>
                              <button
                                type="button"
                                onClick={() => onSelectRelated(r)}
                                className="flex w-full items-center gap-3 rounded-md border px-2 py-2 text-left text-[12px] font-medium transition-colors hover:bg-chrome-fill"
                                style={{
                                  borderColor: 'var(--color-chrome-border)',
                                  color: 'var(--color-text)',
                                }}
                              >
                                <div
                                  className="relative h-11 w-[4.5rem] shrink-0 overflow-hidden rounded"
                                  style={{ background: 'var(--color-chrome-fill)' }}
                                >
                                  {relatedPoster ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={relatedPoster}
                                      alt=""
                                      loading="lazy"
                                      decoding="async"
                                      className="absolute inset-0 h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.03]" />
                                  )}
                                </div>
                                <span className="min-w-0 flex-1 leading-snug line-clamp-2">{relatedTitle}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Right column: details + actions */}
                <div className="space-y-4 mt-4 sm:mt-0 sm:w-52 shrink-0">
                  {/* Details section */}
                  <motion.div className="space-y-2" variants={reducedMotion ? {} : sectionVariants}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: 'var(--color-text-dim)' }}
                    >
                      {t('storyLibrary.section.details', locale)}
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                      <MetaItem label={scenesLabel} />
                      {durationLabel && <MetaItem label={durationLabel} />}
                      {toneLabel && <MetaItem label={toneLabel} />}
                      {canResume && !completed && (
                        <MetaItem label={replacePct(t('storyLibrary.progressPercent', locale), pct)} accent />
                      )}
                    </div>

                    {/* Timeline */}
                    {timelineLabel && (
                      <p className="text-[11px]" style={{ color: 'var(--color-text-dim)' }}>
                        {timelineLabel}
                      </p>
                    )}

                    {/* Focus stats */}
                    <FocusStatsRow stats={row.focusStats} locale={locale} />

                    {recommended && (
                      <p className="text-[11px]" style={{ color: 'var(--color-text-dim)' }}>
                        {recommended}
                      </p>
                    )}
                  </motion.div>

                  {/* Actions */}
                  <motion.div className="flex flex-col gap-2 pt-1" variants={reducedMotion ? {} : sectionVariants}>
                    <button
                      type="button"
                      onClick={onPlay}
                      disabled={figurePlayBlocked}
                      className="flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45"
                      style={{
                        background: uiTheme === 'light' ? 'var(--color-foreground)' : '#fff',
                        color: uiTheme === 'light' ? 'var(--color-background)' : '#000',
                      }}
                    >
                      <Play className="h-4 w-4 fill-current" />
                      {row.meta.rowKind === 'normandyFigure'
                        ? figurePlayBlocked
                          ? t('storyLibrary.figure.noDirectLink', locale)
                          : row.meta.normanReadingSlug
                            ? t('storyLibrary.figure.openLinked', locale)
                            : t('storyLibrary.figure.openMapChronicle', locale)
                        : t('storyLibrary.play', locale)}
                    </button>
                    {row.meta.rowKind === 'normandyFigure' &&
                      !figurePlayBlocked &&
                      row.meta.normanReadingSlug &&
                      row.meta.legacyAtlanticStoryStepId &&
                      onPlayFigureMapChronicle && (
                        <button
                          type="button"
                          onClick={onPlayFigureMapChronicle}
                          className="flex h-10 items-center justify-center gap-2 rounded-md px-5 text-[13px] font-semibold transition-colors"
                          style={{
                            background: 'var(--color-chrome-fill-raised)',
                            color: 'var(--color-text)',
                            border: '1px solid var(--color-chrome-border)',
                          }}
                        >
                          <Play className="h-3.5 w-3.5 fill-current opacity-90" />
                          {t('storyLibrary.figure.openMapChronicle', locale)}
                        </button>
                      )}
                    {canResume && row.meta.rowKind !== 'normandyFigure' && (
                      <button
                        type="button"
                        onClick={onResume}
                        className="flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors"
                        style={{
                          background: 'var(--color-chrome-fill-raised)',
                          color: 'var(--color-text)',
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t('storyLibrary.resume', locale)}
                      </button>
                    )}
                    {showPlaybackLinkCopy && (
                      <button
                        type="button"
                        onClick={copyPlaybackLink}
                        className="flex h-10 items-center justify-center gap-2 rounded-md px-3 text-[12px] transition-colors"
                        style={{ color: 'var(--color-text-dim)' }}
                        aria-label={t('storyLibrary.copyPlaybackLink', locale)}
                      >
                        <Link2 className="h-3.5 w-3.5 opacity-70" />
                        {copied === 'playback'
                          ? t('storyLibrary.linkCopied', locale)
                          : row.meta.rowKind === 'normandyFigure'
                            ? t('storyLibrary.copyReadingLink', locale)
                            : t('storyLibrary.copyPlaybackLink', locale)}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={copyLibraryLink}
                      className="flex h-10 items-center justify-center gap-2 rounded-md px-3 text-[12px] transition-colors"
                      style={{ color: 'var(--color-text-dim)' }}
                      aria-label={t('storyLibrary.copyLibraryLink', locale)}
                    >
                      <Link2 className="h-3.5 w-3.5 opacity-70" />
                      {copied === 'library'
                        ? t('storyLibrary.linkCopied', locale)
                        : t('storyLibrary.copyLibraryLink', locale)}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

function MetaItem({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span style={{ color: accent ? 'var(--color-gold)' : 'var(--color-text-dim)' }}>
      {label}
    </span>
  );
}

function FocusStatsRow({ stats, locale }: { stats: FocusStats; locale: AtlasLocale }) {
  const items: { icon: typeof MapPin; label: string }[] = [];
  if (stats.uniquePlaces > 0) {
    items.push({
      icon: MapPin,
      label: replaceCount(t('storyLibrary.focusPlaces', locale), stats.uniquePlaces),
    });
  }
  if (stats.uniqueRegions > 0) {
    items.push({
      icon: Globe,
      label: replaceCount(t('storyLibrary.focusRegions', locale), stats.uniqueRegions),
    });
  }
  if (stats.uniqueRoutes > 0) {
    items.push({
      icon: Route,
      label: replaceCount(t('storyLibrary.focusRoutes', locale), stats.uniqueRoutes),
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1 text-[11px]"
          style={{ color: 'var(--color-text-dim)' }}
        >
          <item.icon className="h-3 w-3 opacity-60" />
          {item.label}
        </span>
      ))}
    </div>
  );
}
