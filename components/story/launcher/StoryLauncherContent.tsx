'use client';

import { memo, useCallback } from 'react';
import type { StoryLauncherModel, StoryLauncherItem } from '@/lib/story-launcher';
import type { AtlasLocale } from '@/core/types';
import { arcIdToProgressKey } from '@/lib/story-progress';
import { t } from '@/lib/ui-strings';
import StoryLauncherSectionView from './StoryLauncherSectionView';
import StoryLauncherEraHero from './StoryLauncherEraHero';
import StoryLauncherMoreThisEra from './StoryLauncherMoreThisEra';

interface Props {
  model: StoryLauncherModel;
  locale: AtlasLocale;
  /** Current map era — resets “more this era” expansion when it changes. */
  eraId: string;
  /** Shown in the sheet header when `embedIntro` is true (mobile). */
  eraTitle?: string;
  onLaunch: (item: StoryLauncherItem) => void;
  /** Opens the full story library focused on an arc (used for non-hero “more this era” rows). */
  onBrowseStoryInLibrary?: (progressKey: string) => void;
  /** When false, only section list + dividers (intro lives in dialog chrome). */
  embedIntro?: boolean;
}

const StoryLauncherContent = memo(function StoryLauncherContent({
  model,
  locale,
  eraId,
  eraTitle,
  onLaunch,
  onBrowseStoryInLibrary,
  embedIntro = true,
}: Props) {
  const launchFromBeginning = useCallback(
    (item: StoryLauncherItem) => {
      if (item.launch.type === 'flythrough') {
        onLaunch(item);
        return;
      }
      onLaunch({
        ...item,
        launch: { type: 'story', arcId: item.launch.arcId },
      });
    },
    [onLaunch],
  );

  const launchMoreThisEra = useCallback(
    (item: StoryLauncherItem) => {
      if (
        item.launch.type === 'story' &&
        onBrowseStoryInLibrary != null
      ) {
        onBrowseStoryInLibrary(arcIdToProgressKey(item.launch.arcId));
        return;
      }
      onLaunch(item);
    },
    [onBrowseStoryInLibrary, onLaunch],
  );

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

          if (section.sectionId === 'contextual' && section.items[0]) {
            const [heroItem, ...moreThisEra] = section.items;
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
                <section>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    <StoryLauncherEraHero
                      item={heroItem}
                      locale={locale}
                      onBegin={() => launchFromBeginning(heroItem)}
                      onResume={() => onLaunch(heroItem)}
                    />
                    <StoryLauncherMoreThisEra
                      key={`more-this-era-${eraId}`}
                      items={moreThisEra}
                      locale={locale}
                      onLaunch={launchMoreThisEra}
                    />
                  </div>
                </section>
              </div>
            );
          }

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
