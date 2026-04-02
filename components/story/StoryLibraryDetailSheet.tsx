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
import { t, type UiStringKey } from '@/lib/ui-strings';
import { getAtlasEra } from '@/core/era/engine';
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
}

export const StoryLibraryDetailSheet = memo(function StoryLibraryDetailSheet({
  row,
  locale,
  uiTheme,
  progress,
  onClose,
  onPlay,
  onResume,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
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

  const onCopyLink = useCallback(() => {
    if (!row || typeof window === 'undefined') return;
    const u = new URL(window.location.href);
    u.search = '';
    u.searchParams.set('story', row.meta.arcId ?? '');
    u.searchParams.set('step', String(progress?.lastStep ?? 0));
    void navigator.clipboard.writeText(u.toString()).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [row, progress?.lastStep]);

  const toggleChapters = useCallback(() => setChaptersExpanded((v) => !v), []);

  const derived = useMemo(() => {
    if (!row) return null;

    const title = row.meta.displayTitle
      ? pickI18n(row.meta.displayTitle, locale)
      : row.arcEntry
        ? pickI18n(row.arcEntry.label, locale)
        : '';

    const blurb = pickI18n(row.meta.blurb, locale);
    const hook = row.meta.hook ? pickI18n(row.meta.hook, locale) : '';
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
    const scenesLabel = replaceCount(t('storyLibrary.scenes', locale), row.sceneCount);
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
                      <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-300">
                        {t('storyLibrary.badge.new', locale)}
                      </span>
                    )}
                    {canResume && (
                      <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200/90">
                        {t('storyLibrary.badge.inProgress', locale)}
                      </span>
                    )}
                    {completed && (
                      <span className="rounded-md bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200/90">
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
                      className="flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-bold transition-colors"
                      style={{
                        background: uiTheme === 'light' ? 'var(--color-foreground)' : '#fff',
                        color: uiTheme === 'light' ? 'var(--color-background)' : '#000',
                      }}
                    >
                      <Play className="h-4 w-4 fill-current" />
                      {t('storyLibrary.play', locale)}
                    </button>
                    {canResume && (
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
                    <button
                      type="button"
                      onClick={onCopyLink}
                      className="flex h-10 items-center justify-center gap-2 rounded-md px-3 text-[12px] transition-colors"
                      style={{ color: 'var(--color-text-dim)' }}
                      aria-label={t('storyLibrary.copyLink', locale)}
                    >
                      <Link2 className="h-3.5 w-3.5 opacity-70" />
                      {copied ? t('storyLibrary.linkCopied', locale) : t('storyLibrary.copyLink', locale)}
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
