'use client';

import { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/hooks/use-atlas';
import { useEntitlements } from '@/hooks/useEntitlements';
import { t } from '@/lib/ui-strings';
import { openAtlasBillingPortal, startAtlasProCheckout } from '@/lib/billing/checkout-client';
import { isAtlasProCheckoutUiEnabled } from '@/lib/billing/checkout-ui-enabled';

const AtlasProCard = memo(function AtlasProCard() {
  const locale = useLocale();
  const { loading, data } = useEntitlements();
  const [busy, setBusy] = useState(false);

  const startCheckout = useCallback(async () => {
    setBusy(true);
    try {
      await startAtlasProCheckout('/profile');
    } finally {
      setBusy(false);
    }
  }, []);

  const openPortal = useCallback(async () => {
    setBusy(true);
    try {
      await openAtlasBillingPortal('/profile#atlas-pro');
    } finally {
      setBusy(false);
    }
  }, []);

  if (loading || !data) {
    return (
      <div
        id="atlas-pro"
        className="rounded-xl border border-chrome-border/60 bg-chrome-fill/20 p-4 animate-pulse"
        style={{ minHeight: 120 }}
      />
    );
  }

  const { atlasPro, institution, institutionLabel, devBypass, stripeConfigured, stripeSubscriptionActive } = data;

  const statusLine = devBypass
    ? t('billing.pro.statusDev', locale)
    : institution
      ? `${t('billing.pro.statusInstitution', locale)}${institutionLabel ? `: ${institutionLabel}` : ''}`
      : stripeSubscriptionActive
        ? t('billing.pro.statusActive', locale)
        : null;

  return (
    <div
      id="atlas-pro"
      className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/55">
        {t('billing.pro.cardTitle', locale)}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{t('billing.pro.cardHint', locale)}</p>
      {statusLine ? <p className="mt-2 text-[12px] text-emerald-400/90">{statusLine}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {stripeSubscriptionActive ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void openPortal()}
            className="rounded-lg border border-gold/35 bg-gold/12 px-4 py-2 text-[13px] font-semibold text-gold hover:bg-gold/20 disabled:opacity-50"
          >
            {t('billing.pro.manage', locale)}
          </button>
        ) : null}
        {!atlasPro && stripeConfigured ? (
          <div className="flex min-w-[min(100%,220px)] flex-col gap-1.5">
            <button
              type="button"
              disabled={busy || !isAtlasProCheckoutUiEnabled()}
              onClick={() => void startCheckout()}
              title={
                isAtlasProCheckoutUiEnabled()
                  ? undefined
                  : t('billing.pro.upgradeComingSoonHint', locale)
              }
              className={`rounded-lg border px-4 py-2 text-left text-[13px] font-semibold transition-colors ${
                isAtlasProCheckoutUiEnabled()
                  ? 'border-gold/35 bg-gold/12 text-gold hover:bg-gold/20 disabled:opacity-50'
                  : 'cursor-not-allowed border-gold/25 border-dashed bg-gold/[0.06] text-gold/70'
              }`}
            >
              {isAtlasProCheckoutUiEnabled()
                ? t('billing.pro.upgrade', locale)
                : t('billing.pro.upgradeComingSoon', locale)}
            </button>
            {!isAtlasProCheckoutUiEnabled() ? (
              <p className="text-[11px] leading-snug text-text-dim">{t('billing.pro.teaserReturn', locale)}</p>
            ) : null}
          </div>
        ) : null}
        {!atlasPro && !stripeConfigured ? (
          <div className="flex min-w-[min(100%,220px)] flex-col gap-1.5">
            <button
              type="button"
              disabled
              title={t('billing.pro.upgradeComingSoonHint', locale)}
              className="cursor-not-allowed rounded-lg border border-gold/25 border-dashed bg-gold/[0.06] px-4 py-2 text-left text-[13px] font-semibold text-gold/70"
            >
              {t('billing.pro.upgradeComingSoon', locale)}
            </button>
            <p className="text-[11px] leading-snug text-text-dim">{t('billing.pro.notConfigured', locale)}</p>
          </div>
        ) : null}

        <Link
          href="/education"
          className="inline-flex items-center rounded-lg border border-chrome-border px-4 py-2 text-[13px] font-medium text-text-muted hover:border-gold/25 hover:text-parchment"
        >
          {t('billing.pro.educationLink', locale)}
        </Link>
      </div>
    </div>
  );
});

export default AtlasProCard;
