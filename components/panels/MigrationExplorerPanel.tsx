'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import {
  isMigrationEra,
  resolveDataset,
  listCohortsForEra,
  listBranchesForEra,
  getSharesForMode,
} from '@/core';
import { MIGRATION_COHORT_LABELS } from '@/data/atlas/migration-datasets';
import type {
  MigrationMapMode,
  MigrationBranchId,
  MigrationShareRow,
  MigrationDataset,
  StatConfidence,
} from '@/core/types';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const MODE_TABS: { id: MigrationMapMode; label: string }[] = [
  { id: 'origins', label: 'Origins' },
  { id: 'ports', label: 'Ports' },
  { id: 'colonies', label: 'Settlement' },
];

const BRANCH_LABELS: Record<MigrationBranchId, string> = {
  st_lawrence: 'St. Lawrence',
  acadia: 'Acadia',
};

const CONFIDENCE_STYLES: Record<StatConfidence, { dot: string; label: string }> = {
  high: { dot: 'bg-emerald-400/70', label: 'High' },
  medium: { dot: 'bg-amber-400/70', label: 'Med' },
  low: { dot: 'bg-red-400/50', label: 'Low' },
};

const ConfidenceDot = memo(function ConfidenceDot({ level }: { level: StatConfidence }) {
  const style = CONFIDENCE_STYLES[level];
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
      title={`Confidence: ${style.label}`}
    />
  );
});

const ShareBar = memo(function ShareBar({ row }: { row: MigrationShareRow }) {
  const pct = row.percent ?? 0;
  return (
    <div className="group py-1.5">
      <div className="flex items-center justify-between gap-2 text-[11px] leading-tight mb-0.5">
        <span className="flex items-center gap-1.5 text-text/85 min-w-0 truncate">
          <ConfidenceDot level={row.confidence} />
          {row.label.en}
        </span>
        <span className="shrink-0 tabular-nums text-text-muted font-medium">
          {pct}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gold/50"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      {row.note && (
        <p className="mt-0.5 text-[10px] leading-snug text-text-dim/70 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {row.note.en}
        </p>
      )}
    </div>
  );
});

