'use client';

import { memo, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { UiTheme } from '@/lib/ui-theme';

const BTN =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200';

function ThemeSwitcherInner() {
  const locale = useLocale();
  const uiTheme = useMapStore((s) => s.uiTheme);
  const setUiTheme = useMapStore((s) => s.setUiTheme);

  const onPick = useCallback(
    (next: UiTheme) => {
      setUiTheme(next);
    },
    [setUiTheme],
  );

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-chrome-border-strong bg-chrome-fill-badge p-0.5 backdrop-blur-sm"
      role="group"
      aria-label={t('theme.label', locale)}
    >
      <button
        type="button"
        onClick={() => onPick('dark')}
        aria-pressed={uiTheme === 'dark'}
        aria-label={t('theme.aria.dim', locale)}
        className={`${BTN} ${
          uiTheme === 'dark'
            ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
            : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
        }`}
      >
        <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => onPick('light')}
        aria-pressed={uiTheme === 'light'}
        aria-label={t('theme.aria.bright', locale)}
        className={`${BTN} ${
          uiTheme === 'light'
            ? 'bg-chrome-fill-pressed text-parchment border border-gold/35 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)]'
            : 'text-text-muted border border-transparent hover:bg-chrome-fill-hover hover:text-text'
        }`}
      >
        <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}

export default memo(ThemeSwitcherInner);
