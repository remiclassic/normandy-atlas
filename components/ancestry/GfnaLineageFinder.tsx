'use client';

import Link from 'next/link';
import { memo, useMemo, useState, useCallback } from 'react';
import { Search } from 'lucide-react';

import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { searchGfnaCatalog, gfnaFamilySheetUrl } from '@/lib/gfna-catalog-index';

const GfnaLineageFinder = memo(function GfnaLineageFinder() {
  const locale = useLocale();
  const [q, setQ] = useState('');
  const hits = useMemo(() => searchGfnaCatalog(q), [q]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  }, []);

  return (
    <section
      className="mb-10 space-y-3 rounded-xl border border-chrome-border-strong/45 bg-chrome-fill/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      aria-labelledby="gfna-catalog-finder-heading"
    >
      <h2 id="gfna-catalog-finder-heading" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
        {t('genealogy.gfnaFinderTitle', locale)}
      </h2>
      <p className="text-[12px] leading-relaxed text-text-dim">{t('genealogy.gfnaFinderHint', locale)}</p>
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
      {q.trim().length >= 2 && hits.length === 0 ? (
        <p className="text-[11px] text-text-dim">{t('genealogy.gfnaFinderEmpty', locale)}</p>
      ) : null}
      {hits.length > 0 ? (
        <ul className="max-h-60 space-y-2 overflow-y-auto scrollbar-thin pr-1">
          {hits.map((h) => (
            <li
              key={`${h.kind}-${h.id}`}
              className="rounded-lg border border-chrome-border/50 bg-chrome-fill/30 px-3 py-2 text-[12px]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium text-parchment/95">{h.label}</span>
                <span className="font-mono text-[11px] text-text-muted">{h.haplogroup}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-wide text-text-dim">
                <span>{h.kind === 'Y' ? 'Y-DNA' : 'mtDNA'}</span>
                <span>{h.status === 'presumed' ? 'Presumed' : 'Triangulated'}</span>
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
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
});

export default GfnaLineageFinder;
