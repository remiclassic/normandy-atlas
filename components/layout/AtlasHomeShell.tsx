'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Clapperboard, Heart, Library, Signpost, BookOpen, Feather } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import MapLoader from '@/components/map/MapLoader';
import MapDeepLinkSync from '@/components/map/MapDeepLinkSync';
import EraSelector from '@/components/timeline/EraSelector';
import AtlasTimelineRail from '@/components/timeline/AtlasTimelineRail';
import LayerPanel from '@/components/panels/LayerPanel';
import MigrationExplorerPanel from '@/components/panels/MigrationExplorerPanel';
import HistoricalDetailPanel from '@/components/panels/HistoricalDetailPanel';
import StoryModeBar from '@/components/story/StoryModeBar';
import StoryLibraryPanel from '@/components/story/StoryLibraryPanel';
import StoryEraIntroOverlay from '@/components/story/StoryEraIntroOverlay';
import CinematicFlythroughBar from '@/components/flythrough/CinematicFlythroughBar';
import MobilePlayDock from '@/components/story/MobilePlayDock';
import AtlasWelcomeGate from '@/components/onboarding/AtlasWelcomeGate';
import ReplayTourButton from '@/components/onboarding/ReplayTourButton';
import { CreditsModal, CreatorAboutHeaderButton } from '@/components/layout/CreditsPanel';
import { NormanOverviewModal, NormanOverviewIconButton } from '@/components/layout/NormanOverviewModal';
import { RoadmapModal, RoadmapIconButton } from '@/components/layout/RoadmapModal';
import { SupportModal } from '@/components/layout/SupportModal';

