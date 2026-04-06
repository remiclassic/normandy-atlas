'use client';

import Link from 'next/link';
import { Map } from 'lucide-react';
import { memo, useMemo } from 'react';

import type { NormanReadingEntry } from '@/lib/norman-readings/types';
import { splitNormanReadingsForNav } from '@/lib/norman-readings/group-readings';
import { buildNormanReadingMapHref } from '@/lib/norman-readings/map-cta';
import { t } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';

type Props = {
  readings: NormanReadingEntry[];
  locale: AtlasLocale;
};

const COPY = {
  en: {
    mastheadSeries: 'Norman Atlas · Reference',
    chronicle: 'The Norman Chronicle',
    tagline:
      'Long-form essays on Norman history — map-linked where a site article exists.',
    leadLabel: 'Lead story',
    featuresHead: 'Features & essays',
    featuresDek: 'Thematic surveys across law, identity, frontiers, and regions.',
    dispatchesHead: 'Dispatches from the atlas',
    dispatchesDek: 'Place-based readings tied to pins on the expansion map.',
    readFull: 'Read full article',
    mapCta: 'On the map',
  },
  fr: {
    mastheadSeries: 'Atlas normand · Référence',
    chronicle: 'La chronique normande',
    tagline:
      'Essais longs sur l’histoire normande — liés à la carte lorsqu’un article de site existe.',
    leadLabel: 'À la une',
    featuresHead: 'Dossiers & essais',
    featuresDek: 'Panoramas thématiques : droit, identité, frontières et régions.',
    dispatchesHead: 'Chroniques de l’atlas',
    dispatchesDek: 'Lectures liées aux lieux et aux repères de la carte.',
    readFull: 'Lire l’article',
    mapCta: 'Sur la carte',
  },
} as const;

function stringsFor(locale: AtlasLocale) {
  return locale === 'fr' ? COPY.fr : COPY.en;
}

const MapIconLink = memo(function MapIconLink({
  entry,
  locale,
  className,
}: {
  entry: NormanReadingEntry;
  locale: AtlasLocale;
  className?: string;
}) {
  const mapHref = buildNormanReadingMapHref(entry);
  const mapAria = t('normanReadings.openOnMapAria', locale);
  if (!mapHref) return null;
  return (
    <Link
      href={mapHref}
      className={
        className ??
        'flex h-8 w-8 shrink-0 items-center justify-center rounded border border-chrome-border/80 bg-chrome-fill-badge/25 text-gold/60 transition-colors hover:border-gold/30 hover:bg-gold/[0.06] hover:text-gold'
      }
      aria-label={`${mapAria}: ${entry.title}`}
      title={mapAria}
    >
      <Map className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
    </Link>
  );
});

const DispatchRow = memo(function DispatchRow({
  entry,
  locale,
}: {
  entry: NormanReadingEntry;
  locale: AtlasLocale;
}) {
  const mapHref = buildNormanReadingMapHref(entry);
  return (
    <article className="group border-b border-chrome-border/35 py-3.5 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <Link
            href={`/norman-readings/${entry.slug}`}
            className="block font-display text-[length:var(--atlas-text-sm)] font-semibold leading-snug text-parchment decoration-gold/25 underline-offset-4 transition-colors group-hover:text-gold group-hover:underline"
          >
            {entry.title}
          </Link>
          <p
            className="mt-1 text-[length:var(--atlas-text-2xs)] leading-relaxed text-text-muted md:text-[length:var(--atlas-text-xs)]"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {entry.description}
          </p>
        </div>
        {mapHref ? <MapIconLink entry={entry} locale={locale} /> : null}
      </div>
    </article>
  );
});

const FeatureRow = memo(function FeatureRow({
  entry,
  locale,
}: {
  entry: NormanReadingEntry;
  locale: AtlasLocale;
}) {
  return (
    <article className="group border-b border-chrome-border/40 py-4 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <Link href={`/norman-readings/${entry.slug}`} className="block">
            <h3 className="font-display text-[length:var(--atlas-text-base)] font-semibold leading-tight text-parchment transition-colors group-hover:text-gold md:text-[length:var(--atlas-text-lg)]">
              {entry.title}
            </h3>
            <p
              className="mt-2 text-[length:var(--atlas-text-sm)] leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {entry.description}
            </p>
          </Link>
          {entry.tags && entry.tags.length > 0 ? (
            <p className="mt-2 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-gold/40">
              {entry.tags.join(' · ')}
            </p>
          ) : null}
        </div>
        <MapIconLink entry={entry} locale={locale} />
      </div>
    </article>
  );
});

