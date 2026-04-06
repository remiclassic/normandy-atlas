'use client';

import { memo } from 'react';

import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { GfnaNormanAtlasMatch } from '@/lib/gfna-norman-atlas-match';

/** Compact badge when a catalogue surname matches a Norman Atlas New France founder (migration channel). */
export const GfnaNormanAtlasBadge = memo(function GfnaNormanAtlasBadge({
  normanAtlas,
  compact,
}: {
  normanAtlas: GfnaNormanAtlasMatch;
  /** Smaller padding for dense lists (finder rows). */
  compact?: boolean;
}) {
  const locale = useLocale();
  if (!normanAtlas.matched) return null;

  const parts = normanAtlas.channels.map((c) =>
    c === 'normandy_port'
      ? t('genealogy.gfnaNormanChannelNormandy', locale)
      : t('genealogy.gfnaNormanChannelPerche', locale),
  );
  const title = `${t('genealogy.gfnaNormanAtlasTooltip', locale)} (${parts.join(' · ')})`;

  return (
    <span
      className={
        compact
          ? 'atlas-badge-cyan inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]'
          : 'atlas-badge-cyan inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]'
      }
      title={title}
    >
      {t('genealogy.gfnaNormanBadge', locale)}
    </span>
  );
});
