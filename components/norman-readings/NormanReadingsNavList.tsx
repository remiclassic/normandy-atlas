'use client';

import Link from 'next/link';
import { Map } from 'lucide-react';
import { memo, useMemo } from 'react';

import type { NormanReadingEntry } from '@/lib/norman-readings/types';
import { splitNormanReadingsForNav } from '@/lib/norman-readings/group-readings';
import { buildNormanReadingMapHref } from '@/lib/norman-readings/map-cta';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const sectionClass =
  'mb-2 px-2 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-text-dim/55';

const NormanReadingsNavList = memo(function NormanReadingsNavList({
  readings,
  activeSlug,
  onNavigate,
}: {
  readings: NormanReadingEntry[];
  activeSlug?: string;
  /** Close mobile drawer after picking an article */
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const { thematic, places } = useMemo(() => splitNormanReadingsForNav(readings), [readings]);
  const thematicTitle = t('normanReadings.navGroupThematic', locale);
  const placesTitle = t('normanReadings.navGroupPlaces', locale);
  const mapAria = t('normanReadings.openOnMapAria', locale);

  const row = (r: NormanReadingEntry) => {
    const active = r.slug === activeSlug;
    const mapHref = buildNormanReadingMapHref(r);
    return (
      <li key={r.slug}>
        <div className="flex items-center gap-0.5 rounded-md pr-1 transition-colors hover:bg-chrome-fill-badge/60">
          <Link
            href={`/norman-readings/${r.slug}`}
            onClick={() => onNavigate?.()}
            className={`min-w-0 flex-1 truncate px-2 py-1.5 text-left text-[12px] leading-snug transition-colors ${
              active ? 'font-semibold text-gold' : 'text-text-muted hover:text-parchment'
            }`}
          >
            {r.title}
          </Link>
          {mapHref ? (
            <Link
              href={mapHref}
              onClick={() => onNavigate?.()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gold/55 transition-colors hover:bg-gold/10 hover:text-gold"
              aria-label={`${mapAria}: ${r.title}`}
              title={mapAria}
            >
              <Map className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            </Link>
          ) : null}
        </div>
      </li>
    );
  };

  return (
    <nav className="flex flex-col gap-5 pb-4" aria-label={t('normanReadings.navAria', locale)}>
      <div>
        <p className={sectionClass}>{thematicTitle}</p>
        <ul className="space-y-0.5">{thematic.map(row)}</ul>
      </div>
      <div>
        <p className={sectionClass}>{placesTitle}</p>
        <ul className="space-y-0.5">{places.map(row)}</ul>
      </div>
    </nav>
  );
});

export default NormanReadingsNavList;
