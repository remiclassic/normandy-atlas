'use client';

import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  REGIONAL_HAPLOGROUP_PIE_REGION_IDS,
  getRegionalHaplogroupSnapshotsForRegion,
  getAtlasRegion,
} from '@/core';
import { COTENTIN_NORMAN_Y_SNAPSHOT_ID } from '@/data/atlas/lineage';
import type { AtlasLocale, LineageType, RegionalHaplogroupEvidenceKind, RegionalHaplogroupSnapshot } from '@/core/types';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';

const CX = 100;
const CY = 100;
const R = 90;

function piePathsForSlices(
  slices: { pct: number; color?: string; label: string }[],
): { d: string; color: string; label: string; pct: number }[] {
  let angle = -Math.PI / 2;
  const out: { d: string; color: string; label: string; pct: number }[] = [];
  const paletteFallback = ['#4a90d9', '#4898e0', '#3cb870', '#c9a227', '#b565a7', '#6b7280'];
  let fi = 0;
  for (const s of slices) {
    const span = (s.pct / 100) * 2 * Math.PI;
    const end = angle + span;
    const large = span > Math.PI ? 1 : 0;
    const x1 = CX + R * Math.cos(angle);
    const y1 = CY + R * Math.sin(angle);
    const x2 = CX + R * Math.cos(end);
    const y2 = CY + R * Math.sin(end);
    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
    const color = s.color ?? paletteFallback[fi % paletteFallback.length];
    out.push({ d, color, label: s.label, pct: s.pct });
    fi += 1;
    angle = end;
  }
  return out;
}

function evidenceLabel(kind: RegionalHaplogroupEvidenceKind, locale: AtlasLocale): string {
  if (kind === 'ancient-dna-aggregated') return t('lineageExplorer.regionalPieEvidenceAncient', locale);
  if (kind === 'modern-cohort-proxy') return t('lineageExplorer.regionalPieEvidenceModern', locale);
  return t('lineageExplorer.regionalPieEvidenceSynthesis', locale);
}

function confidenceWord(c: RegionalHaplogroupSnapshot['confidence'], locale: AtlasLocale): string {
  if (locale === 'fr') {
    if (c === 'high') return 'élevée';
    if (c === 'medium') return 'moyenne';
    return 'faible';
  }
  if (c === 'high') return 'high';
  if (c === 'medium') return 'medium';
  return 'low';
}

type RegionalPanelListboxOption = { value: string; label: string };

