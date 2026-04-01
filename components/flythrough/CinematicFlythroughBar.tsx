'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import {
  flythroughPresets,
  getFlythroughPreset,
  isFlythroughPresetVisibleInEra,
} from '@/data/atlas/flythrough-presets';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { useIsMobile } from '@/hooks/use-responsive';

export default function CinematicFlythroughBar() {
  const flythrough = useMapStore((s) => s.cinematicFlythrough);
  const progress = useMapStore((s) => s.cinematicFlythroughProgress);
  const storyMode = useMapStore((s) => s.storyMode);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const eraId = useMapStore((s) => s.eraId);
  const locale = useMapStore((s) => s.locale);
  const startFlythrough = useMapStore((s) => s.startCinematicFlythrough);
  const stopFlythrough = useMapStore((s) => s.stopCinematicFlythrough);

  const isMobile = useIsMobile();
  const isActive = flythrough !== null;

  const preset = useMemo(
    () => (flythrough ? getFlythroughPreset(flythrough.presetId) : null),
    [flythrough],
  );

  const visiblePresets = useMemo(
    () => flythroughPresets.filter((p) => isFlythroughPresetVisibleInEra(p, eraId)),
    [eraId],
  );

  const showPresetPicker =
    atlasMode && !isActive && !storyMode && visiblePresets.length > 0;

  useEffect(() => {
    if (!flythrough || !preset) return;
    if (isFlythroughPresetVisibleInEra(preset, eraId)) return;
    stopFlythrough();
  }, [eraId, flythrough, preset, stopFlythrough]);

  const handleStop = useCallback(() => stopFlythrough(), [stopFlythrough]);
  const handleStart = useCallback((id: string) => startFlythrough(id), [startFlythrough]);

  return (
    <>
      {/* Preset picker */}
      <AnimatePresence>
        {showPresetPicker && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={
              isMobile
                ? 'relative z-20 w-full flex flex-col gap-3 pointer-events-auto'
                : 'pointer-events-auto absolute inset-x-3 bottom-20 z-40 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2.5 sm:inset-x-4'
            }
          >
            {visiblePresets.map((p) => (
              <button
                key={p.id}
                onClick={() => handleStart(p.id)}
                className="group flex min-h-[44px] min-w-0 max-w-full items-center justify-center gap-2.5 rounded-full glass-panel px-4 py-2.5 text-left text-[12px] font-medium text-text-muted hover:text-parchment transition-all duration-250 border-border hover:border-gold/25 w-full sm:max-w-[min(100%,24rem)] sm:w-auto sm:min-h-0 sm:text-center touch-target"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/8 group-hover:bg-gold/15 transition-colors duration-200">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 leading-snug sm:truncate">{pickI18n(p.title, locale)}</span>
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
            className={`z-40 left-0 right-0 pointer-events-auto ${
              isMobile
                ? 'fixed bottom-0 pb-[env(safe-area-inset-bottom)]'
                : 'absolute bottom-0 pb-[env(safe-area-inset-bottom)]'
            }`}
          >
            <div className="mx-auto max-w-xl mb-3 sm:mb-6 px-3 sm:px-4">
              <div className="rounded-2xl glass-panel-elevated overflow-hidden">
                <div className="relative h-[2px] bg-chrome-shade-strong">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold/40"
                    animate={{ width: `${Math.round(progress * 100)}%` }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                  />
                </div>

                <div className="px-4 pt-3 pb-2 sm:px-6 sm:pt-4">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-1">
                    {t('flythrough.label', locale)}
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-bold text-parchment tracking-[-0.01em]">
                    {pickI18n(preset.title, locale)}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] leading-relaxed text-text-dim mt-1">
                    {pickI18n(preset.subtitle, locale)}
                  </p>
                </div>

                {preset.journeyIds.length > 1 && flythrough && (
                  <div className="flex gap-1.5 px-4 pb-2 sm:px-6">
                    {preset.journeyIds.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-400 ${
                          i === flythrough.actIndex
                            ? 'w-5 sm:w-6 bg-gold/60'
                            : i < flythrough.actIndex
                              ? 'w-1.5 sm:w-2 bg-gold/25'
                              : 'w-1.5 sm:w-2 bg-chrome-divider'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between px-3.5 pb-3 pt-1.5 sm:px-5 sm:pb-4 sm:pt-2">
                  <button
                    onClick={handleStop}
                    className="text-[11px] text-text-dim hover:text-text-muted transition-colors px-2.5 py-1.5 rounded-md hover:bg-chrome-fill-badge touch-target"
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
