'use client';

import type { ReactNode } from 'react';
import { memo, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import AtlasMenuDrawer from '@/components/layout/AtlasMenuDrawer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import MobileContinueJourneyFab from '@/components/layout/MobileContinueJourneyFab';
import MobileMoreSheet from '@/components/layout/MobileMoreSheet';
import AtlasToolsMenuBody from '@/components/layout/AtlasToolsMenuBody';
import { CreditsModal } from '@/components/layout/CreditsPanel';
import { NormanOverviewModal } from '@/components/layout/NormanOverviewModal';
import { ChangelogModal } from '@/components/layout/ChangelogModal';
import { SupportModal } from '@/components/layout/SupportModal';
import {
  AtlasHubDesktopToolsProvider,
  HubMobileChromeProvider,
} from '@/components/layout/HubMobileChromeContext';
import { useLocale } from '@/hooks/use-atlas';
import { useChangelogUnread } from '@/hooks/useChangelogUnread';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { shareOrCopy } from '@/lib/progress/share';
import { useMapStore } from '@/lib/store';

const SUPPORT_ATLAS_ENABLED = false;

/** Bottom safe space for `MobileBottomNav` on hub pages (non-map). Use on scrolling `<main>`. */
export const ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS =
  'pb-[max(5.5rem,calc(3.75rem+env(safe-area-inset-bottom)+1rem))] md:pb-[max(4rem,env(safe-area-inset-bottom)+2rem)]';

/**
 * Mobile: bottom tabs + slide-up More sheet; desktop tools drawer unchanged.
 * Place inside each hub route’s fixed outer shell, wrapping the column that contains header + content.
 */
const AtlasHubPageShell = memo(function AtlasHubPageShell({
  children,
  beforeReferenceNav,
}: {
  children: ReactNode;
  beforeReferenceNav?: () => void;
}) {
  const router = useRouter();
  const locale = useLocale();
  const guidesPublic = isDigitalGuidesPublic();
  const [changelogHasUnread, markChangelogRead] = useChangelogUnread();

  const [toolsOpen, setToolsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [creditsOpen, setCreditsOpen] = useState(false);
  const [normanOverviewOpen, setNormanOverviewOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const openMoreSheet = useCallback(() => setMoreOpen(true), []);
  const closeMoreSheet = useCallback(() => setMoreOpen(false), []);

  const openDesktopToolsMenu = useCallback(() => setToolsOpen(true), []);

  const stopLedgerPulse = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    await shareOrCopy({ title: 'Norman Atlas', text: '', url });
  }, []);

  const goHomeOpenLedger = useCallback(() => {
    useMapStore.getState().requestLedgerPanelOpen();
    router.push('/');
  }, [router]);

  const beforeRef = beforeReferenceNav ?? stopLedgerPulse;

  const closeAllMenus = useCallback(() => {
    setMoreOpen(false);
    setToolsOpen(false);
  }, []);

  const closeDrawerOnly = useCallback(() => setToolsOpen(false), []);

  const openSupport = useCallback(() => {
    setCreditsOpen(false);
    setNormanOverviewOpen(false);
    setChangelogOpen(false);
    setSupportOpen(true);
  }, []);

  return (
    <HubMobileChromeProvider openMoreSheet={openMoreSheet} moreSheetOpen={moreOpen}>
      <AtlasHubDesktopToolsProvider openDesktopToolsMenu={openDesktopToolsMenu}>
        {children}
        <MobileContinueJourneyFab />
        <MobileBottomNav />
        <MobileMoreSheet open={moreOpen} onClose={closeMoreSheet}>
          <AtlasToolsMenuBody
            locale={locale}
            guidesPublic={guidesPublic}
            changelogHasUnread={changelogHasUnread}
            supportAtlasEnabled={SUPPORT_ATLAS_ENABLED}
            onClose={closeAllMenus}
            beforeReferenceNav={beforeRef}
            includeCommandPaletteEntry
            onNormanOverview={() => {
              setNormanOverviewOpen(true);
              closeAllMenus();
            }}
            onChangelog={() => {
              setChangelogOpen(true);
              closeAllMenus();
            }}
            onLedger={() => {
              goHomeOpenLedger();
              closeAllMenus();
            }}
            onProfile={() => {
              router.push('/profile');
              closeAllMenus();
            }}
            onShare={() => {
              void handleShare();
              closeAllMenus();
            }}
            onCredits={() => {
              setCreditsOpen(true);
              closeAllMenus();
            }}
            onSupport={
              SUPPORT_ATLAS_ENABLED
                ? () => {
                    openSupport();
                    closeAllMenus();
                  }
                : undefined
            }
          />
        </MobileMoreSheet>
        <AtlasMenuDrawer open={toolsOpen} onClose={closeDrawerOnly} side="right">
          <AtlasToolsMenuBody
            locale={locale}
            guidesPublic={guidesPublic}
            changelogHasUnread={changelogHasUnread}
            supportAtlasEnabled={SUPPORT_ATLAS_ENABLED}
            onClose={closeDrawerOnly}
            beforeReferenceNav={beforeRef}
            onNormanOverview={() => {
              setNormanOverviewOpen(true);
              closeDrawerOnly();
            }}
            onChangelog={() => {
              setChangelogOpen(true);
              closeDrawerOnly();
            }}
            onLedger={() => {
              goHomeOpenLedger();
              closeDrawerOnly();
            }}
            onProfile={() => {
              router.push('/profile');
              closeDrawerOnly();
            }}
            onShare={() => {
              void handleShare();
              closeDrawerOnly();
            }}
            onCredits={() => {
              setCreditsOpen(true);
              closeDrawerOnly();
            }}
            onSupport={SUPPORT_ATLAS_ENABLED ? () => { openSupport(); closeDrawerOnly(); } : undefined}
          />
        </AtlasMenuDrawer>
        <CreditsModal
          open={creditsOpen}
          onClose={() => setCreditsOpen(false)}
          onOpenSupport={SUPPORT_ATLAS_ENABLED ? () => setSupportOpen(true) : undefined}
        />
        <NormanOverviewModal open={normanOverviewOpen} onClose={() => setNormanOverviewOpen(false)} />
        <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} onSeen={markChangelogRead} />
        {SUPPORT_ATLAS_ENABLED && <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />}
      </AtlasHubDesktopToolsProvider>
    </HubMobileChromeProvider>
  );
});

export default AtlasHubPageShell;
