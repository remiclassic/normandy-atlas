'use client';

import { memo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { ProGateReason } from '@/lib/billing/types';
import { trackAtlasConversion } from '@/lib/analytics/conversion';
import { startAtlasProCheckout } from '@/lib/billing/checkout-client';
import { isAtlasProCheckoutUiEnabled } from '@/lib/billing/checkout-ui-enabled';

export type ProUpgradeModalProps = {
  open: boolean;
  reason: ProGateReason | null;
  onClose: () => void;
};

const ProUpgradeModal = memo(function ProUpgradeModal({ open, reason, onClose }: ProUpgradeModalProps) {
  const locale = useLocale();

  useEffect(() => {
    if (open && reason) {
      trackAtlasConversion('pro_gate_shown', { reason });
    }
  }, [open, reason]);

  const startCheckout = useCallback(async () => {
    const ok = await startAtlasProCheckout(window.location.pathname);
    if (!ok) window.location.href = '/profile#atlas-pro';
  }, []);

  const reasonBody = (() => {
    switch (reason) {
      case 'macro_csv':
        return t('billing.gate.bodyMacroCsv', locale);
      case 'lineage_compare':
        return t('billing.gate.bodyLineageCompare', locale);
      case 'macro_compare':
      default:
        return t('billing.gate.bodyMacroCompare', locale);
    }
  })();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="pro-gate-scrim"
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-label={t('billing.gate.close', locale)}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            className="relative z-10 w-full max-w-md rounded-xl border border-gold/20 bg-chrome-fill shadow-atlas-popover p-5 sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              {t('billing.gate.kicker', locale)}
            </p>
            <h2 className="mt-2 font-display text-lg font-semibold text-parchment">
              {t('billing.gate.title', locale)}
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-text-muted">{reasonBody}</p>
            <p className="mt-2 text-[11px] text-text-dim">{t('billing.gate.immersion', locale)}</p>
            {!isAtlasProCheckoutUiEnabled() ? (
              <p className="mt-3 text-[12px] text-text-muted">{t('billing.gate.checkoutPausedNote', locale)}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!isAtlasProCheckoutUiEnabled()}
                onClick={() => void startCheckout()}
                title={
                  isAtlasProCheckoutUiEnabled()
                    ? undefined
                    : t('billing.pro.upgradeComingSoonHint', locale)
                }
                className={`rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                  isAtlasProCheckoutUiEnabled()
                    ? 'border-gold/35 bg-gold/15 text-gold hover:bg-gold/25'
                    : 'cursor-not-allowed border-gold/25 border-dashed bg-gold/[0.06] text-gold/70'
                }`}
              >
                {isAtlasProCheckoutUiEnabled()
                  ? t('billing.gate.ctaUpgrade', locale)
                  : t('billing.gate.ctaComingSoon', locale)}
              </button>
              <LinkishProfile onClick={onClose} locale={locale} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

const LinkishProfile = memo(function LinkishProfile({
  onClick,
  locale,
}: {
  onClick: () => void;
  locale: import('@/core/types').AtlasLocale;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        window.location.href = '/profile#atlas-pro';
      }}
      className="rounded-lg border border-chrome-border px-4 py-2.5 text-[13px] font-medium text-text-muted hover:border-gold/25 hover:text-parchment transition-colors"
    >
      {t('billing.gate.detailsOnProfile', locale)}
    </button>
  );
});

export default ProUpgradeModal;
