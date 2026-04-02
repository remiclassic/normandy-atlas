'use client';

import { memo, useCallback, useMemo } from 'react';
import type { StoryLibraryRowModel } from '@/lib/story-library-build';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import type { StoryProgressRecord } from '@/lib/story-progress';
import { arcChromeStyle } from '@/data/atlas/era-arcs';
import { pickI18n } from '@/lib/locale';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t } from '@/lib/ui-strings';

interface Props {
  row: StoryLibraryRowModel;
  locale: AtlasLocale;
  uiTheme: UiTheme;
  progress?: StoryProgressRecord;
  variant: 'medium' | 'standard';
  onSelect: (row: StoryLibraryRowModel) => void;
  onHoverEnter?: (row: StoryLibraryRowModel) => void;
  onHoverLeave?: () => void;
}

export const StoryLibraryGridCard = memo(function StoryLibraryGridCard({
  row,
  locale,
  uiTheme,
  progress,
  variant,
  onSelect,
  onHoverEnter,
  onHoverLeave,
}: Props) {
  const title = useMemo(
    () =>
      row.meta.displayTitle
        ? pickI18n(row.meta.displayTitle, locale)
        : row.arcEntry
          ? pickI18n(row.arcEntry.label, locale)
          : '',
    [row.meta.displayTitle, row.arcEntry, locale],
  );

  const poster = useMemo(
    () => (row.resolvedPosterSrc ? publicAssetUrl(row.resolvedPosterSrc) : null),
    [row.resolvedPosterSrc],
  );

  const completed = Boolean(progress?.completed);
  const canResume = Boolean(progress && !progress.completed && progress.lastStep > 0);
  const pct =
    row.sceneCount > 0 && progress
      ? ((progress.lastStep + 1) / row.sceneCount) * 100
      : 0;

  const chrome = row.arcEntry ? arcChromeStyle(row.arcEntry, uiTheme) : null;

  const borderClass = chrome?.border ?? 'border-transparent';
  const hoverBorderClass = chrome?.borderHover ?? 'hover:border-white/20';

  const handleClick = useCallback(() => onSelect(row), [onSelect, row]);
  const handleMouseEnter = useCallback(() => onHoverEnter?.(row), [onHoverEnter, row]);
  const handleMouseLeave = useCallback(() => onHoverLeave?.(), [onHoverLeave]);

  const isPeople = row.meta.category === 'People';
  const aspectClass =
    isPeople
      ? 'aspect-[3/4]'
      : variant === 'medium'
        ? 'aspect-[16/10]'
        : 'aspect-video';

  const metaLine = useMemo(() => {
    const parts: string[] = [];
    if (row.timelineRange) {
      const fmt = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : String(y));
      parts.push(`${fmt(row.timelineRange.start)}–${fmt(row.timelineRange.end)}`);
    }
    parts.push(
      t('storyLibrary.scenes', locale).replace('{count}', String(row.sceneCount)),
    );
    if (row.meta.estimatedMinutes != null) {
      parts.push(`~${row.meta.estimatedMinutes} min`);
    }
    return parts.join(' · ');
  }, [row.timelineRange, row.sceneCount, row.meta.estimatedMinutes, locale]);

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative w-full overflow-hidden rounded-lg cursor-pointer
        border ${borderClass} ${hoverBorderClass}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
        transition-all duration-200
        hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        ${aspectClass}
      `}
    >
      {/* Image */}
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Subtle inner glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(255,255,255,0.04)]" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3">
        <span className="font-display text-sm font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
          {title}
        </span>

        {variant === 'medium' && (
          <span className="text-[10px] text-white/45 leading-snug line-clamp-1">
            {metaLine}
          </span>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {row.meta.isNew && (
            <span className="rounded bg-cyan-500/25 px-1.5 py-px text-[8px] font-semibold uppercase tracking-wide text-cyan-300">
              {t('storyLibrary.badge.new', locale)}
            </span>
          )}
          {completed && (
            <span className="rounded bg-emerald-500/20 px-1.5 py-px text-[8px] font-semibold uppercase tracking-wide text-emerald-300">
              {t('storyLibrary.badge.completed', locale)}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {canResume && !completed && (
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <div
            className="h-full bg-amber-400/90 transition-[width] duration-300"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      )}
    </button>
  );
});
