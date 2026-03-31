'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { pickI18n } from '@/lib/locale';
import { useIsMobile } from '@/hooks/use-responsive';
import BottomSheet from '@/components/ui/BottomSheet';
import {
  isMigrationEra,
  resolveDataset,
  listCohortsForEra,
  listBranchesForEra,
  getSharesForMode,
} from '@/core';
import type { CohortOption } from '@/core/migration/engine';
import { MIGRATION_COHORT_LABELS } from '@/data/atlas/migration-datasets';
import type {
  MigrationMapMode,
  MigrationBranchId,
  MigrationCohortId,
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

const ShareBar = memo(function ShareBar({ row, locale }: { row: MigrationShareRow; locale: import('@/core/types').AtlasLocale }) {
  if (row.kind === 'callout') {
    return (
      <div className="py-2 px-2 rounded-md border border-gold/15 bg-gold/[0.04] space-y-1">
        <div className="flex items-start gap-1.5 text-[11px] leading-snug text-text/88">
          <span className="shrink-0 mt-0.5 text-gold/70" aria-hidden>
            ◆
          </span>
          <span className="font-medium min-w-0">{pickI18n(row.label, locale)}</span>
        </div>
        {row.note && (
          <p className="text-[10px] leading-relaxed text-text-dim/75 pl-4">{pickI18n(row.note, locale)}</p>
        )}
      </div>
    );
  }

  const pct = row.percent ?? 0;
  return (
    <div className="group py-1.5">
      <div className="flex items-center justify-between gap-2 text-[11px] leading-tight mb-0.5">
        <span className="flex items-center gap-1.5 text-text/85 min-w-0 truncate">
          <ConfidenceDot level={row.confidence} />
          {pickI18n(row.label, locale)}
        </span>
        <span className="shrink-0 tabular-nums text-text-muted font-medium">
          {pct}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-chrome-divider overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gold/50"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      {row.note && (
        <p className="mt-0.5 text-[10px] leading-snug text-text-dim/70 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {pickI18n(row.note, locale)}
        </p>
      )}
    </div>
  );
});

