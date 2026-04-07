'use client';

import { useCallback, useMemo, useState } from 'react';
import { useMapStore } from '@/lib/store';
import { pickI18n } from '@/lib/locale';
import {
  compareRankedPresences,
  explainProvenance,
  getRankedPresencesForRegion,
  summarizePresenceDelta,
} from '@/core/peoples/engine';
import type { PresenceDeltaKind } from '@/core/peoples/engine';
import type { AtlasLocale } from '@/core/types';
import { historicalMacroRegionsGeoJson } from '@/data/atlas/historical-macro-regions/macro-regions-geo';
import { buildHistoricalPresenceCsv } from '@/lib/historical-presence-csv';
import { copyToClipboard } from '@/lib/progress/share';
import { t } from '@/lib/ui-strings';
import { useEntitlements } from '@/hooks/useEntitlements';
import { emitProGate } from '@/components/billing/ProGateHost';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">
      {children}
    </h3>
  );
}

function ConfidenceBadge({ level }: { level: string }) {
  const cls =
    level === 'high'
      ? 'border-emerald-500/40 text-emerald-400/90'
      : level === 'medium'
        ? 'border-amber-500/35 text-amber-400/85'
        : 'border-border text-text-dim';
  return (
    <span
      className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${cls}`}
    >
      {level}
    </span>
  );
}

function deltaLabel(kind: PresenceDeltaKind, locale: AtlasLocale): string {
  switch (kind) {
    case 'entered_top':
      return t('historicalPresence.delta.entered_top', locale);
    case 'left_top':
      return t('historicalPresence.delta.left_top', locale);
    case 'prominence_up':
      return t('historicalPresence.delta.prominence_up', locale);
    case 'prominence_down':
      return t('historicalPresence.delta.prominence_down', locale);
    default:
      return kind;
  }
}

export default function HistoricalMacroRegionDetail({ regionId }: { regionId: string }) {
  const locale = useMapStore((s) => s.locale);
  const year = useMapStore((s) => s.historicalPresenceYear);
  const view = useMapStore((s) => s.historicalPresenceView);
  const compareOn = useMapStore((s) => s.historicalPresenceCompareEnabled);
  const compareYear = useMapStore((s) => s.historicalPresenceCompareYear);
  const startStoryAct = useMapStore((s) => s.startStory);
  const [csvDone, setCsvDone] = useState(false);
  const { loading: entLoading, data: ent } = useEntitlements();

  const title = useMemo(() => {
    const f = historicalMacroRegionsGeoJson.features.find((x) => x.properties.id === regionId);
    return f?.properties.name ?? regionId;
  }, [regionId]);

  const ranked = useMemo(
    () => getRankedPresencesForRegion(year, regionId, { view }),
    [year, regionId, view],
  );

  const comparison = useMemo(() => {
    if (!compareOn) return null;
    return compareRankedPresences(year, compareYear, regionId, view);
  }, [compareOn, year, compareYear, regionId, view]);

  const deltaItems = useMemo(() => {
    if (!compareOn) return [];
    return summarizePresenceDelta(year, compareYear, regionId, view);
  }, [compareOn, year, compareYear, regionId, view]);

  const topWeightSum = useMemo(() => {
    const s = ranked.reduce((acc, r) => acc + r.presence.weight, 0);
    return s > 0 ? s : 1;
  }, [ranked]);

  const onCopyCsv = useCallback(async () => {
    if (entLoading) return;
    if (!ent?.macroCsvExport) {
      emitProGate('macro_csv');
      return;
    }
    const ok = await copyToClipboard(buildHistoricalPresenceCsv(year, view, locale));
    if (ok) {
      setCsvDone(true);
      window.setTimeout(() => setCsvDone(false), 2000);
    }
  }, [year, view, locale, entLoading, ent?.macroCsvExport]);

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/70 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
            Macro region · {year} CE
          </span>
          <span className="text-[10px] text-text-dim capitalize">{view}</span>
          <button
            type="button"
            onClick={() => void onCopyCsv()}
            className="ml-auto rounded-md border border-chrome-border/70 px-2 py-1 text-[10px] font-medium text-text-muted hover:border-gold/25"
          >
            {csvDone ? t('historicalPresence.copyCsvDone', locale) : t('historicalPresence.copyCsv', locale)}
          </button>
        </div>
        <h2 className="text-[26px] font-display font-bold text-parchment leading-tight tracking-[-0.01em]">
          {title}
        </h2>
        <p className="text-[12px] text-text-muted mt-2 leading-relaxed">
          Weights show relative prominence in this zone for the selected slice — not genetic percentages or exact borders.
        </p>
      </div>

      <div className="accent-line-gold mx-7" />

      <div className="px-7 py-5">
        <SectionLabel>Composition ({year} CE)</SectionLabel>
        {ranked.length === 0 ? (
          <p className="text-sm text-text-muted">No mapped groups for this view and year.</p>
        ) : (
          <div className="space-y-4">
            <div className="h-2.5 rounded-full overflow-hidden flex bg-chrome-fill">
              {ranked.slice(0, 6).map((r) => (
                <div
                  key={`${r.group.id}-${r.presence.startYear}`}
                  className="h-full"
                  style={{
                    width: `${(r.presence.weight / topWeightSum) * 100}%`,
                    backgroundColor: r.group.color,
                  }}
                  title={pickI18n(r.group.name, locale)}
                />
              ))}
            </div>
            <ul className="space-y-3">
              {ranked.slice(0, 8).map((r) => (
                <li key={`${r.group.id}-${r.presence.regionId}-${r.presence.startYear}`} className="border-b border-border/40 pb-3 last:border-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-medium text-text/90">{pickI18n(r.group.name, locale)}</p>
                      <p className="text-[11px] text-text-dim mt-0.5">{r.group.kind.replace(/-/g, ' ')}</p>
                    </div>
                    <ConfidenceBadge level={r.presence.confidence} />
                  </div>
                  <p className="text-[11px] text-gold/65 mt-1 tabular-nums">
                    Prominence weight {Math.round(r.presence.weight * 100)}%
                  </p>
                  <p className="text-[11px] text-text-muted mt-1 leading-snug">{explainProvenance(r.presence)}</p>
                  {r.presence.notes && (
                    <p className="text-[11px] text-text-muted/90 mt-1 italic">{r.presence.notes}</p>
                  )}
                  {r.group.storyArcIds?.length ? (
                    <button
                      type="button"
                      onClick={() => startStoryAct(r.group.storyArcIds![0])}
                      className="mt-2 text-[11px] font-medium text-gold/90 hover:text-gold border border-gold/20 rounded-md px-2 py-1"
                    >
                      Open story arc
                    </button>
                  ) : null}
                  {r.presence.sources?.length > 0 && (
                    <ul className="mt-2 space-y-1 text-[11px] text-text-dim">
                      {r.presence.sources.map((s) => (
                        <li key={s.id}>
                          {s.url ? (
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold/80 hover:text-gold hover:underline"
                            >
                              {s.title}
                            </a>
                          ) : (
                            s.title
                          )}
                          {s.note ? <span className="text-text-dim"> — {s.note}</span> : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {comparison && (
        <>
          <div className="divider-fade mx-7" />
          <div className="px-7 py-5">
            <SectionLabel>
              Compare {year} vs {compareYear}
            </SectionLabel>
            {deltaItems.length > 0 ? (
              <ul className="mb-4 space-y-2 text-[11px] text-text-muted">
                <li className="text-[10px] font-semibold uppercase tracking-wide text-gold/55">
                  {t('historicalPresence.compareChanges', locale)}
                </li>
                {deltaItems.map((d) => (
                  <li key={`${d.group.id}-${d.kind}`} className="leading-snug">
                    <span className="font-medium text-parchment/90">{pickI18n(d.group.name, locale)}</span>
                    <span className="text-text-dim"> — {deltaLabel(d.kind, locale)}</span>
                    {d.weightBefore != null && d.weightAfter != null ? (
                      <span className="tabular-nums text-text-dim">
                        {' '}
                        ({Math.round(d.weightBefore * 100)}% → {Math.round(d.weightAfter * 100)}%)
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <p className="text-gold/60 font-semibold mb-2">{year}</p>
                <ul className="space-y-1.5 text-text-muted">
                  {comparison.yearA.slice(0, 5).map((r) => (
                    <li key={r.group.id}>{pickI18n(r.group.name, locale)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-gold/60 font-semibold mb-2">{compareYear}</p>
                <ul className="space-y-1.5 text-text-muted">
                  {comparison.yearB.slice(0, 5).map((r) => (
                    <li key={r.group.id}>{pickI18n(r.group.name, locale)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
