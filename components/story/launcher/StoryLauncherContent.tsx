'use client';

import { memo } from 'react';
import type { StoryLauncherModel, StoryLauncherItem } from '@/lib/story-launcher';
import type { AtlasLocale } from '@/core/types';
import { t } from '@/lib/ui-strings';
import StoryLauncherSectionView from './StoryLauncherSectionView';

interface Props {
  model: StoryLauncherModel;
  locale: AtlasLocale;
  onLaunch: (item: StoryLauncherItem) => void;
  onBrowseAll?: () => void;
}

const StoryLauncherContent = memo(function StoryLauncherContent({
  model,
  locale,
  onLaunch,
  onBrowseAll,
}: Props) {
  return (
    <div className="px-5 pt-4 pb-6 space-y-5">
      {model.sections.map((section) => (
        <StoryLauncherSectionView
          key={section.sectionId}
          section={section}
          onLaunch={onLaunch}
        />
      ))}

      {onBrowseAll && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onBrowseAll}
            className="w-full rounded-xl border border-border/60 hover:border-border-bright px-4 py-3 text-center text-[12px] font-medium text-text-dim/70 hover:text-parchment transition-all duration-200 touch-target"
          >
            {t('launcher.browseAll', locale)}
          </button>
        </div>
      )}
    </div>
  );
});

export default StoryLauncherContent;