const NormanReadingsNewspaperFront = memo(function NormanReadingsNewspaperFront({
  readings,
  locale,
}: Props) {
  const s = stringsFor(locale);
  const mapAria = t('normanReadings.openOnMapAria', locale);
  const { thematic, places } = useMemo(() => splitNormanReadingsForNav(readings), [readings]);
  const lead = thematic[0];
  const restThematic = thematic.slice(1);

  const paperDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date());
    } catch {
      return '';
    }
  }, [locale]);

  const leadMapHref = lead ? buildNormanReadingMapHref(lead) : null;

  return (
    <div className="w-full">
      <header
        className="relative mb-8 border-y-[3px] border-double py-6 md:mb-10 md:py-8"
        style={{ borderColor: 'rgba(196, 169, 98, 0.22)' }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent"
          aria-hidden
        />
        <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-gold/55">
          {s.mastheadSeries}
        </p>
        <h1
          className="mt-2 text-center font-display text-[clamp(1.65rem,4.2vw,2.65rem)] font-bold uppercase leading-[1.05] tracking-[0.02em] text-[var(--color-gold)]"
          style={{
            textShadow:
              '0 1px 0 rgba(255,255,255,0.05), 0 -1px 0 rgba(0,0,0,0.35), 0 0 20px rgba(196,169,98,0.06)',
          }}
        >
          {s.chronicle}
        </h1>
        <p
          className="mx-auto mt-3 max-w-2xl text-center text-[length:var(--atlas-text-sm)] leading-relaxed md:text-[length:var(--atlas-text-md)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {s.tagline}
        </p>
        <p
          className="mt-4 text-center font-mono text-[11px] tabular-nums tracking-wide text-text-dim/90"
          suppressHydrationWarning
        >
          {paperDate}
        </p>
      </header>

      {lead ? (
        <section
          className="mb-10 rounded-sm border border-chrome-border/60 bg-gradient-to-b from-chrome-fill-badge/[0.12] to-transparent p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:mb-12 md:p-8"
          aria-labelledby="norman-readings-lead-heading"
        >
          <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-gold/50">
            {s.leadLabel}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="min-w-0 flex-1">
              <h2 id="norman-readings-lead-heading" className="sr-only">
                {lead.title}
              </h2>
              <Link href={`/norman-readings/${lead.slug}`} className="group block">
                <span className="block font-display text-[clamp(1.35rem,3vw,1.95rem)] font-semibold leading-tight text-parchment transition-colors group-hover:text-gold">
                  {lead.title}
                </span>
                <p
                  className="mt-3 text-[length:var(--atlas-text-sm)] leading-[1.65] md:columns-2 md:gap-8 md:text-[length:var(--atlas-text-md)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {lead.description}
                </p>
              </Link>
              {lead.tags && lead.tags.length > 0 ? (
                <p className="mt-3 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/38">
                  {lead.tags.join(' · ')}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-col gap-2 md:w-40 md:items-stretch">
              <Link
                href={`/norman-readings/${lead.slug}`}
                className="inline-flex items-center justify-center rounded border border-gold/25 bg-gold/[0.07] px-4 py-2.5 text-center font-sans text-[12px] font-semibold text-gold transition-colors hover:border-gold/40 hover:bg-gold/[0.11]"
              >
                {s.readFull}
              </Link>
              {leadMapHref ? (
                <Link
                  href={leadMapHref}
                  className="inline-flex items-center justify-center gap-2 rounded border border-chrome-border bg-chrome-fill-badge/30 px-4 py-2.5 text-center font-sans text-[12px] font-medium text-text-muted transition-colors hover:border-gold/25 hover:text-parchment"
                  aria-label={`${mapAria}: ${lead.title}`}
                >
                  <Map className="h-3.5 w-3.5 text-gold/65" strokeWidth={1.75} aria-hidden />
                  {s.mapCta}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-chrome-border/45">
        <section
          className="min-w-0 lg:pr-10"
          aria-labelledby="norman-readings-features-heading"
        >
          <div className="mb-5 border-b border-chrome-border/50 pb-4">
            <h2
              id="norman-readings-features-heading"
              className="font-display text-xl font-bold uppercase tracking-[0.08em] text-parchment md:text-2xl"
            >
              {s.featuresHead}
            </h2>
            <p className="mt-1.5 text-[length:var(--atlas-text-sm)] text-text-dim">{s.featuresDek}</p>
          </div>
          {restThematic.length > 0 ? (
            <div className="flex flex-col">
              {restThematic.map((entry) => (
                <FeatureRow key={entry.slug} entry={entry} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="text-[length:var(--atlas-text-sm)] text-text-dim">
              {locale === 'fr' ? 'Aucun autre dossier.' : 'No further features in this list.'}
            </p>
          )}
        </section>

        <section
          className="min-w-0 lg:pl-10"
          aria-labelledby="norman-readings-dispatches-heading"
        >
          <div className="mb-5 border-b border-chrome-border/50 pb-4">
            <h2
              id="norman-readings-dispatches-heading"
              className="font-display text-xl font-bold uppercase tracking-[0.08em] text-parchment md:text-2xl"
            >
              {s.dispatchesHead}
            </h2>
            <p className="mt-1.5 text-[length:var(--atlas-text-sm)] text-text-dim">{s.dispatchesDek}</p>
          </div>
          <div className="flex flex-col">
            {places.map((entry) => (
              <DispatchRow key={entry.slug} entry={entry} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

export default NormanReadingsNewspaperFront;