/** Themed listbox — native select dropdowns ignore app theme on Windows. */
const RegionalPanelListbox = memo(function RegionalPanelListbox({
  value,
  onChange,
  options,
  triggerId,
  listboxId,
  className = '',
}: {
  value: string;
  onChange: (v: string) => void;
  options: RegionalPanelListboxOption[];
  triggerId: string;
  listboxId: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocMouse = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDocMouse);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouse);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const currentLabel = useMemo(() => options.find((o) => o.value === value)?.label ?? '', [options, value]);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const pick = useCallback(
    (v: string) => {
      onChange(v);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-chrome-border bg-chrome-fill-raised px-2 py-1.5 text-left text-[12px] text-parchment outline-none transition-colors focus-visible:border-gold/35 focus-visible:ring-1 focus-visible:ring-gold/25"
      >
        <span className="min-w-0 truncate">{currentLabel}</span>
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
        {open ? (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-labelledby={triggerId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-md border border-chrome-border-strong bg-chrome-popover py-1 shadow-atlas-popover backdrop-blur-xl scrollbar-thin"
          >
            {options.map((o) => {
              const selected = o.value === value;
              return (
                <li key={o.value} role="presentation" className="px-0.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => pick(o.value)}
                    className={`w-full rounded px-2 py-1.5 text-left text-[12px] transition-colors ${
                      selected
                        ? 'bg-gold/20 text-parchment'
                        : 'text-text-muted hover:bg-chrome-fill-hover hover:text-parchment'
                    }`}
                  >
                    {o.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

const LINEAGE_TYPE_OPTIONS: RegionalPanelListboxOption[] = [
  { value: 'paternal', label: 'Y-DNA' },
  { value: 'maternal', label: 'mtDNA' },
];

const RegionalHaplogroupPiePanel = memo(function RegionalHaplogroupPiePanel() {
  const locale = useLocale();
  const [regionId, setRegionId] = useState('new-france');
  const [lineageType, setLineageType] = useState<LineageType>('paternal');
  const [snapshotId, setSnapshotId] = useState<string | null>(null);

  const options = useMemo(
    () => getRegionalHaplogroupSnapshotsForRegion(regionId, lineageType),
    [regionId, lineageType],
  );

  const resolvedSnapshotId = useMemo(() => {
    if (options.length === 0) return null;
    if (snapshotId != null && options.some((o) => o.id === snapshotId)) return snapshotId;
    return options[0]!.id;
  }, [options, snapshotId]);

  const active = useMemo(
    () => (resolvedSnapshotId ? options.find((s) => s.id === resolvedSnapshotId) : undefined),
    [options, resolvedSnapshotId],
  );

  const paths = useMemo(() => (active ? piePathsForSlices(active.slices) : []), [active]);

  const regionOptions = useMemo(
    () =>
      REGIONAL_HAPLOGROUP_PIE_REGION_IDS.map((rid) => {
        const r = getAtlasRegion(rid);
        return { value: rid, label: r ? pickI18n(r.name, locale) : rid };
      }),
    [locale],
  );

  const windowOptions = useMemo(
    () =>
      [...options]
        .sort((a, b) => a.window.startYear - b.window.startYear)
        .map((o) => ({
          value: o.id,
          label: `${pickI18n(o.window.label, locale)} (${o.window.startYear}–${o.window.endYear})`,
        })),
    [options, locale],
  );

  const onRegionChange = useCallback((v: string) => {
    setRegionId(v);
    setSnapshotId(null);
  }, []);

  const onLineageChange = useCallback((v: string) => {
    setLineageType(v as LineageType);
    setSnapshotId(null);
  }, []);

  const regionLabel = useMemo(() => {
    const r = getAtlasRegion(regionId);
    return r ? pickI18n(r.name, locale) : regionId;
  }, [regionId, locale]);

  const ariaLabel =
    active && locale === 'fr'
      ? `Diagramme circulaire ${active.lineageType === 'paternal' ? 'ADN-Y' : 'ADNmt'} pour ${regionLabel}, ${pickI18n(active.window.label, locale)}`
      : active
        ? `Pie chart ${active.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'} for ${regionLabel}, ${pickI18n(active.window.label, locale)}`
        : undefined;

  return (
    <section
      className="mt-8 rounded-xl border border-chrome-border-strong/50 bg-chrome-fill/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5"
      aria-labelledby="regional-haplogroup-pie-heading"
    >
      <h2
        id="regional-haplogroup-pie-heading"
        className="font-display text-[length:var(--atlas-text-sm)] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)]"
      >
        {t('lineageExplorer.regionalPieSectionTitle', locale)}
      </h2>
      <p className="mt-2 text-[12px] leading-relaxed text-text-muted">
        {t('lineageExplorer.regionalPieIntro', locale)}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="regional-pie-region-trigger"
            className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim"
          >
            {t('lineageExplorer.regionalPieRegion', locale)}
          </label>
          <RegionalPanelListbox
            triggerId="regional-pie-region-trigger"
            listboxId="regional-pie-region-listbox"
            value={regionId}
            onChange={onRegionChange}
            options={regionOptions}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="regional-pie-lineage-trigger"
            className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim"
          >
            {t('lineageExplorer.regionalPieLineage', locale)}
          </label>
          <RegionalPanelListbox
            triggerId="regional-pie-lineage-trigger"
            listboxId="regional-pie-lineage-listbox"
            value={lineageType}
            onChange={onLineageChange}
            options={LINEAGE_TYPE_OPTIONS}
            className="mt-1 w-full"
          />
        </div>
      </div>

      {options.length > 1 ? (
        <div className="mt-3">
          <label
            htmlFor="regional-pie-window-trigger"
            className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim"
          >
            {t('lineageExplorer.regionalPieWindow', locale)}
          </label>
          <RegionalPanelListbox
            triggerId="regional-pie-window-trigger"
            listboxId="regional-pie-window-listbox"
            value={resolvedSnapshotId ?? ''}
            onChange={setSnapshotId}
            options={windowOptions}
            className="mt-1 w-full"
          />
        </div>
      ) : active ? (
        <p className="mt-3 text-[11px] text-text-dim">
          <span className="font-semibold uppercase tracking-[0.1em] text-text-muted">
            {t('lineageExplorer.regionalPieWindow', locale)}:{' '}
          </span>
          {pickI18n(active.window.label, locale)} ({active.window.startYear}–{active.window.endYear})
        </p>
      ) : null}

      {!active ? (
        <p className="mt-4 text-[13px] leading-relaxed text-text-dim">
          {t('lineageExplorer.regionalPieNoData', locale)}
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
            <svg
              width={200}
              height={200}
              viewBox="0 0 200 200"
              className="shrink-0"
              role="img"
              aria-label={ariaLabel}
            >
              <title>{ariaLabel}</title>
              {paths.map((p, i) => (
                <path key={`${p.label}-${i}`} d={p.d} fill={p.color} stroke="rgba(0,0,0,0.25)" strokeWidth={0.5} />
              ))}
            </svg>
            <ul className="min-w-0 flex-1 space-y-2 text-[12px]">
              {active.slices.map((s) => (
                <li key={s.label} className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ background: s.color ?? '#889098' }}
                    aria-hidden
                  />
                  <span className="font-medium text-parchment">{s.label}</span>
                  <span className="text-text-muted">{s.pct}%</span>
                  {s.lineageProfileId ? (
                    <Link
                      href={`/lineage-explorer/${encodeURIComponent(s.lineageProfileId)}`}
                      className="text-[11px] text-gold/80 underline decoration-gold/25 underline-offset-2 hover:text-gold"
                    >
                      {t('lineageExplorer.regionalPieProfileLink', locale)}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 space-y-2 rounded-lg border border-chrome-border/40 bg-chrome-fill/20 p-3 text-[11px] leading-relaxed text-text-muted">
            <p>
              <span className="font-semibold text-parchment/90">{evidenceLabel(active.evidenceKind, locale)}</span>
              {' · '}
              <span>
                {t('lineageExplorer.regionalPieConfidence', locale)}: {confidenceWord(active.confidence, locale)}
              </span>
              {active.sampleN != null ? (
                <>
                  {' · '}
                  {t('lineageExplorer.regionalPieSampleN', locale)}: {active.sampleN}
                </>
              ) : null}
            </p>
            <p>{pickI18n(active.methodologyNote, locale)}</p>
            {active.sources.length > 0 ? (
              <div>
                <p className="font-semibold text-text-dim">{t('lineageExplorer.regionalPieSources', locale)}</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  {active.sources.map((src) => (
                    <li key={src.id}>
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gold/85 underline decoration-gold/20 underline-offset-2 hover:text-gold"
                        >
                          {src.title}
                        </a>
                      ) : (
                        src.title
                      )}
                      {src.note ? <span className="text-text-dim"> — {src.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {active.id === COTENTIN_NORMAN_Y_SNAPSHOT_ID ? (
              <p className="mt-3 border-t border-chrome-border/35 pt-3">
                <Link
                  href="/lineage-explorer/norman-y-dna"
                  className="text-[12px] font-medium text-gold/90 underline decoration-gold/25 underline-offset-2 hover:text-gold"
                >
                  {t('lineageExplorer.normanYdnaDeepReadLink', locale)}
                </Link>
              </p>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
});

export default RegionalHaplogroupPiePanel;
