'use client';

import { memo, useCallback } from 'react';
import { Globe, ScrollText } from 'lucide-react';
import { useMapStore, type BasemapMode } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const BTN =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200';

function BasemapSwitcherInner({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const basemapMode = useMapStore((s) => s.basemapMode);
  const setBasemapMode = useMapStore((s) => s.setBasemapMode);

  const onPick = useCallback(
    (mode: BasemapMode) => {
      setBasemapMode(mode);
    },
    [setBasemapMode],
  );

  return (
    <div
      className={
        embedded
          ? 'flex items-center gap-0.5'
          : 'flex items-center gap-0.5 rounded-full border border-chrome-border-strong bg-chrome-fill-badge p-0.5 backdrop-blur-sm'
      }
      role="group"
      aria-label={t('basemap.group', locale)}
    >
      <button
        type="button"
        onClick={() => onPick('dark')}
        aria-pressed={basemapMode === 'dark'}
        aria-label={t('basemap.aria.cartographic', locale)}
        className={`${BTN} ${
          basemapMode === 'dark'
            ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
            : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
        }`}
      >
        <Globe className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => onPick('parchment')}
        aria-pressed={basemapMode === 'parchment'}
        aria-label={t('basemap.aria.manuscript', locale)}
        className={`${BTN} ${
          basemapMode === 'parchment'
            ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
            : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
        }`}
      >
        <ScrollText className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}

export default memo(BasemapSwitcherInner);
