'use client';

import { memo, useRef, useCallback, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AtlasLocale } from '@/core/types';
import { t } from '@/lib/ui-strings';

interface Props {
  title: string;
  locale: AtlasLocale;
  children: ReactNode;
}

export const StoryLibraryShelf = memo(function StoryLibraryShelf({
  title,
  locale,
  children,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  }, []);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-6 sm:px-10">
        <h3 className="text-sm sm:text-base font-semibold tracking-wide"
          style={{ color: 'color-mix(in srgb, var(--color-text) 90%, transparent)' }}
        >
          {title}
        </h3>
        <div className="hidden sm:flex gap-1">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            style={{
              background: 'var(--color-chrome-fill)',
              color: 'var(--color-text-muted)',
            }}
            aria-label={t('storyLibrary.aria.scrollLeft', locale)}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            style={{
              background: 'var(--color-chrome-fill)',
              color: 'var(--color-text-muted)',
            }}
            aria-label={t('storyLibrary.aria.scrollRight', locale)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="relative">
        {/* Left edge fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 sm:w-12"
          style={{
            background: 'linear-gradient(to right, var(--color-background), transparent)',
          }}
        />
        {/* Right edge fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 sm:w-12"
          style={{
            background: 'linear-gradient(to left, var(--color-background), transparent)',
          }}
        />
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 sm:px-10 pb-2 scrollbar-none"
        >
          {children}
        </div>
      </div>
    </section>
  );
});
