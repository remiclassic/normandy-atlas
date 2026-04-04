'use client';

import { memo, useMemo } from 'react';
import type { GuideCoverVariant } from '@/data/digital-guides';
import type { ResolvedDigitalGuideProduct } from '@/lib/digital-guides-resolve';

const COVER_THEME: Record<GuideCoverVariant, { gradient: string; seriesColor: string }> = {
  blue: {
    gradient: 'linear-gradient(160deg, #243a52 0%, #121d2e 45%, #0a1018 100%)',
    seriesColor: 'rgba(232, 230, 225, 0.82)',
  },
  brown: {
    gradient: 'linear-gradient(160deg, #3d2e26 0%, #241a15 50%, #120d0a 100%)',
    seriesColor: 'rgba(232, 230, 225, 0.78)',
  },
  maroon: {
    gradient: 'linear-gradient(160deg, #4a252e 0%, #2a1218 50%, #14090c 100%)',
    seriesColor: 'rgba(232, 230, 225, 0.78)',
  },
  green: {
    gradient: 'linear-gradient(160deg, #253a2e 0%, #152018 50%, #0a100c 100%)',
    seriesColor: 'rgba(232, 230, 225, 0.78)',
  },
};

function CoverStar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="opacity-90">
      <path
        d="M14 2L17.2 10.8L26 14L17.2 17.2L14 26L10.8 17.2L2 14L10.8 10.8L14 2Z"
        stroke="currentColor"
        strokeWidth="0.9"
        className="text-[var(--color-gold)]"
        fill="none"
      />
    </svg>
  );
}

export const GuideProductCard = memo(function GuideProductCard({
  product,
}: {
  product: ResolvedDigitalGuideProduct;
}) {
  const theme = COVER_THEME[product.coverVariant];
  const hasCheckout = product.checkoutUrl.length > 0;

  const coverStyle = useMemo(
    () => ({
      background: theme.gradient,
      boxShadow: '0 8px 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(197, 160, 89, 0.45)',
    }),
    [theme.gradient],
  );

  return (
    <article className="flex flex-col rounded-lg overflow-hidden border border-chrome-border-strong bg-[var(--color-surface)] shadow-[var(--shadow-panel)]">
      <div
        className="relative flex aspect-[3/3.75] flex-col items-center justify-between px-4 py-5 text-center"
        style={coverStyle}
      >
        <p
          className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: theme.seriesColor }}
        >
          {product.seriesLabel}
        </p>
        <div className="flex flex-col items-center gap-2">
          <CoverStar />
        </div>
        <div className="flex flex-col gap-1 px-1">
          <h2
            className="font-display text-[11px] font-semibold uppercase leading-tight tracking-[0.06em] sm:text-[12px]"
            style={{ color: 'var(--color-gold-bright)' }}
          >
            {product.title}
          </h2>
          <p
            className="font-sans text-[8px] font-medium uppercase tracking-[0.28em] opacity-80"
            style={{ color: theme.seriesColor }}
          >
            Norman Atlas
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-chrome-border bg-[var(--color-background)] px-4 py-4">
        <h3 className="font-display text-[13px] font-semibold leading-snug text-[var(--color-parchment)]">
          {product.title}
        </h3>
        <p className="text-[12px] leading-relaxed text-[var(--color-text-muted)]">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="font-display text-[15px] font-semibold tabular-nums text-[var(--color-gold)]">
            {product.priceLabel}
          </span>
          {hasCheckout ? (
            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center justify-center rounded border border-[var(--color-gold)]/40 bg-[var(--color-gold)] px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              View guide
            </a>
          ) : (
            <span className="inline-flex min-h-9 cursor-not-allowed items-center justify-center rounded border border-chrome-border-strong bg-chrome-fill px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide text-text-dim">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
});
