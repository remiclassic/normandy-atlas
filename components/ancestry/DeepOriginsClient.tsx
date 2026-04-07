'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Anvil,
  ArrowLeft,
  Crosshair,
  Globe,
  Info,
  Layers,
  Menu,
  Shovel,
  Wheat,
  ClipboardCopy,
} from 'lucide-react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import AtlasHubPageShell from '@/components/layout/AtlasHubPageShell';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import BottomSheet from '@/components/ui/BottomSheet';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { useAncestryStore } from '@/lib/ancestry-store';
import { buildDeepOriginsHref } from '@/lib/deep-origins-link';
import { copyToClipboard } from '@/lib/progress/share';
import { GENEALOGY_HUB_PATH } from '@/lib/genealogy-paths';
import { publicAssetUrl } from '@/lib/public-asset-url';
import type { DeepOriginComponentId } from '@/core/deep-origins/types';
import {
  DEEP_ORIGINS_TIMELINE_FULL,
  buildDeepOriginsMigrationsGeoJson,
  buildDeepOriginsSitesGeoJson,
} from '@/core/deep-origins/geo';
import { DEEP_ORIGIN_CATEGORIES, getDeepOriginCategory } from '@/data/atlas/deep-origins/categories';
import { DEEP_ORIGIN_SITES } from '@/data/atlas/deep-origins/sites';
import { DEEP_ORIGIN_MIGRATIONS } from '@/data/atlas/deep-origins/migrations';
import type { DeepOriginIconKey } from '@/core/deep-origins/types';

function DeepOriginsMapLoading() {
  const locale = useLocale();
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 bg-gradient-to-b from-chrome-fill/25 to-chrome-fill/10 text-[13px] text-text-dim md:min-h-0">
      <div
        className="h-9 w-9 animate-pulse rounded-full border-2 border-chrome-border-strong/40 border-t-gold/50"
        aria-hidden
      />
      <span className="text-[12px] tracking-wide">{t('deepOrigins.mapLoading', locale)}</span>
    </div>
  );
}

const DeepOriginsMap = dynamic(() => import('@/components/ancestry/DeepOriginsMap'), {
  ssr: false,
  loading: DeepOriginsMapLoading,
});

const BLEND_KEYS: DeepOriginComponentId[] = [
  'hunter_gatherer',
  'early_farmer',
  'metal_age',
  'non_european',
];

const ICON_MAP: Record<DeepOriginIconKey, typeof Wheat> = {
  bow: Crosshair,
  wheat: Wheat,
  anvil: Anvil,
  globe: Globe,
  shovel: Shovel,
};

function resolveDisplayedPercent(
  id: DeepOriginComponentId,
  blend: Partial<Record<DeepOriginComponentId, number>> | undefined,
  demo: number,
): number {
  if (blend && Object.prototype.hasOwnProperty.call(blend, id) && blend[id] !== undefined) {
    return Math.round(Number(blend[id]));
  }
  return demo;
}

function hasUserBlend(blend: Partial<Record<DeepOriginComponentId, number>> | undefined): boolean {
  if (!blend) return false;
  return BLEND_KEYS.some((k) => Object.prototype.hasOwnProperty.call(blend, k) && blend[k] !== undefined);
}

function deepOriginsSearchMatchesExpected(expectedHref: string, currentSearch: string): boolean {
  const q = expectedHref.includes('?') ? expectedHref.split('?', 2)[1]! : '';
  const a = new URLSearchParams(q);
  const b = new URLSearchParams(currentSearch.startsWith('?') ? currentSearch.slice(1) : currentSearch);
  const keys = new Set<string>([...a.keys(), ...b.keys()]);
  for (const k of keys) {
    if ((a.get(k) ?? '') !== (b.get(k) ?? '')) return false;
  }
  return true;
}

function normalizeBlendSum(blend: Partial<Record<DeepOriginComponentId, number>>): Partial<
  Record<DeepOriginComponentId, number>
> {
  let sum = 0;
  const cur: Partial<Record<DeepOriginComponentId, number>> = {};
  for (const k of BLEND_KEYS) {
    const v = blend[k];
    if (v !== undefined && !Number.isNaN(v)) {
      cur[k] = Math.max(0, Math.min(100, v));
      sum += cur[k]!;
    }
  }
  if (sum <= 0) return {};
  if (sum === 100) return cur;
  const factor = 100 / sum;
  const out: Partial<Record<DeepOriginComponentId, number>> = {};
  for (const k of BLEND_KEYS) {
    if (cur[k] !== undefined) out[k] = Math.round(cur[k]! * factor);
  }
  return out;
}

