'use client';

import { memo, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { useProgress } from '@/hooks/useAtlasProgress';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { storyLibraryMetaList } from '@/data/atlas/story-library-meta';
import { shareOrCopy, buildPublicShareUrl } from '@/lib/progress/share';
import type { AtlasLocale } from '@/core/types';

function storyArcDisplayTitle(arcId: string | null, locale: AtlasLocale): string {
  const meta = storyLibraryMetaList.find((m) => m.arcId === arcId);
  if (meta?.displayTitle) return pickI18n(meta.displayTitle, locale);
  return locale === 'fr' ? 'Récit' : 'Story';
}

const HOLD_MS = 2800;

function LedgerRecordedOverlay() {
  const locale = useLocale();
  const phase = useMapStore((s) => s.ledgerCelebrationPhase);
  const storyArc = useMapStore((s) => s.storyArc);
  const advance = useMapStore((s) => s.advanceLedgerCelebration);
  const progress = useProgress();
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const showing = phase === 'overlay';

  const completedStoryCount = useMemo(
    () => Object.values(progress.story).filter((r) => r.completed).length,
    [progress.story],
  );
  const showFirstArcShare = completedStoryCount === 1;

  const arcTitle = useMemo(
    () => (showing ? storyArcDisplayTitle(storyArc, locale) : ''),
    [showing, storyArc, locale],
  );

  const handleShareArc = useCallback(async () => {
    if (!arcTitle) return;
    await shareOrCopy({
      title: 'Norman Atlas',
      text: t('share.firstStory.shareBody', locale).replace('{title}', arcTitle),
      url: buildPublicShareUrl({}),
    });
  }, [arcTitle, locale]);

  const reducedMotion = !!useReducedMotion();

  const dismiss = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    advance();
  }, [advance]);

  const handleAnimateIn = useCallback(() => {
    holdTimerRef.current = setTimeout(advance, HOLD_MS);
  }, [advance]);

  useEffect(() => {
    return () => { if (holdTimerRef.current) clearTimeout(holdTimerRef.current); };
  }, []);

  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          key="ledger-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.05 : 0.3 }}
          className="fixed inset-0 z-[82] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.85, y: reducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 10 }}
            transition={{
              duration: reducedMotion ? 0.05 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={(def) => {
              if (typeof def === 'object' && 'opacity' in def && def.opacity === 1) {
                handleAnimateIn();
              }
            }}
            className="relative rounded-2xl border border-gold/25 bg-chrome-popover/95 backdrop-blur-xl shadow-2xl max-w-xs w-[calc(100vw-2.5rem)] px-7 pt-8 pb-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative radial glow behind the icon */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-40 h-40 rounded-full bg-gold/8 blur-3xl" />
            </div>

            {/* Star icon with subtle pulse */}
            <motion.div
              animate={reducedMotion ? {} : { scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/12 border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <svg width="24" height="24" viewBox="0 0 14 14" fill="none" className="text-gold">
                <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.5 3.3 12.3l.7-4.1-3-2.9 4.2-.7L7 1z" fill="currentColor" />
              </svg>
            </motion.div>

            <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/60 mb-2">
              {t('story.seal.recorded', locale)}
            </p>
            <p className="relative text-[13px] leading-relaxed text-text-muted mb-5">
              {t('story.seal.subtitle', locale)}
            </p>

            <div className="relative flex flex-wrap items-center justify-center gap-3">
              {showFirstArcShare && (
                <button
                  type="button"
                  onClick={handleShareArc}
                  className="rounded-lg border border-gold/20 bg-gold/8 px-5 py-1.5 text-[12px] font-medium text-gold hover:bg-gold/15 hover:border-gold/30 transition-colors"
                >
                  {t('milestone.modal.share', locale)}
                </button>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="rounded-lg border border-chrome-border px-5 py-1.5 text-[12px] font-medium text-text-dim hover:bg-chrome-fill hover:text-text-muted transition-colors"
              >
                {t('milestone.modal.continue', locale)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(LedgerRecordedOverlay);
