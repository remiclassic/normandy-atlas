'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { getBeat, getBeatCount } from '@/core';
import { normanAtlanticStory } from '@/data/stories';
import { atlasEraArcs } from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
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

type IntroPayload =
  | { kind: 'era'; eraId: string }
  | { kind: 'arc'; arcTitle: string; thematicEraId: string };

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
  const setStoryEraIntroActive = useMapStore((s) => s.setStoryEraIntroActive);

  const lastShownEraRef = useRef<string | null>(null);
  /** Named-arc intro shown for this arc session (reset when story exits or arc changes). */
  const arcIntroDoneForArcRef = useRef<string | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const timerBarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<IntroPayload | null>(null);

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const dismiss = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = undefined;
    setVisible(null);
  }, []);

  // Clear session memory when exiting story mode
  useEffect(() => {
    if (!storyMode) {
      lastShownEraRef.current = null;
      arcIntroDoneForArcRef.current = null;
      setVisible(null);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    }
  }, [storyMode]);

  useEffect(() => {
    arcIntroDoneForArcRef.current = null;
  }, [storyArc]);

  // Drop chronicle-era overlay when entering a named atlas arc
  useEffect(() => {
    if (storyMode && atlasMode && storyArc) {
      lastShownEraRef.current = null;
      setVisible((v) => (v?.kind === 'era' ? null : v));
    }
  }, [storyMode, atlasMode, storyArc]);

  // Named atlas arc: one-shot intro (arc title + thematic period), step 0 only, once per arc session
  useEffect(() => {
    if (!storyMode || !atlasMode || !storyArc || stepIndex > 0) return;
    if (arcIntroDoneForArcRef.current === storyArc) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const { storyMode: sm, atlasMode: am, storyArc: arc, storyStepIndex: idx } =
        useMapStore.getState();
      if (!sm || !am || !arc || idx > 0) return;
      if (arcIntroDoneForArcRef.current === arc) return;

      const entry = atlasEraArcs.find((a) => a.arcId === arc);
      const beat0 = getBeat(0, arc);
      const thematicEraId = entry?.eraIds[0] ?? beat0?.eraId;
      if (!thematicEraId) return;

      const arcTitle = entry
        ? pickI18n(entry.label, locale)
        : beat0?.copy.title ?? arc;

      arcIntroDoneForArcRef.current = arc;
      setVisible({ kind: 'arc', arcTitle, thematicEraId });
    });

    return () => {
      cancelled = true;
    };
  }, [storyMode, atlasMode, storyArc, stepIndex, locale]);

  // Full chronicle + legacy map: era transitions on step change (not for named atlas arcs)
  useEffect(() => {
    if (!storyMode) return;
    if (atlasMode && storyArc) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const { storyStepIndex: idx, atlasMode: am, storyArc: arc } = useMapStore.getState();
      if (am && arc) return;

      const eraId = deriveEraId(am, idx, arc);
      if (!eraId || eraId === lastShownEraRef.current) return;

      lastShownEraRef.current = eraId;
      setVisible({ kind: 'era', eraId });
    });

    return () => {
      cancelled = true;
    };
  }, [storyMode, stepIndex, atlasMode, storyArc]);

  const handleAnimateIn = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    const hold = reducedMotion ? 600 : HOLD_MS;
    holdTimerRef.current = setTimeout(dismiss, hold);

    const bar = timerBarRef.current;
    if (bar) {
      bar.style.transition = 'none';
      bar.style.transform = 'scaleX(1)';
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

  useEffect(() => {
    setStoryEraIntroActive(visible !== null);
  }, [visible, setStoryEraIntroActive]);

  useEffect(() => () => setStoryEraIntroActive(false), [setStoryEraIntroActive]);

  const { title, groupLabel, dateRangeStr, summary } = useMemo(() => {
    if (!visible) {
      return { title: '', groupLabel: '', dateRangeStr: '', summary: '' };
    }
    if (visible.kind === 'era') {
      const eraId = visible.eraId;
      return {
        title: getStoryEraDisplayTitle(eraId, locale, atlasMode),
        groupLabel: getStoryEraGroupLabel(eraId, atlasMode),
        dateRangeStr: (() => {
          const r = getStoryEraDateRange(eraId, atlasMode);
          if (!r) return '';
          return `${formatYear(r.start)} \u2014 ${formatYear(r.end)}`;
        })(),
        summary: getStoryEraSummary(eraId, locale, atlasMode),
      };
    }
    const { thematicEraId, arcTitle } = visible;
    const r = getStoryEraDateRange(thematicEraId, atlasMode);
    const dr = r ? `${formatYear(r.start)} \u2014 ${formatYear(r.end)}` : '';
    return {
      title: arcTitle,
      groupLabel: getStoryEraGroupLabel(thematicEraId, atlasMode),
      dateRangeStr: dr,
      summary: getStoryEraDisplayTitle(thematicEraId, locale, atlasMode),
    };
  }, [visible, locale, atlasMode]);

  const fadeIn = reducedMotion ? 0.05 : FADE_IN_S;
  const fadeOut = reducedMotion ? 0.05 : FADE_OUT_S;

  const motionKey = visible
    ? visible.kind === 'era'
      ? visible.eraId
      : `arc-${visible.arcTitle}`
    : 'none';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={motionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeOut, ease: EASE_IN }}
          className="fixed inset-0 z-[76] flex items-center justify-center cursor-pointer"
          onClick={dismiss}
          aria-live="polite"
        >
          <motion.div
            className="absolute inset-0 bg-[var(--welcome-bg-base)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeIn, ease: EASE_IN }}
          />

          <motion.div
            className="welcome-intro-gradients absolute inset-0 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeIn, ease: EASE_IN }}
          />

          <div
            className="absolute inset-[-20%] onboarding-fog-1"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.012\' numOctaves=\'4\' seed=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
              backgroundSize: '600px 600px',
              mixBlendMode: 'soft-light',
            }}
          />

          <div
            className="absolute inset-[-20%] onboarding-fog-2"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.008\' numOctaves=\'3\' seed=\'42\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
              backgroundSize: '800px 800px',
              mixBlendMode: 'soft-light',
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow:
                'inset 0 0 200px 80px var(--welcome-vignette-outer), inset 0 0 80px 30px var(--welcome-vignette-inner)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4 px-6 select-none max-w-2xl">
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

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.15, ease: EASE_IN }}
              onAnimationComplete={
                visible?.kind === 'arc' || !summary
                  ? (def) => {
                      if (typeof def === 'object' && 'opacity' in def && def.opacity === 1) {
                        handleAnimateIn();
                      }
                    }
                  : undefined
              }
              className="font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-wide text-parchment text-center"
            >
              {title}
            </motion.h2>

            {visible?.kind === 'arc' && summary && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeIn, delay: reducedMotion ? 0 : 0.22, ease: EASE_IN }}
                className="text-[clamp(0.95rem,2vw,1.25rem)] font-light tracking-[0.08em] text-gold/85 text-center"
              >
                {summary}
              </motion.p>
            )}

            {dateRangeStr && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: fadeIn,
                  delay: reducedMotion ? 0 : visible?.kind === 'arc' ? 0.32 : 0.25,
                  ease: EASE_IN,
                }}
                className="text-[clamp(0.8rem,1.8vw,1.1rem)] font-light tracking-[0.12em] text-gold/80"
              >
                {dateRangeStr}
              </motion.p>
            )}

            {visible?.kind === 'era' && summary && (
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: fadeIn,
                delay: reducedMotion ? 0 : visible?.kind === 'arc' ? 0.42 : 0.5,
                ease: EASE_IN,
              }}
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
