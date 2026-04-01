'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { getBeat, getBeatCount } from '@/core';
import { normanAtlanticStory } from '@/data/stories';
import {
  getStoryEraDisplayTitle,
  getStoryEraDateRange,
  getStoryEraSummary,
  getStoryEraGroupLabel,
} from '@/lib/story-era-title';
import { formatYear } from '@/lib/timeline-utils';
import type { AtlasLocale } from '@/core/types';

const HOLD_MS = 5000;
const FADE_IN_S = 1.0;
const FADE_OUT_S = 0.8;
const EASE_IN: [number, number, number, number] = [0.22, 0.94, 0.36, 1];

function deriveEraId(
  atlasMode: boolean,
  stepIndex: number,
  storyArc: string | null,
): string | null {
  if (atlasMode) {
    const beat = getBeat(Math.min(stepIndex, getBeatCount(storyArc) - 1), storyArc);
    return beat?.eraId ?? null;
  }
  const step = normanAtlanticStory[Math.min(stepIndex, normanAtlanticStory.length - 1)];
  return step?.eraId ?? null;
}

function StoryEraIntroOverlay() {
  const storyMode = useMapStore((s) => s.storyMode);
  const stepIndex = useMapStore((s) => s.storyStepIndex);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyArc = useMapStore((s) => s.storyArc);
  const locale: AtlasLocale = useMapStore((s) => s.locale);

  const lastShownEraRef = useRef<string | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const timerBarRef = useRef<HTMLDivElement>(null);
  const [visibleEra, setVisibleEra] = useState<string | null>(null);

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const dismiss = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = undefined;
    setVisibleEra(null);
  }, []);

  // Clear session memory when exiting story mode
  useEffect(() => {
    if (!storyMode) {
      lastShownEraRef.current = null;
      setVisibleEra(null);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    }
  }, [storyMode]);

  // Detect era transitions (deferred by one microtask so library resume settles)
  useEffect(() => {
    if (!storyMode) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const { storyStepIndex: idx, atlasMode: am, storyArc: arc } = useMapStore.getState();
      const eraId = deriveEraId(am, idx, arc);
      if (!eraId || eraId === lastShownEraRef.current) return;

      lastShownEraRef.current = eraId;
      setVisibleEra(eraId);
    });

    return () => { cancelled = true; };
  }, [storyMode, stepIndex, atlasMode, storyArc]);

  // Auto-dismiss after hold duration once the animation finishes entering
  const handleAnimateIn = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    const hold = reducedMotion ? 600 : HOLD_MS;
    holdTimerRef.current = setTimeout(dismiss, hold);

    // Kick off the timer bar shrink (CSS transition, no React state)
    const bar = timerBarRef.current;
    if (bar) {
      bar.style.transition = 'none';
      bar.style.transform = 'scaleX(1)';
      // Force reflow so the browser registers scaleX(1) before we animate to 0
      void bar.offsetWidth;
      bar.style.transition = `transform ${hold}ms linear`;
      bar.style.transform = 'scaleX(0)';
    }
  }, [dismiss, reducedMotion]);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  const title = useMemo(() => {
    if (!visibleEra) return '';
    return getStoryEraDisplayTitle(visibleEra, locale, atlasMode);
  }, [visibleEra, locale, atlasMode]);

  const groupLabel = useMemo(() => {
    if (!visibleEra) return '';
    return getStoryEraGroupLabel(visibleEra, atlasMode);
  }, [visibleEra, atlasMode]);

  const dateRangeStr = useMemo(() => {
    if (!visibleEra) return '';
    const r = getStoryEraDateRange(visibleEra, atlasMode);
    if (!r) return '';
    return `${formatYear(r.start)} \u2014 ${formatYear(r.end)}`;
  }, [visibleEra, atlasMode]);

  const summary = useMemo(() => {
    if (!visibleEra) return '';
    return getStoryEraSummary(visibleEra, locale, atlasMode);
  }, [visibleEra, locale, atlasMode]);

  const fadeIn = reducedMotion ? 0.05 : FADE_IN_S;
  const fadeOut = reducedMotion ? 0.05 : FADE_OUT_S;

  return (
    <AnimatePresence>
      {visibleEra && (
        <motion.div
          key={visibleEra}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeOut, ease: EASE_IN }}
          className="fixed inset-0 z-[76] flex items-center justify-center cursor-pointer"
          onClick={dismiss}
          aria-live="polite"
        >
          {/* Subtle darkened backdrop — lets the map show through */}
          <motion.div
            className="absolute inset-0 bg-[var(--welcome-bg-base)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeIn, ease: EASE_IN }}
          />

          {/* Reuse welcome gradient overlay at reduced opacity */}
          <motion.div
            className="welcome-intro-gradients absolute inset-0 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeIn, ease: EASE_IN }}
          />

          {/* Fog layer 1 */}
          <div
            className="absolute inset-[-20%] onboarding-fog-1"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.012\' numOctaves=\'4\' seed=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
              backgroundSize: '600px 600px',
              mixBlendMode: 'soft-light',
            }}
          />

          {/* Fog layer 2 */}
          <div
            className="absolute inset-[-20%] onboarding-fog-2"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.008\' numOctaves=\'3\' seed=\'42\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
              backgroundSize: '800px 800px',
              mixBlendMode: 'soft-light',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow:
                'inset 0 0 200px 80px var(--welcome-vignette-outer), inset 0 0 80px 30px var(--welcome-vignette-inner)',
            }}
          />

          {/* Center content — staggered cascade */}
          <div className="relative z-10 flex flex-col items-center gap-4 px-6 select-none max-w-2xl">
            {/* Timeline group chip */}
            {groupLabel && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.05, ease: EASE_IN }}
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/60"
              >
                {groupLabel}
              </motion.p>
            )}

            {/* Era title */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.15, ease: EASE_IN }}
              onAnimationComplete={!summary ? (def) => {
                if (typeof def === 'object' && 'opacity' in def && def.opacity === 1) {
                  handleAnimateIn();
                }
              } : undefined}
              className="font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-wide text-parchment text-center"
            >
              {title}
            </motion.h2>

            {/* Date range */}
            {dateRangeStr && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.25, ease: EASE_IN }}
                className="text-[clamp(0.8rem,1.8vw,1.1rem)] font-light tracking-[0.12em] text-gold/80"
              >
                {dateRangeStr}
              </motion.p>
            )}

            {/* Summary teaser */}
            {summary && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.4, ease: EASE_IN }}
                onAnimationComplete={(def) => {
                  if (typeof def === 'object' && 'opacity' in def && def.opacity === 1) {
                    handleAnimateIn();
                  }
                }}
                className="mt-1 max-w-lg text-[clamp(0.75rem,1.4vw,0.9rem)] leading-relaxed text-text-muted/70 text-center"
              >
                {summary}
              </motion.p>
            )}

            {/* Countdown bar + skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.5, ease: EASE_IN }}
              className="mt-2 flex flex-col items-center gap-2.5"
            >
              <div className="w-28 h-[2px] rounded-full bg-gold/15 overflow-hidden">
                <div
                  ref={timerBarRef}
                  className="h-full w-full origin-left bg-gold/50 rounded-full"
                  style={{ transform: 'scaleX(1)' }}
                />
              </div>
              <span className="text-[10px] tracking-[0.14em] text-text-dim/40">
                click to skip
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(StoryEraIntroOverlay);
