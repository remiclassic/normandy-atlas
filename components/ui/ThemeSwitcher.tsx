'use client';

import { memo, useCallback } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { UiThemeMode } from '@/lib/ui-theme';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

const BTN =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200';

function ThemeSwitcherInner({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const uiThemeMode = useMapStore((s) => s.uiThemeMode);
  const setUiThemeMode = useMapStore((s) => s.setUiThemeMode);

  const onPick = useCallback(
    (next: UiThemeMode) => {
      setUiThemeMode(next);
    },
    [setUiThemeMode],
  );

  return (
    <div
      className={
        embedded
          ? 'flex items-center gap-0.5'
          : 'flex items-center gap-0.5 rounded-full border border-chrome-border-strong bg-chrome-fill-badge p-0.5 backdrop-blur-sm'
      }
      role="group"
      aria-label={t('theme.label', locale)}
    >
      <ChromeIconTooltip label={t('theme.aria.dim', locale)}>
        <button
          type="button"
          onClick={() => onPick('dark')}
          aria-pressed={uiThemeMode === 'dark'}
          aria-label={t('theme.aria.dim', locale)}
          className={`${BTN} ${
            uiThemeMode === 'dark'
              ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
              : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
          }`}
        >
          <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
        </button>
      </ChromeIconTooltip>
      <ChromeIconTooltip label={t('theme.aria.bright', locale)}>
        <button
          type="button"
          onClick={() => onPick('light')}
          aria-pressed={uiThemeMode === 'light'}
          aria-label={t('theme.aria.bright', locale)}
          className={`${BTN} ${
            uiThemeMode === 'light'
              ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
              : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
          }`}
        >
          <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
        </button>
      </ChromeIconTooltip>
      <ChromeIconTooltip
        label={t('theme.aria.auto', locale)}
        hint={t('theme.auto.help', locale)}
      >
        <button
          type="button"
          onClick={() => onPick('auto')}
          aria-pressed={uiThemeMode === 'auto'}
          aria-label={t('theme.aria.auto', locale)}
          className={`${BTN} ${
            uiThemeMode === 'auto'
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

export default memo(ThemeSwitcherInner);
