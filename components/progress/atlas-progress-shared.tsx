'use client';

import { memo, useCallback, useRef } from 'react';
import { Flame, Download, Upload, RotateCcw } from 'lucide-react';
import {
  useLedgerStats,
  useInferredRole,
  useGamificationStats,
  notifyProgressListeners,
  type AtlasRole,
} from '@/hooks/useAtlasProgress';
import { exportProgressJSON, importProgressJSON, resetProgress } from '@/lib/progress';
import { t, type UiStringKey } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';
import type { LedgerCoverageTotals } from '@/lib/atlas-ledger-totals';

// ---------------------------------------------------------------------------
// Role → i18n keys (shared by ledger panel and profile)
// ---------------------------------------------------------------------------

export const ATLAS_ROLE_LABEL_KEY: Record<AtlasRole, UiStringKey> = {
  explorer: 'ledger.role.explorer',
  historian: 'ledger.role.historian',
  cartographer: 'ledger.role.cartographer',
  chronicler: 'ledger.role.chronicler',
};

// ---------------------------------------------------------------------------
// Coverage visuals
// ---------------------------------------------------------------------------

export const LedgerStatRow = memo(function LedgerStatRow({
  label,
  current,
  total,
}: {
  label: string;
  current: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-text-muted">{label}</span>
        <span className="text-[13px] font-semibold text-parchment tabular-nums">
          {current}/{total}
        </span>
      </div>
      <div className="mt-1 h-[2px] overflow-hidden rounded-full bg-chrome-fill-active">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/40 to-gold/20 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});

export const LedgerStatPill = memo(function LedgerStatPill({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex flex-col items-center rounded-lg border border-chrome-border bg-chrome-fill px-4 py-3">
      <span className="text-[18px] font-bold tabular-nums text-parchment">
        {value}
        <span className="text-[13px] font-normal text-text-dim">/{total}</span>
      </span>
      <span className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted/60">{label}</span>
      <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-chrome-fill-active">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/40 to-gold/25 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});

/** Ledger drawer: coverage heading, optional streak line, stat rows. */
export const AtlasCoveragePanelSection = memo(function AtlasCoveragePanelSection({
  locale,
}: {
  locale: AtlasLocale;
}) {
  const stats = useLedgerStats();
  const role = useInferredRole();
  const gamStats = useGamificationStats();
  const T = stats.coverageTotals;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
          {t('ledger.coverage', locale)}
        </h3>
        <span className="text-[10px] font-medium italic text-text-dim/70">
          {t(ATLAS_ROLE_LABEL_KEY[role], locale)}
        </span>
      </div>

      {gamStats.streak.currentStreak > 0 && (
        <div className="mb-3 flex items-center gap-1.5 text-[11px] text-orange-400/70">
          <Flame className="h-3.5 w-3.5" strokeWidth={2} />
          <span className="font-medium">
            {t('streak.days', locale).replace('{n}', String(gamStats.streak.currentStreak))}
          </span>
        </div>
      )}

      <div className="space-y-0">
        <LedgerStatRow label={t('ledger.places', locale)} current={stats.places} total={T.places} />
        <LedgerStatRow label={t('ledger.regions', locale)} current={stats.regions} total={T.regions} />
        <LedgerStatRow label={t('ledger.journeys', locale)} current={stats.journeys} total={T.journeys} />
        <LedgerStatRow label={t('ledger.segments', locale)} current={stats.segments} total={T.segments} />
        <LedgerStatRow label={t('ledger.eras', locale)} current={stats.eras} total={T.eras} />
        <LedgerStatRow
          label={t('ledger.stories', locale)}
          current={stats.storiesCompleted}
          total={T.stories}
        />
      </div>
    </div>
  );
});

export type AtlasCoveragePillsSlice = {
  places: number;
  regions: number;
  journeys: number;
  segments: number;
  eras: number;
  storiesCompleted: number;
  coverageTotals: LedgerCoverageTotals;
};

/** Profile page: grid of coverage pills (same numbers as ledger rows). */
export const AtlasCoveragePillsGrid = memo(function AtlasCoveragePillsGrid({
  locale,
  stats,
  className = 'mb-10 grid grid-cols-3 gap-3 sm:grid-cols-6',
}: {
  locale: AtlasLocale;
  stats: AtlasCoveragePillsSlice;
  className?: string;
}) {
  const T = stats.coverageTotals;
  return (
    <section className={className}>
      <LedgerStatPill label={t('ledger.places', locale)} value={stats.places} total={T.places} />
      <LedgerStatPill label={t('ledger.regions', locale)} value={stats.regions} total={T.regions} />
      <LedgerStatPill label={t('ledger.journeys', locale)} value={stats.journeys} total={T.journeys} />
      <LedgerStatPill label={t('ledger.segments', locale)} value={stats.segments} total={T.segments} />
      <LedgerStatPill label={t('ledger.eras', locale)} value={stats.eras} total={T.eras} />
      <LedgerStatPill
        label={t('ledger.stories', locale)}
        value={stats.storiesCompleted}
        total={T.stories}
      />
    </section>
  );
});

// ---------------------------------------------------------------------------
// Export / import / reset (shared behavior, two chrome styles)
// ---------------------------------------------------------------------------

export type ProgressDataActionsVariant = 'panel' | 'page';

export const ProgressDataActions = memo(function ProgressDataActions({
  locale,
  variant,
}: {
  locale: AtlasLocale;
  variant: ProgressDataActionsVariant;
}) {
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
      if (typeof reader.result === 'string' && importProgressJSON(reader.result)) {
        notifyProgressListeners();
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handleReset = useCallback(() => {
    if (!confirm(t('ledger.reset.confirm', locale))) return;
    resetProgress();
    notifyProgressListeners();
  }, [locale]);

  if (variant === 'panel') {
    return (
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleExport}
          className="rounded-md px-2.5 py-1.5 text-[11px] text-text-dim transition-colors hover:bg-chrome-fill-badge hover:text-text-muted"
        >
          {t('ledger.export', locale)}
        </button>
        <button
          type="button"
          onClick={handleImport}
          className="rounded-md px-2.5 py-1.5 text-[11px] text-text-dim transition-colors hover:bg-chrome-fill-badge hover:text-text-muted"
        >
          {t('ledger.import', locale)}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md px-2.5 py-1.5 text-[11px] text-red-400/70 transition-colors hover:bg-red-400/8 hover:text-red-300"
        >
          {t('ledger.reset', locale)}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>
    );
  }

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
