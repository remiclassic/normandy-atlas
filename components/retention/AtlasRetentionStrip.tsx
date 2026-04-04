'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Flame, Play, Trophy } from 'lucide-react';
import { useMapStore, isOnboardingDone } from '@/lib/store';
import { useProgress, useGamificationStats } from '@/hooks/useAtlasProgress';
import { evaluateChallengeProgress, readProgress } from '@/lib/progress';
import { listResumableStoryRows } from '@/lib/story-resume';
import { readStoryProgressMap } from '@/lib/story-progress';
import { pickI18n } from '@/lib/locale';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const AtlasRetentionStrip = memo(function AtlasRetentionStrip() {
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    setClientReady(true);
  }, []);

  const locale = useLocale();
  const progress = useProgress();
  const gamStats = useGamificationStats();

  const storyMode = useMapStore((s) => s.storyMode);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);

  const resumableRow = useMemo(() => {
    return listResumableStoryRows(locale)[0] ?? null;
  }, [locale, progress]); // eslint-disable-line react-hooks/exhaustive-deps -- progress triggers re-derive

  const savedStep = useMemo(() => {
    if (!resumableRow) return 0;
    const map = readStoryProgressMap();
    return map[resumableRow.progressKey]?.lastStep ?? 0;
  }, [resumableRow, progress]); // eslint-disable-line react-hooks/exhaustive-deps

  const challengeSummary = useMemo(() => {
    const active = gamStats.challenges.active;
    if (!active) return null;
    const p = readProgress();
    const { objectiveProgress, completed, def } = evaluateChallengeProgress(p);
    if (!def || completed) return null;
    const done = def.objectives.filter((o) => (objectiveProgress[o.id] ?? 0) >= o.target).length;
    return { done, total: def.objectives.length };
  }, [gamStats.challenges.active, progress]); // eslint-disable-line react-hooks/exhaustive-deps

  const streak = gamStats.streak.currentStreak;

  const handleContinue = useCallback(() => {
    if (!resumableRow) return;
    useMapStore.getState().startStory(resumableRow.meta.arcId ?? null, { stepIndex: savedStep });
  }, [resumableRow, savedStep]);

  const rowTitle = useMemo(() => {
    if (!resumableRow) return '';
    return resumableRow.meta.displayTitle
      ? pickI18n(resumableRow.meta.displayTitle, locale)
      : resumableRow.arcEntry
        ? pickI18n(resumableRow.arcEntry.label, locale)
        : '';
  }, [resumableRow, locale]);

  if (!clientReady) return null;
  if (!isOnboardingDone()) return null;
  if (storyMode || storyEraIntroActive) return null;

  const hasResumable = resumableRow !== null;
  const hasStreak = streak > 0;
  const hasChallenge = challengeSummary !== null;

  if (!hasResumable && !hasStreak && !hasChallenge) return null;

  return (
    <div className="shrink-0 border-b border-chrome-border/40 bg-background/90 backdrop-blur-sm pointer-events-auto">
      <div className="flex items-center gap-3 px-4 py-1.5 sm:px-5 overflow-x-auto scrollbar-none">
        {/* Continue story */}
        {hasResumable && (
          <button
            type="button"
            onClick={handleContinue}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-chrome-border bg-chrome-fill px-2.5 py-1 text-[11px] font-semibold text-text-muted transition-colors duration-200 hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment"
            aria-label={`${t('retention.continue', locale)} ${rowTitle}`}
          >
            <Play className="h-3 w-3 shrink-0 text-gold/70" strokeWidth={2.5} fill="currentColor" aria-hidden />
            <span className="max-w-[14rem] truncate">
              {t('retention.continue', locale)}: {rowTitle}
            </span>
          </button>
        )}

        <div className="min-w-0 flex-1" />

        {/* Streak */}
        {hasStreak && (
          <Link
            href="/profile"
            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-text-dim transition-colors hover:bg-chrome-fill hover:text-ember/90"
          >
            <Flame className="h-3 w-3 text-ember/70" strokeWidth={2} aria-hidden />
            <span className="tabular-nums">
              {t('retention.streakDays', locale).replace('{n}', String(streak))}
            </span>
          </Link>
        )}

        {/* Weekly challenge */}
        {hasChallenge && (
          <Link
            href="/profile"
            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-text-dim transition-colors hover:bg-chrome-fill hover:text-gold/80"
          >
            <Trophy className="h-3 w-3 text-gold/60" strokeWidth={2} aria-hidden />
            <span className="tabular-nums">
              {t('retention.challengeProgress', locale)
                .replace('{done}', String(challengeSummary!.done))
                .replace('{total}', String(challengeSummary!.total))}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
});

export default AtlasRetentionStrip;
