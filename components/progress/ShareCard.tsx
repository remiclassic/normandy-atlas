'use client';

import { memo, useCallback, useRef } from 'react';
import { useLedgerStats, useInferredRole } from '@/hooks/useAtlasProgress';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { UiStringKey } from '@/lib/ui-strings';
import type { AtlasRole } from '@/hooks/useAtlasProgress';
import { shareOrCopy, buildPublicShareUrl } from '@/lib/progress/share';
import { atlasMilestones } from '@/data/atlas/milestones';

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
    const T = stats.coverageTotals;
    const places = t('ledger.places', locale);
    const journeys = t('ledger.journeys', locale);
    const eras = t('ledger.eras', locale);
    const stories = t('ledger.stories', locale);
    const milestones = t('ledger.milestones', locale);
    const text =
      locale === 'fr'
        ? `J’ai exploré ${stats.places}/${T.places} ${places}, ${stats.journeys}/${T.journeys} ${journeys}, ${stats.eras}/${T.eras} ${eras}, ${stats.storiesCompleted}/${T.stories} ${stories} et ${stats.milestonesUnlocked}/${atlasMilestones.length} ${milestones} sur le Norman Atlas.`
        : locale === 'es'
          ? `He explorado ${stats.places}/${T.places} ${places}, ${stats.journeys}/${T.journeys} ${journeys}, ${stats.eras}/${T.eras} ${eras}, ${stats.storiesCompleted}/${T.stories} ${stories} y ${stats.milestonesUnlocked}/${atlasMilestones.length} ${milestones} en el Norman Atlas.`
          : locale === 'it'
            ? `Ho esplorato ${stats.places}/${T.places} ${places}, ${stats.journeys}/${T.journeys} ${journeys}, ${stats.eras}/${T.eras} ${eras}, ${stats.storiesCompleted}/${T.stories} ${stories} e ${stats.milestonesUnlocked}/${atlasMilestones.length} ${milestones} sul Norman Atlas.`
            : `I explored ${stats.places}/${T.places} ${places}, ${stats.journeys}/${T.journeys} ${journeys}, ${stats.eras}/${T.eras} ${eras}, ${stats.storiesCompleted}/${T.stories} ${stories}, and ${stats.milestonesUnlocked}/${atlasMilestones.length} ${milestones} on the Norman Atlas.`;
    await shareOrCopy({
      title: 'Norman Atlas',
      text,
      url,
    });
  }, [stats, locale]);

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
          <StatLine label={t('ledger.places', locale)} current={stats.places} total={stats.coverageTotals.places} />
          <StatLine label={t('ledger.journeys', locale)} current={stats.journeys} total={stats.coverageTotals.journeys} />
          <StatLine label={t('ledger.eras', locale)} current={stats.eras} total={stats.coverageTotals.eras} />
          <StatLine label={t('ledger.stories', locale)} current={stats.storiesCompleted} total={stats.coverageTotals.stories} />
          <StatLine label={t('ledger.milestones', locale)} current={stats.milestonesUnlocked} total={atlasMilestones.length} />
        </div>
      </div>
      <button
        type="button"
        onClick={handleShare}
        className="text-[12px] text-gold/70 hover:text-gold px-3 py-1.5 rounded-md border border-gold/15 hover:border-gold/25 transition-colors"
      >
        {t('milestone.modal.share', locale)}
      </button>
    </div>
  );
}

function StatLine({ label, current, total }: { label: string; current: number; total: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-text-dim">{label}</span>
      <span className="text-[12px] font-semibold text-parchment tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}

export default memo(ShareCard);
