'use client';

import { memo, useCallback, useRef } from 'react';
import { useLedgerStats, useInferredRole } from '@/hooks/useAtlasProgress';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { UiStringKey } from '@/lib/ui-strings';
import type { AtlasRole } from '@/hooks/useAtlasProgress';
import { shareOrCopy, buildPublicShareUrl } from '@/lib/progress/share';

const ROLE_STRING_KEYS: Record<AtlasRole, UiStringKey> = {
  explorer: 'ledger.role.explorer',
  historian: 'ledger.role.historian',
  cartographer: 'ledger.role.cartographer',
  chronicler: 'ledger.role.chronicler',
};

/**
 * Renders a small share card that can be screenshot'd or shared via Web Share.
 * Designed to work purely client-side (no server-rendered OG images).
 */
function ShareCard() {
  const locale = useLocale();
  const stats = useLedgerStats();
  const role = useInferredRole();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    const url = buildPublicShareUrl({});
    await shareOrCopy({
      title: 'Norman Atlas',
      text: `I explored ${stats.places} places, ${stats.journeys} journeys, and ${stats.eras} eras on the Norman Atlas.`,
      url,
    });
  }, [stats]);

  if (stats.places === 0) return null;

  return (
    <div className="space-y-3">
      <div
        ref={cardRef}
        className="rounded-xl border border-chrome-border bg-chrome-popover/95 p-5 max-w-[320px]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-2">
          Norman Atlas
        </p>
        <p className="text-[15px] font-display font-bold text-parchment mb-1">
          {t(ROLE_STRING_KEYS[role], locale)}
        </p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1 mt-3">
          <StatLine label={t('ledger.places', locale)} value={stats.places} />
          <StatLine label={t('ledger.journeys', locale)} value={stats.journeys} />
          <StatLine label={t('ledger.eras', locale)} value={stats.eras} />
          <StatLine label={t('ledger.stories', locale)} value={stats.storiesCompleted} />
          <StatLine label={t('ledger.milestones', locale)} value={stats.milestonesUnlocked} />
        </div>
      </div>
      <button
        onClick={handleShare}
        className="text-[12px] text-gold/70 hover:text-gold px-3 py-1.5 rounded-md border border-gold/15 hover:border-gold/25 transition-colors"
      >
        {locale === 'fr' ? 'Partager' : 'Share'}
      </button>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-text-dim">{label}</span>
      <span className="text-[12px] font-semibold text-parchment tabular-nums">{value}</span>
    </div>
  );
}

export default memo(ShareCard);