const MethodologyDrawer = memo(function MethodologyDrawer({
  dataset,
  locale,
}: {
  dataset: MigrationDataset;
  locale: import('@/core/types').AtlasLocale;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-chrome-border">
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
                {pickI18n(dataset.metricDefinition.description, locale)}
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

const CohortSelect = memo(function CohortSelect({
  cohorts,
  value,
  onChange,
  locale,
}: {
  cohorts: CohortOption[];
  value: MigrationCohortId;
  onChange: (id: MigrationCohortId) => void;
  locale: import('@/core/types').AtlasLocale;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocMouse = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouse);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouse);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = useMemo(() => cohorts.find((c) => c.id === value), [cohorts, value]);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const pick = useCallback(
    (id: MigrationCohortId, available: boolean) => {
      if (!available) return;
      onChange(id);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id="migration-cohort-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="migration-cohort-listbox"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-chrome-border-strong bg-chrome-fill px-2.5 py-1.5 text-left text-[11px] text-text/80 outline-none transition-colors focus-visible:border-gold/30"
      >
        <span className="min-w-0 truncate">
          {current ? pickI18n(current.label, locale) : ''}
          {current && !current.available ? ' (no data)' : ''}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`shrink-0 text-text-dim/60 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="migration-cohort-listbox"
            role="listbox"
            aria-labelledby="migration-cohort-trigger"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-chrome-border bg-chrome-popover py-1 shadow-atlas-popover backdrop-blur-xl scrollbar-thin"
          >
            {cohorts.map((c) => {
              const selected = c.id === value;
              const disabled = !c.available;
              return (
                <li key={c.id} role="presentation" className="px-0.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    disabled={disabled}
                    onClick={() => pick(c.id, c.available)}
                    className={`w-full rounded px-2 py-1.5 text-left text-[11px] transition-colors ${
                      disabled
                        ? 'cursor-not-allowed text-text-dim/35'
                        : selected
                          ? 'bg-gold/20 text-parchment'
                          : 'text-text/85 hover:bg-chrome-fill-hover'
                    }`}
                  >
                    {pickI18n(c.label, locale)}
                    {c.available ? '' : ' (no data)'}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------

function MigrationExplorerContent({
  dataset,
  rows,
  mapMode,
  setMapMode,
  branches,
  branch,
  setBranch,
  cohorts,
  cohortId,
  setCohortId,
  locale,
  flowEnabled,
  setFlowEnabled,
}: {
  dataset: MigrationDataset | null | undefined;
  rows: MigrationShareRow[];
  mapMode: MigrationMapMode;
  setMapMode: (m: MigrationMapMode) => void;
  branches: MigrationBranchId[];
  branch: MigrationBranchId;
  setBranch: (b: MigrationBranchId) => void;
  cohorts: CohortOption[];
  cohortId: MigrationCohortId;
  setCohortId: (id: MigrationCohortId) => void;
  locale: import('@/core/types').AtlasLocale;
  flowEnabled: boolean;
  setFlowEnabled: (v: boolean) => void;
}) {
  return (
    <>
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-[13px] font-display font-bold text-parchment tracking-wide">
          Migration Patterns
        </h3>
        {dataset && (
          <span className="inline-flex items-center gap-1.5 mt-1 text-[10px] text-text-dim/70 bg-chrome-fill-badge px-2 py-0.5 rounded-md border border-chrome-border">
            {dataset.yearRange[0]}–{dataset.yearRange[1]}
          </span>
        )}
        <p className="mt-2.5 text-[11px] leading-relaxed text-text-dim/80">
          Shares show estimated regional contributions to immigrant cohorts. Norman and northwestern lines often stand out in French Canadian trees because Channel and Seine ports fed the colony and a small founder population amplified certain origins — not because every migrant was born where they boarded. The Channel Islands were part of the Norman cultural world but were not major documented embarkation harbours for New France; mainland French ports carried almost all structured traffic. Open Methodology for caveats.
        </p>
      </div>

      <div className="flex gap-1 px-4 pb-2">
        {MODE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMapMode(tab.id)}
            className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-medium transition-all duration-150 touch-target ${
              mapMode === tab.id
                ? 'bg-gold/20 text-parchment border border-gold/30'
                : 'bg-chrome-fill-badge text-text-dim border border-transparent hover:bg-chrome-fill-hover hover:text-text-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {branches.length > 1 && (
        <div className="flex gap-1 px-4 pb-2">
          {branches.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBranch(b)}
              className={`flex-1 py-1.5 px-2 rounded-md text-[10px] font-medium transition-all duration-150 touch-target ${
                branch === b
                  ? 'bg-blue/20 text-blue border border-blue/30'
                  : 'bg-chrome-fill-badge text-text-dim border border-transparent hover:bg-chrome-fill-hover'
              }`}
            >
              {BRANCH_LABELS[b]}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pb-2">
        <CohortSelect cohorts={cohorts} value={cohortId} onChange={setCohortId} locale={locale} />
      </div>

      <div className="h-px bg-chrome-divider mx-4" />

      <div className="px-4 py-2">
        {dataset ? (
          <>
            <span className="text-[9px] uppercase tracking-[0.12em] text-text-dim/60 font-semibold">
              {pickI18n(dataset.metricDefinition.label, locale)}
            </span>
            <div className="mt-1 space-y-0.5">
              {rows.map((row) => (
                <ShareBar key={row.entityId} row={row} locale={locale} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-[11px] text-text-dim/60 py-3 text-center">
            No data available for this combination.
          </p>
        )}
      </div>

      <div className="px-4 py-1.5 flex items-center justify-between">
        <span className="text-[11px] text-text-dim/80">Flow corridors</span>
        <button
          type="button"
          onClick={() => setFlowEnabled(!flowEnabled)}
          aria-pressed={flowEnabled}
          className="relative h-5 w-9 shrink-0 overflow-hidden rounded-full transition-colors duration-200 touch-target"
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: flowEnabled ? 'rgba(196,169,98,0.55)' : 'rgba(255,255,255,0.12)',
            background: flowEnabled ? 'rgba(196,169,98,0.3)' : 'rgba(255,255,255,0.05)',
          }}
        >
          <motion.span
            initial={false}
            animate={{ x: flowEnabled ? 16 : 2 }}
            transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-[3px] h-3 w-3 rounded-full shadow-sm ${
              flowEnabled ? 'bg-parchment' : 'bg-text-muted/35'
            }`}
          />
        </button>
      </div>

      {dataset && <MethodologyDrawer dataset={dataset} locale={locale} />}
    </>
  );
}

export default function MigrationExplorerPanel() {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const locale = useMapStore((s) => s.locale);
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
  const isMobile = useIsMobile();

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
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  if (!available) return null;

  const contentProps = {
    dataset, rows, mapMode, setMapMode, branches, branch, setBranch,
    cohorts, cohortId, setCohortId, locale, flowEnabled, setFlowEnabled,
  };

  return (
    <div className={`relative min-h-0 ${isMobile ? 'w-auto' : 'w-[310px]'}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-2 rounded-xl glass-panel-elevated px-3.5 py-2.5 text-[13px] transition-all duration-200 mb-2 touch-target ${
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

      {isMobile ? (
        <BottomSheet open={explorerOpen} onClose={handleClose} maxHeight="80dvh">
          <MigrationExplorerContent {...contentProps} />
        </BottomSheet>
      ) : (
        <AnimatePresence>
          {explorerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 z-30 mb-2 w-full max-h-[min(60vh,calc(100dvh-12rem))] overflow-y-auto rounded-2xl glass-panel-elevated scrollbar-thin"
            >
              <MigrationExplorerContent {...contentProps} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
