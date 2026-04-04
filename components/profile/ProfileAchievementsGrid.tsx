'use client';

import { memo, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import { Check, Lock, HelpCircle } from 'lucide-react';
import { atlasMilestones, type MilestoneDef, type MilestoneCategory, type MilestoneTier } from '@/data/atlas/milestones';
import { milestoneMedia } from '@/data/atlas/milestone-media';
import { useProgress } from '@/hooks/useAtlasProgress';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';

// ---------------------------------------------------------------------------
// Video-game / Steam-style achievement list (horizontal rows, framed icons).
// ---------------------------------------------------------------------------

const TIER_LABELS: Record<MilestoneTier, string> = { 1: 'I', 2: 'II', 3: 'III' };

const TIER_ACCENT: Record<MilestoneTier, string> = {
  1: 'border-l-[var(--color-chrome-divider)]',
  2: 'border-l-[var(--color-gold)]/50',
  3: 'border-l-[var(--color-gold-bright)]',
};

const CATEGORY_ICON: Record<MilestoneCategory, string> = {
  chronology: '\u23F3',
  cartography: '\uD83D\uDDFA\uFE0F',
  itinerary: '\u2693',
  people: '\uD83D\uDCDC',
  evidence: '\uD83D\uDD0D',
};

const CATEGORY_LABELS: Record<MilestoneCategory, { en: string; fr: string }> = {
  itinerary: { en: 'Itinerary', fr: 'Itinéraire' },
  chronology: { en: 'Chronology', fr: 'Chronologie' },
  people: { en: 'People & Stories', fr: 'Personnes & Récits' },
  evidence: { en: 'Evidence', fr: 'Preuves' },
  cartography: { en: 'Cartography', fr: 'Cartographie' },
};

const CATEGORY_ORDER: MilestoneCategory[] = ['chronology', 'cartography', 'itinerary', 'people', 'evidence'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface GroupedMilestone {
  def: MilestoneDef;
  unlocked: boolean;
  unlockedAt: number | null;
}

function groupByCategory(milestones: Record<string, { unlockedAt: number }>): Record<MilestoneCategory, GroupedMilestone[]> {
  const groups: Record<MilestoneCategory, GroupedMilestone[]> = {
    chronology: [],
    cartography: [],
    itinerary: [],
    people: [],
    evidence: [],
  };
  for (const def of atlasMilestones) {
    const record = milestones[def.id];
    groups[def.category].push({
      def,
      unlocked: !!record,
      unlockedAt: record?.unlockedAt ?? null,
    });
  }
  return groups;
}

function achievementIconFrameClass(unlocked: boolean): string {
  return [
    'relative shrink-0 overflow-hidden rounded-sm',
    'border-2 border-[var(--color-border-bright)]',
    'bg-[linear-gradient(165deg,#252016_0%,#120f0c_45%,#0a0908_100%)]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_24px_rgba(0,0,0,0.45)]',
    unlocked ? 'ring-1 ring-[var(--color-gold)]/25' : 'opacity-95',
  ].join(' ');
}

// ---------------------------------------------------------------------------
// Row — CK3 / Steam-style horizontal achievement
// ---------------------------------------------------------------------------

const AchievementRow = memo(function AchievementRow({
  item,
  locale,
}: {
  item: GroupedMilestone;
  locale: AtlasLocale;
}) {
  const { def, unlocked } = item;
  const isSecret = def.reveal === 'secret' && !unlocked;
  const media = milestoneMedia[def.id];
  const [imgFailed, setImgFailed] = useState(false);
  const onImgError = useCallback(() => setImgFailed(true), []);

  const showArt = media && !imgFailed && !isSecret;
  const tierHint = t('profile.achievement.tier', locale).replace('{tier}', TIER_LABELS[def.tier]);
  const displayTitle = isSecret ? t('milestone.hidden.title', locale) : pickI18n(def.title, locale);
  const displayDesc = isSecret ? t('milestone.hidden.description', locale) : pickI18n(def.description, locale);

  return (
    <div
      role="listitem"
      className={[
        'group flex min-h-[4.5rem] items-center gap-3 border-b border-[var(--color-border)] px-2 py-2.5 sm:gap-4 sm:px-3 sm:py-3',
        'border-l-[3px] transition-[background,box-shadow] duration-200',
        TIER_ACCENT[def.tier],
        unlocked
          ? 'bg-[linear-gradient(90deg,rgba(196,169,98,0.07)_0%,rgba(19,22,31,0.92)_18%,rgba(13,15,22,0.72)_100%)] hover:bg-[linear-gradient(90deg,rgba(196,169,98,0.11)_0%,rgba(19,22,31,0.95)_18%,rgba(13,15,22,0.82)_100%)]'
          : 'bg-[var(--color-background)]/60 hover:bg-[var(--color-surface)]/85',
      ].join(' ')}
    >
      {/* Primary icon — square “achievement tile” */}
      <div className={`${achievementIconFrameClass(unlocked)} h-14 w-14 sm:h-16 sm:w-16`}>
        {showArt ? (
          <Image
            src={media.src}
            alt={media.alt ?? pickI18n(def.title, locale)}
            fill
            sizes="64px"
            className={`object-cover transition-all duration-300 ${
              unlocked ? 'opacity-100 saturate-100' : 'opacity-35 grayscale contrast-125 brightness-75'
            }`}
            onError={onImgError}
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center text-[1.35rem] leading-none select-none ${
              isSecret ? 'opacity-20' : unlocked ? 'opacity-90 drop-shadow-[0_0_8px_rgba(196,169,98,0.35)]' : 'opacity-25 grayscale'
            }`}
          >
            {isSecret ? <HelpCircle className="h-5 w-5 text-white/30" /> : CATEGORY_ICON[def.category]}
          </div>
        )}
        {!unlocked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
            <Lock className="h-4 w-4 text-white/45" strokeWidth={2} aria-hidden />
          </div>
        )}
        <span
          className={`pointer-events-none absolute bottom-0.5 right-0.5 rounded px-0.5 text-[8px] font-bold leading-none tabular-nums ${
            unlocked ? 'bg-black/55 text-[var(--color-gold-bright)]' : 'bg-black/50 text-white/35'
          }`}
        >
          {TIER_LABELS[def.tier]}
        </span>
      </div>

      {/* Title + description */}
      <div className="min-w-0 flex-1 py-0.5">
        <p
          className={`font-sans text-[13px] font-bold leading-tight tracking-tight sm:text-[14px] ${
            isSecret ? 'text-[var(--color-text-dim)]/40 italic' : unlocked ? 'text-[var(--color-blue-bright)] [data-ui-theme=light]:text-[var(--color-blue)]' : 'text-[var(--color-text-dim)]'
          }`}
        >
          {displayTitle}
        </p>
        <p className={`mt-1 font-sans text-[11px] leading-snug sm:text-[12px] ${isSecret ? 'text-[var(--color-text-dim)]/30 italic' : 'text-[var(--color-text-muted)]'}`}>
          {displayDesc}
        </p>
        <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]/80">
          {tierHint}
        </p>
      </div>

      {/* Progress % — binary milestones: 0% / 100% */}
      <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
        <span
          className={`font-sans text-[13px] font-semibold tabular-nums sm:text-[14px] ${
            unlocked ? 'text-[var(--color-blue-bright)] [data-ui-theme=light]:text-[var(--color-blue)]' : 'text-[var(--color-text-dim)]/70'
          }`}
        >
          {unlocked ? '100%' : isSecret ? '\u2014' : '0%'}
        </span>

        {/* Duplicate mini tile */}
        <div
          className={`${achievementIconFrameClass(unlocked)} relative h-9 w-9 sm:h-10 sm:w-10 ${
            unlocked ? '' : 'opacity-60'
          }`}
          aria-hidden
        >
          {showArt ? (
            <Image
              src={media.src}
              alt=""
              fill
              sizes="40px"
              className={`object-cover ${unlocked ? '' : 'grayscale opacity-50'}`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm opacity-50 grayscale">
              {isSecret ? <HelpCircle className="h-4 w-4 text-white/20" /> : CATEGORY_ICON[def.category]}
            </div>
          )}
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--color-border-bright)] sm:h-10 sm:w-10 ${
            unlocked ? 'bg-[var(--color-gold)]/12 text-[var(--color-gold-bright)]' : 'bg-black/20 text-[var(--color-text-dim)]/50'
          }`}
        >
          {unlocked ? <Check className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.5} /> : <Lock className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />}
        </div>
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

function ProfileAchievementsGrid({ locale }: { locale: AtlasLocale }) {
  const mounted = useHasMounted();
  const progress = useProgress();
  const milestones = mounted ? progress.milestones : {};

  const grouped = useMemo(() => groupByCategory(milestones), [milestones]);

  const totalUnlocked = useMemo(() => Object.keys(milestones).length, [milestones]);
  const totalCount = atlasMilestones.length;
  const barPct = totalCount > 0 ? Math.round((totalUnlocked / totalCount) * 100) : 0;

  const summaryText = t('profile.achievements.unlockedCount', locale)
    .replace('{unlocked}', String(totalUnlocked))
    .replace('{total}', String(totalCount));

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-muted)]">
              {t('profile.achievements.summary', locale)}
            </p>
            <p className="mt-1 font-sans text-[12px] text-[var(--color-text-muted)]">{summaryText}</p>
          </div>
          <span className="font-sans text-[20px] font-bold tabular-nums text-[var(--color-blue-bright)] [data-ui-theme=light]:text-[var(--color-blue)] sm:text-[22px]">
            {barPct}%
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/35 ring-1 ring-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-muted)] via-[var(--color-gold)] to-[var(--color-gold-bright)] shadow-[0_0_12px_rgba(196,169,98,0.35)] transition-[width] duration-700 ease-out"
            style={{ width: `${barPct}%` }}
          />
        </div>
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = grouped[cat];
        if (items.length === 0) return null;
        return (
          <section key={cat} className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-chrome-popover)]/40 shadow-[var(--shadow-panel)]">
            <div className="border-b border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_100%)] px-3 py-2 sm:px-4">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]/85">
                {pickI18n(CATEGORY_LABELS[cat], locale)}
              </h3>
            </div>
            <div role="list" className="divide-y divide-[var(--color-border)]/80">
              {items.map((item) => (
                <AchievementRow key={item.def.id} item={item} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default memo(ProfileAchievementsGrid);
