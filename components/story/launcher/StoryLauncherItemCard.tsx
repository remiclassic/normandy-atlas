'use client';

import { memo, useCallback } from 'react';
import type { StoryLauncherItem } from '@/lib/story-launcher';

interface Props {
  item: StoryLauncherItem;
  onLaunch: (item: StoryLauncherItem) => void;
  /** Muted list styling for atlas-wide catalog rows. */
  listEmphasis?: 'era' | 'atlas';
}

const PlayIcon = memo(function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
    </svg>
  );
});

const StoryLauncherItemCard = memo(function StoryLauncherItemCard({
  item,
  onLaunch,
  listEmphasis = 'era',
}: Props) {
  const handleClick = useCallback(() => onLaunch(item), [item, onLaunch]);
  const atlas = listEmphasis === 'atlas';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group flex w-full ${atlas ? 'min-h-[44px]' : 'min-h-[48px]'} items-center gap-3 rounded-xl px-4 ${atlas ? 'py-2.5' : 'py-3'} text-left transition-all duration-200 touch-target ${
        atlas
          ? 'bg-chrome-fill-badge/25 hover:bg-chrome-fill-badge/45 border border-border/25 hover:border-border/45'
          : 'bg-chrome-fill-badge/40 hover:bg-chrome-fill-badge/70'
      }`}
    >
      {item.thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumb}
          alt=""
          className="h-10 w-10 shrink-0 rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200"
          loading="lazy"
        />
      )}
      {!item.thumb && (
        <span className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-gold/8 group-hover:bg-gold/15 text-text-muted group-hover:text-parchment transition-colors duration-200">
          <PlayIcon />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span
          className={`block font-medium transition-colors leading-snug ${
            atlas
              ? 'text-[12px] text-text-dim/75 group-hover:text-text-muted'
              : 'text-[13px] text-text-muted group-hover:text-parchment'
          }`}
        >
          {item.title}
        </span>
        {item.subtitle && (
          <span
            className={`block leading-snug mt-0.5 line-clamp-1 ${
              atlas ? 'text-[10px] text-text-dim/55' : 'text-[11px] text-text-dim/70'
            }`}
          >
            {item.subtitle}
          </span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {item.badge && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gold/80 bg-gold/8 rounded-full px-2 py-0.5">
            {item.badge}
          </span>
        )}
        {item.estimatedMinutes != null && !item.badge && (
          <span className="text-[10px] text-text-dim/50">
            ~{item.estimatedMinutes} min
          </span>
        )}
      </div>
    </button>
  );
});

export default StoryLauncherItemCard;
