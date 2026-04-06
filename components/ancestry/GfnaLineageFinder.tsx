'use client';

import Link from 'next/link';
import { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';

import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';
import type { YdnaMajor } from '@/data/atlas/new-france-ydna-types';
import {
  searchGfnaCatalog,
  getAllGfnaCatalogHits,
  getGfnaBrowseYMajorOptions,
  gfnaFamilySheetUrl,
  type GfnaCatalogHit,
} from '@/lib/gfna-catalog-index';
import { gfnaMtTriangulationUrl } from '@/data/atlas/gfna-dna-types';
import AtlasSelect from '@/components/ui/AtlasSelect';
import { GfnaNormanAtlasBadge } from '@/components/ancestry/GfnaNormanAtlasBadge';

const PAGE_SIZE = 22;

/** Matches closed `<select>` chrome; no `mt-1` so row labels + control align in `sm:flex-row`. */
const catalogSelectTriggerClass =
  'flex w-full sm:max-w-[14rem] items-center justify-between gap-2 rounded-md border border-chrome-border bg-chrome-fill-raised px-2 py-1.5 text-left text-[12px] text-parchment focus:border-gold/35 focus:outline-none';

type KindFilter = 'all' | 'Y' | 'mtDNA';
type SortMode = 'name' | 'year' | 'haplogroup';

const CatalogHitRow = memo(function CatalogHitRow({ h, locale }: { h: GfnaCatalogHit; locale: AtlasLocale }) {
  return (
    <li className="rounded-lg border border-chrome-border/50 bg-chrome-fill/30 px-3 py-2 text-[12px]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-medium text-parchment/95">{h.label}</span>
        <span className="font-mono text-[11px] text-text-muted">{h.haplogroup}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-wide text-text-dim">
        <span>{h.kind === 'Y' ? 'Y-DNA' : 'mtDNA'}</span>
        <span>{h.status === 'presumed' ? 'Presumed' : 'Triangulated'}</span>
        {h.marriageYear != null ? <span>m. {h.marriageYear}</span> : null}
        {h.yMajor ? <span>{h.yMajor}</span> : null}
        <GfnaNormanAtlasBadge normanAtlas={h.normanAtlas} compact />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        <Link
          href={`/?${h.mapQuery.key}=${encodeURIComponent(h.mapQuery.value)}`}
          className="text-[11px] font-medium text-gold/85 hover:text-gold"
        >
          {t('genealogy.gfnaFinderOpenMap', locale)}
        </Link>
        {h.familySheetNo ? (
          <a
            href={gfnaFamilySheetUrl(h.familySheetNo)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-sky-300/85 hover:text-sky-200"
          >
            {t('genealogy.gfnaFinderFamilySheet', locale)}
          </a>
        ) : null}
        {h.kind === 'mtDNA' && h.triId ? (
          <a
            href={gfnaMtTriangulationUrl(h.triId)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-emerald-300/85 hover:text-emerald-200"
          >
            {t('genealogy.gfnaFinderTriSheet', locale)}
          </a>
        ) : null}
      </div>
    </li>
  );
});

const GfnaLineageFinder = memo(function GfnaLineageFinder() {
  const locale = useLocale();
  const [q, setQ] = useState('');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [yMajorFilter, setYMajorFilter] = useState<YdnaMajor | 'all'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('name');
  const [normanAtlasOnly, setNormanAtlasOnly] = useState(false);
  const [page, setPage] = useState(0);

  const searchHits = useMemo(() => searchGfnaCatalog(q), [q]);

  const yMajorOptions = useMemo(() => getGfnaBrowseYMajorOptions(), []);

  const yGroupSelectOptions = useMemo(
    () => [
      { value: 'all', label: t('genealogy.gfnaFinderYGroupAll', locale) },
      ...yMajorOptions.map((m) => ({ value: m, label: m })),
    ],
    [yMajorOptions, locale],
  );

  const sortSelectOptions = useMemo(
    () => [
      { value: 'name', label: t('genealogy.gfnaFinderSortName', locale) },
      { value: 'year', label: t('genealogy.gfnaFinderSortYear', locale) },
      { value: 'haplogroup', label: t('genealogy.gfnaFinderSortHaplo', locale) },
    ],
    [locale],
  );

  const allHits = useMemo(() => getAllGfnaCatalogHits(), []);

  const browseFiltered = useMemo(() => {
    let rows = allHits;

    if (kindFilter === 'Y') {
      rows = rows.filter((h) => h.kind === 'Y');
    } else if (kindFilter === 'mtDNA') {
      rows = rows.filter((h) => h.kind === 'mtDNA');
    }

    if (yMajorFilter !== 'all') {
      rows = rows.filter((h) => h.kind !== 'Y' || h.yMajor === yMajorFilter);
    }

    if (normanAtlasOnly) {
      rows = rows.filter((h) => h.normanAtlas.matched);
    }

    const sorted = [...rows];
    if (sortMode === 'name') {
      sorted.sort((a, b) => a.label.localeCompare(b.label, locale === 'fr' ? 'fr' : 'en'));
    } else if (sortMode === 'year') {
      sorted.sort((a, b) => (a.marriageYear ?? 0) - (b.marriageYear ?? 0));
    } else {
      sorted.sort((a, b) => a.haplogroup.localeCompare(b.haplogroup, undefined, { sensitivity: 'base' }));
    }

    return sorted;
  }, [allHits, kindFilter, yMajorFilter, sortMode, normanAtlasOnly, locale]);

  useEffect(() => {
    setPage(0);
  }, [kindFilter, yMajorFilter, sortMode, normanAtlasOnly]);

  useEffect(() => {
    const pc = Math.max(1, Math.ceil(browseFiltered.length / PAGE_SIZE));
    setPage((p) => Math.min(p, pc - 1));
  }, [browseFiltered.length]);

  const pageCount = Math.max(1, Math.ceil(browseFiltered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageSlice = useMemo(() => {
    const start = safePage * PAGE_SIZE;
    return browseFiltered.slice(start, start + PAGE_SIZE);
  }, [browseFiltered, safePage]);

  const rangeFrom = browseFiltered.length === 0 ? 0 : safePage * PAGE_SIZE + 1;
  const rangeTo = Math.min((safePage + 1) * PAGE_SIZE, browseFiltered.length);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  }, []);

  const kindBtn = (id: KindFilter, labelKey: Parameters<typeof t>[0]) => (
    <button
      key={id}
      type="button"
      onClick={() => setKindFilter(id)}
      className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 ${
        kindFilter === id
          ? 'border-gold/45 bg-gold/15 text-gold/95'
          : 'border-chrome-border-strong/50 bg-chrome-fill-badge text-text-dim hover:border-chrome-border hover:text-text-muted'
      }`}
    >
      {t(labelKey, locale)}
    </button>
  );

  return (
    <section
      className="mb-10 space-y-4 rounded-xl border border-chrome-border-strong/45 bg-chrome-fill/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      aria-labelledby="gfna-catalog-finder-heading"
    >
      <h2 id="gfna-catalog-finder-heading" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
        {t('genealogy.gfnaFinderTitle', locale)}
      </h2>
      <p className="text-[12px] leading-relaxed text-text-dim">{t('genealogy.gfnaFinderHint', locale)}</p>
      <p className="text-[11px] leading-relaxed text-text-dim/85">{t('genealogy.gfnaFinderCatalogContext', locale)}</p>

      <div className="rounded-lg border border-chrome-border/40 bg-chrome-fill/20 p-4 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/55">
          {t('genealogy.gfnaFinderBrowseTitle', locale)}
        </h3>
        <p className="text-[11px] leading-relaxed text-text-dim/90">{t('genealogy.gfnaFinderBrowseSubtitle', locale)}</p>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('genealogy.gfnaFinderBrowseTitle', locale)}>
          {kindBtn('all', 'genealogy.gfnaFinderFilterAll')}
          {kindBtn('Y', 'genealogy.gfnaFinderFilterY')}
          {kindBtn('mtDNA', 'genealogy.gfnaFinderFilterMt')}
        </div>

        {kindFilter !== 'mtDNA' ? (
          <label className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-dim shrink-0">
              {t('genealogy.gfnaFinderYGroupLabel', locale)}
            </span>
            <AtlasSelect
              value={yMajorFilter}
              onValueChange={(v) =>
                setYMajorFilter((v === 'all' ? 'all' : v) as YdnaMajor | 'all')
              }
              options={yGroupSelectOptions}
              triggerClassName={catalogSelectTriggerClass}
              aria-label={t('genealogy.gfnaFinderYGroupLabel', locale)}
            />
          </label>
        ) : null}

        <label className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-dim shrink-0">
            {t('genealogy.gfnaFinderSortLabel', locale)}
          </span>
          <AtlasSelect
            value={sortMode}
            onValueChange={(v) => setSortMode(v as SortMode)}
            options={sortSelectOptions}
            triggerClassName={catalogSelectTriggerClass}
            aria-label={t('genealogy.gfnaFinderSortLabel', locale)}
          />
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-[11px] text-text-dim/90">
          <input
            type="checkbox"
            checked={normanAtlasOnly}
            onChange={(e) => setNormanAtlasOnly(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-chrome-border-strong/60 bg-chrome-fill-raised text-gold focus:ring-gold/30"
          />
          <span>{t('genealogy.gfnaFinderNormanOnly', locale)}</span>
        </label>

        {browseFiltered.length === 0 ? (
          <p className="text-[11px] text-text-dim">{t('genealogy.gfnaFinderEmpty', locale)}</p>
        ) : (
          <>
            <p className="text-[10px] text-text-dim/85">
              {locale === 'fr'
                ? `${rangeFrom}–${rangeTo} sur ${browseFiltered.length} ${t('genealogy.gfnaFinderLineages', locale)}`
                : `${rangeFrom}–${rangeTo} of ${browseFiltered.length} ${t('genealogy.gfnaFinderLineages', locale)}`}
            </p>
            <ul className="max-h-[min(28rem,55vh)] space-y-2 overflow-y-auto scrollbar-thin pr-1">
              {pageSlice.map((h) => (
                <CatalogHitRow key={`${h.kind}-${h.id}`} h={h} locale={locale} />
              ))}
            </ul>
            {pageCount > 1 ? (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  disabled={safePage <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="rounded-md border border-chrome-border-strong/50 px-3 py-1 text-[11px] font-medium text-text-dim enabled:hover:border-gold/35 enabled:hover:text-text-muted disabled:opacity-40"
                >
                  {t('genealogy.gfnaFinderPrev', locale)}
                </button>
                <span className="text-[10px] text-text-dim">
                  {safePage + 1} / {pageCount}
                </span>
                <button
                  type="button"
                  disabled={safePage >= pageCount - 1}
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  className="rounded-md border border-chrome-border-strong/50 px-3 py-1 text-[11px] font-medium text-text-dim enabled:hover:border-gold/35 enabled:hover:text-text-muted disabled:opacity-40"
                >
                  {t('genealogy.gfnaFinderNext', locale)}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/55">
          {t('genealogy.gfnaFinderSearchTitle', locale)}
        </h3>
        <label className="relative block">
          <span className="sr-only">{t('genealogy.gfnaFinderPlaceholder', locale)}</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim/60"
            aria-hidden
          />
          <input
            type="search"
            value={q}
            onChange={onChange}
            placeholder={t('genealogy.gfnaFinderPlaceholder', locale)}
            className="w-full rounded-lg border border-chrome-border bg-chrome-fill-raised py-2.5 pl-10 pr-3 text-[14px] text-parchment placeholder:text-text-dim/50 focus:border-gold/35 focus:outline-none"
            autoComplete="off"
          />
        </label>
        {q.trim().length >= 2 && searchHits.length === 0 ? (
          <p className="text-[11px] text-text-dim">{t('genealogy.gfnaFinderEmpty', locale)}</p>
        ) : null}
        {q.trim().length >= 2 && searchHits.length > 0 ? (
          <ul className="max-h-52 space-y-2 overflow-y-auto scrollbar-thin pr-1">
            {searchHits.map((h) => (
              <CatalogHitRow key={`search-${h.kind}-${h.id}`} h={h} locale={locale} />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
});

export default GfnaLineageFinder;
