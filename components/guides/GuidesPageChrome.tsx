'use client';

import { useRef, useState } from 'react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import { GuidesCatalog, type GuidesCatalogSection } from '@/components/guides/GuidesCatalog';
import { useReferenceHubSwipeNav } from '@/hooks/use-reference-hub-swipe-nav';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';

export default function GuidesPageChrome({ sections }: { sections: GuidesCatalogSection[] }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const swipeScrollRef = useRef<HTMLDivElement>(null);
  useReferenceHubSwipeNav(swipeScrollRef);

  return (
    <div
      className="fixed inset-0 flex flex-col bg-[var(--color-background)]"
      style={atlasHubShellStyle}
    >
      <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
      <ReferenceHubTabs />
      <GuidesCatalog sections={sections} suppressShellChrome scrollContainerRef={swipeScrollRef} />
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
}
