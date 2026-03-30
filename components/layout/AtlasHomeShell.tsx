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
import { NormanOverviewModal, NormanOverviewIconButton } from '@/components/layout/NormanOverviewModal';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { useHydrateLocale, useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

/**
 * Full-width top chrome with branding + era controls; map and detail panel below.
 */
export default function AtlasHomeShell() {
  useHydrateLocale();
  const locale = useLocale();
  const [creditsOpen, setCreditsOpen] = useState(false);
  const openCredits = useCallback(() => setCreditsOpen(true), []);
  const closeCredits = useCallback(() => setCreditsOpen(false), []);

  const [normanOverviewOpen, setNormanOverviewOpen] = useState(false);
  const openNormanOverview = useCallback(() => setNormanOverviewOpen(true), []);
  const closeNormanOverview = useCallback(() => setNormanOverviewOpen(false), []);

  const leadingSlot = useMemo(
    () => (
      <div className="flex items-center gap-1">
        <ReplayTourButton />
        <ChromeIconTooltip
          label={t('normanOverview.tooltip.label', locale)}
          hint={t('normanOverview.tooltip.hint', locale)}
        >
          <NormanOverviewIconButton
            onOpen={openNormanOverview}
            ariaLabel={t('normanOverview.aria.open', locale)}
          />
        </ChromeIconTooltip>
        <ChromeIconTooltip
          label={t('credits.tooltip.label', locale)}
          hint={t('credits.tooltip.hint', locale)}
        >
          <CreditsIconButton onOpen={openCredits} ariaLabel={t('credits.aria.open', locale)} />
        </ChromeIconTooltip>
        <LanguageSwitcher />
      </div>
    ),
    [openCredits, openNormanOverview, locale],
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
              {t('header.tagline', locale)}
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
      <NormanOverviewModal open={normanOverviewOpen} onClose={closeNormanOverview} />
      <AtlasWelcomeGate onOpenNormanOverview={openNormanOverview} />
    </div>
  );
}
