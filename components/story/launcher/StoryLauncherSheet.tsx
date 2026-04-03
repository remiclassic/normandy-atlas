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
  const isMobile = useIsMobile();
  const startStory = useMapStore((s) => s.startStory);
  const startFlythrough = useMapStore((s) => s.startCinematicFlythrough);
  const sheetRef = useRef<HTMLDivElement>(null);

  const model = useMemo(
    () => (open ? buildStoryLauncherModel({ eraId, locale }) : { sections: [] }),
    [open, eraId, locale],
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
              aria-label={t('launcher.title', locale)}
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
                  onLaunch={handleLaunch}
                  onBrowseAll={onBrowseAll ? handleBrowseAll : undefined}
                />
              </div>
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
            aria-label={t('launcher.title', locale)}
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
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-border/40">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim/60">
                  {t('launcher.title', locale)}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('launcher.aria.close', locale)}
                  className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-chrome-fill-badge text-text-dim hover:text-parchment transition-colors touch-target"
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
                  onBrowseAll={onBrowseAll ? handleBrowseAll : undefined}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export default StoryLauncherSheet;