/** Set to true to restore Support the Atlas in the header, mobile menu, and creator modal. */
const SUPPORT_ATLAS_ENABLED = false;
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { useHydrateLocale, useHydrateUiTheme, useHydrateTextSize, useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { t } from '@/lib/ui-strings';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import BasemapSwitcher from '@/components/ui/BasemapSwitcher';
import TextSizeMenu from '@/components/ui/TextSizeMenu';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';
import AtlasLedgerPanel from '@/components/progress/AtlasLedgerPanel';
import CuratorToast from '@/components/progress/CuratorToast';
import MilestoneCelebrationModal from '@/components/progress/MilestoneCelebrationModal';
import LedgerRecordedOverlay from '@/components/progress/LedgerRecordedOverlay';
import ExpeditionProgressChip from '@/components/progress/ExpeditionProgressChip';
import SessionGuard from '@/components/progress/SessionGuard';
import { getArcEntriesForEra, arcChromeStyle } from '@/data/atlas/era-arcs';

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
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-[71] w-[280px] max-w-[80vw] border-r border-chrome-border-strong bg-chrome-popover overflow-y-auto scrollbar-thin"
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
  useHydrateTextSize();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const eraId = useMapStore((s) => s.eraId);
  const uiTheme = useMapStore((s) => s.uiTheme);

  const eraAccentHover = useMemo(() => {
    const arcs = getArcEntriesForEra(eraId);
    if (arcs.length === 0) return '';
    const style = arcChromeStyle(arcs[0], uiTheme);
    return style.textHover.replace('hover:', 'hover:');
  }, [eraId, uiTheme]);

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

  const storyLibraryCloseRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (storyLibraryOpen) {
      queueMicrotask(() => storyLibraryCloseRef.current?.focus());
    }
  }, [storyLibraryOpen]);

  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const openRoadmap = useCallback(() => setRoadmapOpen(true), []);
  const closeRoadmap = useCallback(() => setRoadmapOpen(false), []);

  const [ledgerOpen, setLedgerOpen] = useState(false);
  const openLedger = useCallback(() => setLedgerOpen(true), []);

  const ledgerAttentionActive = useMapStore((s) => s.ledgerAttentionActive);

  const openLedgerAndEndCelebration = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
    openLedger();
  }, [openLedger]);

  /** Pulse sits beside the journal icon; stop it when opening the journal. */
  const stopLedgerPulseOnJournalNavigate = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

  const closeLedger = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
    setLedgerOpen(false);
  }, []);

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

  const handleLedgerFromMenu = useCallback(() => {
    closeMobileMenu();
    openLedgerAndEndCelebration();
  }, [closeMobileMenu, openLedgerAndEndCelebration]);

  const desktopUtilitySlot = useMemo(
    () => (
      <div className="flex items-center gap-0.5 text-text-muted/80">
        {!storyLibraryOpen && <ReplayTourButton />}
        <span data-onboarding="stories">
          {storyLibraryOpen ? (
            <ChromeIconTooltip
              label={t('storyLibrary.backToMap', locale)}
              hint={t('storyLibrary.subtitle', locale)}
            >
              <button
                ref={storyLibraryCloseRef}
                type="button"
                onClick={closeStoryLibrary}
                className="flex shrink-0 items-center gap-1 rounded-md border border-chrome-border bg-chrome-fill px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-text-muted transition-colors duration-200 hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment sm:gap-1.5 sm:px-2.5 sm:text-[11px]"
                aria-label={t('storyLibrary.backToMap', locale)}
              >
                <ArrowLeft className="h-3 w-3 shrink-0 opacity-80 sm:h-3.5 sm:w-3.5" strokeWidth={2.25} aria-hidden />
                <span className="hidden sm:inline">{t('storyLibrary.backToMap', locale)}</span>
              </button>
            </ChromeIconTooltip>
          ) : (
            <ChromeIconTooltip
              label={t('storyLibrary.tooltip.label', locale)}
              hint={t('storyLibrary.tooltip.hint', locale)}
            >
              <button
                type="button"
                onClick={openStoryLibrary}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill ${eraAccentHover || 'hover:text-parchment'}`}
                aria-label={t('storyLibrary.aria.open', locale)}
              >
                <Clapperboard className="h-[13px] w-[13px]" strokeWidth={1.5} aria-hidden />
              </button>
            </ChromeIconTooltip>
          )}
        </span>
        <ChromeIconTooltip
          label={t('normanOverview.tooltip.label', locale)}
          hint={t('normanOverview.tooltip.hint', locale)}
        >
          <NormanOverviewIconButton
            onOpen={openNormanOverview}
            ariaLabel={t('normanOverview.aria.open', locale)}
            className={eraAccentHover}
          />
        </ChromeIconTooltip>
        <ChromeIconTooltip
          label={t('atlasJournal.tooltip.label', locale)}
          hint={t('atlasJournal.tooltip.hint', locale)}
        >
          <Link
            href="/journal"
            onClick={stopLedgerPulseOnJournalNavigate}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment"
            aria-label={t('atlasJournal.aria.open', locale)}
          >
            <Library className="h-[13px] w-[13px]" strokeWidth={1.5} aria-hidden />
          </Link>
        </ChromeIconTooltip>
        <ChromeIconTooltip
          label={t('ledger.tooltip.label', locale)}
          hint={t('ledger.tooltip.hint', locale)}
        >
          <motion.button
            key={ledgerAttentionActive ? 'ledger-attention' : 'ledger-idle'}
            type="button"
            onClick={openLedgerAndEndCelebration}
            animate={ledgerAttentionActive
              ? { scale: [1, 1.15, 1], color: ['rgb(212,175,55)', 'rgb(255,215,80)', 'rgb(212,175,55)'] }
              : { scale: 1 }}
            transition={ledgerAttentionActive ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded transition-[background] duration-200 hover:bg-chrome-fill"
            style={ledgerAttentionActive ? undefined : { color: 'var(--color-text-muted)', opacity: 0.7 }}
            aria-label={t('ledger.aria.open', locale)}
            data-ledger-entry
          >
            <BookOpen className="h-[13px] w-[13px]" strokeWidth={1.5} aria-hidden />
          </motion.button>
        </ChromeIconTooltip>
        <ChromeIconTooltip
          label={t('roadmap.tooltip.label', locale)}
          hint={t('roadmap.tooltip.hint', locale)}
        >
          <RoadmapIconButton onOpen={openRoadmap} ariaLabel={t('roadmap.aria.open', locale)} />
        </ChromeIconTooltip>
        <div className="mx-0.5 h-3 w-px bg-chrome-divider" />
        <ChromeIconTooltip
          label={t('textSize.tooltip.label', locale)}
          hint={t('textSize.tooltip.hint', locale)}
        >
          <TextSizeMenu />
        </ChromeIconTooltip>
        <span className="flex items-center gap-0.5" data-onboarding="theme">
          <ThemeSwitcher />
          {!storyLibraryOpen && <BasemapSwitcher />}
        </span>
        <BackgroundMusic floating={false} />
        <LanguageSwitcher />
        <ExpeditionProgressChip onOpenLedger={openLedgerAndEndCelebration} />
      </div>
    ),
    [
      closeStoryLibrary,
      eraAccentHover,
      ledgerAttentionActive,
      locale,
      openLedgerAndEndCelebration,
      openNormanOverview,
      openRoadmap,
      openStoryLibrary,
      stopLedgerPulseOnJournalNavigate,
      storyLibraryOpen,
    ],
  );

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-background">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="relative z-30 w-full shrink-0 border-b border-chrome-border bg-background/80 backdrop-blur-xl pointer-events-none shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {isMobile ? (
          /* ── Mobile compact header ─────────────────────── */
          <div className="flex flex-col pointer-events-auto">
            {/* Row 1: nav icons + expedition chip */}
            <div className="flex items-center gap-2 px-3 py-1.5">
              <button
                onClick={openMobileMenu}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-dim hover:bg-chrome-fill hover:text-text-muted transition-colors touch-target"
                aria-label="Open menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {storyLibraryOpen ? (
                <button
                  ref={storyLibraryCloseRef}
                  type="button"
                  onClick={closeStoryLibrary}
                  className="flex max-w-[min(100%,11rem)] shrink-0 touch-target items-center gap-1.5 rounded-lg border border-chrome-border bg-chrome-fill px-2.5 py-2 text-[11px] font-semibold text-text-muted transition-colors hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment"
                  aria-label={t('storyLibrary.backToMap', locale)}
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 text-gold/80" strokeWidth={2.25} aria-hidden />
                  <span className="truncate">{t('storyLibrary.backToMap', locale)}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openStoryLibrary}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-dim hover:bg-chrome-fill hover:text-cyan-300/80 transition-colors touch-target"
                  aria-label={t('storyLibrary.aria.open', locale)}
                >
                  <Clapperboard className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
                </button>
              )}

              <div className="min-w-0 flex-1 flex justify-end">
                <ExpeditionProgressChip onOpenLedger={openLedgerAndEndCelebration} compact />
              </div>
            </div>

            {/* Row 2: era selector or story library title (full width) */}
            <div className="min-w-0 w-full border-t border-chrome-border/40 px-3">
              {storyLibraryOpen ? (
                <div className="flex min-h-9 items-center justify-center px-1">
                  <p className="truncate text-center font-display text-[12px] font-semibold tracking-tight text-text-muted">
                    {t('storyLibrary.title', locale)}
                  </p>
                </div>
              ) : (
                <EraSelector compact />
              )}
            </div>
          </div>
        ) : (
          /* ── Desktop/tablet header ─────────────────────── */
          <div className="flex flex-col pointer-events-auto">
            {/* Row 1: brand + utility (quiet) */}
            <div className="flex items-center gap-6 px-4 py-1.5 sm:px-5" style={{ background: 'var(--color-chrome-fill)' }}>
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex flex-col gap-0">
                  <h1 className="font-display text-[12px] font-semibold leading-none tracking-wide text-text-muted sm:text-[13px]">
                    Norman Atlas
                  </h1>
                  <p className="text-[7px] font-medium uppercase leading-snug tracking-[0.2em] text-text-muted/50 sm:text-[8px]">
                    {storyLibraryOpen ? t('storyLibrary.subtitle', locale) : t('header.tagline', locale)}
                  </p>
                </div>
                {SUPPORT_ATLAS_ENABLED && (
                  <ChromeIconTooltip
                    label={t('support.tooltip.label', locale)}
                    hint={t('support.tooltip.hint', locale)}
                  >
                    <button
                      type="button"
                      onClick={openSupport}
                      className="hidden shrink-0 items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold transition-colors duration-200 hover:border-gold/50 hover:bg-gold/20 hover:text-gold-bright sm:inline-flex"
                      aria-label={t('support.aria.open', locale)}
                    >
                      <Heart className="h-3 w-3 fill-gold/40" strokeWidth={2} aria-hidden />
                      <span className="md:hidden">{t('support.headerButton', locale)}</span>
                      <span className="hidden md:inline">{t('support.headerButtonFull', locale)}</span>
                    </button>
                  </ChromeIconTooltip>
                )}
                <ChromeIconTooltip
                  label={t('credits.tooltip.label', locale)}
                  hint={t('credits.tooltip.hint', locale)}
                >
                  <CreatorAboutHeaderButton onOpen={openCredits} ariaLabel={t('credits.aria.open', locale)} />
                </ChromeIconTooltip>
              </div>
              <div className="min-w-0 flex-1" />
              {desktopUtilitySlot}
            </div>

            {/* Row 2: era hero (focal) — hidden while browsing stories */}
            {!storyLibraryOpen && (
              <div className="border-t border-chrome-border/50 px-4 sm:px-5">
                <EraSelector />
              </div>
            )}
          </div>
        )}

        {!storyLibraryOpen && <AtlasTimelineRail />}
      </header>

      {/* ─── Mobile ledger attention chip (10s after accomplishments) ── */}
      <AnimatePresence>
        {isMobile && ledgerAttentionActive && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[82] pointer-events-auto"
          >
            <motion.button
              type="button"
              onClick={openLedgerAndEndCelebration}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-chrome-popover/95 backdrop-blur-lg px-4 py-2.5 shadow-[0_0_16px_rgba(212,175,55,0.2)]"
            >
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              >
                <BookOpen className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
              </motion.span>
              <span className="text-[12px] font-semibold text-gold">
                {t('ledger.affordance.mobile', locale)}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main content ───────────────────────────────────── */}
      <div className="relative flex min-h-0 min-w-0 flex-1">
        <div className="relative min-h-0 min-w-0 flex-1" data-onboarding="map">
          <MapLoader />
          <MapDeepLinkSync />
          <div className="vignette-overlay absolute inset-0" aria-hidden />

          {/* Map overlay panels, repositioned for mobile to clear the play dock */}
          <div
            className={`absolute z-20 flex flex-col items-start gap-2 ${
              isMobile
                ? 'bottom-20 left-3 right-3'
                : 'bottom-28 left-5'
            }`}
            data-onboarding="layers"
          >
            <LayerPanel />
            <MigrationExplorerPanel />
          </div>
          {/* Mobile: hybrid dock replaces stacked idle buttons; desktop: pass-through */}
          <div className="max-[767px]:pointer-events-none max-[767px]:absolute max-[767px]:bottom-0 max-[767px]:inset-x-0 max-[767px]:z-20 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-3 max-[767px]:px-3 max-[767px]:pb-[max(1rem,env(safe-area-inset-bottom))] md:contents">
            <CinematicFlythroughBar />
            <StoryModeBar />
            <MobilePlayDock />
          </div>
        </div>

        <HistoricalDetailPanel />
        <StoryLibraryPanel
          open={storyLibraryOpen}
          onClose={closeStoryLibrary}
          useShellChrome
        />
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
              onClick={() => {
                stopLedgerPulseOnJournalNavigate();
                closeMobileMenu();
              }}
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
            <button
              type="button"
              onClick={handleLedgerFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <BookOpen className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
              {t('ledger.mobileDrawer.label', locale)}
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
              <span className="text-[13px] text-text-muted">Text size</span>
              <TextSizeMenu />
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
            {SUPPORT_ATLAS_ENABLED && (
              <button
                onClick={handleSupportFromMenu}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-gold/80 hover:bg-gold/8 hover:text-gold transition-colors touch-target"
              >
                <Heart className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
                {t('support.mobileDrawer.label', locale)}
              </button>
            )}
            <button
              onClick={handleCreditsFromMenu}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
            >
              <Feather className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
              {t('credits.headerButtonFull', locale)}
            </button>
          </div>
        </div>
      </MobileMenuDrawer>

      {/* ─── Modals ─────────────────────────────────────────── */}
      <CreditsModal
        open={creditsOpen}
        onClose={closeCredits}
        onOpenSupport={SUPPORT_ATLAS_ENABLED ? openSupport : undefined}
      />
      <NormanOverviewModal open={normanOverviewOpen} onClose={closeNormanOverview} />
      <RoadmapModal open={roadmapOpen} onClose={closeRoadmap} />
      {SUPPORT_ATLAS_ENABLED && <SupportModal open={supportOpen} onClose={closeSupport} />}
      <AtlasWelcomeGate onOpenNormanOverview={openNormanOverview} />
      <AtlasLedgerPanel open={ledgerOpen} onClose={closeLedger} />
      <CuratorToast />
      <MilestoneCelebrationModal />
      <LedgerRecordedOverlay />
      <StoryEraIntroOverlay />
      <SessionGuard />
    </div>
  );
}
