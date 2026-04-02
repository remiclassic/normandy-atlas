'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import {
  flythroughPresets,
  isFlythroughPresetVisibleInEra,
} from '@/data/atlas/flythrough-presets';
import {
  getArcEntriesForEra,
  arcChromeStyle,
  type EraArcEntry,
} from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import BottomSheet from '@/components/ui/BottomSheet';

const MobilePlayDock = memo(function MobilePlayDock() {
  const isMobile = useIsMobile();
  const locale = useLocale();
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyMode = useMapStore((s) => s.storyMode);
  const cinematicFlythrough = useMapStore((s) => s.cinematicFlythrough);
  const eraId = useMapStore((s) => s.eraId);
  const uiTheme = useMapStore((s) => s.uiTheme);
  const startStory = useMapStore((s) => s.startStory);
  const startFlythrough = useMapStore((s) => s.startCinematicFlythrough);

  const [sheetOpen, setSheetOpen] = useState(false);
  const openSheet = useCallback(() => setSheetOpen(true), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const visiblePresets = useMemo(
    () => flythroughPresets.filter((p) => isFlythroughPresetVisibleInEra(p, eraId)),
    [eraId],
  );

  const arcEntries = useMemo(() => getArcEntriesForEra(eraId), [eraId]);

  const hasSecondary = visiblePresets.length > 0 || arcEntries.length > 0;
  const visible = isMobile && atlasMode && !storyMode && cinematicFlythrough == null;

  const handleExplore = useCallback(() => {
    startStory();
  }, [startStory]);

  const handleStartArc = useCallback(
    (arcId: string) => {
      startStory(arcId);
      closeSheet();
    },
    [startStory, closeSheet],
  );

  const handleStartFlythrough = useCallback(
    (presetId: string) => {
      startFlythrough(presetId);
      closeSheet();
    },
    [startFlythrough, closeSheet],
  );

  if (!visible) return null;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-20 w-full flex gap-2 pointer-events-auto"
          >
            {/* Primary: Explore the Story */}
            <button
              onClick={handleExplore}
              className="group flex flex-1 min-h-[48px] items-center justify-center gap-3 rounded-full glass-panel glow-gold px-5 py-3 text-[13px] font-medium text-gold hover:text-gold-bright transition-all duration-250 border-gold/15 hover:border-gold/25 touch-target"
            >
              <span className="flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-gold/10 group-hover:bg-gold/15 transition-colors duration-200">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                </svg>
              </span>
              <span className="min-w-0 truncate">{t('story.explore', locale)}</span>
            </button>

            {/* Secondary: open sheet with flythroughs + arcs */}
            {hasSecondary && (
              <button
                onClick={openSheet}
                aria-label={t('dock.more', locale)}
                className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full glass-panel border-border hover:border-gold/25 text-text-muted hover:text-parchment transition-all duration-200 touch-target"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom sheet: flythroughs + arc stories */}
      <BottomSheet open={sheetOpen} onClose={closeSheet} maxHeight="60dvh">
        <div className="px-5 pt-4 pb-6 space-y-5">
          {/* Flythroughs section */}
          {visiblePresets.length > 0 && (
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 mb-3">
                {t('dock.flythroughs', locale)}
              </h3>
              <div className="space-y-2">
                {visiblePresets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleStartFlythrough(p.id)}
                    className="group flex w-full min-h-[48px] items-center gap-3 rounded-xl bg-chrome-fill-badge/40 hover:bg-chrome-fill-badge/70 px-4 py-3 text-left transition-all duration-200 touch-target"
                  >
                    <span className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-gold/8 group-hover:bg-gold/15 transition-colors duration-200">
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                        <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" className="text-text-muted group-hover:text-parchment transition-colors" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-text-muted group-hover:text-parchment transition-colors leading-snug">
                        {pickI18n(p.title, locale)}
                      </span>
                      <span className="block text-[11px] text-text-dim/70 leading-snug mt-0.5 line-clamp-1">
                        {pickI18n(p.subtitle, locale)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Story arcs section */}
          {arcEntries.length > 0 && (
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 mb-3">
                {t('dock.stories', locale)}
              </h3>
              <div className="space-y-2">
                {arcEntries.map((entry: EraArcEntry) => {
                  const st = arcChromeStyle(entry, uiTheme);
                  return (
                    <button
                      key={entry.arcId}
                      onClick={() => handleStartArc(entry.arcId)}
                      className={`group flex w-full min-h-[48px] items-center gap-3 rounded-xl bg-chrome-fill-badge/40 hover:bg-chrome-fill-badge/70 px-4 py-3 text-left transition-all duration-200 touch-target ${st.border}`}
                    >
                      <span className={`flex shrink-0 items-center justify-center w-8 h-8 rounded-full ${st.iconBg} ${st.iconBgHover} transition-colors duration-200`}>
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                          <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className={`min-w-0 flex-1 text-[13px] font-medium leading-snug ${st.text} ${st.textHover} transition-colors`}>
                        {pickI18n(entry.label, locale)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </BottomSheet>
    </>
  );
});

export default MobilePlayDock;
