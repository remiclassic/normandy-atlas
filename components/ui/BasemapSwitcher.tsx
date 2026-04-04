'use client';

import { memo, useCallback } from 'react';
import { Globe, Monitor, ScrollText } from 'lucide-react';
import { useMapStore, type BasemapModePreference } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

const BTN =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200';

function BasemapSwitcherInner({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const basemapModePreference = useMapStore((s) => s.basemapModePreference);
  const setBasemapModePreference = useMapStore((s) => s.setBasemapModePreference);

  const onPick = useCallback(
    (mode: BasemapModePreference) => {
      setBasemapModePreference(mode);
    },
    [setBasemapModePreference],
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
      <ChromeIconTooltip label={t('basemap.aria.cartographic', locale)}>
        <button
          type="button"
          onClick={() => onPick('dark')}
          aria-pressed={basemapModePreference === 'dark'}
          aria-label={t('basemap.aria.cartographic', locale)}
          className={`${BTN} ${
            basemapModePreference === 'dark'
              ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
              : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
          }`}
        >
          <Globe className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
        </button>
      </ChromeIconTooltip>
      <ChromeIconTooltip label={t('basemap.aria.manuscript', locale)}>
        <button
          type="button"
          onClick={() => onPick('parchment')}
          aria-pressed={basemapModePreference === 'parchment'}
          aria-label={t('basemap.aria.manuscript', locale)}
          className={`${BTN} ${
            basemapModePreference === 'parchment'
              ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
              : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
          }`}
        >
          <ScrollText className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
        </button>
      </ChromeIconTooltip>
      <ChromeIconTooltip
        label={t('basemap.aria.auto', locale)}
        hint={t('basemap.auto.help', locale)}
      >
        <button
          type="button"
          onClick={() => onPick('auto')}
          aria-pressed={basemapModePreference === 'auto'}
          aria-label={t('basemap.aria.auto', locale)}
          className={`${BTN} ${
            basemapModePreference === 'auto'
              ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
              : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
          }`}
        >
          <Monitor className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
        </button>
      </ChromeIconTooltip>
    </div>
  );
}

export default memo(BasemapSwitcherInner);
