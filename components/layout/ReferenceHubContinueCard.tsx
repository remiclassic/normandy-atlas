'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Play } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { useContinueJourney } from '@/hooks/useContinueJourney';
import { t } from '@/lib/ui-strings';

/** In-flow resume CTA for the reference hub (replaces floating pill on this route). */
const ReferenceHubContinueCard = memo(function ReferenceHubContinueCard() {
  const locale = useLocale();
  const { resume } = useContinueJourney();

  if (!resume?.href) return null;

  return (
    <section className="mb-8 md:mb-10" aria-label={t('journal.resume.heading', locale)}>
      <Link
        href={resume.href}
        className="flex items-center gap-4 rounded-xl border border-gold/30 bg-chrome-fill/50 px-4 py-4 transition-colors hover:border-gold/45 hover:bg-chrome-fill-active/50 md:px-5 md:py-4"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-chrome-popover/90 text-gold shadow-[0_0_20px_rgba(196,169,98,0.12)]">
          <Play className="h-5 w-5 fill-current opacity-90" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold/90">
            {t('journal.resume.heading', locale)}
          </p>
          <p className="mt-0.5 truncate text-[length:var(--atlas-text-md)] font-semibold" style={{ color: 'var(--color-parchment)' }}>
            {resume.title || t('mobileNav.continueJourney', locale)}
          </p>
        </div>
      </Link>
    </section>
  );
});

export default ReferenceHubContinueCard;
