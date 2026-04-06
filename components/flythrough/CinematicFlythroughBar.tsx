'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import {
  getFlythroughPreset,
  isFlythroughPresetVisibleInEra,
} from '@/data/atlas/flythrough-presets';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { useIsMobile } from '@/hooks/use-responsive';

/** In-progress flythrough UI only. Preset entry: `FlythroughPresetPicker` beside the map stories CTA. */
export default function CinematicFlythroughBar() {
  const flythrough = useMapStore((s) => s.cinematicFlythrough);
  const progress = useMapStore((s) => s.cinematicFlythroughProgress);
  const eraId = useMapStore((s) => s.eraId);
  const locale = useMapStore((s) => s.locale);
  const stopFlythrough = useMapStore((s) => s.stopCinematicFlythrough);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);

  const isMobile = useIsMobile();
  const isActive = flythrough !== null;

  const preset = useMemo(
    () => (flythrough ? getFlythroughPreset(flythrough.presetId) : null),
    [flythrough],
  );

  useEffect(() => {
    if (!flythrough || !preset) return;
    if (isFlythroughPresetVisibleInEra(preset, eraId)) return;
    stopFlythrough();
  }, [eraId, flythrough, preset, stopFlythrough]);

  const handleStop = useCallback(() => stopFlythrough(), [stopFlythrough]);

  if (storyEraIntroActive) return null;

  return (
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
  );
}
