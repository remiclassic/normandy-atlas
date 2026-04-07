'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, Trophy } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import {
  useLedgerStats,
  useInferredRole,
  useAtlasRank,
  useGamificationStats,
  RANK_STRING_KEY,
  type AtlasRole,
} from '@/hooks/useAtlasProgress';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { evaluateChallengeProgress, readProgress } from '@/lib/progress';
import { atlasChallenges } from '@/data/atlas/challenges';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';
import ProfileAchievementsGrid from '@/components/profile/ProfileAchievementsGrid';
import AtlasProCard from '@/components/billing/AtlasProCard';
import {
  ATLAS_ROLE_LABEL_KEY,
  AtlasCoveragePillsGrid,
  ProgressDataActions,
} from '@/components/progress/atlas-progress-shared';

// ---------------------------------------------------------------------------
// Role flavour copy (profile hero only)
// ---------------------------------------------------------------------------

const ROLE_COPY: Record<AtlasRole, { en: string; fr: string }> = {
  explorer: {
    en: 'You learn by opening the map and following curiosity wherever it leads.',
    fr: 'Vous apprenez en ouvrant la carte et en suivant votre curiosité.',
  },
  historian: {
    en: 'You linger on detail panels, absorbing context and primary sources.',
    fr: "Vous prenez le temps de lire les panneaux et d'absorber les sources.",
  },
  cartographer: {
    en: 'Routes and journeys define your atlas experience.',
    fr: 'Les routes et voyages définissent votre expérience de l\'atlas.',
  },
  chronicler: {
    en: 'Stories are your compass — you follow narrative arcs across time.',
    fr: 'Les récits sont votre boussole — vous suivez les arcs narratifs.',
  },
};

// ---------------------------------------------------------------------------
// Streak + Rank badges
// ---------------------------------------------------------------------------

const StreakBadge = memo(function StreakBadge({
  current,
  best,
  locale,
}: {
  current: number;
  best: number;
  locale: AtlasLocale;
}) {
  if (current === 0 && best === 0) return null;
  return (
    <div className="flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill px-3 py-2">
      <Flame className="h-4 w-4 text-ember/80" strokeWidth={2} />
      <div>
        <p className="text-[13px] font-semibold tabular-nums text-parchment">
          {t('streak.days', locale).replace('{n}', String(current))}
        </p>
        {best > current && (
          <p className="text-[10px] text-text-dim/60">
            {t('streak.best', locale).replace('{n}', String(best))}
          </p>
        )}
      </div>
    </div>
  );
});

