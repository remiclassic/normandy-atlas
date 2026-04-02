'use client';

import { memo, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '@/hooks/use-atlas';
import { useProgress, useLedgerStats, useInferredRole, type AtlasRole } from '@/hooks/useAtlasProgress';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import type { UiStringKey } from '@/lib/ui-strings';
import { atlasMilestones, type MilestoneDef, type MilestoneCategory } from '@/data/atlas/milestones';
import { atlasExpeditions, type ExpeditionDef } from '@/data/atlas/expeditions';
import {
  exportProgressJSON,
  importProgressJSON,
  resetProgress,
} from '@/lib/progress';
import { notifyProgressListeners } from '@/hooks/useAtlasProgress';
import type { AtlasLocale } from '@/core/types';
import CuratorPickBanner from './CuratorPickBanner';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ROLE_STRING_KEYS: Record<AtlasRole, UiStringKey> = {
  explorer: 'ledger.role.explorer',
  historian: 'ledger.role.historian',
  cartographer: 'ledger.role.cartographer',
  chronicler: 'ledger.role.chronicler',
};

const CATEGORY_LABELS: Record<MilestoneCategory, { en: string; fr: string }> = {
  itinerary: { en: 'Itinerary', fr: 'Itinéraire' },
  chronology: { en: 'Chronology', fr: 'Chronologie' },
  people: { en: 'People & Stories', fr: 'Personnes & Récits' },
  evidence: { en: 'Evidence', fr: 'Preuves' },
  cartography: { en: 'Cartography', fr: 'Cartographie' },
};

function StatRow({ label, current, total }: { label: string; current: number; total: number }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[12px] text-text-muted">{label}</span>
      <span className="text-[13px] font-semibold text-parchment tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}

function TierBadge({ tier }: { tier: number }) {
  const labels = ['I', 'II', 'III'];
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold border border-gold/20 text-gold/60 bg-gold/5">
      {labels[tier - 1] ?? tier}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const CoverageSection = memo(function CoverageSection({ locale }: { locale: AtlasLocale }) {
  const stats = useLedgerStats();
  const role = useInferredRole();
  const T = stats.coverageTotals;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50">
          {t('ledger.coverage', locale)}
        </h3>
        <span className="text-[10px] font-medium text-text-dim/70 italic">
          {t(ROLE_STRING_KEYS[role], locale)}
        </span>
      </div>
      <div className="space-y-0">
        <StatRow label={t('ledger.places', locale)} current={stats.places} total={T.places} />
        <StatRow label={t('ledger.regions', locale)} current={stats.regions} total={T.regions} />
        <StatRow label={t('ledger.journeys', locale)} current={stats.journeys} total={T.journeys} />
        <StatRow label={t('ledger.segments', locale)} current={stats.segments} total={T.segments} />
        <StatRow label={t('ledger.eras', locale)} current={stats.eras} total={T.eras} />
        <StatRow label={t('ledger.stories', locale)} current={stats.storiesCompleted} total={T.stories} />
      </div>
    </div>
  );
});

const MilestonesSection = memo(function MilestonesSection({ locale }: { locale: AtlasLocale }) {
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
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">
        {t('ledger.milestones', locale)}
      </h3>
      <div className="space-y-4">
        {(Object.keys(grouped) as MilestoneCategory[]).map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-text-dim/50 mb-1.5">
                {pickI18n(CATEGORY_LABELS[cat], locale)}
              </p>
              <div className="space-y-1.5">
                {items.map(({ def, unlocked }) => (
                  <div
                    key={def.id}
                    className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
                      unlocked ? 'bg-gold/5' : 'opacity-50'
                    }`}
                  >
                    <TierBadge tier={def.tier} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-[12px] font-medium leading-snug ${unlocked ? 'text-parchment' : 'text-text-dim'}`}>
                        {pickI18n(def.title, locale)}
                      </p>
                      <p className="text-[11px] text-text-dim/70 leading-snug mt-0.5">
                        {pickI18n(def.description, locale)}
                      </p>
                    </div>
                    {unlocked && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5 text-gold/60">
                        <path d="M3 7.5l2.5 2.5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const ExpeditionsSection = memo(function ExpeditionsSection({ locale }: { locale: AtlasLocale }) {
  const progress = useProgress();

  const expeditionStatus = useMemo(() => {
    return atlasExpeditions.map((exp) => {
      const completed = exp.steps.filter((s) => {
        if (s.entityKind === 'story') return progress.story[s.entityId]?.completed;
        const bucket = s.entityKind === 'place' || s.entityKind === 'viking-adna-site' || s.entityKind === 'viking-archaeology-site' ? 'places'
          : s.entityKind === 'region' ? 'regions'
          : 'journeys';
        return s.entityId in progress.aggregates[bucket];
      }).length;
      return { exp, completed, total: exp.steps.length };
    });
  }, [progress]);

  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">
        {t('ledger.expeditions', locale)}
      </h3>
      <div className="space-y-3">
        {expeditionStatus.map(({ exp, completed, total }) => {
          const pct = Math.round((completed / total) * 100);
          const done = completed === total;
          return (
            <div key={exp.id} className="rounded-lg border border-chrome-border px-3 py-2.5">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-[12px] font-medium text-parchment leading-snug">
                  {pickI18n(exp.title, locale)}
                </p>
                <span className={`text-[10px] font-semibold shrink-0 ${done ? 'text-gold/70' : 'text-text-dim/60'}`}>
                  {completed}/{total}
                </span>
              </div>
              <div className="h-[3px] rounded-full bg-chrome-shade-strong overflow-hidden">
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
                      : step.entityId in progress.aggregates[
                          step.entityKind === 'place' || step.entityKind === 'viking-adna-site' || step.entityKind === 'viking-archaeology-site' ? 'places'
                            : step.entityKind === 'region' ? 'regions'
                            : 'journeys'
                        ];
                  return (
                    <div key={step.entityId} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${stepDone ? 'bg-gold/60' : 'bg-chrome-divider'}`} />
                      <span className={`text-[11px] leading-snug ${stepDone ? 'text-text-muted' : 'text-text-dim/50'}`}>
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

// ---------------------------------------------------------------------------
// Data management (export / import / reset)
// ---------------------------------------------------------------------------

const DataSection = memo(function DataSection({ locale }: { locale: AtlasLocale }) {
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

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const ok = importProgressJSON(reader.result);
        if (ok) notifyProgressListeners();
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

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button
        onClick={handleExport}
        className="text-[11px] text-text-dim hover:text-text-muted px-2.5 py-1.5 rounded-md hover:bg-chrome-fill-badge transition-colors"
      >
        {t('ledger.export', locale)}
      </button>
      <button
        onClick={handleImport}
        className="text-[11px] text-text-dim hover:text-text-muted px-2.5 py-1.5 rounded-md hover:bg-chrome-fill-badge transition-colors"
      >
        {t('ledger.import', locale)}
      </button>
      <button
        onClick={handleReset}
        className="text-[11px] text-red-400/70 hover:text-red-300 px-2.5 py-1.5 rounded-md hover:bg-red-400/8 transition-colors"
      >
        {t('ledger.reset', locale)}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------

function AtlasLedgerPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const stats = useLedgerStats();
  const isEmpty = stats.places === 0 && stats.storiesCompleted === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[71] w-[360px] max-w-[90vw] border-l border-chrome-border-strong bg-chrome-popover overflow-y-auto scrollbar-thin"
            style={{
              backdropFilter: 'blur(40px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-chrome-border sticky top-0 z-10 bg-chrome-popover/95 backdrop-blur-md">
              <div>
                <h2 className="font-display text-[15px] font-bold text-parchment tracking-wide">
                  {t('ledger.heading', locale)}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-6">
              {isEmpty ? (
                <p className="text-[13px] text-text-dim/60 leading-relaxed text-center py-8">
                  {t('ledger.empty', locale)}
                </p>
              ) : (
                <>
                  <CoverageSection locale={locale} />
                  <div className="h-px bg-chrome-divider" />
                  <MilestonesSection locale={locale} />
                  <div className="h-px bg-chrome-divider" />
                  <ExpeditionsSection locale={locale} />
                </>
              )}
              <div className="h-px bg-chrome-divider" />
              <CuratorPickBanner onNavigate={onClose} />
              <div className="h-px bg-chrome-divider" />
              <DataSection locale={locale} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(AtlasLedgerPanel);
