'use client';

import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { useAncestryStore } from '@/lib/ancestry-store';
import { ANCESTRY_JOURNEY_MAX_STEPS } from '@/lib/ancestry-feature-flags';
import type { AncestryJourneyStep } from '@/core/ancestry/types';
import { GENEALOGY_HUB_PATH } from '@/lib/genealogy-paths';

function stepTitle(step: AncestryJourneyStep | undefined): string | null {
  if (!step) return null;
  if (step.kind === 'narrativeCard') return step.title;
  return null;
}

const AncestryJourneyMapDock = memo(function AncestryJourneyMapDock() {
  const locale = useLocale();
  const plan = useAncestryStore((s) => s.activeJourney);
  const stepIndex = useAncestryStore((s) => s.journeyStepIndex);
  const setJourneyStepIndex = useAncestryStore((s) => s.setJourneyStepIndex);
  const setActiveJourney = useAncestryStore((s) => s.setActiveJourney);

  const maxSteps = ANCESTRY_JOURNEY_MAX_STEPS;
  const steps = plan && plan.steps.length > maxSteps ? plan.steps.slice(0, maxSteps) : plan?.steps;
  const total = steps?.length ?? 0;

  const safeIndex = useMemo(() => {
    if (!steps || total === 0) return 0;
    return Math.max(0, Math.min(stepIndex, total - 1));
  }, [stepIndex, steps, total]);

  const currentStep = steps?.[safeIndex];

  const onPrev = useCallback(() => {
    if (!steps) return;
    setJourneyStepIndex(Math.max(0, safeIndex - 1));
  }, [steps, safeIndex, setJourneyStepIndex]);

  const onNext = useCallback(() => {
    if (!steps) return;
    setJourneyStepIndex(Math.min(total - 1, safeIndex + 1));
  }, [steps, safeIndex, total, setJourneyStepIndex]);

  const onStop = useCallback(() => {
    setActiveJourney(null);
  }, [setActiveJourney]);

  if (!plan || !steps || total === 0) return null;

  const title = stepTitle(currentStep);
  const progressTpl = t('ancestryJourney.dockProgress', locale);

  return (
    <div
      className="pointer-events-auto fixed bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4rem))] left-1/2 z-40 w-[min(34rem,calc(100vw-1rem))] -translate-x-1/2 rounded-xl border border-chrome-border-strong/55 bg-chrome-fill/95 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md md:bottom-6"
      role="region"
      aria-label={t('ancestryJourney.dockTitle', locale)}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gold/80">{t('ancestryJourney.dockTitle', locale)}</p>
          <p className="mt-0.5 text-[11px] text-text-dim">
            {progressTpl.replace('{current}', String(safeIndex + 1)).replace('{total}', String(total))}
          </p>
          {title ? <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-parchment/95">{title}</p> : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={safeIndex <= 0}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border/50 bg-chrome-fill-raised/50 text-text disabled:opacity-35"
            aria-label={t('ancestry.journeyPrev', locale)}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={safeIndex >= total - 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border/50 bg-chrome-fill-raised/50 text-text disabled:opacity-35"
            aria-label={t('ancestry.journeyNext', locale)}
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onStop}
            className="atlas-hover-amber-icon flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border/50 bg-chrome-fill-raised/50 text-text-dim"
            aria-label={t('ancestry.stopJourney', locale)}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
      <p className="mt-1.5 border-t border-chrome-border/40 pt-1.5 text-center text-[11px] text-text-dim">
        <Link href={GENEALOGY_HUB_PATH} className="text-gold/85 underline decoration-gold/30 underline-offset-2 hover:text-gold">
          {t('deepOrigins.backToHub', locale)}
        </Link>
      </p>
    </div>
  );
});

export default AncestryJourneyMapDock;