const DeepOriginsClient = memo(function DeepOriginsClient() {
  const locale = useLocale();
  const router = useRouter();
  const sp = useSearchParams();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);
  const urlSynced = useRef(false);

  const blend = useAncestryStore((s) => s.profile.deepOriginsBlend);
  const setProfilePatch = useAncestryStore((s) => s.setProfilePatch);
  const myBlend = hasUserBlend(blend);

  const [selectedCategoryId, setSelectedCategoryId] = useState<DeepOriginComponentId>(() => {
    const c = sp.get('cat')?.trim();
    return c && getDeepOriginCategory(c) ? (c as DeepOriginComponentId) : 'hunter_gatherer';
  });
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(() => sp.get('site')?.trim() || null);

  const [timelineMin, setTimelineMin] = useState(DEEP_ORIGINS_TIMELINE_FULL.min);
  const [timelineMax, setTimelineMax] = useState(DEEP_ORIGINS_TIMELINE_FULL.max);

  const [showMigrations, setShowMigrations] = useState(true);
  const [showSites, setShowSites] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [legendOpen, setLegendOpen] = useState(true);
  const [search, setSearch] = useState('');
  const dq = useDeferredValue(search.trim().toLowerCase());

  const [editOpen, setEditOpen] = useState(false);
  const [draftBlend, setDraftBlend] = useState<Partial<Record<DeepOriginComponentId, number>>>(() => ({
    ...blend,
  }));

  useEffect(() => {
    if (urlSynced.current) return;
    const c = sp.get('cat')?.trim();
    const st = sp.get('site')?.trim();
    if (c && getDeepOriginCategory(c)) setSelectedCategoryId(c as DeepOriginComponentId);
    if (st) setSelectedSiteId(st);
    urlSynced.current = true;
  }, [sp]);

  const searchKey = sp.toString();

  useEffect(() => {
    if (!urlSynced.current) return;
    const href = buildDeepOriginsHref({ cat: selectedCategoryId, site: selectedSiteId });
    if (deepOriginsSearchMatchesExpected(href, searchKey ? `?${searchKey}` : '')) return;
    router.replace(href, { scroll: false });
  }, [selectedCategoryId, selectedSiteId, router, searchKey]);

  const timelineWindow = useMemo(
    () => ({
      min: Math.min(timelineMin, timelineMax),
      max: Math.max(timelineMin, timelineMax),
    }),
    [timelineMin, timelineMax],
  );

  const linesData = useMemo(
    () =>
      buildDeepOriginsMigrationsGeoJson(DEEP_ORIGIN_MIGRATIONS, {
        timeline: timelineWindow,
        categoryId: selectedCategoryId,
      }),
    [timelineWindow, selectedCategoryId],
  );

  const sitesData = useMemo(
    () =>
      buildDeepOriginsSitesGeoJson(DEEP_ORIGIN_SITES, {
        timeline: timelineWindow,
        categoryId: selectedCategoryId,
        selectedId: selectedSiteId,
      }),
    [timelineWindow, selectedCategoryId, selectedSiteId],
  );

  const category = getDeepOriginCategory(selectedCategoryId);
  const showMapMigrations = showMigrations && (category?.showMigrations ?? false);

  const filteredListSites = useMemo(() => {
    const list = DEEP_ORIGIN_SITES.filter((s) => {
      if (!siteVisible(s, timelineWindow, selectedCategoryId)) return false;
      if (!dq) return true;
      const name = s.name.toLowerCase();
      const country = pickI18n(s.country, locale).toLowerCase();
      return name.includes(dq) || country.includes(dq);
    });
    return list;
  }, [timelineWindow, selectedCategoryId, dq, locale]);

  const onSitePick = useCallback((id: string | null) => {
    setSelectedSiteId(id);
    if (id && isMobile) setSheetOpen(true);
  }, [isMobile]);

  const onListSiteClick = useCallback((id: string) => {
    setSelectedSiteId(id);
    if (isMobile) setSheetOpen(false);
  }, [isMobile]);

  const copyLink = useCallback(async () => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${buildDeepOriginsHref({ cat: selectedCategoryId, site: selectedSiteId })}`
        : buildDeepOriginsHref({ cat: selectedCategoryId, site: selectedSiteId });
    await copyToClipboard(url);
  }, [selectedCategoryId, selectedSiteId]);

  const openEditBlend = useCallback(() => {
    setDraftBlend({ ...blend });
    setEditOpen(true);
  }, [blend]);

  const saveBlend = useCallback(() => {
    const n = normalizeBlendSum(draftBlend);
    setProfilePatch(Object.keys(n).length ? { deepOriginsBlend: n } : { deepOriginsBlend: undefined });
    setEditOpen(false);
  }, [draftBlend, setProfilePatch]);

  const resetBlendDemo = useCallback(() => {
    setProfilePatch({ deepOriginsBlend: undefined });
    setEditOpen(false);
  }, [setProfilePatch]);

  const blendSum = useMemo(() => {
    if (!blend) return 0;
    return BLEND_KEYS.reduce((a, k) => a + (blend[k] !== undefined ? Number(blend[k]) : 0), 0);
  }, [blend]);

  const narrative = (
    <div className="space-y-4">
      {category ? (
        <>
          <div className="relative h-40 w-full overflow-hidden rounded-xl border border-chrome-border-strong/40 md:h-44">
            {category.heroImage ? (
              <>
                <Image
                  src={publicAssetUrl(category.heroImage)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(105deg, ${category.accentColor}55 0%, transparent 42%), linear-gradient(to top, var(--color-background) 0%, rgba(0,0,0,0.12) 35%, transparent 58%)`,
                  }}
                  aria-hidden
                />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${category.accentColor}44 0%, var(--color-chrome-fill-raised) 55%, var(--color-background) 100%)`,
                }}
                aria-hidden
              />
            )}
            {!category.heroImage ? (
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 20%, ${category.accentColor} 0%, transparent 45%)`,
                }}
                aria-hidden
              />
            ) : null}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
              <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-text)] drop-shadow-sm md:text-xl">
                {pickI18n(category.label, locale)}{' '}
                <span style={{ color: category.accentColor }} className="tabular-nums">
                  {resolveDisplayedPercent(category.id, blend, category.demoPercent)}%
                </span>
              </h2>
              {myBlend ? (
                <span className="shrink-0 rounded-full border border-gold/35 bg-[var(--color-background)]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold shadow-sm backdrop-blur-sm">
                  {t('deepOrigins.myBlendBadge', locale)}
                </span>
              ) : null}
            </div>
          </div>
          <div className="space-y-3 text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text-muted)]">
            {category.body.map((para, i) => (
              <p key={i}>{pickI18n(para, locale)}</p>
            ))}
          </div>
          <div
            className="rounded-lg border border-chrome-border-strong/35 bg-chrome-fill/30 p-3 text-[11px] leading-relaxed text-text-dim"
            role="note"
          >
            <div className="mb-1 flex items-center gap-1.5 font-semibold uppercase tracking-wider text-gold/70">
              <Info className="h-3.5 w-3.5" aria-hidden />
              {t('deepOrigins.disclaimerTitle', locale)}
            </div>
            {t('deepOrigins.disclaimerBody', locale)}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openEditBlend}
              className="rounded-lg border border-chrome-border-strong/50 bg-chrome-fill-raised/50 px-3 py-2 text-[12px] font-medium text-text hover:border-gold/35"
            >
              {t('deepOrigins.editBlend', locale)}
            </button>
            {myBlend ? (
              <button
                type="button"
                onClick={resetBlendDemo}
                className="rounded-lg border border-chrome-border/40 px-3 py-2 text-[12px] text-text-dim hover:text-text"
              >
                {t('deepOrigins.resetDemo', locale)}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => void copyLink()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-chrome-border-strong/40 px-3 py-2 text-[12px] text-text-dim hover:border-gold/30 hover:text-gold"
            >
              <ClipboardCopy className="h-3.5 w-3.5" aria-hidden />
              {t('deepOrigins.copyLink', locale)}
            </button>
          </div>
          {myBlend && blendSum !== 100 ? (
            <p className="text-[11px] text-amber-500/90">{t('deepOrigins.blendSumHint', locale)}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );

  const categoryPicker = (layout: 'scroll' | 'wrap', showHeading: boolean) => (
    <div className={showHeading ? 'mb-4' : ''}>
      {showHeading ? (
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
          {t('deepOrigins.categoriesTitle', locale)}
        </div>
      ) : null}
      <div
        role="tablist"
        aria-label={t('deepOrigins.categoryRailAria', locale)}
        aria-orientation="horizontal"
        className={
          layout === 'scroll'
            ? 'flex gap-2 overflow-x-auto overscroll-x-contain pb-0.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]'
            : 'flex flex-wrap gap-2'
        }
      >
        {DEEP_ORIGIN_CATEGORIES.map((c) => {
          const Icon = ICON_MAP[c.icon];
          const active = c.id === selectedCategoryId;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              title={pickI18n(c.label, locale)}
              onClick={() => {
                setSelectedCategoryId(c.id);
                setSelectedSiteId(null);
              }}
              className={[
                'inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-left text-[12px] font-medium leading-tight transition-[border-color,background,box-shadow,color]',
                active
                  ? 'shadow-sm'
                  : 'border-chrome-border-strong/45 bg-chrome-fill/25 text-text-dim hover:border-chrome-border-strong/65 hover:bg-chrome-fill/40 hover:text-text',
              ].join(' ')}
              style={
                active
                  ? {
                      borderColor: c.accentColor,
                      background: `${c.accentColor}1f`,
                      color: 'var(--color-text)',
                    }
                  : undefined
              }
            >
              <Icon
                className="h-4 w-4 shrink-0"
                style={{ color: active ? c.accentColor : undefined }}
                aria-hidden
              />
              <span className="whitespace-nowrap">{pickI18n(c.shortLabel, locale)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const timelineBlock = (
    <div className="space-y-2 border-t border-chrome-border-strong/25 pt-3 md:border-t-0 md:pt-0">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">
        {t('deepOrigins.timelineTitle', locale)}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex flex-1 flex-col gap-1 text-[10px] text-text-dim">
          <span>{t('deepOrigins.timelineOlder', locale)}</span>
          <input
            type="range"
            min={DEEP_ORIGINS_TIMELINE_FULL.min}
            max={DEEP_ORIGINS_TIMELINE_FULL.max}
            step={500}
            value={timelineMax}
            onChange={(e) => setTimelineMax(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-[10px] text-text-dim">
          <span>{t('deepOrigins.timelineRecent', locale)}</span>
          <input
            type="range"
            min={DEEP_ORIGINS_TIMELINE_FULL.min}
            max={DEEP_ORIGINS_TIMELINE_FULL.max}
            step={500}
            value={timelineMin}
            onChange={(e) => setTimelineMin(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </label>
      </div>
      <p className="text-[10px] text-text-dim/90 tabular-nums">
        {timelineWindow.max.toLocaleString()} – {timelineWindow.min.toLocaleString()} ybp
      </p>
    </div>
  );

  const searchBlock = (
    <div className="space-y-2">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">
        {t('deepOrigins.searchSites', locale)}
      </label>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('deepOrigins.searchPlaceholder', locale)}
        className="w-full rounded-lg border border-chrome-border-strong/45 bg-chrome-fill/40 px-3 py-2 text-[13px] text-text placeholder:text-text-dim"
      />
    </div>
  );

  const layerToggles = (
    <div className="flex flex-wrap gap-2" role="group" aria-label={t('deepOrigins.layerGroupAria', locale)}>
      <button
        type="button"
        role="switch"
        aria-checked={showMigrations}
        onClick={() => setShowMigrations((v) => !v)}
        className={[
          'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
          showMigrations
            ? 'border-gold/40 bg-gold/12 text-text'
            : 'border-chrome-border-strong/40 bg-chrome-fill/30 text-text-dim hover:border-chrome-border-strong/55',
          category && !category.showMigrations ? 'opacity-60' : '',
        ].join(' ')}
      >
        {t('deepOrigins.layerMigrations', locale)}
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={showSites}
        onClick={() => setShowSites((v) => !v)}
        className={[
          'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
          showSites
            ? 'border-gold/40 bg-gold/12 text-text'
            : 'border-chrome-border-strong/40 bg-chrome-fill/30 text-text-dim hover:border-chrome-border-strong/55',
        ].join(' ')}
      >
        {t('deepOrigins.layerSites', locale)}
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={showLabels}
        onClick={() => setShowLabels((v) => !v)}
        className={[
          'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
          showLabels
            ? 'border-gold/40 bg-gold/12 text-text'
            : 'border-chrome-border-strong/40 bg-chrome-fill/30 text-text-dim hover:border-chrome-border-strong/55',
        ].join(' ')}
      >
        {t('deepOrigins.layerLabels', locale)}
      </button>
    </div>
  );

  const siteList = (
    <div className="max-h-48 overflow-y-auto scrollbar-thin md:max-h-none">
      <ul className="space-y-1">
        {filteredListSites.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onListSiteClick(s.id)}
              className={[
                'flex w-full flex-col items-start rounded-md border px-2 py-2 text-left text-[12px] transition-colors',
                selectedSiteId === s.id
                  ? 'border-gold/45 bg-gold/10 text-text'
                  : 'border-transparent bg-chrome-fill/25 hover:border-chrome-border-strong/40',
              ].join(' ')}
            >
              <span className="font-semibold uppercase tracking-wide">{s.name}</span>
              <span className="text-[10px] text-text-dim">
                {pickI18n(s.country, locale)} · ~{s.approxYearBP.toLocaleString()} ybp
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const legendOverlay =
    showSites || showMapMigrations ? (
      <div
        className={`pointer-events-auto absolute left-2 top-2 z-10 max-w-[200px] rounded-lg border border-chrome-border-strong/50 bg-[var(--color-surface)]/95 p-2 text-[10px] shadow-lg backdrop-blur-sm transition-opacity md:left-3 md:top-3 ${
          legendOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => setLegendOpen(false)}
          className="mb-1 w-full text-left font-semibold uppercase tracking-wide text-text-dim hover:text-text"
        >
          {t('deepOrigins.legendTitle', locale)} ×
        </button>
        <ul className="space-y-1.5 text-text-muted">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-3 w-6 shrink-0 rounded-sm bg-[#e06b9a]/50" aria-hidden />
            {t('deepOrigins.legendHg', locale)}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-3 w-6 shrink-0 rounded-sm bg-[#3dad6c]/50" aria-hidden />
            {t('deepOrigins.legendFarm', locale)}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-3 w-6 shrink-0 rounded-sm bg-[#4a90d9]/50" aria-hidden />
            {t('deepOrigins.legendMetal', locale)}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-[#8b5a3c]" aria-hidden />
            {t('deepOrigins.legendPin', locale)}
          </li>
        </ul>
      </div>
    ) : null;

  const blendModal =
    editOpen ? (
      <div
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 sm:items-center"
        role="dialog"
        aria-modal
        aria-labelledby="deep-origins-blend-title"
        onClick={() => setEditOpen(false)}
      >
        <div
          className="max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-xl border border-chrome-border-strong/50 bg-[var(--color-background)] p-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 id="deep-origins-blend-title" className="mb-3 font-display text-base text-gold">
            {t('deepOrigins.blendEditorTitle', locale)}
          </h3>
          <p className="mb-4 text-[12px] text-text-dim">{t('deepOrigins.blendEditorHint', locale)}</p>
          <div className="space-y-3">
            {BLEND_KEYS.map((k) => {
              const cat = getDeepOriginCategory(k);
              if (!cat) return null;
              const v = draftBlend[k] ?? cat.demoPercent;
              return (
                <label key={k} className="block text-[12px]">
                  <span className="mb-1 flex justify-between text-text">
                    <span>{pickI18n(cat.label, locale)}</span>
                    <span className="tabular-nums text-text-dim">{v}%</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={v}
                    onChange={(e) =>
                      setDraftBlend((d) => ({ ...d, [k]: Number(e.target.value) }))
                    }
                    className="w-full accent-gold"
                  />
                </label>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={saveBlend}
              className="rounded-lg border border-gold/40 bg-gold/15 px-4 py-2 text-[12px] font-medium text-gold"
            >
              {t('deepOrigins.saveBlend', locale)}
            </button>
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className="rounded-lg border border-chrome-border/50 px-4 py-2 text-[12px] text-text-dim"
            >
              {t('deepOrigins.cancel', locale)}
            </button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <a
        href="#deep-origins-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-[13px]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to content
      </a>
      <AtlasHubPageShell>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader mobilePageTitle={t('deepOrigins.pageTitle', locale)} />
          <ReferenceHubTabs />
          <div className={genealogyHubSplitClassName}>
            <GenealogySubnav />
            <div
              id="deep-origins-main"
              className="relative flex min-h-0 min-w-0 flex-1 flex-col md:flex-row"
            >
          {!isMobile ? (
            <aside className="flex w-full shrink-0 border-b border-chrome-border-strong/35 bg-chrome-fill/[0.04] md:w-[400px] md:flex-col md:border-b-0 md:border-r md:bg-chrome-fill/[0.06]">
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin p-4">
                  <Link
                    href={GENEALOGY_HUB_PATH}
                    className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {t('deepOrigins.backToHub', locale)}
                  </Link>
                  <h1 className="mb-1 font-display text-lg text-gold md:text-xl">{t('deepOrigins.pageTitle', locale)}</h1>
                  <p className="mb-3 text-[11px] leading-relaxed text-text-dim">{t('deepOrigins.pageSubtitle', locale)}</p>
                  {categoryPicker('wrap', true)}
                  {timelineBlock}
                  <div className="mt-4 space-y-3">
                    {searchBlock}
                    {layerToggles}
                  </div>
                  <div className="mt-6">{narrative}</div>
                  <div className="mt-6 space-y-2">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">
                      {t('deepOrigins.sitesListTitle', locale)}
                    </div>
                    {siteList}
                  </div>
                </div>
              </div>
            </aside>
          ) : (
            <div className="shrink-0 border-b border-chrome-border-strong/35 bg-chrome-fill/[0.06] px-3 py-2.5">
              {categoryPicker('scroll', false)}
            </div>
          )}

          <div className="relative flex min-h-[46vh] flex-1 flex-col md:min-h-0 md:bg-gradient-to-br md:from-chrome-fill/10 md:to-transparent md:p-2 md:pl-1">
            <div className="relative min-h-0 flex-1 overflow-hidden md:rounded-2xl md:ring-1 md:ring-chrome-border-strong/30 md:ring-offset-0 md:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
            <DeepOriginsMap
              linesData={linesData}
              sitesData={sitesData}
              showMigrations={showMapMigrations}
              showSites={showSites}
              showLabels={showLabels}
              flyToSiteId={selectedSiteId}
              locale={locale}
              onSiteSelect={onSitePick}
            />
            </div>
            {legendOverlay}
            <button
              type="button"
              onClick={() => setLegendOpen((o) => !o)}
              className="pointer-events-auto absolute bottom-[max(5.5rem,calc(3.75rem+env(safe-area-inset-bottom)+1.25rem))] right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-chrome-border-strong/50 bg-[var(--color-surface)]/95 text-text shadow-md md:bottom-3 md:right-3"
              aria-label={t('deepOrigins.legendToggle', locale)}
            >
              <Layers className="h-4 w-4" />
            </button>
            {isMobile ? (
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="pointer-events-auto absolute bottom-3 right-14 z-[25] flex items-center gap-2 rounded-full border border-chrome-border-strong/50 bg-[var(--color-surface)]/95 px-4 py-2 text-[12px] font-medium text-text shadow-md max-md:bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] max-md:right-16"
              >
                <Menu className="h-4 w-4" aria-hidden />
                {t('deepOrigins.detailsSheet', locale)}
              </button>
            ) : null}
          </div>
            </div>
          </div>
        </div>
      </AtlasHubPageShell>

      <BottomSheet open={isMobile && sheetOpen} onClose={() => setSheetOpen(false)} maxHeight="88dvh">
        <div className="max-h-[80dvh] overflow-y-auto overscroll-y-contain px-4 pb-6 pt-2 scrollbar-thin">
          <Link
            href={GENEALOGY_HUB_PATH}
            className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
            onClick={() => setSheetOpen(false)}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {t('deepOrigins.backToHub', locale)}
          </Link>
          <h2 className="mb-1 font-display text-base text-gold">{t('deepOrigins.pageTitle', locale)}</h2>
          <p className="mb-3 text-[11px] text-text-dim">{t('deepOrigins.pageSubtitle', locale)}</p>
          {categoryPicker('wrap', true)}
          {timelineBlock}
          <div className="mt-4 space-y-3">
            {searchBlock}
            {layerToggles}
          </div>
          <div className="mt-5">{narrative}</div>
          <div className="mt-5 space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">
              {t('deepOrigins.sitesListTitle', locale)}
            </div>
            {siteList}
          </div>
        </div>
      </BottomSheet>

      {blendModal}
    </div>
  );
});

function siteVisible(
  s: (typeof DEEP_ORIGIN_SITES)[number],
  tw: { min: number; max: number },
  categoryId: DeepOriginComponentId,
): boolean {
  if (s.approxYearBP < tw.min || s.approxYearBP > tw.max) return false;
  const showAll = categoryId === 'archaeology' || categoryId === 'non_european';
  if (showAll) return true;
  return s.categoryIds.includes(categoryId);
}

export default DeepOriginsClient;
