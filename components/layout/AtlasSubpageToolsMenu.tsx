'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import AtlasMenuDrawer from '@/components/layout/AtlasMenuDrawer';
import AtlasToolsMenuBody from '@/components/layout/AtlasToolsMenuBody';
import { CreditsModal } from '@/components/layout/CreditsPanel';
import { NormanOverviewModal } from '@/components/layout/NormanOverviewModal';
import { ChangelogModal } from '@/components/layout/ChangelogModal';
import { SupportModal } from '@/components/layout/SupportModal';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { useChangelogUnread } from '@/hooks/useChangelogUnread';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { shareOrCopy } from '@/lib/progress/share';
import { useMapStore } from '@/lib/store';

const SUPPORT_ATLAS_ENABLED = false;

/** Full settings drawer + modals for /journal, /companion, /reference, /guides (same menu as map). */
export default function AtlasSubpageToolsMenu({
  open,
  onClose,
  beforeReferenceNav,
}: {
  open: boolean;
  onClose: () => void;
  beforeReferenceNav?: () => void;
}) {
  const router = useRouter();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const guidesPublic = isDigitalGuidesPublic();
  const [changelogHasUnread, markChangelogRead] = useChangelogUnread();

  const [creditsOpen, setCreditsOpen] = useState(false);
  const [normanOverviewOpen, setNormanOverviewOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const openCredits = useCallback(() => setCreditsOpen(true), []);
  const closeCredits = useCallback(() => setCreditsOpen(false), []);
  const openNormanOverview = useCallback(() => setNormanOverviewOpen(true), []);
  const closeNormanOverview = useCallback(() => setNormanOverviewOpen(false), []);
  const openChangelog = useCallback(() => setChangelogOpen(true), []);
  const closeChangelog = useCallback(() => setChangelogOpen(false), []);
  const openSupport = useCallback(() => {
    setCreditsOpen(false);
    setNormanOverviewOpen(false);
    setChangelogOpen(false);
    setSupportOpen(true);
  }, []);
  const closeSupport = useCallback(() => setSupportOpen(false), []);

  const stopLedgerPulse = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    await shareOrCopy({ title: 'Norman Atlas', text: '', url });
  }, []);

  /** Match map drawer: open story library / ledger on the home shell, not a bare map view. */
  const goHomeOpenStoryLibrary = useCallback(() => {
    useMapStore.getState().requestStoryLibraryOpen({});
    router.push('/');
  }, [router]);

  const goHomeOpenLedger = useCallback(() => {
    useMapStore.getState().requestLedgerPanelOpen();
    router.push('/');
  }, [router]);

  return (
    <>
      <AtlasMenuDrawer open={open} onClose={onClose} side={isMobile ? 'left' : 'right'}>
        <AtlasToolsMenuBody
          locale={locale}
          guidesPublic={guidesPublic}
          changelogHasUnread={changelogHasUnread}
          supportAtlasEnabled={SUPPORT_ATLAS_ENABLED}
          onClose={onClose}
          beforeReferenceNav={beforeReferenceNav ?? stopLedgerPulse}
          onNormanOverview={openNormanOverview}
          onChangelog={openChangelog}
          onStories={goHomeOpenStoryLibrary}
          onLedger={goHomeOpenLedger}
          onProfile={() => router.push('/profile')}
          onShare={handleShare}
          onCredits={openCredits}
          onSupport={SUPPORT_ATLAS_ENABLED ? openSupport : undefined}
        />
      </AtlasMenuDrawer>

      <CreditsModal
        open={creditsOpen}
        onClose={closeCredits}
        onOpenSupport={SUPPORT_ATLAS_ENABLED ? openSupport : undefined}
      />
      <NormanOverviewModal open={normanOverviewOpen} onClose={closeNormanOverview} />
      <ChangelogModal open={changelogOpen} onClose={closeChangelog} onSeen={markChangelogRead} />
      {SUPPORT_ATLAS_ENABLED && <SupportModal open={supportOpen} onClose={closeSupport} />}
    </>
  );
}
