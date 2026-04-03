'use client';

import { memo } from 'react';
import type { StoryLauncherSection, StoryLauncherItem } from '@/lib/story-launcher';
import ContextualStoryCard from './ContextualStoryCard';
import StoryLauncherItemCard from './StoryLauncherItemCard';

interface Props {
  section: StoryLauncherSection;
  onLaunch: (item: StoryLauncherItem) => void;
}

const StoryLauncherSectionView = memo(function StoryLauncherSectionView({
  section,
  onLaunch,
}: Props) {
  const isHero = section.variant === 'hero';

  return (
    <section>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 mb-3">
        {section.title}
      </h3>
      <div className="space-y-2">
        {section.items.map((item) =>
          isHero ? (
            <ContextualStoryCard key={item.id} item={item} onLaunch={onLaunch} />
          ) : (
            <StoryLauncherItemCard key={item.id} item={item} onLaunch={onLaunch} />
          ),
        )}
      </div>
    </section>
  );
});

export default StoryLauncherSectionView;
