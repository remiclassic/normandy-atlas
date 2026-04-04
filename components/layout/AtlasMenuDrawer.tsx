'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { AtlasHeaderBrandLockup } from '@/components/layout/AtlasHeaderBrandLockup';

export default function AtlasMenuDrawer({
  open,
  onClose,
  side = 'left',
  children,
}: {
  open: boolean;
  onClose: () => void;
  /** 'left' for mobile hamburger, 'right' for desktop settings */
  side?: 'left' | 'right';
  children: ReactNode;
}) {
  const locale = useLocale();
  if (typeof document === 'undefined') return null;

  const isRight = side === 'right';
  const width = isRight ? 320 : 280;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`fixed top-0 bottom-0 z-[71] max-w-[80vw] bg-chrome-popover overflow-y-auto scrollbar-thin ${
              isRight
                ? 'right-0 border-l border-chrome-border-strong'
                : 'left-0 border-r border-chrome-border-strong'
            }`}
            style={{
              width,
              backdropFilter: 'blur(40px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 border-b border-chrome-border">
              <div className="min-w-0 flex-1">
                <AtlasHeaderBrandLockup
                  emphasis
                  subtitle={t('header.settingsMenu', locale)}
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all touch-target"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
