'use client';

import { memo, useMemo, useCallback } from 'react';
import { LayoutList } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import {
  getContextualStoryItems,
  getEraFlagshipStoryItem,
} from '@/lib/story-launcher';
import { readStoryProgressMap } from '@/lib/story-progress';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { t } from '@/lib/ui-strings';

export type StoryMapIdleCtaLayout = 'floating' | 'dock';

interface Props {
  onOpenLauncher: () => void;
  onStartFlagship: () => void;
  layout: StoryMapIdleCtaLayout;
}

const StoryMapIdleCtaPill = memo(function StoryMapIdleCtaPill({
  onOpenLauncher,
  onStartFlagship,
  layout,
}: Props) {
  const eraId = useMapStore((s) => s.eraId);
  const locale = useLocale();

  const flagship = useMemo(
    () => getEraFlagshipStoryItem({ eraId, locale }),
    [eraId, locale],
  );
  const hasFlagship = flagship?.launch.type === 'story';

  const eraStoryCount = useMemo(() => {
    const items = getContextualStoryItems(
      { eraId, locale },
      readStoryProgressMap(),
    );
    return items.length;
  }, [eraId, locale]);

  const extraStoriesCount = hasFlagship ? Math.max(0, eraStoryCount - 1) : 0;

  const visualSrc = useMemo(() => {
    if (!flagship) return null;
    const raw = flagship.posterSrc ?? flagship.thumb;
    return raw ? publicAssetUrl(raw) : null;
  }, [flagship]);

  const primaryTitle = hasFlagship
    ? (flagship?.heroHeadline ?? flagship?.title ?? t('launcher.open', locale))
    : t('launcher.open', locale);

  const primaryAriaLabel = useMemo(() => {
    if (!hasFlagship || !flagship) return t('launcher.open', locale);
    const title = flagship.heroHeadline ?? flagship.title;
    if (extraStoriesCount > 0) {
      return t('launcher.idle.primary.aria.withMore', locale)
        .replace('{title}', title)
        .replace('{n}', String(extraStoriesCount));
    }
    return t('launcher.idle.primary.aria.mainOnly', locale).replace('{title}', title);
  }, [hasFlagship, flagship, extraStoriesCount, locale]);

  const primaryTooltipLabel = t('launcher.idle.primary.tooltip.label', locale);
  const primaryTooltipHint = useMemo(() => {
    if (!hasFlagship) return undefined;
    if (extraStoriesCount > 0) {
      return t('launcher.idle.primary.tooltip.hintWithMore', locale).replace(
        '{n}',
        String(extraStoriesCount),
      );
    }
    return t('launcher.idle.primary.tooltip.hintMainOnly', locale);
  }, [hasFlagship, extraStoriesCount, locale]);

  const listTooltipLabel = t('launcher.idle.list.tooltip.label', locale);
  const listTooltipHint = useMemo(() => {
    if (!hasFlagship) {
      return t('launcher.idle.list.tooltip.hintMainOnly', locale);
    }
    if (extraStoriesCount > 0) {
      return t('launcher.idle.list.tooltip.hintWithMore', locale).replace(
        '{n}',
        String(extraStoriesCount),
      );
    }
    return t('launcher.idle.list.tooltip.hintMainOnly', locale);
  }, [hasFlagship, extraStoriesCount, locale]);

  const handlePrimary = useCallback(() => {
    onStartFlagship();
  }, [onStartFlagship]);

  const shellClass =
    layout === 'dock'
      ? 'group flex flex-1 min-h-[48px] min-w-0 items-stretch rounded-full glass-panel glow-gold border border-gold/15 hover:border-gold/25 touch-target overflow-visible text-[13px] font-medium text-gold hover:text-gold-bright transition-all duration-250'
      : 'group flex min-w-0 max-w-[min(100%,28rem)] items-stretch rounded-full glass-panel glow-gold border border-gold/15 hover:border-gold/25 touch-target overflow-visible text-[13px] font-medium text-gold hover:text-gold-bright transition-all duration-250';

  const primaryButton = (
    <button
      type="button"
      onClick={handlePrimary}
      aria-label={primaryAriaLabel}
      className={`flex min-h-[44px] min-w-0 w-full flex-1 items-center gap-3 px-4 py-2.5 sm:px-5 touch-target transition-colors duration-200 hover:bg-gold/[0.04] ${hasFlagship ? 'rounded-l-full' : 'rounded-full'}`}
    >
        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold/10 ring-1 ring-gold/15 transition-colors duration-200 group-hover:bg-gold/15">
          {visualSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- small lazy thumb; external CMS paths
            <img
              key={`${eraId}-${visualSrc}`}
              src={visualSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="text-gold"
            >
              <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
            </svg>
          )}
        </span>
        <span className="min-w-0 flex-1 text-left leading-tight">
          <span className="block truncate text-[13px] font-semibold tracking-tight">
            {primaryTitle}
          </span>
          {extraStoriesCount > 0 ? (
            <span className="mt-0.5 block line-clamp-2 text-[10px] font-medium text-gold/65">
              {t('launcher.idle.moreStoriesCaption', locale).replace(
                '{n}',
                String(extraStoriesCount),
              )}
            </span>
          ) : null}
        </span>
    </button>
  );

  return (
    <div className={shellClass}>
      {hasFlagship ? (
        <ChromeIconTooltip
          label={primaryTooltipLabel}
          hint={primaryTooltipHint}
          placement="top"
          wrapperClassName="flex min-w-0 min-h-0 flex-1"
        >
          {primaryButton}
        </ChromeIconTooltip>
      ) : (
        primaryButton
      )}
      {hasFlagship ? (
        <ChromeIconTooltip
          label={listTooltipLabel}
          hint={listTooltipHint}
          placement="top"
          wrapperClassName="relative flex shrink-0 overflow-visible self-stretch"
        >
          <button
            type="button"
            onClick={onOpenLauncher}
            aria-label={t('launcher.openSheet.aria', locale)}
            className="relative flex min-h-[44px] min-w-[48px] shrink-0 items-center justify-center self-stretch rounded-r-full border-l border-gold/20 bg-gold/[0.04] px-2.5 text-gold shadow-inner shadow-black/10 transition-all duration-200 hover:border-gold/35 hover:bg-gold/[0.12] hover:text-gold-bright hover:shadow-[0_0_20px_rgba(212,175,55,0.12)] active:scale-[0.98] touch-target"
          >
            <LayoutList
              className="h-[19px] w-[19px] opacity-95"
              strokeWidth={1.85}
              aria-hidden
            />
            {extraStoriesCount > 0 ? (
              <span className="pointer-events-none absolute right-0 top-0 z-[1] flex h-[18px] min-w-[1.125rem] translate-x-[55%] -translate-y-[55%] items-center justify-center rounded-md bg-gradient-to-br from-gold/90 to-amber-700/95 px-1 text-[9px] font-bold tabular-nums leading-none text-[#1a1206] shadow-md shadow-black/40 ring-1 ring-gold/50">
                +{extraStoriesCount}
              </span>
            ) : null}
          </button>
        </ChromeIconTooltip>
      ) : null}
    </div>
  );
});

export default StoryMapIdleCtaPill;
