'use client';

import { memo } from 'react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

/**
 * Brand row: `Norman Atlas | subtitle` — keep pipe visible; pipe is aria-hidden so SR reads name + subtitle cleanly.
 */
export const AtlasHeaderBrandLockup = memo(function AtlasHeaderBrandLockup({
  subtitle,
  as: Tag = 'div',
  className = '',
  /** Stronger contrast (e.g. menu drawer on dark popover) */
  emphasis = false,
  /** Hide subtitle (not the `|`) below `xl` to free header space (chrome headers only). */
  collapseSubtitleNarrow = false,
}: {
  subtitle: string;
  as?: 'h1' | 'div';
  className?: string;
  emphasis?: boolean;
  collapseSubtitleNarrow?: boolean;
}) {
  const locale = useLocale();
  const name = t('credits.eyebrow', locale);
  const fullLabel = `${name} — ${subtitle}`;

  const nameCls = emphasis
    ? 'shrink-0 font-display text-[15px] font-bold leading-none tracking-wide text-parchment sm:text-[16px]'
    : 'shrink-0 font-display text-[15px] font-semibold leading-none tracking-wide text-text-muted sm:text-[17px]';

  const pipeCls = emphasis
    ? 'shrink-0 translate-y-px text-[13px] font-extralight leading-none text-text-dim/55 sm:text-[14px]'
    : 'shrink-0 translate-y-px text-[13px] font-extralight leading-none text-text-muted/45 sm:text-[14px]';

  const pipeNarrowCls =
    collapseSubtitleNarrow ? 'hidden xl:inline' : '';

  const subCls = emphasis
    ? 'min-w-0 flex-1 text-[10px] font-medium leading-snug text-text-dim sm:truncate sm:text-[11px]'
    : 'min-w-0 flex-1 text-[9px] font-medium leading-snug tracking-wide text-text-muted/65 sm:truncate sm:text-[10px]';

  const subNarrowCls = collapseSubtitleNarrow ? 'hidden xl:block' : '';

  return (
    <Tag
      className={`flex min-w-0 max-w-full flex-wrap items-baseline gap-x-2 ${className}`}
      {...(Tag === 'h1' ? { 'aria-label': fullLabel } : {})}
    >
      <span className={nameCls}>{name}</span>
      <span className={`${pipeCls} ${pipeNarrowCls}`} aria-hidden>
        |
      </span>
      <span className={`${subCls} ${subNarrowCls}`}>{subtitle}</span>
    </Tag>
  );
});
