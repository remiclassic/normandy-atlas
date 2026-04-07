'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Play } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { useProgress } from '@/hooks/useAtlasProgress';
import { pickI18n } from '@/lib/locale';
import { buildMapHref } from '@/lib/map-deep-link';
import { readStoryProgressMap } from '@/lib/story-progress';
import { listResumableStoryRows } from '@/lib/story-resume';
import { t } from '@/lib/ui-strings';

/** Fixed above the mobile bottom tab bar when a cinematic arc is in progress. */
const MobileContinueJourneyFab = memo(function MobileContinueJourneyFab() {
  const locale = useLocale();
  const progress = useProgress();

  const resume = useMemo(() => {
    void progress;
    const rows = listResumableStoryRows(locale);
    const row = rows[0];
    if (!row?.meta.arcId) return null;
    const step = readStoryProgressMap()[row.progressKey]?.lastStep ?? 0;
    const title = row.meta.displayTitle
      ? pickI18n(row.meta.displayTitle, locale)
      : row.arcEntry
        ? pickI18n(row.arcEntry.label, locale)
        : '';
    return {
      href: buildMapHref({ story: row.meta.arcId, step }),
      title,
    };
  }, [locale, progress]);

  if (!resume?.href) return null;

  return (
    <Link
      href={resume.href}
      className="fixed left-1/2 z-[45] flex max-w-[min(92vw,20rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-gold/35 bg-chrome-popover/95 px-4 py-2.5 text-[12px] font-semibold text-gold shadow-[0_0_24px_rgba(196,169,98,0.15)] backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-chrome-fill-active/80 md:hidden touch-manipulation"
      style={{ bottom: 'calc(3.85rem + env(safe-area-inset-bottom))' }}
      aria-label={t('mobileNav.continueJourney', locale)}
    >
      <Play className="h-4 w-4 shrink-0 fill-current opacity-90" aria-hidden />
      <span className="min-w-0 truncate">
        {t('mobileNav.continueJourney', locale)}
        {resume.title ? ` — ${resume.title}` : ''}
      </span>
    </Link>
  );
});

export default MobileContinueJourneyFab;
