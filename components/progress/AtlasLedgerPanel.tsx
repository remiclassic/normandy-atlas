'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
import { useLedgerStats } from '@/hooks/useAtlasProgress';
import { t } from '@/lib/ui-strings';
import CuratorPickBanner from './CuratorPickBanner';
import ShareCard from './ShareCard';
import {
  AtlasCoveragePanelSection,
  ProgressDataActions,
} from '@/components/progress/atlas-progress-shared';
import {
  AtlasLedgerMilestonesSection,
  AtlasLedgerExpeditionsSection,
} from '@/components/progress/atlas-ledger-sections';

function AtlasLedgerPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const stats = useLedgerStats();
  const isEmpty = stats.places === 0 && stats.storiesCompleted === 0;

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[71] w-[360px] max-w-[90vw] border-l border-chrome-border-strong bg-chrome-popover overflow-y-auto scrollbar-thin"
            style={{
              backdropFilter: 'blur(40px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-chrome-border bg-chrome-popover/95 px-5 pt-5 pb-3 backdrop-blur-md">
              <div>
                <h2 className="font-display text-[15px] font-bold tracking-wide text-parchment">
                  {t('ledger.heading', locale)}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-chrome-fill text-text-dim transition-all hover:bg-chrome-fill-active hover:text-text-muted"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 p-5">
              {isEmpty ? (
                <p className="py-8 text-center text-[13px] leading-relaxed text-text-dim/60">
                  {t('ledger.empty', locale)}
                </p>
              ) : (
                <>
                  <AtlasCoveragePanelSection locale={locale} />
                  <div className="h-px bg-chrome-divider" />
                  <AtlasLedgerMilestonesSection locale={locale} />
                  <div className="h-px bg-chrome-divider" />
                  <AtlasLedgerExpeditionsSection locale={locale} />
                  <div className="h-px bg-chrome-divider" />
                  <div>
                    <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
                      {t('ledger.shareProgressHeading', locale)}
                    </h3>
                    <ShareCard />
                  </div>
                </>
              )}
              <div className="h-px bg-chrome-divider" />
              <CuratorPickBanner onNavigate={onClose} />
              <div className="h-px bg-chrome-divider" />
              <ProgressDataActions locale={locale} variant="panel" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(AtlasLedgerPanel);
