'use client';

import Link from 'next/link';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { Play, X } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { useContinueJourney } from '@/hooks/useContinueJourney';
import { t } from '@/lib/ui-strings';

/** Fixed above the mobile bottom tab bar when a cinematic arc is in progress (hub routes only; see useContinueJourney). */
const MobileContinueJourneyFab = memo(function MobileContinueJourneyFab() {
  const locale = useLocale();
  const pathname = usePathname();
  const { resume, shouldShowFloatingFab, dismissFloatingFab } = useContinueJourney();

  if (!resume?.href || !shouldShowFloatingFab(pathname)) return null;

  const label = `${t('mobileNav.continueJourney', locale)}${resume.title ? ` — ${resume.title}` : ''}`;

  return (
    <div
      className="fixed left-1/2 z-[45] flex max-w-[min(92vw,20rem)] -translate-x-1/2 items-stretch gap-0 overflow-hidden rounded-full border border-gold/35 bg-chrome-popover/95 shadow-[0_0_24px_rgba(196,169,98,0.15)] backdrop-blur-md md:hidden touch-manipulation"
      style={{ bottom: 'calc(3.85rem + env(safe-area-inset-bottom))' }}
    >
      <Link
        href={resume.href}
        className="flex min-w-0 flex-1 items-center gap-2 px-4 py-2.5 text-[12px] font-semibold text-gold transition-colors hover:bg-chrome-fill-active/80"
        aria-label={label}
      >
        <Play className="h-4 w-4 shrink-0 fill-current opacity-90" aria-hidden />
        <span className="min-w-0 truncate">{label}</span>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dismissFloatingFab();
        }}
        className="flex shrink-0 items-center justify-center border-l border-gold/25 px-3 text-gold/80 transition-colors hover:bg-chrome-fill-active/60 hover:text-gold"
        aria-label={t('mobileNav.continueJourneyDismiss', locale)}
      >
        <X className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
});

export default MobileContinueJourneyFab;
