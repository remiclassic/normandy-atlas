import type { Ref } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { DigitalGuideArchive } from '@/data/digital-guides';
import type { ResolvedDigitalGuideProduct } from '@/lib/digital-guides-resolve';
import { GuideProductCard } from '@/components/guides/GuideProductCard';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';

export type GuidesCatalogSection = {
  archive: DigitalGuideArchive;
  products: ResolvedDigitalGuideProduct[];
};

function ArchiveHero({
  archive,
  titleLevel = 'h1',
}: {
  archive: DigitalGuideArchive;
  titleLevel?: 'h1' | 'h2';
}) {
  const TitleTag = titleLevel;
  return (
    <div className="text-center">
      <p
        className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: 'var(--color-gold-muted)' }}
      >
        — {archive.eyebrow} —
      </p>
      <TitleTag className="font-display text-[clamp(1.5rem,4vw,2.35rem)] font-semibold uppercase tracking-[0.05em] text-[var(--color-gold)]">
        {archive.title}
      </TitleTag>
      <div className="mx-auto mt-4 max-w-xl space-y-1">
        {archive.taglines.map((line) => (
          <p key={line} className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function ArchiveSectionHeader({ archive }: { archive: DigitalGuideArchive }) {
  return (
    <div className="text-center">
      <p
        className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: 'var(--color-gold-muted)' }}
      >
        — {archive.eyebrow} —
      </p>
      <h2 className="font-display text-[clamp(1.25rem,3.2vw,1.85rem)] font-semibold uppercase tracking-[0.05em] text-[var(--color-gold)]">
        {archive.title}
      </h2>
      <div className="mx-auto mt-3 max-w-2xl space-y-1">
        {archive.taglines.map((line) => (
          <p key={line} className="text-[12px] leading-relaxed text-[var(--color-text-muted)] md:text-[13px]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export function GuidesCatalog({
  sections,
  suppressShellChrome = false,
  scrollContainerRef,
}: {
  sections: GuidesCatalogSection[];
  /** When true, omit built-in header bars (parent provides map-aligned chrome + tabs). */
  suppressShellChrome?: boolean;
  /** Optional ref on the primary vertical scroll surface (e.g. hub swipe navigation). */
  scrollContainerRef?: Ref<HTMLDivElement>;
}) {
  const firstSlug = sections[0]?.archive.slug ?? 'guides';

  return (
    <div
      className={`z-0 flex flex-col bg-[var(--color-background)] ${suppressShellChrome ? 'min-h-0 flex-1' : 'fixed inset-0'}`}
    >
      <AtlasReadingNoiseBackdrop />
      <a
        href={`#${firstSlug}-grid`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-[13px]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to guides
      </a>

      {!suppressShellChrome && (
        <>
          <header
            className="relative z-10 flex shrink-0 items-center gap-4 border-b px-6 py-3"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface-glass)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5 text-[13px] transition-colors"
              style={{ color: 'var(--color-gold)' }}
            >
              <ArrowLeft size={14} aria-hidden />
              Back to map
            </Link>
            <div className="h-4 w-px shrink-0 bg-[var(--color-border)]" aria-hidden />
            <p className="font-display truncate text-[15px] font-semibold text-[var(--color-parchment)]">
              Digital guides
            </p>
          </header>

          <div
            className="relative z-10 shrink-0 border-b px-5 py-2.5 sm:px-6"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-chrome-fill)' }}
          >
            <p className="text-center text-[11px] leading-relaxed sm:text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
              <Link href="/companion" className="font-medium underline-offset-2 transition-colors hover:underline" style={{ color: 'var(--color-gold)' }}>
                Reading the Norman Atlas
              </Link>{' '}
              <span style={{ color: 'var(--color-text-dim)' }}>
                — free in-app guide to eras, layers, evidence, and geography (separate from print-minded PDF titles below).
              </span>
            </p>
          </div>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className={`relative z-10 flex-1 overflow-y-auto scrollbar-thin ${suppressShellChrome ? 'min-h-0' : ''}`}
      >
        <div className="relative mx-auto max-w-6xl pb-[max(7rem,env(safe-area-inset-bottom)+4.5rem)] pt-10 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pb-28 md:pt-14">
          {sections.map(({ archive, products }, index) => {
            const gridId = `${archive.slug}-grid`;

            return (
              <section
                key={archive.slug}
                className={`relative ${index > 0 ? 'mt-20 border-t border-chrome-border pt-16 md:mt-24 md:pt-20' : ''}`}
              >
                {index === 0 ? (
                  <ArchiveHero archive={archive} titleLevel="h1" />
                ) : (
                  <ArchiveSectionHeader archive={archive} />
                )}

                <div
                  id={gridId}
                  className={`mt-10 grid gap-6 md:mt-12 xl:gap-5 ${
                    products.length === 1
                      ? 'grid-cols-1 max-w-sm mx-auto sm:max-w-md'
                      : products.length === 3
                        ? 'sm:grid-cols-2 xl:grid-cols-3'
                        : 'sm:grid-cols-2 xl:grid-cols-4'
                  }`}
                >
                  {products.map((p) => (
                    <GuideProductCard key={p.id} product={p} />
                  ))}
                </div>

                <p
                  className="pointer-events-none absolute bottom-0 right-0 select-none font-display text-[clamp(2.5rem,12vw,7rem)] font-semibold leading-none text-[var(--color-foreground)] opacity-[0.06]"
                  aria-hidden
                >
                  {archive.watermark}
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
