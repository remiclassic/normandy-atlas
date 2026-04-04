'use client';

import { memo, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Upload, RotateCcw, Flame, Trophy } from 'lucide-react';
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
import { exportProgressJSON, importProgressJSON, resetProgress } from '@/lib/progress';
import { evaluateChallengeProgress, readProgress } from '@/lib/progress';
import { atlasChallenges } from '@/data/atlas/challenges';
import { notifyProgressListeners } from '@/hooks/useAtlasProgress';
import { pickI18n } from '@/lib/locale';
import { t, type UiStringKey } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';
import ProfileAchievementsGrid from '@/components/profile/ProfileAchievementsGrid';

// ---------------------------------------------------------------------------
// Role display
// ---------------------------------------------------------------------------

const ROLE_LABEL_KEY: Record<AtlasRole, UiStringKey> = {
  explorer: 'ledger.role.explorer',
  historian: 'ledger.role.historian',
  cartographer: 'ledger.role.cartographer',
  chronicler: 'ledger.role.chronicler',
};

const ROLE_COPY: Record<AtlasRole, { en: string; fr: string }> = {
  explorer: {
    en: 'You learn by opening the map and following curiosity wherever it leads.',
    fr: 'Vous apprenez en ouvrant la carte et en suivant votre curiosité.',
  },
  historian: {
    en: 'You linger on detail panels, absorbing context and primary sources.',
    fr: 'Vous prenez le temps de lire les panneaux et d\'absorber les sources.',
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
// Compact stat pill
// ---------------------------------------------------------------------------

const StatPill = memo(function StatPill({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex flex-col items-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <span className="text-[18px] font-bold tabular-nums text-parchment">
        {value}<span className="text-[13px] font-normal text-text-dim">/{total}</span>
      </span>
      <span className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted/60">{label}</span>
      <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/40 to-gold/25 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Streak + Rank badges
// ---------------------------------------------------------------------------

const StreakBadge = memo(function StreakBadge({ current, best, locale }: { current: number; best: number; locale: AtlasLocale }) {
  if (current === 0 && best === 0) return null;
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <Flame className="h-4 w-4 text-orange-400/70" strokeWidth={2} />
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
      <div className="rounded-lg border border-white/[0.04] bg-white/[0.015] px-4 py-3 text-center">
        <p className="text-[11px] text-text-dim/50">{t('challenge.noCurrent', locale)}</p>
      </div>
    );
  }

  const { def, objectiveProgress, completed } = challengeData;

  return (
    <div className="rounded-lg border border-gold/10 bg-gold/[0.02] px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
          {t('challenge.heading', locale)}
        </p>
        {completed && (
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase text-gold/80">
            {t('challenge.completed', locale)}
          </span>
        )}
      </div>
      <p className="text-[13px] font-medium text-parchment mb-1">{pickI18n(def.title, locale)}</p>
      <p className="text-[11px] text-text-muted/70 mb-3">{pickI18n(def.description, locale)}</p>
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
                <span className={`tabular-nums font-medium ${met ? 'text-gold/70' : 'text-text-muted'}`}>
                  {Math.min(current, obj.target)}/{obj.target}
                </span>
              </div>
              <div className="mt-0.5 h-[3px] overflow-hidden rounded-full bg-white/[0.04]">
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
// Data management buttons
// ---------------------------------------------------------------------------

const DataActions = memo(function DataActions({ locale }: { locale: AtlasLocale }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    const blob = new Blob([exportProgressJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'norman-atlas-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileSelected = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (importProgressJSON(reader.result)) notifyProgressListeners();
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handleReset = useCallback(() => {
    const msg = t('ledger.reset.confirm', locale);
    if (window.confirm(msg)) {
      resetProgress();
      notifyProgressListeners();
    }
  }, [locale]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={onFileSelected} />
      <button
        type="button"
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 rounded-lg border border-chrome-border px-3 py-1.5 text-[11px] font-medium text-text-muted transition-colors hover:bg-chrome-fill hover:text-parchment"
      >
        <Download className="h-3 w-3" strokeWidth={1.5} />
        {t('ledger.export', locale)}
      </button>
      <button
        type="button"
        onClick={handleImport}
        className="inline-flex items-center gap-1.5 rounded-lg border border-chrome-border px-3 py-1.5 text-[11px] font-medium text-text-muted transition-colors hover:bg-chrome-fill hover:text-parchment"
      >
        <Upload className="h-3 w-3" strokeWidth={1.5} />
        {t('ledger.import', locale)}
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-[11px] font-medium text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <RotateCcw className="h-3 w-3" strokeWidth={1.5} />
        {t('ledger.reset', locale)}
      </button>
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
  const T = stats.coverageTotals;

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
      {/* Top bar */}
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
            {locale === 'fr' ? 'Retour à la carte' : 'Back to map'}
          </Link>
          <div className="flex-1" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-dim/50">
            {locale === 'fr' ? 'Profil du voyageur' : 'Traveller Profile'}
          </span>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {/* Hero: role + rank + streak */}
          <section className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60 mb-1">
              {t(ROLE_LABEL_KEY[displayRole], locale)}
            </p>
            <h1
              className="font-display text-[24px] font-bold tracking-tight sm:text-[28px]"
              style={{ color: 'var(--color-parchment)' }}
            >
              {locale === 'fr' ? 'Votre parcours' : 'Your Journey'}
            </h1>
            <p className="mt-1 text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {pickI18n(ROLE_COPY[displayRole], locale)}
            </p>

            {/* Rank + Streak row */}
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

          {/* Stats row with coverage bars */}
          <section className="mb-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
            <StatPill label={t('ledger.places', locale)} value={displayStats.places} total={T.places} />
            <StatPill label={t('ledger.regions', locale)} value={displayStats.regions} total={T.regions} />
            <StatPill label={t('ledger.journeys', locale)} value={displayStats.journeys} total={T.journeys} />
            <StatPill label={t('ledger.segments', locale)} value={displayStats.segments} total={T.segments} />
            <StatPill label={t('ledger.eras', locale)} value={displayStats.eras} total={T.eras} />
            <StatPill label={t('ledger.stories', locale)} value={displayStats.storiesCompleted} total={T.stories} />
          </section>

          {/* Weekly Challenge */}
          {mounted && (
            <section className="mb-10">
              <ChallengeCard locale={locale} />
            </section>
          )}

          {/* Achievements grid */}
          <section className="mb-10">
            <h2
              className="mb-5 font-display text-[18px] font-semibold"
              style={{ color: 'var(--color-parchment)' }}
            >
              {t('ledger.milestones', locale)}
            </h2>
            <ProfileAchievementsGrid locale={locale} />
          </section>

          {/* Data management */}
          <section className="border-t pt-6 pb-12" style={{ borderColor: 'var(--color-border)' }}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/50">
              {locale === 'fr' ? 'Données' : 'Data'}
            </p>
            <DataActions locale={locale} />
          </section>
        </div>
      </main>
    </div>
  );
}
