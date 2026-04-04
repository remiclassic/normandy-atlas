'use client';

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { buildStoryLauncherModel } from '@/lib/story-launcher';
import type { StoryLauncherItem } from '@/lib/story-launcher';
import { getStoryEraDisplayTitle } from '@/lib/story-era-title';
import { t } from '@/lib/ui-strings';
import StoryLauncherContent from './StoryLauncherContent';

interface Props {
  open: boolean;
  onClose: () => void;
  onBrowseAll?: () => void;
}

const StoryLauncherSheet = memo(function StoryLauncherSheet({
  open,
  onClose,
  onBrowseAll,
}: Props) {
  const locale = useLocale();
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const isMobile = useIsMobile();
  const startStory = useMapStore((s) => s.startStory);
  const startFlythrough = useMapStore((s) => s.startCinematicFlythrough);
  const sheetRef = useRef<HTMLDivElement>(null);

  const model = useMemo(
    () => (open ? buildStoryLauncherModel({ eraId, locale }) : { sections: [] }),
    [open, eraId, locale],
  );

  const eraTitle = useMemo(
    () => getStoryEraDisplayTitle(eraId, locale, atlasMode),
    [eraId, locale, atlasMode],
  );

  const dialogAriaLabel = useMemo(
    () => `${t('launcher.title', locale)} — ${eraTitle}`,
    [locale, eraTitle],
  );

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Focus first interactive element on open
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      const first = sheetRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const handleLaunch = useCallback(
    (item: StoryLauncherItem) => {
      const action = item.launch;
      if (action.type === 'story') {
        startStory(action.arcId, { stepIndex: action.resumeStep ?? 0 });
      } else if (action.type === 'flythrough') {
        startFlythrough(action.presetId);
      }
      onClose();
    },
    [startStory, startFlythrough, onClose],
  );

  const handleBrowseAll = useCallback(() => {
    onClose();
    onBrowseAll?.();
  }, [onClose, onBrowseAll]);

  const libraryFooter = onBrowseAll ? (
    <div className="shrink-0 border-t border-border/50 bg-[var(--color-surface-elevated)] backdrop-blur-md px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={handleBrowseAll}
        className="w-full rounded-xl border border-gold/25 bg-gold/[0.07] hover:bg-gold/[0.12] hover:border-gold/40 px-4 py-3 text-left transition-all duration-200 touch-target shadow-sm"
      >
        <span className="block text-[13px] font-semibold text-parchment">
          {t('launcher.browseAll', locale)}
        </span>
        <span className="block text-[10px] text-text-dim/65 mt-0.5">
          {t('launcher.browseAll.hint', locale)}
        </span>
      </button>
    </div>
  ) : null;

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 100 || info.velocity.y > 500) onClose();
    },
    [onClose],
  );

  if (typeof document === 'undefined') return null;

  // ─── Mobile: bottom sheet ────────────────────────────────────────
  if (isMobile) {
    return createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="launcher-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="atlas-sheet-backdrop"
              onClick={onClose}
            />
            <motion.div
              ref={sheetRef}
              key="launcher-sheet"
              role="dialog"
              aria-modal="true"
              aria-label={dialogAriaLabel}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="atlas-bottom-sheet"
              style={{ maxHeight: '80dvh' }}
            >
              <div className="sheet-handle" />
              <div className="sheet-content scrollbar-thin">
                <StoryLauncherContent
                  model={model}
                  locale={locale}
                  eraTitle={eraTitle}
                  onLaunch={handleLaunch}
                  embedIntro
                />
              </div>
              {libraryFooter}
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );
  }

  // ─── Desktop: centered dialog panel ──────────────────────────────
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="launcher-backdrop-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[52] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="launcher-dialog-desktop"
            role="dialog"
            aria-modal="true"
            aria-label={dialogAriaLabel}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[53] flex items-center justify-center pointer-events-none p-6"
          >
            <div
              ref={sheetRef}
              className="pointer-events-auto w-full max-w-lg max-h-[75vh] rounded-2xl glass-panel-elevated border border-border overflow-hidden flex flex-col"
            >
              {/* Header — era-first framing */}
              <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-border/40">
                <div className="min-w-0 space-y-1 pr-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                    {t('launcher.headline.kicker', locale)}
                  </p>
                  <h2 className="text-[15px] font-semibold text-parchment leading-snug">
                    {eraTitle}
                  </h2>
                  <p className="text-[10px] text-text-dim/60 leading-relaxed">
                    {t('launcher.tagline', locale)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('launcher.aria.close', locale)}
                  className="flex shrink-0 items-center justify-center w-7 h-7 rounded-lg hover:bg-chrome-fill-badge text-text-dim hover:text-parchment transition-colors touch-target"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 3l8 8M11 3l-8 8" />
                  </svg>
                </button>
              </div>
              {/* Scrollable body */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain scrollbar-thin">
                <StoryLauncherContent
                  model={model}
                  locale={locale}
                  onLaunch={handleLaunch}
                  embedIntro={false}
                />
              </div>
              {libraryFooter}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export default StoryLauncherSheet;
