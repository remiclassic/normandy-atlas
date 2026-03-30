'use client';

import { useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { normanAtlanticStory } from '@/data/stories';
import { getStoryBeats, getBeat, getBeatCount } from '@/core';
import { getArcEntriesForEra } from '@/data/atlas/era-arcs';
import type { StoryBeat } from '@/core/types';
import type { StoryStep } from '@/types';

export default function StoryModeBar() {
  const storyMode = useMapStore((s) => s.storyMode);
  const stepIndex = useMapStore((s) => s.storyStepIndex);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyArc = useMapStore((s) => s.storyArc);
  const startStory = useMapStore((s) => s.startStory);
  const stopStory = useMapStore((s) => s.stopStory);
  const nextStep = useMapStore((s) => s.nextStoryStep);
  const prevStep = useMapStore((s) => s.prevStoryStep);
  const setEra = useMapStore((s) => s.setEra);
  const setActiveJourney = useMapStore((s) => s.setActiveJourney);
  const setAtlasSimYear = useMapStore((s) => s.setAtlasSimYear);

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

  const stepTitle = currentBeat?.copy.title ?? currentLegacyStep?.title ?? '';
  const stepBody = currentBeat?.copy.body.en ?? currentLegacyStep?.body ?? '';
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

  const handleStop = useCallback(() => {
    stopStory();
    setActiveJourney(null);
  }, [stopStory, setActiveJourney]);

  const isActive = storyMode && (currentBeat || currentLegacyStep);
  const eraId = useMapStore((s) => s.eraId);

  const arcEntries = useMemo(() => getArcEntriesForEra(eraId), [eraId]);
  const handleStartArc = useCallback((arcId: string) => startStory(arcId), [startStory]);

  return (
    <>
      <AnimatePresence>
        {!storyMode && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          >
            <button
              onClick={() => startStory()}
              className="group flex items-center gap-3 rounded-full glass-panel glow-gold px-6 py-3 text-[13px] font-medium text-gold hover:text-gold-bright transition-all duration-250 border-gold/15 hover:border-gold/25"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 group-hover:bg-gold/15 transition-colors duration-200">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                </svg>
              </span>
              Explore the Story
            </button>

            {arcEntries.map((entry) => (
              <button
                key={entry.arcId}
                onClick={() => handleStartArc(entry.arcId)}
                className={`group flex items-center gap-2.5 rounded-full glass-panel px-5 py-3 text-[13px] font-medium transition-all duration-250 ${entry.style.text} ${entry.style.textHover} ${entry.style.border} ${entry.style.borderHover}`}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${entry.style.iconBg} ${entry.style.iconBgHover} transition-colors duration-200`}>
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                  </svg>
                </span>
                {entry.label.en}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-0 left-0 right-0 z-30"
          >
            <div className="mx-auto max-w-2xl mb-6 px-4">
              <div className="rounded-2xl glass-panel-elevated overflow-hidden">
                <div className="relative h-[2px] bg-white/[0.04]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold/40"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>

                <div className="flex items-center justify-between px-6 pt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                    {stepIndex + 1} / {totalSteps}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: totalSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-400 ${
                          i === stepIndex
                            ? 'w-5 bg-gold/70'
                            : i < stepIndex
                              ? 'w-1.5 bg-gold/25'
                              : 'w-1.5 bg-white/[0.06]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="px-6 pt-3 pb-4">
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
                      <h3 className="text-lg font-display font-bold text-parchment mb-2 tracking-[-0.01em]">
                        {stepTitle}
                      </h3>
                      <p className="text-[13px] leading-[1.7] text-text-muted">{stepBody}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between px-5 pb-4 pt-1">
                  <button
                    onClick={handleStop}
                    className="text-[11px] text-text-dim hover:text-text-muted transition-colors px-2.5 py-1.5 rounded-md hover:bg-white/[0.03]"
                  >
                    Exit story
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStep}
                      disabled={isFirst}
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-border-bright disabled:opacity-20 disabled:cursor-not-allowed text-text-dim hover:text-text-muted transition-all duration-150 hover:bg-white/[0.03]"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={isLast ? handleStop : nextStep}
                      className="flex items-center justify-center h-9 rounded-lg bg-gold/12 border border-gold/20 px-5 text-[13px] font-medium text-gold hover:bg-gold/18 hover:border-gold/30 transition-all duration-150"
                    >
                      {isLast ? 'Finish' : 'Continue'}
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
