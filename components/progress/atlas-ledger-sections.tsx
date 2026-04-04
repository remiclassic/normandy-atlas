'use client';

import { memo, useMemo } from 'react';
import { useProgress } from '@/hooks/useAtlasProgress';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';
import { atlasMilestones, type MilestoneDef, type MilestoneCategory } from '@/data/atlas/milestones';
import { atlasExpeditions } from '@/data/atlas/expeditions';

const CATEGORY_LABELS: Record<MilestoneCategory, { en: string; fr: string }> = {
  itinerary: { en: 'Itinerary', fr: 'Itinéraire' },
  chronology: { en: 'Chronology', fr: 'Chronologie' },
  people: { en: 'People & Stories', fr: 'Personnes & Récits' },
  evidence: { en: 'Evidence', fr: 'Preuves' },
  cartography: { en: 'Cartography', fr: 'Cartographie' },
};

function TierBadge({ tier }: { tier: number }) {
  const labels = ['I', 'II', 'III'];
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-[9px] font-bold text-gold/60">
      {labels[tier - 1] ?? tier}
    </span>
  );
}

export const AtlasLedgerMilestonesSection = memo(function AtlasLedgerMilestonesSection({
  locale,
}: {
  locale: AtlasLocale;
}) {
  const progress = useProgress();
  const { milestones } = progress;

  const grouped = useMemo(() => {
    const map: Record<MilestoneCategory, { def: MilestoneDef; unlocked: boolean }[]> = {
      itinerary: [],
      chronology: [],
      people: [],
      evidence: [],
      cartography: [],
    };
    for (const def of atlasMilestones) {
      map[def.category].push({ def, unlocked: !!milestones[def.id] });
    }
    return map;
  }, [milestones]);

  return (
    <div>
      <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
        {t('ledger.milestones', locale)}
      </h3>
      <div className="space-y-4">
        {(Object.keys(grouped) as MilestoneCategory[]).map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-text-dim/50">
                {pickI18n(CATEGORY_LABELS[cat], locale)}
              </p>
              <div className="space-y-1.5">
                {items.map(({ def, unlocked }) => {
                  const isSecret = def.reveal === 'secret' && !unlocked;
                  const title = isSecret ? t('milestone.hidden.title', locale) : pickI18n(def.title, locale);
                  const desc = isSecret
                    ? t('milestone.hidden.description', locale)
                    : pickI18n(def.description, locale);
                  return (
                    <div
                      key={def.id}
                      className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
                        unlocked ? 'bg-gold/5' : 'opacity-50'
                      }`}
                    >
                      <TierBadge tier={def.tier} />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[12px] font-medium leading-snug ${
                            isSecret
                              ? 'italic text-text-dim/40'
                              : unlocked
                                ? 'text-parchment'
                                : 'text-text-dim'
                          }`}
                        >
                          {title}
                        </p>
                        <p
                          className={`mt-0.5 text-[11px] leading-snug ${
                            isSecret ? 'italic text-text-dim/30' : 'text-text-dim/70'
                          }`}
                        >
                          {desc}
                        </p>
                      </div>
                      {unlocked && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="mt-0.5 shrink-0 text-gold/60"
                        >
                          <path
                            d="M3 7.5l2.5 2.5L11 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export const AtlasLedgerExpeditionsSection = memo(function AtlasLedgerExpeditionsSection({
  locale,
}: {
  locale: AtlasLocale;
}) {
  const progress = useProgress();

  const expeditionStatus = useMemo(() => {
    return atlasExpeditions.map((exp) => {
      const completed = exp.steps.filter((s) => {
        if (s.entityKind === 'story') return progress.story[s.entityId]?.completed;
        const bucket =
          s.entityKind === 'place' ||
          s.entityKind === 'viking-adna-site' ||
          s.entityKind === 'viking-archaeology-site'
            ? 'places'
            : s.entityKind === 'region'
              ? 'regions'
              : 'journeys';
        return s.entityId in progress.aggregates[bucket];
      }).length;
      return { exp, completed, total: exp.steps.length };
    });
  }, [progress]);

  return (
    <div>
      <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
        {t('ledger.expeditions', locale)}
      </h3>
      <div className="space-y-3">
        {expeditionStatus.map(({ exp, completed, total }) => {
          const pct = Math.round((completed / total) * 100);
          const done = completed === total;
          return (
            <div key={exp.id} className="rounded-lg border border-chrome-border px-3 py-2.5">
              <div className="mb-1.5 flex items-start justify-between gap-2">
                <p className="text-[12px] font-medium leading-snug text-parchment">
                  {pickI18n(exp.title, locale)}
                </p>
                <span
                  className={`shrink-0 text-[10px] font-semibold ${done ? 'text-gold/70' : 'text-text-dim/60'}`}
                >
                  {completed}/{total}
                </span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-full bg-chrome-shade-strong">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold/50 to-gold/30 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 space-y-1">
                {exp.steps.map((step) => {
                  const stepDone =
                    step.entityKind === 'story'
                      ? progress.story[step.entityId]?.completed
                      : step.entityId in
                        progress.aggregates[
                          step.entityKind === 'place' ||
                          step.entityKind === 'viking-adna-site' ||
                          step.entityKind === 'viking-archaeology-site'
                            ? 'places'
                            : step.entityKind === 'region'
                              ? 'regions'
                              : 'journeys'
                        ];
                  return (
                    <div key={step.entityId} className="flex items-center gap-2">
                      <div
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${stepDone ? 'bg-gold/60' : 'bg-chrome-divider'}`}
                      />
                      <span
                        className={`text-[11px] leading-snug ${stepDone ? 'text-text-muted' : 'text-text-dim/50'}`}
                      >
                        {pickI18n(step.label, locale)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
