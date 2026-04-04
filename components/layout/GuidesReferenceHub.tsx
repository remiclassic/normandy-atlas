'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Library } from 'lucide-react';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { useLocale } from '@/hooks/use-atlas';
import { ATLAS_REFERENCE_HUB_PATH } from '@/lib/atlas-reference-routes';
import { t } from '@/lib/ui-strings';

/**
 * Desktop map header: navigates to the /reference hub (tabs for journal, companion, digital guides).
 * `guidesPublic` kept for API compatibility with AtlasHomeShell; tab visibility is handled on the hub.
 */
export const GuidesReferenceHubTrigger = memo(function GuidesReferenceHubTrigger({
  guidesPublic: _guidesPublic,
  onBeforeNavigate,
}: {
  guidesPublic: boolean;
  onBeforeNavigate: () => void;
}) {
  void _guidesPublic;
  const locale = useLocale();

  return (
    <ChromeIconTooltip label={t('guidesHub.label', locale)} hint={t('guidesHub.hint', locale)}>
      <Link
        href={ATLAS_REFERENCE_HUB_PATH}
        onClick={onBeforeNavigate}
        className="flex h-6 max-w-[7rem] shrink-0 items-center justify-center gap-1 rounded-md border border-chrome-border bg-chrome-fill px-2 text-[9px] font-bold uppercase tracking-wide text-text-muted transition-colors duration-200 hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment sm:max-w-none sm:px-2.5 sm:text-[10px]"
        aria-label={t('guidesHub.ariaMenu', locale)}
      >
        <Library className="h-3 w-3 shrink-0 opacity-70 sm:h-3.5 sm:w-3.5" strokeWidth={1.5} aria-hidden />
        <span className="hidden min-[420px]:inline truncate">{t('guidesHub.label', locale)}</span>
      </Link>
    </ChromeIconTooltip>
  );
});
