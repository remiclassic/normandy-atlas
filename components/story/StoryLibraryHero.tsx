'use client';

import { memo, useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { StoryLibraryRowModel } from '@/lib/story-library-build';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import type { StoryProgressRecord } from '@/lib/story-progress';
import type { StoryCategory, StoryTone } from '@/data/atlas/story-library-meta';
import { arcChromeStyle } from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t, type UiStringKey } from '@/lib/ui-strings';
import { Play, RotateCcw, Info } from 'lucide-react';

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

const CAROUSEL_DURATION_MS = 8000;
/** SVG circle radius for progress ring */
const RING_R = 10;
const RING_C = 2 * Math.PI * RING_R;

interface Props {
  rows: StoryLibraryRowModel[];
  activeIndex: number;
  onAdvanceCarousel: () => void;
  locale: AtlasLocale;
  uiTheme: UiTheme;
  getStoryProgress: (progressKey: string) => StoryProgressRecord | undefined;
  onPlay: () => void;
  onResume: () => void;
  onMoreInfo: () => void;
}

export const StoryLibraryHero = memo(function StoryLibraryHero({
  rows,
  activeIndex,
  onAdvanceCarousel,
  locale,
  uiTheme,
  getStoryProgress,
  onPlay,
  onResume,
  onMoreInfo,
}: Props) {
  const reducedMotion = useReducedMotion();
  const row = rows[activeIndex];
  if (!row) return null;

  const storyProgress = getStoryProgress(row.progressKey);

  const title = row.meta.displayTitle
    ? pickI18n(row.meta.displayTitle, locale)
    : row.arcEntry
      ? pickI18n(row.arcEntry.label, locale)
      : '';

  const hook = row.meta.hook ? pickI18n(row.meta.hook, locale) : '';
  const blurb = pickI18n(row.meta.blurb, locale);
  const poster = row.resolvedPosterSrc ? publicAssetUrl(row.resolvedPosterSrc) : null;
  const canResume = Boolean(storyProgress && !storyProgress.completed && storyProgress.lastStep > 0);

  const chrome = row.arcEntry ? arcChromeStyle(row.arcEntry, uiTheme) : null;

  const categoryLabel = t(CATEGORY_KEY[row.meta.category], locale);
  const toneLabel = row.meta.tone ? t(TONE_KEY[row.meta.tone], locale) : null;
  const durationLabel = row.meta.estimatedMinutes != null
    ? t('storyLibrary.durationMinutes', locale).replace('{count}', String(row.meta.estimatedMinutes))
    : null;

  const carouselEnabled = rows.length > 1 && !reducedMotion;
  const hoverPausedRef = useRef(false);
  const slideStartRef = useRef(0);
  const pauseAccumRef = useRef(0);
  const pauseAtRef = useRef<number | null>(null);
  const advanceFiredRef = useRef(false);
  const ringRef = useRef<SVGCircleElement>(null);

  const onPointerEnter = useCallback(() => {
    hoverPausedRef.current = true;
  }, []);
  const onPointerLeave = useCallback(() => {
    hoverPausedRef.current = false;
  }, []);

  useEffect(() => {
    advanceFiredRef.current = false;
    slideStartRef.current = performance.now();
    pauseAccumRef.current = 0;
    pauseAtRef.current = null;
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = carouselEnabled ? String(RING_C) : '0';
    }
  }, [activeIndex, carouselEnabled]);

  useEffect(() => {
    if (!carouselEnabled) return;

    let rafId = 0;
    let alive = true;

    const tick = (now: number) => {
      if (!alive) return;

      if (hoverPausedRef.current) {
        if (pauseAtRef.current === null) pauseAtRef.current = now;
      } else if (pauseAtRef.current !== null) {
        pauseAccumRef.current += now - pauseAtRef.current;
        pauseAtRef.current = null;
      }

      const elapsed = now - slideStartRef.current - pauseAccumRef.current;
      const p = Math.min(1, Math.max(0, elapsed / CAROUSEL_DURATION_MS));

      const ring = ringRef.current;
      if (ring) {
        ring.style.strokeDashoffset = String(RING_C * (1 - p));
      }

      if (
        elapsed >= CAROUSEL_DURATION_MS &&
        !hoverPausedRef.current &&
        !advanceFiredRef.current
      ) {
        advanceFiredRef.current = true;
        onAdvanceCarousel();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
    };
  }, [carouselEnabled, activeIndex, onAdvanceCarousel]);

  return (
    <motion.section
      className="relative w-full h-[56vh] sm:h-[64vh] lg:h-[min(72vh,820px)] min-h-[400px] sm:min-h-[480px] max-h-[820px] overflow-hidden"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...(carouselEnabled
        ? {
            role: 'region' as const,
            'aria-label': t('storyLibrary.aria.heroCarousel', locale),
          }
        : {})}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${row.progressKey}-poster`}
          src={poster}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center sm:object-[center_28%]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 28%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.12) 78%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.08) 62%, transparent 78%)',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-24 sm:h-32"
        style={{
          background: `linear-gradient(to top, var(--color-background) 0%, transparent 100%)`,
        }}
      />

      {chrome && (
        <div className={`absolute inset-x-0 top-0 h-[3px] ${chrome.iconBg}`} />
      )}

      {/* Carousel timer ring — bottom-right; pauses with hero hover */}
      {carouselEnabled && (
        <div
          className="pointer-events-none absolute bottom-[5.75rem] right-6 z-[2] sm:bottom-[6.5rem] sm:right-10 flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10"
          aria-hidden
        >
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r={RING_R}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              ref={ringRef}
              cx="12"
              cy="12"
              r={RING_R}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C}
              className="transition-none"
            />
          </svg>
        </div>
      )}

      <motion.div
        key={`${row.progressKey}-copy`}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-4 sm:gap-5 px-6 pb-16 sm:px-10 sm:pb-20 lg:pb-24 max-w-3xl"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em]">
          {row.meta.featured && (
            <span className="rounded px-2 py-0.5 font-bold bg-amber-400/20 text-amber-300">
              {t('storyLibrary.badge.featured', locale)}
            </span>
          )}
          <span className="text-white/60">{categoryLabel}</span>
          {toneLabel && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-white/60">{toneLabel}</span>
            </>
          )}
          {durationLabel && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-white/60">{durationLabel}</span>
            </>
          )}
          <span className="text-white/30">·</span>
          <span className="text-white/60">
            {t('storyLibrary.scenes', locale).replace('{count}', String(row.sceneCount))}
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] sm:leading-[1.03] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
          {title}
        </h2>

        {(hook || blurb) && (
          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-4 drop-shadow-md">
            {hook || blurb}
          </p>
        )}

        <div className="flex flex-wrap gap-3 sm:gap-3.5 mt-1">
          <motion.button
            type="button"
            onClick={onPlay}
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            className="flex h-12 sm:h-[3.25rem] items-center gap-2.5 rounded-md bg-white px-7 sm:px-8 text-sm sm:text-base font-bold text-black hover:bg-white/90 transition-colors shadow-lg shadow-black/25"
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            {t('storyLibrary.play', locale)}
          </motion.button>

          {canResume && (
            <motion.button
              type="button"
              onClick={onResume}
              whileHover={reducedMotion ? undefined : { scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="flex h-12 sm:h-[3.25rem] items-center gap-2.5 rounded-md bg-white/20 px-7 sm:px-8 text-sm sm:text-base font-semibold text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
            >
              <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
              {t('storyLibrary.resume', locale)}
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={onMoreInfo}
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            className="flex h-12 sm:h-[3.25rem] items-center gap-2 rounded-md bg-white/15 px-6 sm:px-7 text-sm sm:text-base font-semibold text-white/90 hover:bg-white/25 backdrop-blur-sm transition-colors"
          >
            <Info className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('storyLibrary.moreInfo', locale)}
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
});
