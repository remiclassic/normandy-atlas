'use client';

import { memo, useCallback } from 'react';
import { useMapStore } from '@/lib/store';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

const ReplayTourButton = memo(function ReplayTourButton() {
  const setPhase = useMapStore((s) => s.setOnboardingPhase);
  const phase = useMapStore((s) => s.onboardingPhase);

  const handleReplay = useCallback(() => {
    if (phase !== 'complete') return;
    setPhase('intro');
  }, [setPhase, phase]);

  if (phase !== 'complete') return null;

  return (
    <ChromeIconTooltip
      label="Replay guided tour"
      hint="Walk through the atlas introduction again."
    >
      <button
        type="button"
        onClick={handleReplay}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-chrome-fill hover:text-gold/70"
        aria-label="Replay guided tour"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
          <text x="8" y="11.5" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="sans-serif" fontWeight="600">
            ?
          </text>
        </svg>
      </button>
    </ChromeIconTooltip>
  );
});

export default ReplayTourButton;
