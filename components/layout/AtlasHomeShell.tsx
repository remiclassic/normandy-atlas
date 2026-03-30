'use client';

import { useCallback, useMemo, useState } from 'react';
import MapLoader from '@/components/map/MapLoader';
import EraSelector from '@/components/timeline/EraSelector';
import AtlasTimelineRail from '@/components/timeline/AtlasTimelineRail';
import LayerPanel from '@/components/panels/LayerPanel';
import MigrationExplorerPanel from '@/components/panels/MigrationExplorerPanel';
import HistoricalDetailPanel from '@/components/panels/HistoricalDetailPanel';
import StoryModeBar from '@/components/story/StoryModeBar';
import AtlasWelcomeGate from '@/components/onboarding/AtlasWelcomeGate';
import ReplayTourButton from '@/components/onboarding/ReplayTourButton';
import { CreditsModal, CreditsIconButton } from '@/components/layout/CreditsPanel';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

/**
 * Full-width top chrome with branding + era controls; map and detail panel below.
 */
export default function AtlasHomeShell() {
  const [creditsOpen, setCreditsOpen] = useState(false);
  const openCredits = useCallback(() => setCreditsOpen(true), []);
  const closeCredits = useCallback(() => setCreditsOpen(false), []);

  const leadingSlot = useMemo(
    () => (
      <div className="flex items-center gap-0.5">
        <ReplayTourButton />
        <ChromeIconTooltip
          label="Credits & about"
          hint="Creator, vision, links, and how to support this project."
        >
          <CreditsIconButton onOpen={openCredits} />
        </ChromeIconTooltip>
      </div>
    ),
    [openCredits],
  );

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
      <header className="relative z-30 w-full shrink-0 border-b border-white/[0.06] bg-background/55 backdrop-blur-md pointer-events-none">
        <div className="flex flex-col gap-2 px-4 py-2 pointer-events-auto sm:flex-row sm:items-center sm:gap-8 sm:px-5 sm:py-2.5">
          <div className="flex shrink-0 flex-col gap-0.5 border-white/[0.06] sm:border-r sm:pr-8">
            <h1 className="font-display text-[14px] font-bold leading-none tracking-wide text-parchment sm:text-[15px]">
              Norman Atlas
            </h1>
            <p className="text-[8px] font-medium uppercase leading-snug tracking-[0.18em] text-text-dim sm:text-[9px] sm:tracking-[0.2em]">
              A living map of people, movement, and time
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <EraSelector leadingSlot={leadingSlot} />
          </div>
        </div>

        <AtlasTimelineRail />
      </header>

      <div className="relative flex min-h-0 min-w-0 flex-1">
        <div className="relative min-h-0 min-w-0 flex-1" data-onboarding="map">
          <MapLoader />
          <div className="vignette-overlay absolute inset-0" aria-hidden />

          <div className="absolute bottom-28 left-5 z-20 flex flex-col items-start gap-2" data-onboarding="layers">
            <LayerPanel />
            <MigrationExplorerPanel />
          </div>
          <StoryModeBar />
        </div>

        <HistoricalDetailPanel />
      </div>

      <CreditsModal open={creditsOpen} onClose={closeCredits} />
      <AtlasWelcomeGate />
    </div>
  );
}
