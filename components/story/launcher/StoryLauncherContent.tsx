'use client';

import { memo } from 'react';
import type { StoryLauncherModel, StoryLauncherItem } from '@/lib/story-launcher';
import type { AtlasLocale } from '@/core/types';
import { t } from '@/lib/ui-strings';
import StoryLauncherSectionView from './StoryLauncherSectionView';

interface Props {
  model: StoryLauncherModel;
  locale: AtlasLocale;
  /** Shown in the sheet header when `embedIntro` is true (mobile). */
  eraTitle?: string;
  onLaunch: (item: StoryLauncherItem) => void;
  /** When false, only section list + dividers (intro lives in dialog chrome). */
  embedIntro?: boolean;
}

const StoryLauncherContent = memo(function StoryLauncherContent({
  model,
  locale,
  eraTitle,
  onLaunch,
  embedIntro = true,
}: Props) {
  return (
    <div className={`px-5 space-y-5 ${embedIntro ? 'pt-4 pb-5' : 'pt-3 pb-5'}`}>
      {embedIntro && (
        <header className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/70">
            {t('launcher.headline.kicker', locale)}
          </p>
          <p className="text-[17px] font-semibold text-parchment leading-snug pr-1">
            {eraTitle}
          </p>
          <p className="text-[11px] text-text-dim/65 leading-relaxed pt-0.5">
            {t('launcher.tagline', locale)}
          </p>
        </header>
      )}

      <div className="space-y-5">
        {model.sections.map((section, i) => {
          const prev = model.sections[i - 1];
          const showDivider =
            !!prev &&
            prev.emphasis === 'era' &&
            section.emphasis === 'atlas';

          return (
            <div key={section.sectionId}>
              {showDivider && (
                <div
                  className="flex items-center gap-3 my-5"
                  role="separator"
                  aria-label={t('launcher.moreFromLibrary', locale)}
                >
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-text-dim/40 shrink-0">
                    {t('launcher.moreFromLibrary', locale)}
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
              )}
              <StoryLauncherSectionView section={section} onLaunch={onLaunch} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default StoryLauncherContent;
