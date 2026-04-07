'use client';

import { useRef } from 'react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasHubPageShell from '@/components/layout/AtlasHubPageShell';
import { GuidesCatalog, type GuidesCatalogSection } from '@/components/guides/GuidesCatalog';
import { useReferenceHubSwipeNav } from '@/hooks/use-reference-hub-swipe-nav';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { digitalGuidesTooltipLabel } from '@/lib/digital-guides-ui';
import { pickI18n } from '@/lib/locale';

export default function GuidesPageChrome({ sections }: { sections: GuidesCatalogSection[] }) {
  const locale = useLocale();
  const swipeScrollRef = useRef<HTMLDivElement>(null);
  useReferenceHubSwipeNav(swipeScrollRef);

  return (
    <div
      className="fixed inset-0 flex flex-col bg-[var(--color-background)]"
      style={atlasHubShellStyle}
    >
      <AtlasHubPageShell>
        <AtlasSubpageChromeHeader mobilePageTitle={pickI18n(digitalGuidesTooltipLabel, locale)} />
        <ReferenceHubTabs />
        <GuidesCatalog sections={sections} suppressShellChrome scrollContainerRef={swipeScrollRef} />
      </AtlasHubPageShell>
    </div>
  );
}
