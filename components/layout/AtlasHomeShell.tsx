'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Award, Clapperboard, Heart, BookOpen, Menu } from 'lucide-react';
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
import StoryLauncherSheet from '@/components/story/launcher/StoryLauncherSheet';
import { StoryLauncherContext } from '@/hooks/use-story-launcher';
import AtlasWelcomeGate from '@/components/onboarding/AtlasWelcomeGate';
import { CreditsModal, CreatorAboutHeaderButton } from '@/components/layout/CreditsPanel';
import { NormanOverviewModal } from '@/components/layout/NormanOverviewModal';
import { ChangelogModal } from '@/components/layout/ChangelogModal';
import { SupportModal } from '@/components/layout/SupportModal';

/** Set to true to restore Support the Atlas in the header, mobile menu, and creator modal. */
const SUPPORT_ATLAS_ENABLED = false;
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { useLocale } from '@/hooks/use-atlas';
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
import ShareMomentModal from '@/components/progress/ShareMomentModal';
import LedgerRecordedOverlay from '@/components/progress/LedgerRecordedOverlay';
import ExpeditionProgressChip from '@/components/progress/ExpeditionProgressChip';
import SessionGuard from '@/components/progress/SessionGuard';
import ProgressRemoteSync from '@/components/progress/ProgressRemoteSync';
import AtlasHeaderRetentionChips from '@/components/retention/AtlasRetentionStrip';
import { shareOrCopy } from '@/lib/progress/share';
import { buildCurrentViewShareUrl } from '@/lib/map-view-link';
import { useChangelogUnread } from '@/hooks/useChangelogUnread';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { GuidesReferenceHubTrigger } from '@/components/layout/GuidesReferenceHub';
import { AtlasHeaderBrandLockup } from '@/components/layout/AtlasHeaderBrandLockup';
import AtlasMenuDrawer from '@/components/layout/AtlasMenuDrawer';
import AtlasToolsMenuBody from '@/components/layout/AtlasToolsMenuBody';
import { CommandPaletteHeaderTrigger } from '@/components/command-palette/CommandPaletteHeaderTrigger';
import AncestryJourneyMapDock from '@/components/ancestry/AncestryJourneyMapDock';
import NormanStoryMode from '@/components/norman-identity/NormanStoryMode';
import { GENEALOGY_NORMAN_IDENTITY_PATH } from '@/lib/genealogy-paths';

