'use client';

import type { ReactNode } from 'react';
import { memo, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
import { t, type UiStringKey } from '@/lib/ui-strings';

/** Slide-up sheet for mobile hub “More” menu (`z` above bottom tab bar, below full-screen gate modals). */
const MobileMoreSheet = memo(function MobileMoreSheet({
  open,
  onClose,
  titleKey = 'mobileNav.moreSheetTitle',
  children,
}: {
  open: boolean;
  onClose: () => void;
  titleKey?: UiStringKey;
  children: ReactNode;
}) {
  const locale = useLocale();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const tmr = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('button, a, [href]')?.focus();
    });
    return () => cancelAnimationFrame(tmr);
  }, [open]);

  /** After mount: portal to body so fixed layers are not clipped by hub shells (fixed/sticky/overflow). */
  if (!portalReady) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[72] bg-black/50 backdrop-blur-sm md:hidden"
            aria-hidden
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: '100%', opacity: 0.96 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-[73] flex max-h-[min(92dvh,48rem)] flex-col overflow-hidden rounded-t-2xl border border-chrome-border-strong/80 bg-chrome-popover shadow-[0_-8px_40px_rgba(0,0,0,0.45)] md:hidden"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
              backdropFilter: 'blur(40px) saturate(1.15)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.15)',
            }}
          >
            <div className="flex shrink-0 items-center justify-center border-b border-chrome-border/60 bg-chrome-popover/95 px-3 py-2">
              <div className="h-1 w-9 shrink-0 rounded-full bg-chrome-divider" aria-hidden />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-chrome-border/50 px-4 py-3">
              <h2 id={titleId} className="min-w-0 truncate font-display text-base font-semibold tracking-wide text-gold">
                {t(titleKey, locale)}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 shrink-0 items-center rounded-lg px-3 text-[12px] font-semibold uppercase tracking-wide text-text-dim transition-colors hover:bg-chrome-fill hover:text-parchment touch-manipulation"
              >
                {t('mobileNav.moreSheetClose', locale)}
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-6 pt-4 [-webkit-overflow-scrolling:touch] scrollbar-thin">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export default MobileMoreSheet;
