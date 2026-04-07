'use client';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubCards from '@/components/layout/ReferenceHubCards';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasHubPageShell, {
  ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS,
} from '@/components/layout/AtlasHubPageShell';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import ReferenceHubContinueCard from '@/components/layout/ReferenceHubContinueCard';

export default function ReferenceClientPage() {
  const locale = useLocale();

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <a
        href="#reference-hub-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-[13px]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to content
      </a>

      <AtlasHubPageShell>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader mobilePageTitle={t('referenceHub.homeTab', locale)} />

          <ReferenceHubTabs />

          <main
            id="reference-hub-main"
            className={`relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pt-10 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pt-14 ${ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS}`}
          >
            <ReferenceHubContinueCard />
            <ReferenceHubCards />
          </main>
        </div>
      </AtlasHubPageShell>
    </div>
  );
}
