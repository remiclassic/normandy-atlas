'use client';

import { memo, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { StoryLibraryRowModel } from '@/lib/story-library-build';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import type { StoryProgressRecord } from '@/lib/story-progress';
import type { StoryCategory, StoryTone } from '@/data/atlas/story-library-meta';
import { arcChromeStyle } from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t, type UiStringKey } from '@/lib/ui-strings';
import { Play, RotateCcw } from 'lucide-react';

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

function formatTimelineRange(range: { start: number; end: number }): string {
  const fmt = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);
  return `${fmt(range.start)} – ${fmt(range.end)}`;
}

interface Props {
  row: StoryLibraryRowModel | null;
  locale: AtlasLocale;
  uiTheme: UiTheme;
  progress?: StoryProgressRecord;
  onPlay: () => void;
  onResume: () => void;
  onViewChapters: () => void;
}

export const StoryLibraryFeaturedPanel = memo(function StoryLibraryFeaturedPanel({
  row,
  locale,
  uiTheme,
  progress,
  onPlay,
  onResume,
  onViewChapters,
}: Props) {
  const reducedMotion = useReducedMotion();

  const derived = useMemo(() => {
    if (!row) return null;

    const title = row.meta.displayTitle
      ? pickI18n(row.meta.displayTitle, locale)
      : row.arcEntry
        ? pickI18n(row.arcEntry.label, locale)
        : '';

    const hook = row.meta.hook ? pickI18n(row.meta.hook, locale) : '';
    const blurb = pickI18n(row.meta.blurb, locale);
    const poster = row.resolvedPosterSrc ? publicAssetUrl(row.resolvedPosterSrc) : null;
    const canResume = Boolean(progress && !progress.completed && progress.lastStep > 0);
    const chrome = row.arcEntry ? arcChromeStyle(row.arcEntry, uiTheme) : null;

    const categoryLabel = t(CATEGORY_KEY[row.meta.category], locale);
    const toneLabel = row.meta.tone ? t(TONE_KEY[row.meta.tone], locale) : null;
    const durationLabel = row.meta.estimatedMinutes != null
      ? t('storyLibrary.durationMinutes', locale).replace('{count}', String(row.meta.estimatedMinutes))
      : null;
    const scenesLabel = t('storyLibrary.scenes', locale).replace('{count}', String(row.sceneCount));
    const timelineLabel = row.timelineRange ? formatTimelineRange(row.timelineRange) : null;

    return {
      title, hook, blurb, poster, canResume, chrome,
      categoryLabel, toneLabel, durationLabel, scenesLabel, timelineLabel,
    };
  }, [row, locale, uiTheme, progress]);

  if (!row || !derived) {
    return (
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1628] to-[#0a0e1a]" />
      </div>
    );
  }

  const {
    title, hook, blurb, poster, canResume, chrome,
    categoryLabel, toneLabel, durationLabel, scenesLabel, timelineLabel,
  } = derived;

  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={row.progressKey}
          className="absolute inset-0"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1628] to-[#0a0e1a]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark cinematic overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(6,8,18,0.97) 0%, rgba(6,8,18,0.78) 30%, rgba(6,8,18,0.38) 55%, rgba(6,8,18,0.18) 78%, rgba(6,8,18,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(6,8,18,0.8) 0%, rgba(6,8,18,0.4) 40%, rgba(6,8,18,0.12) 65%, transparent 85%)',
        }}
      />

      {/* Vignette edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 120px 40px rgba(6,8,18,0.5)',
        }}
      />

      {/* Faint atlas texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.08) 40px)',
        }}
      />

      {/* Arc accent strip */}
      {chrome && (
        <div className={`absolute inset-x-0 top-0 z-[1] h-[3px] ${chrome.iconBg}`} />
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={row.progressKey}
          className="relative z-[1] flex flex-col gap-4 p-6 pb-8 sm:p-8 sm:pb-10 lg:p-10 lg:pb-12"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em]">
            {row.meta.featured && (
              <span className="rounded px-2 py-0.5 font-bold bg-amber-400/20 text-amber-300">
                {t('storyLibrary.badge.featured', locale)}
              </span>
            )}
            <span className="text-white/55">{categoryLabel}</span>
            {toneLabel && (
              <>
                <span className="text-white/25">·</span>
                <span className="text-white/55">{toneLabel}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {title}
          </h2>

          {/* Hook */}
          {(hook || blurb) && (
            <p className="max-w-lg text-sm sm:text-base text-white/80 leading-relaxed line-clamp-3 drop-shadow-md">
              {hook || blurb}
            </p>
          )}

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/50">
            {timelineLabel && <span>{timelineLabel}</span>}
            {timelineLabel && <span className="text-white/20">·</span>}
            <span>{scenesLabel}</span>
            {durationLabel && (
              <>
                <span className="text-white/20">·</span>
                <span>~{durationLabel}</span>
              </>
            )}
            <span className="text-white/20">·</span>
            <span>{categoryLabel} Arc</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <motion.button
              type="button"
              onClick={onPlay}
              whileHover={reducedMotion ? undefined : { scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="flex h-11 sm:h-12 items-center gap-2.5 rounded-md bg-white px-6 sm:px-8 text-sm font-bold text-black hover:bg-white/90 transition-colors shadow-lg shadow-black/30"
            >
              <Play className="h-4 w-4 fill-current" />
              {t('storyLibrary.beginJourney', locale)}
            </motion.button>

            {canResume && (
              <motion.button
                type="button"
                onClick={onResume}
                whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                className="flex h-11 sm:h-12 items-center gap-2.5 rounded-md bg-white/15 px-6 sm:px-8 text-sm font-semibold text-white hover:bg-white/25 backdrop-blur-sm transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                {t('storyLibrary.resume', locale)}
              </motion.button>
            )}

            <button
              type="button"
              onClick={onViewChapters}
              className="flex h-11 items-center px-2 text-[12px] font-medium text-white/60 hover:text-white/90 transition-colors tracking-wide"
            >
              — {t('storyLibrary.viewChapters', locale)} —
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
