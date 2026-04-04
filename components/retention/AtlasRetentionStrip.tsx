'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Flame, Trophy } from 'lucide-react';
import { useMapStore, isOnboardingDone } from '@/lib/store';
import { useProgress, useGamificationStats } from '@/hooks/useAtlasProgress';
import { evaluateChallengeProgress, readProgress } from '@/lib/progress';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

interface Props {
  storyLibraryOpen: boolean;
  /** Mobile touch-target variant */
  compact?: boolean;
}

const AtlasHeaderRetentionChips = memo(function AtlasHeaderRetentionChips({
  storyLibraryOpen,
  compact = false,
}: Props) {
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => { setClientReady(true); }, []);

  const locale = useLocale();
  const progress = useProgress();
  const gamStats = useGamificationStats();
  const storyMode = useMapStore((s) => s.storyMode);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);

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

  if (!clientReady || !isOnboardingDone()) return null;
  if (storyMode || storyEraIntroActive || storyLibraryOpen) return null;

  const hasStreak = streak > 0;
  const hasChallenge = challengeSummary !== null;
  if (!hasStreak && !hasChallenge) return null;

  const streakLabel = t('retention.streakDays', locale).replace('{n}', String(streak));
  const challengeLabel = hasChallenge
    ? t('retention.challengeProgress', locale)
        .replace('{done}', String(challengeSummary!.done))
        .replace('{total}', String(challengeSummary!.total))
    : '';

  if (compact) {
    return (
      <>
        {hasStreak && (
          <Link
            href="/profile"
            className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium tabular-nums text-ember/70 transition-colors hover:bg-chrome-fill hover:text-ember/90 touch-target"
            aria-label={streakLabel}
          >
            <Flame className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{streakLabel}</span>
          </Link>
        )}
        {hasChallenge && (
          <Link
            href="/profile"
            className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium tabular-nums text-gold/60 transition-colors hover:bg-chrome-fill hover:text-gold/80 touch-target"
            aria-label={challengeLabel}
          >
            <Trophy className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{challengeLabel}</span>
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      {hasStreak && (
        <ChromeIconTooltip label={streakLabel}>
          <Link
            href="/profile"
            className="flex h-5 shrink-0 items-center gap-1 rounded px-1 text-[10px] font-medium tabular-nums text-ember/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-ember/90"
            aria-label={streakLabel}
          >
            <Flame className="h-[13px] w-[13px]" strokeWidth={2} aria-hidden />
            <span>{streakLabel}</span>
          </Link>
        </ChromeIconTooltip>
      )}
      {hasChallenge && (
        <ChromeIconTooltip label={challengeLabel}>
          <Link
            href="/profile"
            className="flex h-5 shrink-0 items-center gap-1 rounded px-1 text-[10px] font-medium tabular-nums text-gold/60 transition-colors duration-200 hover:bg-chrome-fill hover:text-gold/80"
            aria-label={challengeLabel}
          >
            <Trophy className="h-[13px] w-[13px]" strokeWidth={2} aria-hidden />
            <span>{challengeLabel}</span>
          </Link>
        </ChromeIconTooltip>
      )}
    </>
  );
});

export default AtlasHeaderRetentionChips;
