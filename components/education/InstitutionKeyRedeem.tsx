'use client';

import { memo, useCallback, useState } from 'react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const InstitutionKeyRedeem = memo(function InstitutionKeyRedeem({
  programLive = false,
}: {
  /** When false, show preview UI only (disabled) — institution pilot not open yet. */
  programLive?: boolean;
}) {
  const locale = useLocale();
  const [key, setKey] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const redeem = useCallback(async () => {
    if (!programLive) return;
    setBusy(true);
    setMsg(null);
    const billingApi = process.env.NEXT_PUBLIC_BILLING_API_URL?.trim().replace(/\/$/, '');
    if (!billingApi) {
      setMsg({ ok: false, text: t('billing.education.redeemNeedsApi', locale) });
      setBusy(false);
      return;
    }
    try {
      const r = await fetch(`${billingApi}/institution/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ key: key.trim() }),
      });
      const j = (await r.json()) as { ok?: boolean; organization?: string; error?: string };
      if (r.ok && j.organization) {
        setMsg({ ok: true, text: `${t('billing.education.redeemSuccess', locale)} ${j.organization}` });
        setKey('');
      } else {
        setMsg({ ok: false, text: t('billing.education.redeemError', locale) });
      }
    } catch {
      setMsg({ ok: false, text: t('billing.education.redeemError', locale) });
    } finally {
      setBusy(false);
    }
  }, [key, locale, programLive]);

  return (
    <div
      className={`rounded-xl border bg-chrome-fill/15 p-4 ${
        programLive ? 'border-chrome-border/60' : 'border-chrome-border/45 border-dashed'
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/55">
        {t('billing.education.redeemLabel', locale)}
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={t('billing.education.redeemPlaceholder', locale)}
          autoComplete="off"
          disabled={!programLive}
          className="min-w-0 flex-1 rounded-lg border border-chrome-border bg-chrome-fill-raised px-3 py-2 text-[13px] text-parchment placeholder:text-text-dim/50 disabled:cursor-not-allowed disabled:opacity-55"
        />
        <button
          type="button"
          disabled={!programLive || busy || !key.trim()}
          onClick={() => void redeem()}
          title={!programLive ? t('billing.education.redeemComingSoonHint', locale) : undefined}
          className={`rounded-lg border px-4 py-2 text-[13px] font-semibold transition-colors ${
            programLive
              ? 'border-gold/30 bg-gold/12 text-gold hover:bg-gold/18 disabled:opacity-40'
              : 'cursor-not-allowed border-gold/20 border-dashed bg-gold/[0.06] text-gold/65'
          }`}
        >
          {programLive ? t('billing.education.redeemCta', locale) : t('billing.education.redeemComingSoon', locale)}
        </button>
      </div>
      {!programLive ? (
        <p className="mt-3 text-[11px] leading-snug text-text-dim">{t('billing.education.redeemPreviewNote', locale)}</p>
      ) : null}
      {msg ? (
        <p className={`mt-3 text-[12px] ${msg.ok ? 'text-emerald-400/90' : 'text-amber-400/90'}`}>{msg.text}</p>
      ) : null}
    </div>
  );
});

export default InstitutionKeyRedeem;
