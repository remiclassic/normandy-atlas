'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Clapperboard, Heart, Library, Signpost } from 'lucide-react';
import MapLoader from '@/components/map/MapLoader';
import MapDeepLinkSync from '@/components/map/MapDeepLinkSync';
import EraSelector from '@/components/timeline/EraSelector';
import AtlasTimelineRail from '@/components/timeline/AtlasTimelineRail';
import LayerPanel from '@/components/panels/LayerPanel';
import MigrationExplorerPanel from '@/components/panels/MigrationExplorerPanel';
import HistoricalDetailPanel from '@/components/panels/HistoricalDetailPanel';
import StoryModeBar from '@/components/story/StoryModeBar';
import StoryLibraryPanel from '@/components/story/StoryLibraryPanel';
import CinematicFlythroughBar from '@/components/flythrough/CinematicFlythroughBar';
import AtlasWelcomeGate from '@/components/onboarding/AtlasWelcomeGate';
import ReplayTourButton from '@/components/onboarding/ReplayTourButton';
import { CreditsModal, CreditsIconButton } from '@/components/layout/CreditsPanel';
import { NormanOverviewModal, NormanOverviewIconButton } from '@/components/layout/NormanOverviewModal';
import { RoadmapModal, RoadmapIconButton } from '@/components/layout/RoadmapModal';
import { SupportModal } from '@/components/layout/SupportModal';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { useHydrateLocale, useHydrateUiTheme, useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { t } from '@/lib/ui-strings';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import BasemapSwitcher from '@/components/ui/BasemapSwitcher';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';

function MobileMenuDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (typeof document === 'undefined') return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-[61] w-[280px] max-w-[80vw] border-r border-chrome-border-strong bg-chrome-popover overflow-y-auto scrollbar-thin"
            style={{
              backdropFilter: 'blur(40px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-chrome-border">
              <div>
                <h2 className="font-display text-[15px] font-bold text-parchment tracking-wide">
                  Norman Atlas
                </h2>
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-text-dim mt-0.5">
                  Settings & Tools
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all touch-target"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function AtlasHomeShell() {
  useHydrateLocale();
  useHydrateUiTheme();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const [creditsOpen, setCreditsOpen] = useState(false);
  const openCredits = useCallback(() => setCreditsOpen(true), []);
  const closeCredits = useCallback(() => setCreditsOpen(false), []);

  const [normanOverviewOpen, setNormanOverviewOpen] = useState(false);
  const openNormanOverview = useCallback(() => setNormanOverviewOpen(true), []);
  const closeNormanOverview = useCallback(() => setNormanOverviewOpen(false), []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openMobileMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const [storyLibraryOpen, setStoryLibraryOpen] = useState(false);
  const openStoryLibrary = useCallback(() => setStoryLibraryOpen(true), []);
  const closeStoryLibrary = useCallback(() => setStoryLibraryOpen(false), []);

  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const openRoadmap = useCallback(() => setRoadmapOpen(true), []);
  const closeRoadmap = useCallback(() => setRoadmapOpen(false), []);

  const [supportOpen, setSupportOpen] = useState(false);
  const openSupport = useCallback(() => {
    setCreditsOpen(false);
    setNormanOverviewOpen(false);
    setRoadmapOpen(false);
    setSupportOpen(true);
  }, []);
  const closeSupport = useCallback(() => setSupportOpen(false), []);

  const handleCreditsFromMenu = useCallback(() => {
    closeMobileMenu();
    openCredits();
  }, [closeMobileMenu, openCredits]);

  const handleOverviewFromMenu = useCallback(() => {
    closeMobileMenu();
    openNormanOverview();
  }, [closeMobileMenu, openNormanOverview]);

  const handleStoriesFromMenu = useCallback(() => {
    closeMobileMenu();
    openStoryLibrary();
  }, [closeMobileMenu, openStoryLibrary]);

  const handleSupportFromMenu = useCallback(() => {
    closeMobileMenu();
    openSupport();
  }, [closeMobileMenu, openSupport]);

  const handleRoadmapFromMenu = useCallback(() => {
    closeMobileMenu();
    openRoadmap();
  }, [closeMobileMenu, openRoadmap]);

  const desktopLeadingSlot = useMemo(
    () => (
      <div className="flex items-center gap-1">
        <ReplayTourButton />
        <span data-onboarding="stories">
          <ChromeIconTooltip
            label={t('storyLibrary.tooltip.label', locale)}
            hint={t('storyLibrary.tooltip.hint', locale)}
          >
            <button
              type="button"
              onClick={openStoryLibrary}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-chrome-fill hover:text-cyan-300/80"
              aria-label={t('storyLibrary.aria.open', locale)}
            >
              <Clapperboard className="h-[15px] w-[15px]" strokeWidth={1.5} aria-hidden />
            </button>
          </ChromeIconTooltip>
        </span>
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
          label={t('atlasJournal.tooltip.label', locale)}
          hint={t('atlasJournal.tooltip.hint', locale)}
        >
          <Link
            href="/journal"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-chrome-fill hover:text-gold/70"
            aria-label={t('atlasJournal.aria.open', locale)}
          >
            <Library className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
          </Link>
        </ChromeIconTooltip>
        <ChromeIconTooltip
          label={t('roadmap.tooltip.label', locale)}
          hint={t('roadmap.tooltip.hint', locale)}
        >
          <RoadmapIconButton onOpen={openRoadmap} ariaLabel={t('roadmap.aria.open', locale)} />
        </ChromeIconTooltip>
        <ChromeIconTooltip
          label={t('credits.tooltip.label', locale)}
          hint={t('credits.tooltip.hint', locale)}
        >
          <CreditsIconButton onOpen={openCredits} ariaLabel={t('credits.aria.open', locale)} />
        </ChromeIconTooltip>
        <span className="flex items-center gap-1" data-onboarding="theme">
          <ThemeSwitcher />
          <BasemapSwitcher />
        </span>
        <BackgroundMusic floating={false} />
        <LanguageSwitcher />
      </div>
    ),
    [locale, openCredits, openNormanOverview, openRoadmap, openStoryLibrary],
  );

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-background">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="relative z-30 w-full shrink-0 border-b border-chrome-border bg-background/55 backdrop-blur-md pointer-events-none">
        {isMobile ? (
          /* ── Mobile compact header ─────────────────────── */
          <div className="flex items-center gap-2 px-3 py-1.5 pointer-events-auto">
            <button
              onClick={openMobileMenu}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-dim hover:bg-chrome-fill hover:text-text-muted transition-colors touch-target"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={openStoryLibrary}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-dim hover:bg-chrome-fill hover:text-cyan-300/80 transition-colors touch-target"
              aria-label={t('storyLibrary.aria.open', locale)}
            >
              <Clapperboard className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
            </button>

            <div className="min-w-0 flex-1">
              <EraSelector compact />
            </div>
          </div>
        ) : (
          /* ── Desktop/tablet header ─────────────────────── */
          <div className="flex flex-col gap-2 px-4 py-2 pointer-events-auto sm:flex-row sm:items-center sm:gap-8 sm:px-5 sm:py-2.5">
            <div className="flex shrink-0 flex-col gap-0.5 border-chrome-border sm:border-r sm:pr-8">
              <h1 className="font-display text-[14px] font-bold leading-none tracking-wide text-parchment sm:text-[15px]">
                Norman Atlas
              </h1>
              <p className="text-[8px] font-medium uppercase leading-snug tracking-[0.18em] text-text-dim sm:text-[9px] sm:tracking-[0.2em]">
                {t('header.tagline', locale)}
              </p>
            </div>

            <ChromeIconTooltip
              label={t('support.tooltip.label', locale)}
              hint={t('support.tooltip.hint', locale)}
            >
              <button
                type="button"
                onClick={openSupport}
                className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] font-semibold text-gold/80 transition-all duration-200 hover:border-gold/35 hover:bg-gold/10 hover:text-gold sm:inline-flex"
                aria-label={t('support.aria.open', locale)}
              >
                <Heart className="h-3 w-3" strokeWidth={2} aria-hidden />
                <span className="md:hidden">{t('support.headerButton', locale)}</span>
                <span className="hidden md:inline">{t('support.headerButtonFull', locale)}</span>
              </button>
            </ChromeIconTooltip>

            <div className="min-w-0 flex-1">
              <EraSelector leadingSlot={desktopLeadingSlot} />
            </div>
          </div>
        )}

        <AtlasTimelineRail />
      </header>

      {/* ─── Main content ───────────────────────────────────── */}
      <div className="relative flex min-h-0 min-w-0 flex-1">
        <div className="relative min-h-0 min-w-0 flex-1" data-onboarding="map">
          <MapLoader />
          <MapDeepLinkSync />
          <div className="vignette-overlay absolute inset-0" aria-hidden />

          {/* Map overlay panels — repositioned for mobile */}
          <div
            className={`absolute z-20 flex flex-col items-start gap-2 ${
              isMobile
                ? 'bottom-4 left-3 right-3'
                : 'bottom-28 left-5'
            }`}
            data-onboarding="layers"
          >
            <LayerPanel />
            <MigrationExplorerPanel />
          </div>
          {/* Mobile: column stack (flythrough above story) to avoid overlapping pills; desktop: pass-through */}
          <div className="max-[767px]:pointer-events-none max-[767px]:absolute max-[767px]:bottom-0 max-[767px]:inset-x-0 max-[767px]:z-20 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-3 max-[767px]:px-3 max-[767px]:pb-[max(1rem,env(safe-area-inset-bottom))] md:contents">
            <CinematicFlythroughBar />
            <StoryModeBar />
          </div>
        </div>

        <HistoricalDetailPanel />
      </div>

      {/* ─── Mobile menu drawer ─────────────────────────────── */}
      <MobileMenuDrawer open={mobileMenuOpen} onClose={closeMobileMenu}>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim/50 mb-2">
              Explore
            </p>
            <button
              onClick={handleOverviewFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-60">
                <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {t('normanOverview.tooltip.label', locale)}
            </button>
            <Link
              href="/journal"
              onClick={closeMobileMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <Library className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} />
              {t('atlasJournal.tooltip.label', locale)}
            </Link>
            <button
              type="button"
              onClick={handleRoadmapFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <Signpost className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
              {t('roadmap.mobileDrawer.label', locale)}
            </button>
            <button
              type="button"
              onClick={handleStoriesFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <Clapperboard className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
              {t('storyLibrary.tooltip.label', locale)}
            </button>
            <ReplayTourButton fullWidth />
          </div>

          <div className="h-px bg-chrome-divider" />

          <div className="space-y-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim/50 mb-2">
              Preferences
            </p>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[13px] text-text-muted">Theme</span>
              <ThemeSwitcher />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[13px] text-text-muted">Basemap</span>
              <BasemapSwitcher />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[13px] text-text-muted">Language</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[13px] text-text-muted">Music</span>
              <BackgroundMusic floating={false} />
            </div>
          </div>

          <div className="h-px bg-chrome-divider" />

          <div className="space-y-2">
            <button
              onClick={handleSupportFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-gold/80 hover:bg-gold/8 hover:text-gold transition-colors touch-target"
            >
              <Heart className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
              {t('support.mobileDrawer.label', locale)}
            </button>
            <button
              onClick={handleCreditsFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-60">
                <path d="M3 2h10v12H3z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 5h4M6 8h4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
              {t('credits.tooltip.label', locale)}
            </button>
          </div>
        </div>
      </MobileMenuDrawer>

      {/* ─── Modals ─────────────────────────────────────────── */}
      <StoryLibraryPanel open={storyLibraryOpen} onClose={closeStoryLibrary} />

      <CreditsModal open={creditsOpen} onClose={closeCredits} onOpenSupport={openSupport} />
      <NormanOverviewModal open={normanOverviewOpen} onClose={closeNormanOverview} />
      <RoadmapModal open={roadmapOpen} onClose={closeRoadmap} />
      <SupportModal open={supportOpen} onClose={closeSupport} />
      <AtlasWelcomeGate onOpenNormanOverview={openNormanOverview} />
    </div>
  );
}