export default function AtlasHomeShell() {
  const router = useRouter();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const guidesPublic = isDigitalGuidesPublic();
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
  const [storyLibraryBootstrap, setStoryLibraryBootstrap] = useState<{
    focusProgressKey?: string;
    openDetail?: boolean;
  } | null>(null);
  const openStoryLibrary = useCallback(() => setStoryLibraryOpen(true), []);
  const closeStoryLibrary = useCallback(() => {
    setStoryLibraryOpen(false);
    setStoryLibraryBootstrap(null);
  }, []);

  const libraryOpenRequest = useMapStore((s) => s.libraryOpenRequest);
  useEffect(() => {
    if (!libraryOpenRequest) return;
    const req = libraryOpenRequest;
    queueMicrotask(() => {
      setStoryLibraryOpen(true);
      setStoryLibraryBootstrap({
        focusProgressKey: req.focusProgressKey,
        openDetail: req.openDetail,
      });
      useMapStore.getState().clearStoryLibraryRequest();
    });
  }, [libraryOpenRequest]);

  const [storyLauncherOpen, setStoryLauncherOpen] = useState(false);
  const openStoryLauncher = useCallback(() => setStoryLauncherOpen(true), []);
  const closeStoryLauncher = useCallback(() => setStoryLauncherOpen(false), []);
  const storyLauncherCtx = useMemo(
    () => ({ open: openStoryLauncher, close: closeStoryLauncher, isOpen: storyLauncherOpen }),
    [openStoryLauncher, closeStoryLauncher, storyLauncherOpen],
  );

  const storyLibraryCloseRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (storyLibraryOpen) {
      queueMicrotask(() => storyLibraryCloseRef.current?.focus());
    }
  }, [storyLibraryOpen]);

  const [changelogOpen, setChangelogOpen] = useState(false);
  const openChangelog = useCallback(() => setChangelogOpen(true), []);
  const closeChangelog = useCallback(() => setChangelogOpen(false), []);
  const [changelogHasUnread, markChangelogRead] = useChangelogUnread();

  const [ledgerOpen, setLedgerOpen] = useState(false);
  const openLedger = useCallback(() => setLedgerOpen(true), []);

  const ledgerAttentionActive = useMapStore((s) => s.ledgerAttentionActive);

  const openLedgerAndEndCelebration = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
    openLedger();
  }, [openLedger]);

  const ledgerPanelOpenRequest = useMapStore((s) => s.ledgerPanelOpenRequest);
  useEffect(() => {
    if (!ledgerPanelOpenRequest) return;
    queueMicrotask(() => {
      openLedgerAndEndCelebration();
      useMapStore.getState().clearLedgerPanelOpenRequest();
    });
  }, [ledgerPanelOpenRequest, openLedgerAndEndCelebration]);

  /** Pulse sits beside the journal icon; stop it when opening the journal. */
  const stopLedgerPulseOnJournalNavigate = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

  const closeLedger = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
    setLedgerOpen(false);
  }, []);

  const storyMode = useMapStore((s) => s.storyMode);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);
  const normanIdentityStoryOpen = useMapStore((s) => s.normanIdentityStoryOpen);
  useEffect(() => {
    document.documentElement.classList.toggle('atlas-story-open', storyMode);
    return () => document.documentElement.classList.remove('atlas-story-open');
  }, [storyMode]);

  const [supportOpen, setSupportOpen] = useState(false);
  const openSupport = useCallback(() => {
    setCreditsOpen(false);
    setNormanOverviewOpen(false);
    setChangelogOpen(false);
    setSupportOpen(true);
  }, []);
  const closeSupport = useCallback(() => setSupportOpen(false), []);

  const guidedTourShellResetNonce = useMapStore((s) => s.guidedTourShellResetNonce);
  const prevGuidedTourShellNonceRef = useRef(guidedTourShellResetNonce);
  /**
   * When FTUE requests a clean layout, collapse shell-owned surfaces before the tour measures anchors.
   * (Map store reset runs in `resetUiForGuidedTour`; this handles React-local drawer/modal state only.)
   */
  useEffect(() => {
    if (guidedTourShellResetNonce === prevGuidedTourShellNonceRef.current) return;
    prevGuidedTourShellNonceRef.current = guidedTourShellResetNonce;
    if (guidedTourShellResetNonce === 0) return;
    setMobileMenuOpen(false);
    setStoryLibraryOpen(false);
    closeStoryLauncher();
    setCreditsOpen(false);
    setNormanOverviewOpen(false);
    setChangelogOpen(false);
    setSupportOpen(false);
    setLedgerOpen(false);
    useMapStore.getState().closeNormanIdentityStory();
  }, [closeStoryLauncher, guidedTourShellResetNonce]);

  const [shareToast, setShareToast] = useState<'copied' | 'shared' | 'failed' | null>(null);
  const shareToastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleShareView = useCallback(async () => {
    closeMobileMenu();
    const url = buildCurrentViewShareUrl();
    const result = await shareOrCopy({ title: 'Norman Atlas', text: '', url });
    setShareToast(result);
    clearTimeout(shareToastTimer.current);
    shareToastTimer.current = setTimeout(() => setShareToast(null), 2200);
  }, [closeMobileMenu]);

  const desktopUtilitySlot = useMemo(
    () => (
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5 text-text-muted/80">
        {storyLibraryOpen && (
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
        )}

        <GuidesReferenceHubTrigger
          guidesPublic={guidesPublic}
          onBeforeNavigate={stopLedgerPulseOnJournalNavigate}
        />

        {!storyLibraryOpen && (
          <Link
            href={GENEALOGY_NORMAN_IDENTITY_PATH}
            onClick={stopLedgerPulseOnJournalNavigate}
            className="hidden max-w-[9.5rem] truncate rounded-none border border-cyan-400/25 bg-cyan-400/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-200/90 transition-colors hover:border-cyan-400/45 hover:bg-cyan-400/10 lg:inline-block"
          >
            {t('normanIdentity.cta.traceRoots', locale)}
          </Link>
        )}

        <AtlasHeaderRetentionChips storyLibraryOpen={storyLibraryOpen} />
        <ExpeditionProgressChip onOpenLedger={openLedgerAndEndCelebration} />

        <div
          className="hidden shrink-0 items-center gap-1 xl:flex"
          data-onboarding="theme"
        >
          <ChromeIconTooltip
            label={t('textSize.tooltip.label', locale)}
            hint={t('textSize.tooltip.hint', locale)}
          >
            <TextSizeMenu />
          </ChromeIconTooltip>
          <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
          <ThemeSwitcher embedded />
          {!storyLibraryOpen && (
            <>
              <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
              <BasemapSwitcher embedded />
            </>
          )}
          <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
          <BackgroundMusic floating={false} />
          <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
          <LanguageSwitcher />
        </div>

        <CommandPaletteHeaderTrigger />

        <ChromeIconTooltip
          label={t('header.settingsMenu', locale)}
          hint={t('header.settingsMenu.hint', locale)}
        >
          <button
            type="button"
            onClick={openMobileMenu}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment"
            aria-label={t('header.settingsMenu', locale)}
          >
            <Menu className="h-[15px] w-[15px]" strokeWidth={1.5} aria-hidden />
          </button>
        </ChromeIconTooltip>
      </div>
    ),
    [
      closeStoryLibrary,
      guidesPublic,
      locale,
      openLedgerAndEndCelebration,
      openMobileMenu,
      stopLedgerPulseOnJournalNavigate,
      storyLibraryOpen,
    ],
  );

  return (
    <StoryLauncherContext.Provider value={storyLauncherCtx}>
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-background">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header
        className={`relative z-30 w-full shrink-0 border-b border-chrome-border bg-background/80 backdrop-blur-xl pointer-events-none shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-opacity duration-200 ${storyEraIntroActive ? 'opacity-0' : ''}`}
      >
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

              {!storyLibraryOpen && (
                <Link
                  href={GENEALOGY_NORMAN_IDENTITY_PATH}
                  onClick={stopLedgerPulseOnJournalNavigate}
                  className="flex max-w-[min(100%,7rem)] shrink-0 touch-target items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-2 py-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-cyan-200/95 transition-colors hover:border-cyan-400/40"
                >
                  {t('normanIdentity.cta.startStory', locale)}
                </Link>
              )}

              {!storyLibraryOpen && (
                <Link
                  href="/profile"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-dim hover:bg-chrome-fill hover:text-parchment transition-colors touch-target"
                  aria-label={t('profile.aria.open', locale)}
                >
                  <Award className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
                </Link>
              )}

              <CommandPaletteHeaderTrigger size="mobileTouch" />

              <AtlasHeaderRetentionChips storyLibraryOpen={storyLibraryOpen} compact />

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
                  {storyLibraryOpen ? (
                    <AtlasHeaderBrandLockup
                      as="h1"
                      collapseSubtitleNarrow
                      subtitle={t('storyLibrary.subtitle', locale)}
                    />
                  ) : (
                    <ChromeIconTooltip
                      label={t('credits.eyebrow', locale)}
                      hint={t('header.tagline', locale)}
                      wrapperClassName="inline-flex min-w-0 max-w-full items-center"
                    >
                      <AtlasHeaderBrandLockup
                        as="h1"
                        collapseSubtitleNarrow
                        subtitle={t('header.tagline', locale)}
                      />
                    </ChromeIconTooltip>
                  )}
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
        {isMobile && ledgerAttentionActive && !storyEraIntroActive && (
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
        <div
          className={`relative min-h-0 min-w-0 flex-1 ${storyEraIntroActive ? 'overflow-hidden' : ''}`}
          data-onboarding="map"
        >
          <MapLoader />
          <MapDeepLinkSync />
          <div className="vignette-overlay absolute inset-0" aria-hidden />

          {/* Map overlay panels, repositioned for mobile to clear the play dock */}
          <div
            className={`absolute z-20 flex flex-col items-start gap-2 transition-opacity duration-200 ${
              isMobile
                ? 'bottom-20 left-3 right-3'
                : 'bottom-28 left-5'
            } ${storyEraIntroActive ? 'pointer-events-none opacity-0' : ''}`}
            data-onboarding="layers"
          >
            <LayerPanel />
            <MigrationExplorerPanel />
          </div>
          {/* Mobile: hybrid dock replaces stacked idle buttons; desktop: pass-through */}
          {/*
            Mobile: z-[50] so children (story bar z-40, etc.) sit above map-anchored layers (pins z-[5],
            layer stack z-20). A z-20 wrapper trapped story UI below illustration pins in the same column.
          */}
          <div
            className={`max-[767px]:pointer-events-none max-[767px]:absolute max-[767px]:bottom-0 max-[767px]:inset-x-0 max-[767px]:z-[50] max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-3 max-[767px]:px-3 max-[767px]:pb-[max(1rem,env(safe-area-inset-bottom))] md:contents transition-opacity duration-200 ${
              storyEraIntroActive
                ? 'pointer-events-none opacity-0 max-[767px]:opacity-0 [&>*]:md:opacity-0 [&>*]:md:pointer-events-none'
                : ''
            }`}
          >
            <CinematicFlythroughBar />
            <StoryModeBar onOpenLauncher={openStoryLauncher} />
            <MobilePlayDock onOpenLauncher={openStoryLauncher} />
          </div>
          {!storyEraIntroActive && <AncestryJourneyMapDock />}
        </div>

        <HistoricalDetailPanel />
        <StoryLauncherSheet
          open={storyLauncherOpen}
          onClose={closeStoryLauncher}
          onBrowseAll={openStoryLibrary}
        />
        <StoryLibraryPanel
          open={storyLibraryOpen}
          onClose={closeStoryLibrary}
          useShellChrome
          bootstrap={storyLibraryBootstrap}
          onBootstrapConsumed={() => setStoryLibraryBootstrap(null)}
        />
      </div>

      {/* ─── Settings & tools drawer (mobile: left, desktop: right) ── */}
      <AtlasMenuDrawer open={mobileMenuOpen} onClose={closeMobileMenu} side={isMobile ? 'left' : 'right'}>
        <AtlasToolsMenuBody
          locale={locale}
          guidesPublic={guidesPublic}
          changelogHasUnread={changelogHasUnread}
          supportAtlasEnabled={SUPPORT_ATLAS_ENABLED}
          onClose={closeMobileMenu}
          beforeReferenceNav={stopLedgerPulseOnJournalNavigate}
          onNormanOverview={openNormanOverview}
          onChangelog={openChangelog}
          onLedger={openLedgerAndEndCelebration}
          onProfile={() => router.push('/profile')}
          onShare={handleShareView}
          onCredits={openCredits}
          onSupport={SUPPORT_ATLAS_ENABLED ? openSupport : undefined}
        />
      </AtlasMenuDrawer>

      {/* ─── Modals ─────────────────────────────────────────── */}
      <CreditsModal
        open={creditsOpen}
        onClose={closeCredits}
        onOpenSupport={SUPPORT_ATLAS_ENABLED ? openSupport : undefined}
      />
      <NormanOverviewModal open={normanOverviewOpen} onClose={closeNormanOverview} />
      <ChangelogModal open={changelogOpen} onClose={closeChangelog} onSeen={markChangelogRead} />
      {SUPPORT_ATLAS_ENABLED && <SupportModal open={supportOpen} onClose={closeSupport} />}
      <AtlasWelcomeGate onOpenNormanOverview={openNormanOverview} />
      <AtlasLedgerPanel open={ledgerOpen} onClose={closeLedger} />
      <CuratorToast />
      <ShareMomentModal />
      <MilestoneCelebrationModal />
      <LedgerRecordedOverlay />
      <StoryEraIntroOverlay />
      <SessionGuard />
      <ProgressRemoteSync />

      <NormanStoryMode
        open={normanIdentityStoryOpen && !storyEraIntroActive}
        onRequestClose={() => {}}
      />

      {/* Share-view toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            key="share-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] rounded-lg border px-4 py-2 text-[12px] font-semibold shadow-lg backdrop-blur-lg ${
              shareToast === 'failed'
                ? 'border-red-500/30 bg-red-950/80 text-red-300'
                : 'border-gold/30 bg-chrome-popover/95 text-gold'
            }`}
          >
            {t(
              shareToast === 'copied'
                ? 'shareView.copied'
                : shareToast === 'shared'
                  ? 'shareView.shared'
                  : 'shareView.failed',
              locale,
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </StoryLauncherContext.Provider>
  );
}