const RankBadge = memo(function RankBadge({ locale }: { locale: AtlasLocale }) {
  const { rank } = useAtlasRank();
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gold/10 bg-gold/[0.03] px-3 py-2">
      <Trophy className="h-4 w-4 text-gold/60" strokeWidth={2} />
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/50">
          {t('rank.label', locale)}
        </p>
        <p className="text-[13px] font-semibold text-parchment">
          {t(RANK_STRING_KEY[rank], locale)}
        </p>
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Challenge card
// ---------------------------------------------------------------------------

const ChallengeCard = memo(function ChallengeCard({ locale }: { locale: AtlasLocale }) {
  const gamStats = useGamificationStats();
  const active = gamStats.challenges.active;

  const challengeData = useMemo(() => {
    if (!active) return null;
    const def = atlasChallenges.find((c) => c.id === active.id);
    if (!def) return null;
    const progress = readProgress();
    const { objectiveProgress, completed } = evaluateChallengeProgress(progress);
    return { def, objectiveProgress, completed };
  }, [active]);

  if (!challengeData) {
    return (
      <div className="rounded-lg border border-chrome-border bg-chrome-fill px-4 py-3 text-center">
        <p className="text-[11px] text-text-dim/50">{t('challenge.noCurrent', locale)}</p>
      </div>
    );
  }

  const { def, objectiveProgress, completed } = challengeData;

  return (
    <div className="rounded-lg border border-gold/10 bg-gold/[0.02] px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
          {t('challenge.heading', locale)}
        </p>
        {completed && (
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase text-gold/80">
            {t('challenge.completed', locale)}
          </span>
        )}
      </div>
      <p className="mb-1 text-[13px] font-medium text-parchment">{pickI18n(def.title, locale)}</p>
      <p className="mb-3 text-[11px] text-text-muted/70">{pickI18n(def.description, locale)}</p>
      <div className="space-y-1.5">
        {def.objectives.map((obj) => {
          const current = objectiveProgress[obj.id] ?? 0;
          const met = current >= obj.target;
          const pct = Math.min(100, Math.round((current / obj.target) * 100));
          return (
            <div key={obj.id}>
              <div className="flex items-center justify-between text-[11px]">
                <span className={met ? 'text-gold/70' : 'text-text-dim/60'}>
                  {pickI18n(obj.label, locale)}
                </span>
                <span className={`font-medium tabular-nums ${met ? 'text-gold/70' : 'text-text-muted'}`}>
                  {Math.min(current, obj.target)}/{obj.target}
                </span>
              </div>
              <div className="mt-0.5 h-[3px] overflow-hidden rounded-full bg-chrome-fill-active">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${met ? 'bg-gold/50' : 'bg-gold/25'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProfilePage() {
  const locale = useLocale();
  const mounted = useHasMounted();
  const stats = useLedgerStats();
  const role = useInferredRole();
  const gamStats = useGamificationStats();

  const displayStats = mounted
    ? stats
    : {
        places: 0,
        regions: 0,
        journeys: 0,
        segments: 0,
        eras: 0,
        storiesCompleted: 0,
        milestonesUnlocked: 0,
        totalDwellMs: 0,
        coverageTotals: stats.coverageTotals,
      };
  const displayRole: AtlasRole = mounted ? role : 'explorer';

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: 'var(--color-background)' }}>
      <header
        className="shrink-0 border-b px-4 py-3 sm:px-6"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-chrome-fill)' }}
      >
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium text-text-muted transition-colors hover:bg-chrome-fill hover:text-parchment"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            {t('storyLibrary.backToMap', locale)}
          </Link>
          <div className="flex-1" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-dim/50">
            {t('profile.pageHeader', locale)}
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <section className="mb-8">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              {t(ATLAS_ROLE_LABEL_KEY[displayRole], locale)}
            </p>
            <h1
              className="font-display text-[24px] font-bold tracking-tight sm:text-[28px]"
              style={{ color: 'var(--color-parchment)' }}
            >
              {t('profile.journeyTitle', locale)}
            </h1>
            <p className="mt-1 text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {pickI18n(ROLE_COPY[displayRole], locale)}
            </p>

            {mounted && (
              <div className="mt-4 flex flex-wrap gap-3">
                <RankBadge locale={locale} />
                <StreakBadge
                  current={gamStats.streak.currentStreak}
                  best={gamStats.streak.longestStreak}
                  locale={locale}
                />
              </div>
            )}
          </section>

          <AtlasCoveragePillsGrid locale={locale} stats={displayStats} />

          <section className="mb-10">
            <AtlasProCard />
          </section>

          {mounted && (
            <section className="mb-10">
              <ChallengeCard locale={locale} />
            </section>
          )}

          <section className="mb-10">
            <h2
              className="mb-5 font-display text-[18px] font-semibold"
              style={{ color: 'var(--color-parchment)' }}
            >
              {t('ledger.milestones', locale)}
            </h2>
            <ProfileAchievementsGrid locale={locale} />
          </section>

          <section className="border-t pt-6 pb-12" style={{ borderColor: 'var(--color-border)' }}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/50">
              {t('profile.dataSection', locale)}
            </p>
            <ProgressDataActions locale={locale} variant="page" />
          </section>
        </div>
      </main>
    </div>
  );
}
