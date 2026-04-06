'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getHaplogroupProfile } from '@/core';
import LineageProfileClient from '@/components/lineage-explorer/LineageProfileClient';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';

export default function LineageProfileRouteClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = use(params);
  const [toolsOpen, setToolsOpen] = useState(false);
  const id = decodeURIComponent(rawId ?? '');
  const profile = id ? getHaplogroupProfile(id) : undefined;

  if (!profile) {
    return (
      <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
        <AtlasReadingNoiseBackdrop />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
          <ReferenceHubTabs />
          <main className="p-8 text-center">
            <p className="text-text-muted">Unknown haplogroup profile.</p>
            <Link href="/lineage-explorer" className="mt-4 inline-block text-gold hover:underline">
              Back to Genetic Lineage Explorer
            </Link>
          </main>
        </div>
        <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
      </div>
    );
  }

  return <LineageProfileClient profile={profile} />;
}
