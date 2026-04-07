'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import InstitutionKeyRedeem from '@/components/education/InstitutionKeyRedeem';
import { isEducationInstitutionProgramLive } from '@/lib/education/institution-program-live';

export default function EducationPage() {
  const locale = useLocale();
  const programLive = isEducationInstitutionProgramLive();
  const contactEmail = process.env.NEXT_PUBLIC_EDUCATION_CONTACT_EMAIL?.trim() ?? '';
  const showMail = programLive && contactEmail.length > 0;
  const mailto = showMail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent('Norman Atlas — institution license')}`
    : '';

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: 'var(--color-background)' }}>
      <header
        className="shrink-0 border-b px-4 py-3 sm:px-6"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-chrome-fill)' }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium text-text-muted transition-colors hover:bg-chrome-fill hover:text-parchment"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            {t('profile.pageHeader', locale)}
          </Link>
          <div className="flex-1" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          {!programLive ? (
            <p className="mb-4 rounded-lg border border-gold/20 border-dashed bg-gold/[0.06] px-3 py-2.5 text-[12px] font-medium text-gold/85">
              {t('billing.education.comingSoonBanner', locale)}
            </p>
          ) : null}
          <h1 className="font-display text-[24px] font-bold text-parchment sm:text-[28px]">
            {t('billing.education.title', locale)}
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed text-text-muted">
            {programLive ? t('billing.education.lead', locale) : t('billing.education.leadPreview', locale)}
          </p>

          <div className="mt-8 space-y-6">
            <InstitutionKeyRedeem programLive={programLive} />
            <div
              className={`rounded-xl border p-4 ${
                programLive
                  ? 'border-chrome-border/50 bg-chrome-fill/10'
                  : 'border-chrome-border/40 border-dashed bg-chrome-fill/5'
              }`}
            >
              <p className="text-[13px] font-medium text-parchment">{t('billing.education.contact', locale)}</p>
              {showMail ? (
                <>
                  <a
                    href={mailto}
                    className="mt-2 inline-block text-[13px] text-gold/85 underline decoration-gold/30 underline-offset-2 hover:text-gold"
                  >
                    {contactEmail}
                  </a>
                  <p className="mt-3 text-[11px] text-text-dim">{t('billing.education.contactInstructions', locale)}</p>
                </>
              ) : (
                <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
                  {programLive
                    ? t('billing.education.contactNotConfigured', locale)
                    : t('billing.education.contactComingSoon', locale)}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
