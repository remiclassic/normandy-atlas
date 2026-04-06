'use client';

import { memo, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { requestOpenCommandPalette } from '@/lib/command-palette/open-command-palette';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

export type CommandPaletteHeaderTriggerProps = {
  /** `chrome`: compact header control. `mobileTouch`: map / subpage mobile row. */
  size?: 'chrome' | 'mobileTouch';
};

export const CommandPaletteHeaderTrigger = memo(function CommandPaletteHeaderTrigger({
  size = 'chrome',
}: CommandPaletteHeaderTriggerProps) {
  const locale = useLocale();
  const onClick = useCallback(() => requestOpenCommandPalette(), []);

  const touch = size === 'mobileTouch';
  const btnClass = touch
    ? 'atlas-icon-hover-cyan flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-lg text-text-dim transition-colors hover:bg-chrome-fill touch-target'
    : 'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment';

  const label = t('header.commandPalette.tooltip.label', locale);
  const hint = t('header.commandPalette.tooltip.hint', locale);

  return (
    <ChromeIconTooltip label={label} hint={hint}>
      <button
        type="button"
        onClick={onClick}
        className={btnClass}
        aria-label={label}
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Terminal
          className={touch ? 'h-[17px] w-[17px]' : 'h-[15px] w-[15px]'}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>
    </ChromeIconTooltip>
  );
});
