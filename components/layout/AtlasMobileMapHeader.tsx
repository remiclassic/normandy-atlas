'use client';

import { memo, type Ref } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import EraSelector from '@/components/timeline/EraSelector';
import ExpeditionProgressChip from '@/components/progress/ExpeditionProgressChip';

export type AtlasMobileMapHeaderProps = {
  storyLibraryOpen: boolean;
  storyLibraryCloseRef: Ref<HTMLButtonElement | null>;
  onCloseStoryLibrary: () => void;
  onOpenLedger: () => void;
};

/**
 * Mobile map chrome: quiet “map” row (era + timeline focus; status only) vs story-library overlay (back + title band).
 * Tools/settings live in the bottom “More” sheet — no header hamburger (avoids duplicating More on Explore).
 */
const AtlasMobileMapHeader = memo(function AtlasMobileMapHeader({
  storyLibraryOpen,
  storyLibraryCloseRef,
  onCloseStoryLibrary,
  onOpenLedger,
}: AtlasMobileMapHeaderProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-col pointer-events-auto">
      <div className="flex items-center gap-3 px-3 py-2">
        {storyLibraryOpen ? (
          <>
            <button
              ref={storyLibraryCloseRef}
              type="button"
              onClick={onCloseStoryLibrary}
              className="flex max-w-[min(100%,11rem)] shrink-0 touch-target items-center gap-1.5 rounded-lg border border-chrome-border bg-chrome-fill px-2.5 py-2 text-[11px] font-semibold text-text-muted transition-colors hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment"
              aria-label={t('storyLibrary.backToMap', locale)}
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-gold/80" strokeWidth={2.25} aria-hidden />
              <span className="truncate">{t('storyLibrary.backToMap', locale)}</span>
            </button>
            <div className="min-w-0 flex-1" />
            <ExpeditionProgressChip onOpenLedger={onOpenLedger} compact />
          </>
        ) : (
          <>
            <div className="min-w-0 flex-1" aria-hidden />
            <ExpeditionProgressChip onOpenLedger={onOpenLedger} compact />
          </>
        )}
      </div>

      <div className="min-w-0 w-full border-t border-chrome-border/40 px-3">
        {storyLibraryOpen ? (
          <div className="flex min-h-9 items-center justify-center px-1">
            <p className="truncate text-center font-display text-[12px] font-semibold tracking-tight text-text-muted">
              {t('storyLibrary.title', locale)}
            </p>
          </div>
        ) : (
          <EraSelector compact />
        )}
      </div>
    </div>
  );
});

export default AtlasMobileMapHeader;
