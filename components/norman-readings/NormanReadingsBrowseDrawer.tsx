'use client';

import { memo } from 'react';

import AtlasMenuDrawer from '@/components/layout/AtlasMenuDrawer';
import NormanReadingsNavList from '@/components/norman-readings/NormanReadingsNavList';
import type { NormanReadingEntry } from '@/lib/norman-readings/types';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

/** Mobile / narrow: full-height article list + map shortcuts (same as desktop sidebar). */
const NormanReadingsBrowseDrawer = memo(function NormanReadingsBrowseDrawer({
  open,
  onClose,
  readings,
  activeSlug,
}: {
  open: boolean;
  onClose: () => void;
  readings: NormanReadingEntry[];
  activeSlug?: string;
}) {
  const locale = useLocale();
  const title = t('normanReadings.browseDrawerTitle', locale);

  return (
    <AtlasMenuDrawer open={open} onClose={onClose} side="left">
      <div className="px-1 pt-2">
        <p className="mb-3 px-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
          {title}
        </p>
        <div className="max-h-[min(72vh,520px)] overflow-y-auto overscroll-y-contain scrollbar-thin pr-1">
          <NormanReadingsNavList readings={readings} activeSlug={activeSlug} onNavigate={onClose} />
        </div>
      </div>
    </AtlasMenuDrawer>
  );
});

export default NormanReadingsBrowseDrawer;
