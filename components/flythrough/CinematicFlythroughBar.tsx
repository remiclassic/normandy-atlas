'use client';

import { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { flythroughPresets, getFlythroughPreset } from '@/data/atlas/flythrough-presets';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';

export default function CinematicFlythroughBar() {
  const flythrough = useMapStore((s) => s.cinematicFlythrough);
  const progress = useMapStore((s) => s.cinematicFlythroughProgress);
  const storyMode = useMapStore((s) => s.storyMode);
  const locale = useMapStore((s) => s.locale);
  const startFlythrough = useMapStore((s) => s.startCinematicFlythrough);
  const stopFlythrough = useMapStore((s) => s.stopCinematicFlythrough);

  const isActive = flythrough !== null;

  const preset = useMemo(
    () => (flythrough ? getFlythroughPreset(flythrough.presetId) : null),
    [flythrough],
  );

  const handleStop = useCallback(() => stopFlythrough(), [stopFlythrough]);
  const handleStart = useCallback((id: string) => startFlythrough(id), [startFlythrough]);

  return (
    <>
      {/* Preset picker — visible when neither story nor flythrough is running */}
      <AnimatePresence>
        {!isActive && !storyMode && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          >
            {flythroughPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => handleStart(p.id)}
                className="group flex items-center gap-2.5 rounded-full glass-panel px-5 py-2.5 text-[12px] font-medium text-text-muted hover:text-parchment transition-all duration-250 border-border hover:border-gold/25"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/8 group-hover:bg-gold/15 transition-colors duration-200">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                  </svg>
                </span>
                {pickI18n(p.title, locale)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active flythrough bar */}
      <AnimatePresence>
        {isActive && preset && (
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-0 left-0 right-0 z-30"
          >
            <div className="mx-auto max-w-xl mb-6 px-4">
              <div className="rounded-2xl glass-panel-elevated overflow-hidden">
                {/* Progress bar */}
                <div className="relative h-[2px] bg-chrome-shade-strong">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold/40"
                    animate={{ width: `${Math.round(progress * 100)}%` }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                  />
                </div>

                <div className="px-6 pt-4 pb-2">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-1">
                    {t('flythrough.label', locale)}
                  </span>
                  <h3 className="text-base font-display font-bold text-parchment tracking-[-0.01em]">
                    {pickI18n(preset.title, locale)}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-text-dim mt-1">
                    {pickI18n(preset.subtitle, locale)}
                  </p>
                </div>

                {/* Act indicator for multi-journey presets */}
                {preset.journeyIds.length > 1 && flythrough && (
                  <div className="flex gap-1.5 px-6 pb-2">
                    {preset.journeyIds.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-400 ${
                          i === flythrough.actIndex
                            ? 'w-6 bg-gold/60'
                            : i < flythrough.actIndex
                              ? 'w-2 bg-gold/25'
                              : 'w-2 bg-chrome-divider'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between px-5 pb-4 pt-2">
                  <button
                    onClick={handleStop}
                    className="text-[11px] text-text-dim hover:text-text-muted transition-colors px-2.5 py-1.5 rounded-md hover:bg-chrome-fill-badge"
                  >
                    {t('flythrough.exit', locale)}
                  </button>
                  <span className="text-[11px] text-text-dim tracking-wide">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
