'use client';

import { use } from 'react';
import Link from 'next/link';
import { getHaplogroupProfile } from '@/core';
import LineageProfileClient from '@/components/lineage-explorer/LineageProfileClient';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import AtlasHubPageShell from '@/components/layout/AtlasHubPageShell';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

export default function LineageProfileRouteClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const locale = useLocale();
  const { id: rawId } = use(params);
  const id = decodeURIComponent(rawId ?? '');
  const profile = id ? getHaplogroupProfile(id) : undefined;

  if (!profile) {
    return (
      <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
        <AtlasReadingNoiseBackdrop />
        <AtlasHubPageShell>
          <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
            <AtlasSubpageChromeHeader mobilePageTitle={t('lineageExplorer.navLabel', locale)} />
            <ReferenceHubTabs />
            <div className={genealogyHubSplitClassName}>
              <GenealogySubnav />
              <main className="min-w-0 flex-1 p-8 text-center">
                <p className="text-text-muted">Unknown haplogroup profile.</p>
                <Link href="/lineage-explorer" className="mt-4 inline-block text-gold hover:underline">
                  Back to Genetic Lineage Explorer
                </Link>
              </main>
            </div>
          </div>
        </AtlasHubPageShell>
      </div>
    );
  }

  return <LineageProfileClient profile={profile} />;
}
