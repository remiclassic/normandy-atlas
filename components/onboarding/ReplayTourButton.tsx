'use client';

import { memo, useCallback } from 'react';
import { CircleHelp } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { startGuidedTourFromCleanState } from '@/lib/guided-tour-ui';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

const ReplayTourButton = memo(function ReplayTourButton({
  fullWidth,
  embedded,
}: {
  fullWidth?: boolean;
  /** Compact icon-only variant for the desktop header chrome */
  embedded?: boolean;
}) {
  const phase = useMapStore((s) => s.onboardingPhase);
  const locale = useLocale();
  const label = t('header.moreTools.replayTour', locale);
  const hint = t('header.help.replayTour.hint', locale);

  const handleReplay = useCallback(() => {
    if (phase !== 'complete') return;
    void startGuidedTourFromCleanState('intro');
  }, [phase]);

  if (phase !== 'complete') return null;

  if (fullWidth) {
    return (
      <button
        type="button"
        onClick={handleReplay}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
      >
        <CircleHelp className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
        {label}
      </button>
    );
  }

  if (embedded) {
    return (
      <ChromeIconTooltip label={label} hint={hint}>
        <button
          type="button"
          onClick={handleReplay}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment"
          aria-label={label}
        >
          <CircleHelp className="h-[13px] w-[13px]" strokeWidth={1.5} aria-hidden />
        </button>
      </ChromeIconTooltip>
    );
  }

  return (
    <ChromeIconTooltip label={label} hint={hint}>
      <button
        type="button"
        onClick={handleReplay}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-chrome-fill hover:text-gold/70"
        aria-label={label}
      >
        <CircleHelp className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
      </button>
    </ChromeIconTooltip>
  );
});

export default ReplayTourButton;
