'use client';

import { useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { normanAtlanticStory } from '@/data/stories';
import { getStoryBeats, getBeat, getBeatCount } from '@/core';
import { arcChromeStyle, getArcEntriesForEra } from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { useIsMobile } from '@/hooks/use-responsive';
import { STORY_BEAT_BODIES_ES, STORY_BEAT_TITLES_ES } from '@/data/atlas/story-beat-bodies-es';
import { STORY_BEAT_BODIES_IT, STORY_BEAT_TITLES_IT } from '@/data/atlas/story-beat-bodies-it';
import type { StoryBeat } from '@/core/types';
import type { StoryStep } from '@/types';
import { arcIdToProgressKey, markStoryArcCompleted, persistStoryProgress } from '@/lib/story-progress';
import { emitProgressEvent } from '@/lib/progress';

export default function StoryModeBar() {
  const storyMode = useMapStore((s) => s.storyMode);
  const stepIndex = useMapStore((s) => s.storyStepIndex);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyArc = useMapStore((s) => s.storyArc);
  const locale = useMapStore((s) => s.locale);
  const uiTheme = useMapStore((s) => s.uiTheme);
  const startStory = useMapStore((s) => s.startStory);
  const stopStory = useMapStore((s) => s.stopStory);
  const nextStep = useMapStore((s) => s.nextStoryStep);
  const prevStep = useMapStore((s) => s.prevStoryStep);
  const setEra = useMapStore((s) => s.setEra);
  const setActiveJourney = useMapStore((s) => s.setActiveJourney);
  const setAtlasSimYear = useMapStore((s) => s.setAtlasSimYear);
  const cinematicFlythrough = useMapStore((s) => s.cinematicFlythrough);

  const isMobile = useIsMobile();
  const atlasBeats = useMemo(() => getStoryBeats(storyArc), [storyArc]);
  const totalSteps = atlasMode ? atlasBeats.length : normanAtlanticStory.length;

  const currentBeat: StoryBeat | null = useMemo(() => {
    if (!storyMode || !atlasMode) return null;
    return getBeat(Math.min(stepIndex, getBeatCount(storyArc) - 1), storyArc) ?? null;
  }, [storyMode, atlasMode, stepIndex, storyArc]);

  const currentLegacyStep: StoryStep | null = useMemo(() => {
    if (!storyMode || atlasMode) return null;
    return normanAtlanticStory[Math.min(stepIndex, normanAtlanticStory.length - 1)] ?? null;
  }, [storyMode, atlasMode, stepIndex]);

  const stepTitle = useMemo(() => {
    if (!currentBeat) return currentLegacyStep?.title ?? '';
    if (locale === 'es') {
      const esTitle = STORY_BEAT_TITLES_ES[currentBeat.id];
      if (esTitle) return esTitle;
    }
    if (locale === 'it') {
      const itTitle = STORY_BEAT_TITLES_IT[currentBeat.id];
      if (itTitle) return itTitle;
    }
    return currentBeat.copy.title;
  }, [currentBeat, currentLegacyStep, locale]);

  const stepBody = useMemo(() => {
    if (!currentBeat) return currentLegacyStep?.body ?? '';
    if (locale === 'es') {
      const esBody = STORY_BEAT_BODIES_ES[currentBeat.id];
      if (esBody) return esBody;
    }
    if (locale === 'it') {
      const itBody = STORY_BEAT_BODIES_IT[currentBeat.id];
      if (itBody) return itBody;
    }
    return pickI18n(currentBeat.copy.body, locale);
  }, [currentBeat, currentLegacyStep, locale]);
  const stepChapter = currentBeat ? undefined : currentLegacyStep?.chapterTitle;
  const stepId = currentBeat?.id ?? currentLegacyStep?.id ?? '';

  const isFirst = stepIndex === 0;
  const isLast = stepIndex >= totalSteps - 1;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  useEffect(() => {
    if (!storyMode) return;

    if (currentBeat) {
      setEra(currentBeat.eraId);
      const firstJourney = currentBeat.focus.journeyIds?.[0] ?? null;
      setActiveJourney(firstJourney);
      if (currentBeat.anchorYear != null) {
        setAtlasSimYear(currentBeat.anchorYear);
      }
    } else if (currentLegacyStep) {
      setEra(currentLegacyStep.eraId);
    }
  }, [
    currentBeat,
    currentLegacyStep,
    setEra,
    setActiveJourney,
    setAtlasSimYear,
    storyMode,
  ]);

  const prevStepRef = useRef<number>(-1);
  const prevEraRef = useRef<string>('');

  useEffect(() => {
    if (!storyMode) {
      prevStepRef.current = -1;
      prevEraRef.current = '';
    }
  }, [storyMode]);

  useEffect(() => {
    if (!storyMode || !atlasMode) return;
    persistStoryProgress(arcIdToProgressKey(storyArc), {
      lastStep: stepIndex,
      lastPlayedAt: Date.now(),
    });
    if (stepIndex !== prevStepRef.current) {
      prevStepRef.current = stepIndex;
      emitProgressEvent('story_step', arcIdToProgressKey(storyArc), {
        eraId: currentBeat?.eraId,
        step: stepIndex,
      });
    }
    const eraId = currentBeat?.eraId ?? '';
    if (eraId && eraId !== prevEraRef.current) {
      prevEraRef.current = eraId;
      emitProgressEvent('era_visit', eraId, { eraId });
    }
  }, [storyMode, atlasMode, storyArc, stepIndex, currentBeat?.eraId]);

  const handleStop = useCallback(() => {
    stopStory();
    setActiveJourney(null);
  }, [stopStory, setActiveJourney]);

  const startLedgerCelebration = useMapStore((s) => s.startLedgerCelebration);
  const celebrationPhase = useMapStore((s) => s.ledgerCelebrationPhase);
  const celebrating = celebrationPhase === 'overlay';

  const handleFinish = useCallback(() => {
    if (atlasMode) {
      markStoryArcCompleted(arcIdToProgressKey(storyArc), getBeatCount(storyArc));
      emitProgressEvent('story_arc_complete', arcIdToProgressKey(storyArc));
    }
    startLedgerCelebration();
  }, [atlasMode, storyArc, startLedgerCelebration]);

  const isActive = storyMode && (currentBeat || currentLegacyStep);
  const eraId = useMapStore((s) => s.eraId);

  const arcEntries = useMemo(() => getArcEntriesForEra(eraId), [eraId]);
  const handleStartArc = useCallback((arcId: string) => startStory(arcId), [startStory]);

  return (
    <>
      {/* Story / arc start buttons */}
      <AnimatePresence>
        {!storyMode && cinematicFlythrough == null && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={
              isMobile
                ? 'relative z-20 w-full flex flex-col gap-3 pointer-events-auto'
                : 'pointer-events-auto absolute inset-x-3 bottom-6 z-40 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2.5 sm:inset-x-4'
            }
          >
            <button
              onClick={() => startStory()}
              className="group flex min-h-[48px] min-w-0 max-w-full items-center justify-center gap-3 rounded-full glass-panel glow-gold px-5 py-3 text-[13px] font-medium text-gold hover:text-gold-bright transition-all duration-250 border-gold/15 hover:border-gold/25 w-full sm:min-h-0 sm:w-auto sm:max-w-[min(100%,28rem)] touch-target"
            >
              <span className="flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-gold/10 group-hover:bg-gold/15 transition-colors duration-200">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                </svg>
              </span>
              <span className="min-w-0 truncate">{t('story.explore', locale)}</span>
            </button>

            {arcEntries.map((entry) => {
              const st = arcChromeStyle(entry, uiTheme);
              return (
                <button
                  key={entry.arcId}
                  onClick={() => handleStartArc(entry.arcId)}
                  className={`group flex min-h-[44px] min-w-0 max-w-full items-center justify-center gap-2.5 rounded-full glass-panel px-4 py-2.5 text-left text-[12px] sm:text-[13px] font-medium transition-all duration-250 w-full sm:min-h-0 sm:max-w-[min(100%,24rem)] sm:w-auto sm:text-center touch-target ${st.text} ${st.textHover} ${st.border} ${st.borderHover}`}
                >
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full ${st.iconBg} ${st.iconBgHover} transition-colors duration-200`}>
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 leading-snug sm:truncate">{pickI18n(entry.label, locale)}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active story bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={`z-40 left-0 right-0 pointer-events-auto ${
              isMobile
                ? 'fixed bottom-0 pb-[env(safe-area-inset-bottom)]'
                : 'absolute bottom-0 pb-[env(safe-area-inset-bottom)]'
            }`}
          >
            <div className="mx-auto max-w-2xl mb-3 sm:mb-6 px-3 sm:px-4">
              <div className="rounded-2xl glass-panel-elevated overflow-hidden">
                <div className="relative h-[2px] bg-chrome-shade-strong">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold/40"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>

                <div className="flex items-center justify-between px-4 pt-2.5 sm:px-6 sm:pt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                    {stepIndex + 1} / {totalSteps}
                  </span>
                  <div className="flex gap-1 overflow-hidden max-w-[40%]">
                    {Array.from({ length: totalSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-400 flex-shrink-0 ${
                          i === stepIndex
                            ? 'w-4 sm:w-5 bg-gold/70'
                            : i < stepIndex
                              ? 'w-1 sm:w-1.5 bg-gold/25'
                              : 'w-1 sm:w-1.5 bg-chrome-divider'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="px-4 pt-2.5 pb-3 sm:px-6 sm:pt-3 sm:pb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stepId}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {stepChapter && (
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-1.5">
                          {stepChapter}
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-display font-bold text-parchment mb-1.5 sm:mb-2 tracking-[-0.01em]">
                        {stepTitle}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] leading-[1.7] text-text-muted line-clamp-4 sm:line-clamp-none">{stepBody}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between px-3.5 pb-3 pt-1 sm:px-5 sm:pb-4">
                  <button
                    onClick={handleStop}
                    disabled={celebrating}
                    className="text-[11px] text-text-dim hover:text-text-muted transition-colors px-2.5 py-1.5 rounded-md hover:bg-chrome-fill-badge touch-target disabled:opacity-40"
                  >
                    {t('story.exit', locale)}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStep}
                      disabled={isFirst || celebrating}
                      className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg border border-border hover:border-border-bright disabled:opacity-20 disabled:cursor-not-allowed text-text-dim hover:text-text-muted transition-all duration-150 hover:bg-chrome-fill-badge touch-target"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={isLast ? handleFinish : nextStep}
                      disabled={celebrating}
                      className="flex items-center justify-center h-10 sm:h-9 rounded-lg bg-gold/12 border border-gold/20 px-4 sm:px-5 text-[13px] font-medium text-gold hover:bg-gold/18 hover:border-gold/30 transition-all duration-150 touch-target disabled:opacity-40"
                    >
                      {isLast ? t('story.finish', locale) : t('story.continue', locale)}
                      {!isLast && (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="ml-1.5 opacity-70">
                          <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
