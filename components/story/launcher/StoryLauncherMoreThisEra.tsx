'use client';

import { memo, useCallback, useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { StoryLauncherItem } from '@/lib/story-launcher';
import type { AtlasLocale } from '@/core/types';
import { t } from '@/lib/ui-strings';
import ContextualStoryCard from './ContextualStoryCard';

interface Props {
  items: StoryLauncherItem[];
  locale: AtlasLocale;
  onLaunch: (item: StoryLauncherItem) => void;
}

const StoryLauncherMoreThisEra = memo(function StoryLauncherMoreThisEra({
  items,
  locale,
  onLaunch,
}: Props) {
  const [open, setOpen] = useState(true);
  const panelId = useId();
  const count = items.length;

  const toggle = useCallback(() => setOpen((o) => !o), []);

  if (count === 0) return null;

  return (
    <div className="rounded-xl border border-border/40 bg-chrome-fill/[0.12]">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={open}
        aria-controls={`${panelId}-panel`}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-chrome-fill/30 rounded-xl touch-target"
      >
        <span className="text-[12px] font-semibold text-parchment/90">
          {t('launcher.moreThisEra', locale).replace('{count}', String(count))}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gold/55 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>
      {open && (
        <div
          id={`${panelId}-panel`}
          role="region"
          aria-labelledby={`${panelId}-trigger`}
          className="space-y-2 border-t border-border/35 px-3 pb-3 pt-2"
        >
          {items.map((item) => (
            <ContextualStoryCard key={item.id} item={item} onLaunch={onLaunch} />
          ))}
        </div>
      )}
    </div>
  );
});

export default StoryLauncherMoreThisEra;