const MethodologyDrawer = memo(function MethodologyDrawer({
  dataset,
}: {
  dataset: MigrationDataset;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/[0.06]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-semibold text-text-dim/70 hover:text-text-muted transition-colors"
      >
        <span>Methodology &amp; Sources</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-text-dim/50">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              <p className="text-[11px] leading-relaxed text-text/70">
                {dataset.metricDefinition.description.en}
              </p>

              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.12em] text-text-dim/60 font-semibold">
                  Confidence legend
                </span>
                <div className="flex gap-3 text-[10px] text-text-dim/70">
                  {(['high', 'medium', 'low'] as const).map((c) => (
                    <span key={c} className="flex items-center gap-1">
                      <ConfidenceDot level={c} />
                      {CONFIDENCE_STYLES[c].label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.12em] text-text-dim/60 font-semibold">
                  Sources
                </span>
                {dataset.sources.map((src, i) => (
                  <p key={i} className="text-[10px] text-text-dim/70 leading-snug">
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-text-muted transition-colors"
                      >
                        {src.shortCitation}
                      </a>
                    ) : (
                      src.shortCitation
                    )}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------

export default function MigrationExplorerPanel() {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const explorerOpen = useMapStore((s) => s.migrationExplorerOpen);
  const mapMode = useMapStore((s) => s.migrationMapMode);
  const branch = useMapStore((s) => s.migrationBranch);
  const cohortId = useMapStore((s) => s.migrationCohortId);
  const flowEnabled = useMapStore((s) => s.migrationFlowEnabled);
  const setOpen = useMapStore((s) => s.setMigrationExplorerOpen);
  const setMapMode = useMapStore((s) => s.setMigrationMapMode);
  const setBranch = useMapStore((s) => s.setMigrationBranch);
  const setCohortId = useMapStore((s) => s.setMigrationCohortId);
  const setFlowEnabled = useMapStore((s) => s.setMigrationFlowEnabled);

  const available = atlasMode && isMigrationEra(eraId);

  const cohorts = useMemo(() => listCohortsForEra(eraId), [eraId]);
  const branches = useMemo(
    () => listBranchesForEra(eraId, cohortId),
    [eraId, cohortId],
  );

  const dataset = useMemo(
    () => resolveDataset({ eraId, branch, cohortId }),
    [eraId, branch, cohortId],
  );

  const rows = useMemo(
    () => (dataset ? getSharesForMode(dataset, mapMode) : []),
    [dataset, mapMode],
  );

  const handleToggle = useCallback(() => setOpen(!explorerOpen), [setOpen, explorerOpen]);

  if (!available) return null;

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-2 rounded-xl glass-panel-elevated px-3.5 py-2.5 text-[13px] transition-all duration-200 mb-2 ${
          explorerOpen
            ? 'text-text border-gold/25 shadow-[0_0_0_1px_rgba(196,169,98,0.12)]'
            : 'text-text-muted hover:text-text hover:border-gold/20'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12C4 8 7 4 12 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="2" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
          <circle cx="12" cy="2" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
        Migration Explorer
      </button>

      {/* Panel */}
      <AnimatePresence>
        {explorerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="glass-panel-elevated rounded-2xl w-[310px] max-h-[calc(100vh-260px)] overflow-y-auto"
          >
            {/* Header */}
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-[13px] font-display font-bold text-parchment tracking-wide">
                Migration Patterns
              </h3>
              {dataset && (
                <span className="inline-flex items-center gap-1.5 mt-1 text-[10px] text-text-dim/70 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.06]">
                  {dataset.yearRange[0]}–{dataset.yearRange[1]}
                </span>
              )}
            </div>

            {/* Mode tabs */}
            <div className="flex gap-1 px-4 pb-2">
              {MODE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMapMode(tab.id)}
                  className={`flex-1 py-1 px-2 rounded-md text-[11px] font-medium transition-all duration-150 ${
                    mapMode === tab.id
                      ? 'bg-gold/20 text-parchment border border-gold/30'
                      : 'bg-white/[0.03] text-text-dim border border-transparent hover:bg-white/[0.06] hover:text-text-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Branch toggle */}
            {branches.length > 1 && (
              <div className="flex gap-1 px-4 pb-2">
                {branches.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBranch(b)}
                    className={`flex-1 py-1 px-2 rounded-md text-[10px] font-medium transition-all duration-150 ${
                      branch === b
                        ? 'bg-blue/20 text-blue border border-blue/30'
                        : 'bg-white/[0.03] text-text-dim border border-transparent hover:bg-white/[0.06]'
                    }`}
                  >
                    {BRANCH_LABELS[b]}
                  </button>
                ))}
              </div>
            )}

            {/* Cohort selector */}
            <div className="px-4 pb-2">
              <select
                value={cohortId}
                onChange={(e) => setCohortId(e.target.value as typeof cohortId)}
                className="w-full rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] text-text/80 px-2.5 py-1.5 outline-none focus:border-gold/30 transition-colors"
              >
                {cohorts.map((c) => (
                  <option key={c.id} value={c.id} disabled={!c.available}>
                    {c.label.en}{c.available ? '' : ' (no data)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] mx-4" />

            {/* Bar chart */}
            <div className="px-4 py-2">
              {dataset ? (
                <>
                  <span className="text-[9px] uppercase tracking-[0.12em] text-text-dim/60 font-semibold">
                    {dataset.metricDefinition.label.en}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {rows.map((row) => (
                      <ShareBar key={row.entityId} row={row} />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-[11px] text-text-dim/60 py-3 text-center">
                  No data available for this combination.
                </p>
              )}
            </div>

            {/* Flow toggle */}
            <div className="px-4 py-1.5 flex items-center justify-between">
              <span className="text-[11px] text-text-dim/80">Flow corridors</span>
              <button
                type="button"
                onClick={() => setFlowEnabled(!flowEnabled)}
                className="relative h-4 w-7 shrink-0 rounded-full transition-colors duration-200"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: flowEnabled ? 'rgba(196,169,98,0.55)' : 'rgba(255,255,255,0.12)',
                  background: flowEnabled ? 'rgba(196,169,98,0.3)' : 'rgba(255,255,255,0.05)',
                }}
              >
                <motion.span
                  animate={{ x: flowEnabled ? 16 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 h-2.5 w-2.5 rounded-full shadow-sm transition-colors duration-200 ${
                    flowEnabled ? 'bg-parchment' : 'bg-white/35'
                  }`}
                />
              </button>
            </div>

            {/* Methodology */}
            {dataset && <MethodologyDrawer dataset={dataset} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
