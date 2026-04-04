'use client';

import { useState } from 'react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import { GuidesCatalog, type GuidesCatalogSection } from '@/components/guides/GuidesCatalog';

export default function GuidesPageChrome({ sections }: { sections: GuidesCatalogSection[] }) {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--color-background)]">
      <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
      <ReferenceHubTabs />
      <GuidesCatalog sections={sections} suppressShellChrome />
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
}
