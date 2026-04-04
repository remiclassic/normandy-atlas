import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { DigitalGuideArchive } from '@/data/digital-guides';
import type { ResolvedDigitalGuideProduct } from '@/lib/digital-guides-resolve';
import { GuideProductCard } from '@/components/guides/GuideProductCard';

export type GuidesCatalogSection = {
  archive: DigitalGuideArchive;
  products: ResolvedDigitalGuideProduct[];
};

function NoiseBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function ArchiveHero({ archive }: { archive: DigitalGuideArchive }) {
  return (
    <div className="text-center">
      <p
        className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: 'var(--color-gold-muted)' }}
      >
        — {archive.eyebrow} —
      </p>
      <h1 className="font-display text-[clamp(1.5rem,4vw,2.35rem)] font-semibold uppercase tracking-[0.05em] text-[var(--color-gold)]">
        {archive.title}
      </h1>
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

export function GuidesCatalog({ sections }: { sections: GuidesCatalogSection[] }) {
  const firstSlug = sections[0]?.archive.slug ?? 'guides';

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <NoiseBackdrop />
      <a
        href={`#${firstSlug}-grid`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-[13px]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to guides
      </a>

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

      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-10 md:px-8 md:pt-14">
          {sections.map(({ archive, products }, index) => {
            const gridId = `${archive.slug}-grid`;

            return (
              <section
                key={archive.slug}
                className={`relative ${index > 0 ? 'mt-20 border-t border-chrome-border pt-16 md:mt-24 md:pt-20' : ''}`}
              >
                {index === 0 ? <ArchiveHero archive={archive} /> : <ArchiveSectionHeader archive={archive} />}

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
