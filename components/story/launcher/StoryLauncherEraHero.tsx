'use client';

import { memo, useCallback } from 'react';
import type { StoryLauncherItem } from '@/lib/story-launcher';
import type { AtlasLocale } from '@/core/types';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t } from '@/lib/ui-strings';
import { Play, RotateCcw } from 'lucide-react';

interface Props {
  item: StoryLauncherItem;
  locale: AtlasLocale;
  onBegin: () => void;
  onResume: () => void;
}

const StoryLauncherEraHero = memo(function StoryLauncherEraHero({
  item,
  locale,
  onBegin,
  onResume,
}: Props) {
  const canResume =
    item.launch.type === 'story' &&
    item.launch.resumeStep != null &&
    item.launch.resumeStep > 0;

  const poster =
    item.posterSrc ?? item.thumb
      ? publicAssetUrl((item.posterSrc ?? item.thumb) as string)
      : null;

  const headline = item.heroHeadline ?? item.title;

  const handlePrimary = useCallback(() => {
    if (canResume) onResume();
    else onBegin();
  }, [canResume, onBegin, onResume]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-[#060812] shadow-lg">
      <div className="relative aspect-[16/10] w-full min-h-[140px] max-h-[220px] sm:max-h-[240px]">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1628] to-[#0a0e1a]" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(6,8,18,0.96) 0%, rgba(6,8,18,0.72) 38%, rgba(6,8,18,0.25) 72%, rgba(6,8,18,0.4) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(6,8,18,0.75) 0%, rgba(6,8,18,0.35) 45%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative space-y-3 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <div className="flex flex-wrap items-center gap-2">
          {item.badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gold/85 bg-gold/10 rounded-full px-2 py-0.5">
              {item.badge}
            </span>
          )}
          {item.estimatedMinutes != null && (
            <span className="text-[10px] text-white/55">
              {t('launcher.duration', locale).replace(
                '{min}',
                String(item.estimatedMinutes),
              )}
            </span>
          )}
        </div>

        <h3 className="text-[17px] sm:text-[19px] font-semibold text-white/95 leading-snug tracking-tight pr-1">
          {headline}
        </h3>

        {item.subtitle && (
          <p className="text-[12px] text-white/75 leading-relaxed line-clamp-3">
            {item.subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
          <button
            type="button"
            onClick={handlePrimary}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-[13px] font-bold text-black hover:bg-white/90 transition-colors shadow-md shadow-black/25 touch-target"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden />
            {canResume
              ? t('storyLibrary.resume', locale)
              : t('storyLibrary.beginJourney', locale)}
          </button>

          {canResume && (
            <button
              type="button"
              onClick={onBegin}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-[12px] font-semibold text-white hover:bg-white/15 transition-colors touch-target"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              {t('storyLibrary.beginJourney', locale)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default StoryLauncherEraHero;
