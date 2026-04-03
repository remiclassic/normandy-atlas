'use client';

import { memo, useCallback } from 'react';
import type { StoryLauncherItem } from '@/lib/story-launcher';

interface Props {
  item: StoryLauncherItem;
  onLaunch: (item: StoryLauncherItem) => void;
}

const ContextualStoryCard = memo(function ContextualStoryCard({
  item,
  onLaunch,
}: Props) {
  const handleClick = useCallback(() => onLaunch(item), [item, onLaunch]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex w-full min-h-[72px] items-center gap-4 rounded-2xl border border-gold/15 hover:border-gold/30 bg-gradient-to-r from-gold/[0.04] to-transparent px-5 py-4 text-left transition-all duration-250 touch-target overflow-hidden"
    >
      {item.thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumb}
          alt=""
          className="h-14 w-14 shrink-0 rounded-xl object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-200"
          loading="lazy"
        />
      )}
      {!item.thumb && (
        <span className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-gold/10 group-hover:bg-gold/18 transition-colors duration-200">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" className="text-gold" />
          </svg>
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold text-gold group-hover:text-gold-bright transition-colors leading-snug">
          {item.title}
        </span>
        {item.subtitle && (
          <span className="block text-[11px] text-text-dim/70 leading-snug mt-1 line-clamp-2">
            {item.subtitle}
          </span>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          {item.badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gold/80 bg-gold/8 rounded-full px-2 py-0.5">
              {item.badge}
            </span>
          )}
          {item.estimatedMinutes != null && (
            <span className="text-[10px] text-text-dim/50">
              ~{item.estimatedMinutes} min
            </span>
          )}
        </div>
      </div>
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        className="shrink-0 text-gold/40 group-hover:text-gold/70 transition-colors"
        aria-hidden
      >
        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
});

export default ContextualStoryCard;
