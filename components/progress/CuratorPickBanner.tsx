'use client';

import { memo, useMemo, useCallback } from 'react';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { getCuratorPickForThisWeek } from '@/data/atlas/curator-picks';
import { useMapStore } from '@/lib/store';

function CuratorPickBanner({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const pick = useMemo(() => getCuratorPickForThisWeek(), []);

  const handleClick = useCallback(() => {
    const { setEra, selectFeature, startStory, goToStoryStep } = useMapStore.getState();
    const dl = pick.deepLink;

    if (dl.era) setEra(dl.era);

    if (dl.place) selectFeature(dl.place, 'settlement');
    else if (dl.region) selectFeature(dl.region, 'region');
    else if (dl.segment) selectFeature(dl.segment, 'atlas-route');
    else if (dl.journey) selectFeature(dl.journey, 'atlas-journey');

    if (dl.story !== undefined) {
      startStory(dl.story ?? undefined);
      if (dl.step != null) goToStoryStep(dl.step);
    }

    onNavigate?.();
  }, [pick, onNavigate]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group block w-full text-left rounded-lg border border-gold/10 bg-gold/3 px-4 py-3 transition-colors hover:border-gold/20 hover:bg-gold/5"
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-1">
        {locale === 'fr' ? 'Choix du curateur' : 'Curator\'s pick'}
      </p>
      <p className="text-[13px] font-medium text-parchment leading-snug group-hover:text-gold/90 transition-colors">
        {pickI18n(pick.title, locale)}
      </p>
      <p className="text-[11px] text-text-dim/70 leading-snug mt-1 line-clamp-2">
        {pickI18n(pick.teaser, locale)}
      </p>
    </button>
  );
}

export default memo(CuratorPickBanner);
