'use client';

import { memo } from 'react';
import type {
  StoryLauncherSection,
  StoryLauncherItem,
  StoryLauncherSectionEmphasis,
} from '@/lib/story-launcher';
import ContextualStoryCard from './ContextualStoryCard';
import StoryLauncherItemCard from './StoryLauncherItemCard';

interface Props {
  section: StoryLauncherSection;
  onLaunch: (item: StoryLauncherItem) => void;
}

function sectionHeadingClass(emphasis: StoryLauncherSectionEmphasis | undefined): string {
  if (emphasis === 'atlas') {
    return 'text-[9px] font-semibold uppercase tracking-[0.16em] text-text-dim/45 mb-2.5';
  }
  return 'text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 mb-3';
}

const StoryLauncherSectionView = memo(function StoryLauncherSectionView({
  section,
  onLaunch,
}: Props) {
  const isHero = section.variant === 'hero';
  const emphasis = section.emphasis ?? 'era';

  return (
    <section>
      <h3 className={sectionHeadingClass(emphasis)}>{section.title}</h3>
      <div className={emphasis === 'atlas' ? 'space-y-1.5' : 'space-y-2'}>
        {section.items.map((item) =>
          isHero ? (
            <ContextualStoryCard key={item.id} item={item} onLaunch={onLaunch} />
          ) : (
            <StoryLauncherItemCard
              key={item.id}
              item={item}
              onLaunch={onLaunch}
              listEmphasis={emphasis}
            />
          ),
        )}
      </div>
    </section>
  );
});

export default StoryLauncherSectionView;
