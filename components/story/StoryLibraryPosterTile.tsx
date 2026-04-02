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
  onSelect: (row: StoryLibraryRowModel) => void;
}

export const StoryLibraryPosterTile = memo(function StoryLibraryPosterTile({
  row,
  locale,
  uiTheme,
  progress,
  onSelect,
}: Props) {
  const title = row.meta.displayTitle
    ? pickI18n(row.meta.displayTitle, locale)
    : row.arcEntry
      ? pickI18n(row.arcEntry.label, locale)
      : '';

  const poster = row.resolvedPosterSrc ? publicAssetUrl(row.resolvedPosterSrc) : null;

  const completed = Boolean(progress?.completed);
  const canResume = Boolean(progress && !progress.completed && progress.lastStep > 0);
  const pct =
    row.sceneCount > 0 && progress
      ? ((progress.lastStep + 1) / row.sceneCount) * 100
      : 0;

  const handleClick = useCallback(() => onSelect(row), [onSelect, row]);

  const chrome = row.arcEntry ? arcChromeStyle(row.arcEntry, uiTheme) : null;

  const borderClass = useMemo(() => {
    if (!chrome) return 'border-transparent';
    return chrome.border;
  }, [chrome]);

  const hoverBorderClass = useMemo(() => {
    if (!chrome) return 'hover:border-gold/30';
    return chrome.borderHover;
  }, [chrome]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group relative flex-shrink-0 w-[220px] sm:w-[260px] aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${borderClass} ${hoverBorderClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 transition-[border-color] duration-200`}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.03]" />
      )}

      {/* Dark gradient overlay — always dark for text readability on any image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1">
        <span className="font-display text-sm font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
          {title}
        </span>

        {row.meta.isNew && (
          <span className="self-start rounded bg-cyan-500/25 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-cyan-300">
            {t('storyLibrary.badge.new', locale)}
          </span>
        )}
        {completed && (
          <span className="self-start rounded bg-emerald-500/20 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-emerald-300">
            ✓
          </span>
        )}
      </div>

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
