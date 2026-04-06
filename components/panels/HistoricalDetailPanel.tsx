'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from 'motion/react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-responsive';
import { pickI18n } from '@/lib/locale';
import { CATEGORY_META, resolveCategoryLabel } from '@/lib/norman-names';
import { blendToBarSegments, resolveStrandLabel, type BarSegment } from '@/lib/cultural-origins';
import { matchSurnamePatterns, formatPatternExplanation } from '@/lib/surname-patterns';
import { getRegionRecord } from '@/data/regions-content';
import { getSettlement } from '@/data/settlements';
import { getEra } from '@/data/eras';
import { eventRecords } from '@/data/events';
import { routeRecords } from '@/data/routes';
import { evidencePoints } from '@/data/normandy/evidence-points';
import { vikingAdnaSites } from '@/data/atlas/viking-adna-burials';
import { vikingArchaeologySites } from '@/data/atlas/viking-archaeology-sites';
import { getMarkerById } from '@/data/atlas/timeline-markers';
import { getNormanSiteArticle } from '@/data/norman-expansion/site-articles';
import { normanNodesGeoJson } from '@/data/norman-expansion';
import { getPlace, getAtlasEra, getAtlasRegion, getPeopleForPlace, getPeopleForRegion, getPeopleForEra, getPerson, getVisibleRegions, getVisiblePlaces, resolveDataset, getShareForEntity, getSegment, getJourney } from '@/core';
import type { Person, PlaceKind, MigrationChannel, AtlasEra, AtlasLocale, MigrationShareRow, StatConfidence, RouteSegment, Journey, CulturalBlendEntry } from '@/core/types';
import type { SettlementCategory, NormanSiteKind } from '@/types';
import {
  getMigrationChannelBadge,
  getOriginDisplayLine,
  getAvailableFilters,
  filterPeopleByChannel,
  BADGE_CLASSES,
} from '@/lib/person-display';
import { t } from '@/lib/ui-strings';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { emitProgressEvent } from '@/lib/progress';
import type { AtlasEventType } from '@/lib/progress';
import type { SelectionKind } from '@/types';
import YdnaLineageDetail from './YdnaLineageDetail';
import MtDnaLineageDetail from './MtDnaLineageDetail';
import UserAncestryPinDetail from '@/components/ancestry/UserAncestryPinDetail';
import ReadingLinksSection from '@/components/atlas/ReadingLinksSection';
import HistoricalMacroRegionDetail from '@/components/panels/HistoricalMacroRegionDetail';

const CATEGORY_LABELS: Record<SettlementCategory, string> = {
  city: 'City',
  fort: 'Fort',
  mission: 'Mission',
  colony: 'Colony',
  port: 'Port',
  trading_post: 'Trading Post',
  other: 'Settlement',
};

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all duration-150 border border-transparent hover:border-chrome-border touch-target z-10"
      aria-label="Close panel"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">
      {children}
    </h3>
  );
}

function ContentFade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-dim w-16 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-text/90">{value}</span>
    </div>
  );
}

function EventList({ eventIds }: { eventIds: string[] }) {
  const events = useMemo(
    () => eventRecords.filter((e) => eventIds.includes(e.id)),
    [eventIds],
  );
  if (events.length === 0) return null;

  return (
    <>
      <div className="divider-fade mx-7" />
      <ContentFade delay={0.22}>
        <div className="px-7 py-5 pb-8">
          <SectionLabel>Key Events</SectionLabel>
          <div className="space-y-3.5">
            {events.map((ev) => (
              <div key={ev.id} className="flex gap-4 group">
                <span className="text-[12px] font-mono text-gold/50 flex-shrink-0 pt-0.5 w-10 text-right tabular-nums">
                  {ev.year}
                </span>
                <div className="border-l border-border pl-4">
                  <p className="text-[13px] font-medium text-text/90 leading-snug">{ev.title}</p>
                  <p className="text-[12px] text-text-muted mt-1 leading-relaxed">{ev.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentFade>
    </>
  );
}

function RegionDetail({ id, eraId }: { id: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const region = useMemo(() => getRegionRecord(id), [id]);
  const eraLabel = useMemo(() => resolveEraLabel(eraId, locale), [eraId, locale]);

  const eraName = useMemo(() => {
    if (!region) return null;
    return region.historicalNames.find((n) => n.eraId === eraId)?.name ?? region.slug;
  }, [region, eraId]);

  const summary = region?.summary[eraId] ?? Object.values(region?.summary ?? {})[0] ?? '';
  const article = region?.article[eraId] ?? Object.values(region?.article ?? {})[0] ?? '';
  const ruler = region?.ruler[eraId] ?? '';
  const politicalEntity = region?.politicalEntity[eraId] ?? '';

  if (!region) return <AtlasRegionDetail id={id} eraId={eraId} />;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              {eraLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {eraName}
          </h2>
        </ContentFade>

        {politicalEntity && (
          <ContentFade delay={0.08}>
            <p className="text-sm text-text-muted/80">{politicalEntity}</p>
          </ContentFade>
        )}
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Ruler" value={ruler} />
          {region.notableSettlements.length > 0 && (
            <FactRow label="Cities" value={region.notableSettlements.join(' · ')} />
          )}
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.14}>
        <div className="px-7 py-5">
          <p className="text-[14px] leading-[1.75] text-text/85">{summary}</p>
        </div>
      </ContentFade>

      {article && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.18}>
            <div className="px-7 py-5">
              <SectionLabel>History</SectionLabel>
              <div className="text-[13px] leading-[1.8] text-text-muted space-y-4">
                {article.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </ContentFade>
        </>
      )}

      <EventList eventIds={region.relatedEventIds} />

      <RegionPeopleSection regionId={id} eraId={eraId} />
    </>
  );
}

function SettlementDetail({ id, eraId }: { id: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const settlement = useMemo(() => getSettlement(id), [id]);
  const eraLabel = useMemo(() => resolveEraLabel(eraId, locale), [eraId, locale]);

  const displayName = useMemo(() => {
    if (!settlement) return '';
    const eraName = settlement.historicalNames.find((n) => n.eraId === eraId)?.name;
    return eraName ?? settlement.name;
  }, [settlement, eraId]);

  const relatedRoutes = useMemo(() => {
    if (!settlement?.relatedRouteIds?.length) return [];
    return routeRecords.filter((r) => settlement.relatedRouteIds!.includes(r.id));
  }, [settlement]);

  if (!settlement) return <AtlasPlaceDetail id={id} eraId={eraId} />;

  const cat = settlement.category ?? 'other';
  const bodyText = settlement.summary ?? settlement.description;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              {eraLabel}
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-blue/70 bg-blue/[0.06] px-2.5 py-1 rounded-md border border-blue/10">
              {CATEGORY_LABELS[cat]}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {displayName}
          </h2>
          {displayName !== settlement.name && (
            <p className="text-[13px] text-text-dim">{settlement.name}</p>
          )}
        </ContentFade>

        {settlement.colonialAffiliation && (
          <ContentFade delay={0.08}>
            <p className="text-sm text-text-muted/80 mt-1">{settlement.colonialAffiliation} colony</p>
          </ContentFade>
        )}
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          {settlement.foundingYear && (
            <FactRow label="Founded" value={String(settlement.foundingYear)} />
          )}
          {settlement.colonialAffiliation && (
            <FactRow label="Affiliation" value={settlement.colonialAffiliation} />
          )}
          {settlement.regionId && (
            <FactRow label="Region" value={settlement.regionId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} />
          )}
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.14}>
        <div className="px-7 py-5">
          <p className="text-[14px] leading-[1.75] text-text/85">{bodyText}</p>
        </div>
      </ContentFade>

      {settlement.historicalNotes && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.18}>
            <div className="px-7 py-5">
              <SectionLabel>History</SectionLabel>
              <div className="text-[13px] leading-[1.8] text-text-muted space-y-4">
                {settlement.historicalNotes.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </ContentFade>
        </>
      )}

      {relatedRoutes.length > 0 && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.22}>
            <div className="px-7 py-5">
              <SectionLabel>Related Routes</SectionLabel>
              <div className="space-y-2.5">
                {relatedRoutes.map((r) => (
                  <div key={r.id} className="text-[13px]">
                    <p className="font-medium text-text/90 leading-snug">{r.title}</p>
                    <p className="text-[12px] text-text-muted mt-0.5 leading-relaxed line-clamp-2">{r.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </ContentFade>
        </>
      )}

      <EventList eventIds={settlement.relatedEventIds ?? []} />

      <PeopleList placeId={id} eraId={eraId} />
    </>
  );
}

const PLACE_KIND_LABELS: Record<PlaceKind, string> = {
  port: 'Port',
  city: 'City',
  settlement: 'Settlement',
  abstract_node: 'Waypoint',
  fort: 'Fort',
  megalith: 'Megalithic Site',
  hillfort: 'Hillfort / Oppidum',
  mission: 'Mission',
  trading_post: 'Trading Post',
};

const CONFIDENCE_LABELS: Record<string, string> = {
  documented: 'Documented origin',
  network: 'Regional network ties',
  uncertain: 'Uncertain attribution',
};

function channelFilterAllLabel(locale: AtlasLocale, count: number): string {
  const word =
    locale === 'fr' ? 'Tous' :
    locale === 'es' ? 'Todos' :
    locale === 'it' ? 'Tutti' :
    locale === 'de' ? 'Alle' :
    'All';
  return `${word} (${count})`;
}

function ChannelFilterBar({
  people,
  activeFilter,
  onFilterChange,
  locale,
}: {
  people: Person[];
  activeFilter: MigrationChannel | null;
  onFilterChange: (ch: MigrationChannel | null) => void;
  locale: AtlasLocale;
}) {
  const filters = useMemo(() => getAvailableFilters(people, locale), [people, locale]);

  if (filters.length <= 1) return null;

  return (
    <div className="flex items-center gap-1.5 flex-wrap mb-3">
      <button
        onClick={() => onFilterChange(null)}
        className={`text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-[3px] rounded border transition-all duration-150 ${
          activeFilter === null
            ? 'text-parchment/80 bg-chrome-fill-active border-chrome-border-strong'
            : 'text-text-dim/50 bg-transparent border-transparent hover:bg-chrome-fill hover:border-chrome-border'
        }`}
      >
        {channelFilterAllLabel(locale, people.length)}
      </button>
      {filters.map((f) => (
        <button
          key={f.channel}
          onClick={() => onFilterChange(activeFilter === f.channel ? null : f.channel)}
          className={`text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-[3px] rounded border transition-all duration-150 ${
            activeFilter === f.channel
              ? BADGE_CLASSES[f.tone]
              : 'text-text-dim/50 bg-transparent border-transparent hover:bg-chrome-fill hover:border-chrome-border'
          }`}
        >
          {f.label} ({f.count})
        </button>
      ))}
    </div>
  );
}

function PeopleList({ placeId, eraId }: { placeId: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale) as AtlasLocale;
  const people = useMemo(() => getPeopleForPlace(placeId, eraId), [placeId, eraId]);
  const [activeFilter, setActiveFilter] = useState<MigrationChannel | null>(null);
  const filtered = useMemo(() => filterPeopleByChannel(people, activeFilter), [people, activeFilter]);
  const emptyFilterHint =
    locale === 'fr'
      ? 'Aucune figure ne correspond à ce filtre.'
      : locale === 'es'
        ? 'Ninguna figura coincide con este filtro.'
        : locale === 'it'
          ? 'Nessuna figura corrisponde a questo filtro.'
          : locale === 'de'
            ? 'Keine Personen entsprechen diesem Filter.'
            : 'No figures match this filter.';

  if (people.length === 0) return null;

  return (
    <>
      <div className="divider-fade mx-7" />
      <ContentFade delay={0.26}>
        <div className="px-7 py-5 pb-8">
          <SectionLabel>Notable Figures</SectionLabel>
          <ChannelFilterBar
            people={people}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            locale={locale}
          />
          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <PersonCard key={p.id} person={p} eraId={eraId} />
              ))
            ) : (
              <p className="text-[12px] text-text-dim/50 italic py-2">{emptyFilterHint}</p>
            )}
          </div>
        </div>
      </ContentFade>
    </>
  );
}

function AtlasThroughlineBadge({ person, locale, compact = false }: { person: Person; locale: string; compact?: boolean }) {
  const framing = person.atlasThroughline;
  if (!framing) return null;

  if (framing.kind === 'norman') {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${compact ? '' : 'mt-1'}`}>
        <span className="inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded border text-amber-300/70 bg-amber-400/[0.06] border-amber-400/15">
          {locale === 'fr' ? 'Normand' : locale === 'es' ? 'Normando' : locale === 'it' ? 'Normanno' : locale === 'de' ? 'Normannisch' : 'Norman'}
        </span>
        {framing.descriptor && (
          <span className="text-[11px] text-text-muted/70 italic">{pickI18n(framing.descriptor, locale as Parameters<typeof pickI18n>[1])}</span>
        )}
      </div>
    );
  }

  const identityText = framing.identityLabel
    ? pickI18n(framing.identityLabel, locale as Parameters<typeof pickI18n>[1])
    : undefined;

  if (compact) {
    return (
      <span className="inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded border text-sky-300/60 bg-sky-400/[0.04] border-sky-400/10">
        {identityText ?? (locale === 'fr' ? 'Lié à l\'atlas' : locale === 'es' ? 'Incluido en el atlas' : locale === 'it' ? 'Nell\'atlante' : locale === 'de' ? 'Im Atlas verzeichnet' : 'Atlas inclusion')}
      </span>
    );
  }

  return (
    <div className="rounded-md border border-sky-400/10 bg-sky-400/[0.03] px-3 py-2 mt-1">
      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-sky-300/50 block mb-1">
        {identityText ?? (locale === 'fr' ? 'Pourquoi cet atlas' : locale === 'es' ? 'Por qué este atlas' : locale === 'it' ? 'Perché in questo atlante' : locale === 'de' ? 'Warum in diesem Atlas' : 'Why this atlas')}
      </span>
      <p className="text-[11px] text-text-muted/80 leading-relaxed">
        {pickI18n(framing.rationale, locale as Parameters<typeof pickI18n>[1])}
      </p>
    </div>
  );
}

function CulturalOriginsBar({ entries, locale }: { entries: CulturalBlendEntry[]; locale: AtlasLocale }) {
  const segments = useMemo(() => blendToBarSegments(entries, locale), [entries, locale]);
  if (segments.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex h-2 rounded-full overflow-hidden bg-chrome-fill-badge border border-chrome-border">
        {segments.map((seg) => (
          <div
            key={seg.strand}
            className="h-full transition-all duration-300"
            style={{ width: `${seg.weight * 100}%`, backgroundColor: seg.color }}
            title={`${seg.label} (${Math.round(seg.weight * 100)}%)`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {segments.map((seg) => (
          <span key={seg.strand} className="inline-flex items-center gap-1 text-[10px] text-text-muted/70">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            {seg.label}
            <span className="text-text-dim/50">{Math.round(seg.weight * 100)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SurnameClues({ surname, locale }: { surname: string | undefined; locale: AtlasLocale }) {
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => matchSurnamePatterns(surname), [surname]);

  if (matches.length === 0) return null;

  return (
    <div className="rounded-md border border-sky-400/10 bg-sky-400/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-left group"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300/50">
          Name Clues
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`text-sky-300/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2">
          {matches.map((m) => (
            <p key={m.id} className="text-[11px] text-text-muted/80 leading-relaxed italic">
              {formatPatternExplanation(m, locale)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonCard({ person, eraId }: { person: Person; eraId?: string }) {
  const locale = useMapStore((s) => s.locale);
  const lifespan = `${person.birthYear}–${person.deathYear}`;
  const roleStr = person.roles.join(' · ');
  const badge = useMemo(() => getMigrationChannelBadge(person.migrationChannel), [person.migrationChannel]);
  const originLine = useMemo(() => getOriginDisplayLine(person, eraId, locale), [person, eraId, locale]);

  return (
    <div className="rounded-lg border border-chrome-border bg-chrome-fill-badge p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[14px] font-medium text-parchment leading-snug">
            {person.displayName}
          </p>
          <p className="text-[11px] text-text-dim mt-0.5">{roleStr}</p>
        </div>
        <span className="text-[11px] font-mono text-gold/50 flex-shrink-0 tabular-nums pt-0.5">
          {lifespan}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded border ${BADGE_CLASSES[badge.tone]}`}>
          {badge.label}
        </span>
        <AtlasThroughlineBadge person={person} locale={locale} compact />
        {originLine && (
          <span className="text-[11px] text-text-muted/70 italic">{originLine}</span>
        )}
      </div>
      <p className="text-[12px] text-text-muted leading-relaxed">{pickI18n(person.bio, locale)}</p>
    </div>
  );
}

function PersonDetailExpanded({ person, eraId }: { person: Person; eraId?: string }) {
  const locale = useMapStore((s) => s.locale);
  const lifespan = `${person.birthYear}–${person.deathYear}`;
  const roleStr = person.roles.join(' · ');
  const confidence = person.confidence ? CONFIDENCE_LABELS[person.confidence] : null;
  const badge = useMemo(() => getMigrationChannelBadge(person.migrationChannel), [person.migrationChannel]);
  const originLine = useMemo(() => getOriginDisplayLine(person, eraId, locale), [person, eraId, locale]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[20px] font-display font-bold text-parchment leading-tight tracking-[-0.01em]">
          {person.displayName}
        </h3>
        <p className="text-[12px] text-text-dim mt-1">{roleStr}</p>
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <span className={`inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded border ${BADGE_CLASSES[badge.tone]}`}>
            {badge.label}
          </span>
          {originLine && (
            <span className="text-[11px] text-text-muted/70 italic">{originLine}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <FactRow
          label={
            locale === 'fr' ? 'Vie' : locale === 'es' ? 'Vida' : locale === 'it' ? 'Vita' : locale === 'de' ? 'Lebensspanne' : 'Lifespan'
          }
          value={lifespan}
        />
      </div>

      {person.originLabel && (
        <p className="text-[12px] text-text-muted/70 italic leading-relaxed">
          {pickI18n(person.originLabel, locale)}
        </p>
      )}

      <AtlasThroughlineBadge person={person} locale={locale} />

      {person.culturalOrigins && person.culturalOrigins.length > 0 && (
        <div>
          <SectionLabel>
            {locale === 'fr' ? 'Origines culturelles' : locale === 'es' ? 'Orígenes culturales' : locale === 'it' ? 'Origini culturali' : locale === 'de' ? 'Kulturelle Ursprünge' : 'Cultural Origins'}
          </SectionLabel>
          <CulturalOriginsBar entries={person.culturalOrigins} locale={locale} />
        </div>
      )}

      <div className="divider-fade" />

      <div>
        <SectionLabel>
          {locale === 'fr' ? 'Biographie' : locale === 'es' ? 'Biografía' : locale === 'it' ? 'Biografia' : locale === 'de' ? 'Biografie' : 'Biography'}
        </SectionLabel>
        <p className="text-[13px] leading-[1.75] text-text/85">{pickI18n(person.bio, locale)}</p>
      </div>

      {pickI18n(person.legacy, locale) && (
        <div>
          <SectionLabel>
            {locale === 'fr' ? 'Héritage' : locale === 'es' ? 'Legado' : locale === 'it' ? 'Eredità' : locale === 'de' ? 'Erbe' : 'Legacy'}
          </SectionLabel>
          <p className="text-[13px] leading-[1.75] text-text-muted">{pickI18n(person.legacy, locale)}</p>
        </div>
      )}

      <ReadingLinksSection links={person.readingLinks} locale={locale} />

      {person.surname && person.surnameOriginCategory && (
        <>
          <div className="divider-fade" />
          <div>
            <SectionLabel>
              {locale === 'fr' ? 'Patronyme normand' : locale === 'de' ? 'Normannischer Familienname' : 'Norman Surname'}
            </SectionLabel>
            <div className="rounded-md border border-chrome-border bg-chrome-fill-badge p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-display font-semibold text-parchment">{person.surname}</span>
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded"
                  style={{
                    color: CATEGORY_META[person.surnameOriginCategory].color,
                    background: `color-mix(in srgb, ${CATEGORY_META[person.surnameOriginCategory].color} 12%, transparent)`,
                  }}
                >
                  {resolveCategoryLabel(person.surnameOriginCategory, locale)}
                </span>
              </div>
              {person.surnameEtymology && (
                <p className="text-[12px] text-text-muted/80 leading-relaxed italic">
                  {pickI18n(person.surnameEtymology, locale)}
                </p>
              )}
              <SurnameClues surname={person.surname} locale={locale} />
              <Link
                href="/journal#norman-surnames"
                className="inline-flex items-center gap-1 text-[11px] text-gold hover:text-gold-bright transition-colors mt-1"
              >
                {locale === 'fr'
                  ? 'Voir tous les patronymes normands →'
                  : locale === 'de'
                    ? 'Alle normannischen Namen ansehen →'
                    : 'View all Norman names →'}
              </Link>
            </div>
          </div>
        </>
      )}

      {confidence && (
        <div className="pt-1">
          <span className={`inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded border ${
            person.confidence === 'documented'
              ? 'text-green-400/60 bg-green-400/[0.04] border-green-400/10'
              : person.confidence === 'network'
                ? 'text-yellow-400/60 bg-yellow-400/[0.04] border-yellow-400/10'
                : 'text-text-dim/50 bg-chrome-fill-badge border-chrome-border'
          }`}>
            {confidence}
          </span>
        </div>
      )}

      {person.guidedStoryArcId && (
        <button
          type="button"
          onClick={() => {
            const { startStory, closeDetail } = useMapStore.getState();
            startStory(person.guidedStoryArcId!);
            closeDetail();
          }}
          className="w-full mt-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] px-4 py-3 text-[13px] font-medium text-emerald-300/95 hover:bg-emerald-400/[0.14] hover:border-emerald-400/35 transition-colors"
        >
          {locale === 'fr'
            ? 'Suivre le récit sur la carte'
            : locale === 'es'
              ? 'Seguir el relato en el mapa'
              : locale === 'it'
                ? 'Segui il racconto sulla mappa'
                : locale === 'de'
                  ? 'Die Geschichte auf der Karte verfolgen'
                  : 'Follow the story on the map'}
        </button>
      )}
    </div>
  );
}

function RegionPeopleSection({ regionId, eraId }: { regionId: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale) as AtlasLocale;
  const allPeople = useMemo(() => getPeopleForRegion(regionId, eraId), [regionId, eraId]);
  const [activeFilter, setActiveFilter] = useState<MigrationChannel | null>(null);
  const filtered = useMemo(() => filterPeopleByChannel(allPeople, activeFilter), [allPeople, activeFilter]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFilterChange = useCallback((ch: MigrationChannel | null) => {
    setActiveFilter(ch);
    setActiveIndex(0);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  if (allPeople.length === 0) return null;

  const safeIndex = Math.min(activeIndex, filtered.length - 1);
  const current = filtered[safeIndex];

  return (
    <>
      <div className="divider-fade mx-7" />
      <ContentFade delay={0.26}>
        <div className="px-7 py-5 pb-8">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Notable Figures</SectionLabel>
            {filtered.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all duration-150 border border-transparent hover:border-chrome-border"
                  aria-label="Previous person"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="text-[11px] font-mono text-text-dim/60 tabular-nums min-w-[3ch] text-center">
                  {safeIndex + 1}/{filtered.length}
                </span>
                <button
                  onClick={goNext}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all duration-150 border border-transparent hover:border-chrome-border"
                  aria-label="Next person"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <ChannelFilterBar
            people={allPeople}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            locale={locale}
          />

          {current ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="rounded-lg border border-chrome-border bg-chrome-fill-badge p-5"
                >
                  <PersonDetailExpanded person={current} eraId={eraId} />
                </motion.div>
              </AnimatePresence>

              {filtered.length > 1 && (
                <div className="flex justify-center gap-1 mt-4">
                  {filtered.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        i === safeIndex
                          ? 'bg-gold/60 scale-125'
                          : 'bg-chrome-fill-pressed hover:bg-chrome-fill-active'
                      }`}
                      aria-label={`Go to ${p.displayName}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-[12px] text-text-dim/50 italic py-2">No figures match this filter.</p>
          )}
        </div>
      </ContentFade>
    </>
  );
}

function resolveEraLabel(eraId: string, locale: import('@/core/types').AtlasLocale = 'en'): string | undefined {
  const legacy = getEra(eraId);
  if (legacy) return legacy.label;
  const atlas = getAtlasEra(eraId);
  return atlas ? pickI18n(atlas.label, locale) : undefined;
}

const CONFIDENCE_DOT: Record<StatConfidence, string> = {
  high: 'bg-emerald-400/70',
  medium: 'bg-amber-400/70',
  low: 'bg-red-400/50',
};

function MigrationShareSnippet({ entityId, eraId, mode }: { entityId: string; eraId: string; mode: 'origins' | 'ports' | 'colonies' }) {
  const branch = useMapStore((s) => s.migrationBranch);
  const cohortId = useMapStore((s) => s.migrationCohortId);
  const explorerOpen = useMapStore((s) => s.migrationExplorerOpen);
  const locale = useMapStore((s) => s.locale);

  const share = useMemo(() => {
    if (!explorerOpen) return null;
    const ds = resolveDataset({ eraId, branch, cohortId });
    if (!ds) return null;
    return getShareForEntity(ds, mode, entityId);
  }, [explorerOpen, eraId, branch, cohortId, entityId, mode]);

  if (!share || share.percent == null) return null;

  return (
    <div className="px-7 py-3">
      <div className="rounded-lg bg-gold/[0.05] border border-gold/10 px-3 py-2">
        <span className="text-[9px] uppercase tracking-[0.12em] text-gold/60 font-semibold block mb-1">
          Migration estimate
        </span>
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${CONFIDENCE_DOT[share.confidence]}`} />
          <span className="text-[14px] font-display font-bold text-parchment tabular-nums">
            {share.percent}%
          </span>
          <span className="text-[11px] text-text-dim/70">
            of {mode === 'origins' ? 'immigrants' : mode === 'ports' ? 'embarkations' : 'settlement'}
          </span>
        </div>
        {share.note && (
          <p className="text-[10px] text-text-dim/60 leading-snug mt-1">{pickI18n(share.note, locale)}</p>
        )}
      </div>
    </div>
  );
}

function AtlasPlaceDetail({ id, eraId }: { id: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const place = useMemo(() => getPlace(id), [id]);
  const eraLabel = useMemo(() => resolveEraLabel(eraId, locale), [eraId, locale]);

  if (!place) return null;

  const state = place.eraStates[eraId];
  const displayName = state?.label ?? id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const kindLabel = PLACE_KIND_LABELS[place.kind] ?? place.kind;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {eraLabel && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                {eraLabel}
              </span>
            )}
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-blue/70 bg-blue/[0.06] px-2.5 py-1 rounded-md border border-blue/10">
              {kindLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {displayName}
          </h2>
        </ContentFade>

        {state?.affiliationTags && state.affiliationTags.length > 0 && (
          <ContentFade delay={0.08}>
            <p className="text-sm text-text-muted/80 mt-1">{state.affiliationTags.join(' · ')}</p>
          </ContentFade>
        )}
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Region" value={place.regionId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} />
          <FactRow label="Layer" value={place.layer.charAt(0).toUpperCase() + place.layer.slice(1)} />
        </div>
      </ContentFade>

      <MigrationShareSnippet entityId={id} eraId={eraId} mode="ports" />

      <PeopleList placeId={id} eraId={eraId} />
    </>
  );
}

function AtlasRegionDetail({ id, eraId }: { id: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const atlasRegion = useMemo(() => getAtlasRegion(id), [id]);
  const eraLabel = useMemo(() => resolveEraLabel(eraId, locale), [eraId, locale]);

  if (!atlasRegion) return null;

  const state = atlasRegion.eraStates[eraId];
  const displayName = pickI18n(atlasRegion.name, locale);
  const fillIntent = state?.fillIntent;
  const borderStyle = state?.borderStyle;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {eraLabel && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                {eraLabel}
              </span>
            )}
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 bg-chrome-fill-badge px-2.5 py-1 rounded-md border border-chrome-border">
              Region
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {displayName}
          </h2>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Layer" value={atlasRegion.layer.charAt(0).toUpperCase() + atlasRegion.layer.slice(1)} />
          {fillIntent && <FactRow label="Role" value={fillIntent.charAt(0).toUpperCase() + fillIntent.slice(1)} />}
          {borderStyle && <FactRow label="Borders" value={borderStyle.charAt(0).toUpperCase() + borderStyle.slice(1)} />}
        </div>
      </ContentFade>

      {atlasRegion.narrativeByEra?.[eraId] && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.14}>
            <div className="px-7 py-5">
              <p className="text-[14px] leading-[1.75] text-text/85">
                {pickI18n(atlasRegion.narrativeByEra[eraId], locale)}
              </p>
            </div>
          </ContentFade>
        </>
      )}

      {atlasRegion.culturalInfluenceByEra?.[eraId] && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.18}>
            <div className="px-7 py-5">
              <SectionLabel>
                {locale === 'fr' ? 'Influences culturelles' : locale === 'es' ? 'Influencias culturales' : locale === 'it' ? 'Influenze culturali' : locale === 'de' ? 'Kulturelle Einflüsse' : 'Cultural Influences'}
              </SectionLabel>
              <CulturalOriginsBar entries={atlasRegion.culturalInfluenceByEra[eraId]} locale={locale} />
            </div>
          </ContentFade>
        </>
      )}

      <MigrationShareSnippet entityId={id} eraId={eraId} mode="origins" />

      <RegionPeopleSection regionId={id} eraId={eraId} />
    </>
  );
}

const NORMAN_SITE_KIND_LABELS: Record<NormanSiteKind, string> = {
  city: 'City',
  castle: 'Castle',
  fortress: 'Fortress',
  port: 'Port',
  crusader: 'Crusader State',
  monastery: 'Monastery',
  battlefield: 'Battlefield',
};

function NormanSiteDetail({ id }: { id: string }) {
  const locale = useMapStore((s) => s.locale) as AtlasLocale;
  const node = useMemo(
    () => normanNodesGeoJson.features.find((f) => f.properties.id === id),
    [id],
  );
  const article = useMemo(() => getNormanSiteArticle(id), [id]);
  const essayLinkLabel =
    locale === 'fr'
      ? 'Lire l’article complet'
      : locale === 'es'
        ? 'Leer el artículo completo'
        : locale === 'it'
          ? 'Leggi l’articolo completo'
          : locale === 'de'
            ? 'Vollständigen Artikel lesen'
            : 'Read full article';

  if (!node) return null;

  const { name, role, date, siteKind } = node.properties;
  const kindLabel = NORMAN_SITE_KIND_LABELS[siteKind] ?? siteKind;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e060a0]/70 bg-[#e060a0]/[0.06] px-2.5 py-1 rounded-md border border-[#e060a0]/15">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              Norman Expansion
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8b8d0]/70 bg-[#e8b8d0]/[0.06] px-2.5 py-1 rounded-md border border-[#e8b8d0]/10">
              {kindLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {name}
          </h2>
          <p className="text-[13px] text-text-muted">{role}</p>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Period" value={date} />
        </div>
      </ContentFade>

      {article && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.14}>
            <div className="px-7 py-5">
              <p className="text-[14px] leading-[1.75] text-text/85">{article.overview}</p>
            </div>
          </ContentFade>

          {article.significance && article.significance.length > 0 && (
            <>
              <div className="divider-fade mx-7" />
              <ContentFade delay={0.18}>
                <div className="px-7 py-5">
                  <SectionLabel>Significance</SectionLabel>
                  <ul className="space-y-1.5">
                    {article.significance.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-muted leading-relaxed">
                        <span className="text-[#e060a0]/50 mt-1.5 flex-shrink-0">&#x2022;</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ContentFade>
            </>
          )}

          {article.architecture && article.architecture.length > 0 && (
            <>
              <div className="divider-fade mx-7" />
              <ContentFade delay={0.22}>
                <div className="px-7 py-5">
                  <SectionLabel>Architecture</SectionLabel>
                  <ul className="space-y-1.5">
                    {article.architecture.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-muted leading-relaxed">
                        <span className="text-gold/40 mt-1.5 flex-shrink-0">&#x2022;</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </ContentFade>
            </>
          )}

          {article.timeline && article.timeline.length > 0 && (
            <>
              <div className="divider-fade mx-7" />
              <ContentFade delay={0.26}>
                <div className="px-7 py-5 pb-8">
                  <SectionLabel>Timeline</SectionLabel>
                  <div className="space-y-3.5">
                    {article.timeline.map((entry, i) => (
                      <div key={i} className="flex gap-4 group">
                        <span className="text-[12px] font-mono text-[#e060a0]/50 flex-shrink-0 pt-0.5 w-10 text-right tabular-nums">
                          {entry.year}
                        </span>
                        <div className="border-l border-[#e060a0]/15 pl-4">
                          <p className="text-[13px] text-text-muted leading-relaxed">{entry.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ContentFade>
            </>
          )}

          {article.sources && article.sources.length > 0 && (
            <>
              <div className="divider-fade mx-7" />
              <ContentFade delay={0.3}>
                <div className="px-7 py-5 pb-8">
                  <SectionLabel>Sources</SectionLabel>
                  <ul className="space-y-1">
                    {article.sources.map((src, i) => (
                      <li key={i} className="text-[11px] text-text-dim/70 leading-relaxed italic">
                        {src}
                      </li>
                    ))}
                  </ul>
                </div>
              </ContentFade>
            </>
          )}

          {article.essaySlug && (
            <>
              <div className="divider-fade mx-7" />
              <ContentFade delay={0.32}>
                <div className="px-7 py-5 pb-8">
                  <Link
                    href={`/norman-readings/${article.essaySlug}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e060a0]/20 bg-[#e060a0]/[0.06] px-3.5 py-2.5 text-[13px] font-medium text-[#f0c8dd]/90 transition-colors hover:border-[#e060a0]/35 hover:bg-[#e060a0]/10"
                  >
                    <BookOpen className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    {essayLinkLabel}
                  </Link>
                </div>
              </ContentFade>
            </>
          )}
        </>
      )}
    </>
  );
}

const EVIDENCE_KIND_LABELS: Record<string, string> = {
  burial: 'Burial Site',
  weapon: 'Weapon Find',
  fortification: 'Fortification',
};

function EvidenceDetail({ id }: { id: string }) {
  const evidence = useMemo(() => evidencePoints.find((p) => p.id === id), [id]);
  if (!evidence) return null;

  const dateLabel = `${evidence.dateRange[0]}–${evidence.dateRange[1]} AD`;
  const certaintyLabel = evidence.certainty === 'confirmed' ? 'Confirmed' : 'Probable';

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              Archaeological
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ember/70 bg-ember/[0.06] px-2.5 py-1 rounded-md border border-ember/10">
              {EVIDENCE_KIND_LABELS[evidence.kind] ?? evidence.kind}
            </span>
            <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border ${
              evidence.certainty === 'confirmed'
                ? 'text-green-400/70 bg-green-400/[0.06] border-green-400/10'
                : 'text-yellow-400/70 bg-yellow-400/[0.06] border-yellow-400/10'
            }`}>
              {certaintyLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {evidence.label}
          </h2>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Date" value={dateLabel} />
          <FactRow label="Status" value={certaintyLabel} />
          {evidence.sources && <FactRow label="Sources" value={evidence.sources} />}
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.14}>
        <div className="px-7 py-5">
          <p className="text-[14px] leading-[1.75] text-text/85">{evidence.note}</p>
        </div>
      </ContentFade>
    </>
  );
}

// ---------------------------------------------------------------------------
// Viking aDNA site detail
// ---------------------------------------------------------------------------

const CONTEXT_TYPE_LABELS: Record<string, string> = {
  'mass grave': 'Mass Grave',
  cemetery: 'Cemetery',
  'churchyard cemetery': 'Churchyard Cemetery',
};

function VikingAdnaSiteDetail({ id }: { id: string }) {
  const site = useMemo(() => vikingAdnaSites.find((s) => s.id === id), [id]);
  if (!site) return null;

  const dateLabel = site.dateStart === site.dateEnd
    ? `${site.dateStart} CE`
    : `${site.dateStart}–${site.dateEnd} CE`;

  const samplesWithGenetics = site.samples.filter(
    (s) => s.yDnaHaplogroup || s.mtDnaHaplogroup,
  );

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400/70 bg-sky-400/[0.06] px-2.5 py-1 rounded-md border border-sky-400/10">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              Archaeogenomics
            </span>
            {site.burialContextType && (
              <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ember/70 bg-ember/[0.06] px-2.5 py-1 rounded-md border border-ember/10">
                {CONTEXT_TYPE_LABELS[site.burialContextType] ?? site.burialContextType}
              </span>
            )}
            {site.tags.includes('execution') && (
              <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400/70 bg-red-400/[0.06] px-2.5 py-1 rounded-md border border-red-400/10">
                Execution
              </span>
            )}
            <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border ${
              site.coordinatesCertainty === 'confirmed'
                ? 'text-green-400/70 bg-green-400/[0.06] border-green-400/10'
                : 'text-yellow-400/70 bg-yellow-400/[0.06] border-yellow-400/10'
            }`}>
              {site.coordinatesCertainty === 'confirmed' ? 'Confirmed' : 'Approximate'}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {site.siteName}
          </h2>
          <p className="text-[13px] text-text-dim/80">
            {[site.region, site.country].filter(Boolean).join(', ')}
          </p>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Date" value={dateLabel} />
          <FactRow label="Period" value={site.periodLabel} />
          {site.assemblageSizeNote && <FactRow label="Assemblage" value={site.assemblageSizeNote} />}
          {site.traumaNote && <FactRow label="Trauma" value={site.traumaNote} />}
          {site.isotopeNote && <FactRow label="Isotope origins" value={site.isotopeNote} />}
          <FactRow label="Samples" value={`${site.samples.length} individual${site.samples.length > 1 ? 's' : ''} sequenced`} />
        </div>
      </ContentFade>

      {site.burialDescription && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.14}>
            <div className="px-7 py-5">
              <p className="text-[14px] leading-[1.75] text-text/85">{site.burialDescription}</p>
            </div>
          </ContentFade>
        </>
      )}

      {site.significanceNote && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.155}>
            <div className="px-7 py-5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-gold/70 mb-2">
                Why this site matters
              </h3>
              <p className="text-[14px] leading-[1.75] text-text/85">{site.significanceNote}</p>
            </div>
          </ContentFade>
        </>
      )}

      {site.dataQualityNote && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.16}>
            <div className="px-7 py-5">
              <p className="text-[11px] text-yellow-400/60 leading-relaxed">
                <span className="font-semibold uppercase tracking-wider text-[10px] mr-1.5">Data note:</span>
                {site.dataQualityNote}
              </p>
            </div>
          </ContentFade>
        </>
      )}

      {samplesWithGenetics.length > 0 && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.18}>
            <div className="px-7 py-5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-text-dim mb-3">
                Haplogroups
              </h3>
              <div className="space-y-2">
                {samplesWithGenetics.map((s) => (
                  <div key={s.sampleId} className="flex items-baseline gap-3 text-[13px]">
                    <span className="font-mono text-text-muted/80 shrink-0">{s.sampleId}</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {s.yDnaHaplogroup && (
                        <span className="text-sky-300/80">
                          <span className="text-text-dim text-[10px] uppercase tracking-wider mr-1">Y</span>
                          {s.yDnaHaplogroup}
                        </span>
                      )}
                      {s.mtDnaHaplogroup && (
                        <span className="text-rose-300/80">
                          <span className="text-text-dim text-[10px] uppercase tracking-wider mr-1">mt</span>
                          {s.mtDnaHaplogroup}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentFade>
        </>
      )}

      <div className="divider-fade mx-7" />
      <ContentFade delay={0.22}>
        <div className="px-7 py-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-text-dim mb-2">
            All sample IDs
          </h3>
          <p className="text-[12px] font-mono text-text-muted/70 leading-relaxed">
            {site.samples.map((s) => s.sampleId).join(', ')}
          </p>
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />
      <ContentFade delay={0.26}>
        <div className="px-7 py-5 space-y-2">
          <p className="text-[11px] text-text-dim/60 leading-relaxed">
            {site.studyLabel ? `${site.studyLabel} — ` : ''}Source: {site.sourceCitation}
          </p>
          {site.doi && (
            <a
              href={`https://doi.org/${site.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-sky-400/70 hover:text-sky-300 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                <path d="M8 5.5V8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h2.5M6 1h3v3M9 1L4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              DOI: {site.doi}
            </a>
          )}
          {site.externalLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-sky-400/70 hover:text-sky-300 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                <path d="M8 5.5V8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h2.5M6 1h3v3M9 1L4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      </ContentFade>
    </>
  );
}

// ---------------------------------------------------------------------------
// Viking archaeology site detail
// ---------------------------------------------------------------------------

const SITE_TYPE_LABELS: Record<string, string> = {
  emporium: 'Trade Town',
  fortification: 'Fortification',
  assembly: 'Assembly Site',
  hoard: 'Hoard Find',
  settlement: 'Settlement',
  burial_mound: 'Burial Mound',
  monastery: 'Monastery',
  runestone: 'Runestone',
  ship_find: 'Ship Find',
};

function VikingArchaeologySiteDetail({ id }: { id: string }) {
  const site = useMemo(() => vikingArchaeologySites.find((s) => s.id === id), [id]);
  if (!site) return null;

  const dateLabel = site.dateStart === site.dateEnd
    ? `${site.dateStart} CE`
    : `${site.dateStart}–${site.dateEnd} CE`;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400/70 bg-amber-400/[0.06] px-2.5 py-1 rounded-md border border-amber-400/10">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 6L4 2l2 4H2z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              Archaeology
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ember/70 bg-ember/[0.06] px-2.5 py-1 rounded-md border border-ember/10">
              {SITE_TYPE_LABELS[site.siteType] ?? site.siteType}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {site.name}
          </h2>
          <p className="text-[13px] text-text-dim/80">
            {[site.region, site.country].filter(Boolean).join(', ')}
          </p>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Date" value={dateLabel} />
          <FactRow label="Period" value={site.periodLabel} />
          <FactRow label="Type" value={SITE_TYPE_LABELS[site.siteType] ?? site.siteType} />
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />
      <ContentFade delay={0.14}>
        <div className="px-7 py-5">
          <p className="text-[14px] leading-[1.75] text-text/85">{site.description}</p>
        </div>
      </ContentFade>

      {site.significanceNote && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.18}>
            <div className="px-7 py-5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-gold/70 mb-2">
                Why this site matters
              </h3>
              <p className="text-[14px] leading-[1.75] text-text/85">{site.significanceNote}</p>
            </div>
          </ContentFade>
        </>
      )}

      <div className="divider-fade mx-7" />
      <ContentFade delay={0.22}>
        <div className="px-7 py-5 space-y-2">
          <p className="text-[11px] text-text-dim/60 leading-relaxed">
            Source: {site.citation}
          </p>
          {site.wikipediaUrl && (
            <a
              href={site.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-sky-400/70 hover:text-sky-300 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                <path d="M8 5.5V8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h2.5M6 1h3v3M9 1L4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Wikipedia
            </a>
          )}
          {site.externalLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-sky-400/70 hover:text-sky-300 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                <path d="M8 5.5V8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h2.5M6 1h3v3M9 1L4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      </ContentFade>
    </>
  );
}

function PrehistoricSiteDetail({ id, eraId }: { id: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const place = useMemo(() => getPlace(id), [id]);
  if (!place) return null;

  const state = place.eraStates[eraId] ?? Object.values(place.eraStates)[0];
  if (!state) return null;

  const kindLabel = PLACE_KIND_LABELS[place.kind] ?? 'Archaeological Site';
  const tags = state.affiliationTags;
  const region = getAtlasRegion(place.regionId);
  const regionNarrative = region?.narrativeByEra?.[eraId];
  const era = getAtlasEra(eraId);
  const eraLabel = era ? pickI18n(era.label, locale) : eraId;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
              {kindLabel}
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 bg-chrome-fill-badge px-2.5 py-1 rounded-md border border-chrome-border">
              {eraLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {state.label}
          </h2>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          {tags.length > 0 && <FactRow label="Tags" value={tags.join(', ')} />}
          {region && <FactRow label="Region" value={pickI18n(region.name, locale)} />}
        </div>
      </ContentFade>

      {regionNarrative && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.14}>
            <div className="px-7 py-5">
              <SectionLabel>Context</SectionLabel>
              <p className="text-[14px] leading-[1.75] text-text/85">{pickI18n(regionNarrative, locale)}</p>
            </div>
          </ContentFade>
        </>
      )}

      <div className="divider-fade mx-7" />
      <ContentFade delay={0.18}>
        <div className="px-7 py-5">
          <p className="text-[11px] text-text-dim/50 italic leading-relaxed">
            Boundaries and attributions for pre-Roman sites are approximate, based on archaeological synthesis and scholarly interpretation.
          </p>
        </div>
      </ContentFade>
    </>
  );
}

function AtlasPersonDetail({ personId, eraId }: { personId: string; eraId: string }) {
  const person = useMemo(() => getPerson(personId), [personId]);
  if (!person) {
    return (
      <ContentFade>
        <div className="px-7 pt-8">
          <p className="text-[13px] text-text-muted">Person not found.</p>
        </div>
      </ContentFade>
    );
  }

  return (
    <>
      <ContentFade>
        <div className="px-7 pt-8 pb-2">
          <PersonDetailExpanded person={person} eraId={eraId} />
        </div>
      </ContentFade>
    </>
  );
}

function EraInfoDetail({ eraId }: { eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const era = useMemo(() => getAtlasEra(eraId), [eraId]);
  const people = useMemo(() => getPeopleForEra(eraId), [eraId]);
  const regions = useMemo(() => getVisibleRegions(eraId), [eraId]);
  const places = useMemo(() => getVisiblePlaces(eraId), [eraId]);

  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? people.length - 1 : i - 1));
  }, [people.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i >= people.length - 1 ? 0 : i + 1));
  }, [people.length]);

  if (!era) return null;

  const rangeLabel = `${era.range.start} – ${era.range.end}`;
  const safeIndex = Math.min(activeIndex, people.length - 1);
  const currentPerson = people[safeIndex];

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              Era Overview
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim/60 bg-chrome-fill-badge px-2.5 py-1 rounded-md border border-chrome-border">
              {rangeLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {pickI18n(era.label, locale)}
          </h2>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      {era.summary && (
        <ContentFade delay={0.1}>
          <div className="px-7 py-5">
            <p className="text-[14px] leading-[1.75] text-text/85">{pickI18n(era.summary, locale)}</p>
          </div>
        </ContentFade>
      )}

      {places.length > 0 && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.14}>
            <div className="px-7 py-5">
              <SectionLabel>Key Places</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {places.filter((p) => p.currentState.visibility !== 'faded').map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center text-[11px] text-text-muted/80 bg-chrome-fill-badge px-2.5 py-1 rounded-md border border-chrome-border"
                  >
                    {p.currentState.label}
                  </span>
                ))}
              </div>
            </div>
          </ContentFade>
        </>
      )}

      {regions.length > 0 && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.18}>
            <div className="px-7 py-5">
              <SectionLabel>Regions</SectionLabel>
              <div className="space-y-4">
                {regions.map((r) => {
                  const narrative = r.narrativeByEra?.[eraId];
                  return (
                    <div key={r.id}>
                      <h4 className="text-[13px] font-semibold text-parchment/90 mb-1">{pickI18n(r.name, locale)}</h4>
                      <div className="flex items-center gap-2 mb-1.5">
                        {r.currentState.fillIntent && (
                          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-text-dim/50 bg-chrome-fill-badge px-2 py-0.5 rounded border border-chrome-border">
                            {r.currentState.fillIntent}
                          </span>
                        )}
                      </div>
                      {narrative && (
                        <p className="text-[12px] leading-[1.7] text-text-muted/80">{pickI18n(narrative, locale)}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ContentFade>
        </>
      )}

      {people.length > 0 && (
        <>
          <div className="divider-fade mx-7" />
          <ContentFade delay={0.22}>
            <div className="px-7 py-5 pb-8">
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>Notable Figures</SectionLabel>
                {people.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goPrev}
                      className="w-7 h-7 flex items-center justify-center rounded-md bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all duration-150 border border-transparent hover:border-chrome-border"
                      aria-label="Previous person"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span className="text-[11px] font-mono text-text-dim/60 tabular-nums min-w-[3ch] text-center">
                      {safeIndex + 1}/{people.length}
                    </span>
                    <button
                      onClick={goNext}
                      className="w-7 h-7 flex items-center justify-center rounded-md bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all duration-150 border border-transparent hover:border-chrome-border"
                      aria-label="Next person"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {currentPerson && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPerson.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-lg border border-chrome-border bg-chrome-fill-badge p-5"
                  >
                    <PersonDetailExpanded person={currentPerson} eraId={eraId} />
                  </motion.div>
                </AnimatePresence>
              )}

              {people.length > 1 && (
                <div className="flex justify-center gap-1 mt-4">
                  {people.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        i === safeIndex
                          ? 'bg-gold/60 scale-125'
                          : 'bg-chrome-fill-pressed hover:bg-chrome-fill-active'
                      }`}
                      aria-label={`Go to ${p.displayName}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </ContentFade>
        </>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Atlas Route Detail
// ---------------------------------------------------------------------------

const SEGMENT_KIND_LABELS: Record<string, string> = {
  migration: 'Migration',
  trade: 'Trade',
  exploration: 'Exploration',
  military: 'Military',
  invasion: 'Invasion',
  expansion: 'Expansion',
  settlement: 'Settlement',
  settlement_corridor: 'Settlement Corridor',
  river_corridor: 'River Corridor',
  raid: 'Raid',
  incursion: 'Incursion',
  maritime_corridor: 'Maritime Corridor',
};

const EVIDENCE_LABELS: Record<string, string> = {
  documentary_cluster: 'High confidence — documentary sources',
  synthesis: 'Medium confidence — historical synthesis',
  archaeological: 'High confidence — archaeological evidence',
  tradition: 'Low confidence — oral tradition',
};

function AtlasRouteDetail({ segmentId, eraId }: { segmentId: string; eraId: string }) {
  const locale = useMapStore((s) => s.locale);
  const segment = useMemo(() => getSegment(segmentId), [segmentId]);
  const journey = useMemo(
    () => (segment?.journeyId ? getJourney(segment.journeyId) : undefined),
    [segment?.journeyId],
  );
  const fromPlace = useMemo(() => (segment ? getPlace(segment.fromPlaceId) : undefined), [segment]);
  const toPlace = useMemo(() => (segment ? getPlace(segment.toPlaceId) : undefined), [segment]);

  const onFollowCoutureStory = useCallback(() => {
    const { startStory, closeDetail } = useMapStore.getState();
    startStory('guillaume-couture');
    closeDetail();
  }, []);

  if (!segment) {
    return (
      <div className="px-6 py-8 text-center text-[13px] text-text-dim/60">
        Route segment not found.
      </div>
    );
  }

  const fromLabel = fromPlace?.eraStates[eraId]?.label ?? segment.fromPlaceId;
  const toLabel = toPlace?.eraStates[eraId]?.label ?? segment.toPlaceId;

  return (
    <>
      <div className="px-6 pt-5 pb-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-cyan-400/80">
            {SEGMENT_KIND_LABELS[segment.kind] ?? segment.kind}
          </span>
          <span className="text-[9px] uppercase tracking-[0.12em] text-text-dim/50">
            {EVIDENCE_LABELS[segment.evidence] ?? segment.evidence}
          </span>
        </div>

        <h2 className="text-[18px] font-display font-bold text-parchment leading-tight tracking-wide">
          {segment.segmentTooltip ? pickI18n(segment.segmentTooltip, locale) : `${fromLabel} → ${toLabel}`}
        </h2>

        {segment.yearRange && (
          <span className="inline-flex items-center gap-1.5 text-[10px] text-text-dim/70 bg-chrome-fill-badge px-2 py-0.5 rounded-md border border-chrome-border">
            {segment.yearRange[0]}–{segment.yearRange[1]}
          </span>
        )}
      </div>

      <ContentFade>
        <div className="px-6 space-y-4 pb-6">
          <div className="flex items-center gap-3 text-[12px] text-text/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold/50" />
              {fromLabel}
            </span>
            <span className="text-text-dim/40">→</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400/50" />
              {toLabel}
            </span>
          </div>

          {segment.segmentDetail && (
            <p className="text-[13px] leading-relaxed text-text/75">
              {pickI18n(segment.segmentDetail, locale)}
            </p>
          )}

          {segment.normanRelated && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/[0.06] border border-gold/[0.12]">
              <span className="w-2 h-2 rounded-full bg-gold/60" />
              <span className="text-[11px] text-gold/80">
                {segment.normanOriginNote ? pickI18n(segment.normanOriginNote, locale) : 'Connected to Norman origins'}
              </span>
            </div>
          )}

          {journey && (
            <div className="space-y-1 pt-2 border-t border-chrome-border">
              <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-text-dim/60">
                Part of journey
              </span>
              <h3 className="text-[13px] font-medium text-text/85">
                {pickI18n(journey.name, locale)}
              </h3>
              <p className="text-[12px] leading-relaxed text-text/60">
                {pickI18n(journey.summary, locale)}
              </p>
            </div>
          )}

          <ReadingLinksSection links={segment.readingLinks} locale={locale} className="pt-2 border-t border-chrome-border" />

          {journey?.id === 'journey-couture' && (journey.surnameNote || journey.longForm) && (
            <div className="space-y-4 pt-4 border-t border-chrome-border-strong">
              {journey.surnameNote && (
                <div className="space-y-2">
                  <SectionLabel>{t('coutureStory.surnameHeading', locale)}</SectionLabel>
                  <p className="text-[12px] leading-relaxed text-text/72 whitespace-pre-line">
                    {pickI18n(journey.surnameNote, locale)}
                  </p>
                </div>
              )}
              {journey.longForm && (
                <div className="space-y-2">
                  <SectionLabel>{t('coutureStory.fullStoryHeading', locale)}</SectionLabel>
                  <div className="space-y-3">
                    {pickI18n(journey.longForm, locale)
                      .split(/\n\n+/)
                      .map((paragraph, i) => (
                        <p key={i} className="text-[12px] leading-relaxed text-text/75">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={onFollowCoutureStory}
                className="w-full rounded-xl border border-gold/25 bg-gold/[0.08] px-4 py-3 text-[13px] font-medium text-gold/95 hover:bg-gold/[0.12] hover:border-gold/35 transition-colors"
              >
                {t('coutureStory.followMap', locale)}
              </button>
            </div>
          )}
        </div>
      </ContentFade>
    </>
  );
}

function TimelineMarkerDetail({ id }: { id: string }) {
  const locale = useMapStore((s) => s.locale);
  const marker = useMemo(() => getMarkerById(id), [id]);
  if (!marker) return null;

  const yearStr = marker.year < 0 ? `${Math.abs(marker.year)} BC` : `${marker.year} AD`;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/70 bg-gold/[0.06] px-2.5 py-1 rounded-md border border-gold/10">
              {marker.kind}
            </span>
            <span className="text-[10px] font-semibold tabular-nums text-text-dim/70">{yearStr}</span>
          </div>
        </ContentFade>
        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {pickI18n(marker.label, locale)}
          </h2>
        </ContentFade>
      </div>
      {marker.detail && (
        <>
          <div className="accent-line-gold mx-7" />
          <ContentFade delay={0.1}>
            <div className="px-7 py-5">
              <p className="text-[14px] leading-[1.75] text-text/85">{pickI18n(marker.detail, locale)}</p>
            </div>
          </ContentFade>
        </>
      )}
    </>
  );
}

function DetailContent({ selectedId, selectionKind, eraId }: { selectedId: string; selectionKind: string; eraId: string }) {
  return (
    <>
      {selectionKind === 'historical-macro-region' ? (
        <HistoricalMacroRegionDetail regionId={selectedId} />
      ) : selectionKind === 'atlas-timeline-marker' ? (
        <TimelineMarkerDetail id={selectedId} />
      ) : selectionKind === 'atlas-person' ? (
        <AtlasPersonDetail personId={selectedId} eraId={eraId} />
      ) : selectionKind === 'era-info' ? (
        <EraInfoDetail eraId={selectedId} />
      ) : selectionKind === 'evidence' ? (
        <EvidenceDetail id={selectedId} />
      ) : selectionKind === 'norman-site' ? (
        <NormanSiteDetail id={selectedId} />
      ) : selectionKind === 'nf-ydna-lineage' ? (
        <YdnaLineageDetail id={selectedId} />
      ) : selectionKind === 'nf-mtdna-lineage' ? (
        <MtDnaLineageDetail id={selectedId} />
      ) : selectionKind === 'user-ancestry-pin' ? (
        <UserAncestryPinDetail selectedId={selectedId} />
      ) : selectionKind === 'viking-adna-site' ? (
        <VikingAdnaSiteDetail id={selectedId} />
      ) : selectionKind === 'viking-archaeology-site' ? (
        <VikingArchaeologySiteDetail id={selectedId} />
      ) : selectionKind === 'prehistoric-site' ? (
        <PrehistoricSiteDetail id={selectedId} eraId={eraId} />
      ) : selectionKind === 'atlas-route' ? (
        <AtlasRouteDetail segmentId={selectedId} eraId={eraId} />
      ) : selectionKind === 'settlement' ? (
        <SettlementDetail id={selectedId} eraId={eraId} />
      ) : (
        <RegionDetail id={selectedId} eraId={eraId} />
      )}
    </>
  );
}

function MobileDetailSheet({
  show,
  selectedId,
  selectionKind,
  eraId,
  onClose,
}: {
  show: boolean;
  selectedId: string | null;
  selectionKind: string | null;
  eraId: string;
  onClose: () => void;
}) {
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 100 || info.velocity.y > 500) {
        onClose();
      }
    },
    [onClose],
  );

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {show && selectedId && (
        <>
          <motion.div
            key="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[85] bg-black/45 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            key={`mobile-${selectionKind}-${selectedId}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="atlas-bottom-sheet atlas-mobile-detail-fullscreen"
          >
            <div className="sheet-handle" />

            <div className="flex items-center justify-end px-4 pb-1">
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all touch-target"
                aria-label="Close panel"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="sheet-content scrollbar-thin pb-6">
              <DetailContent selectedId={selectedId!} selectionKind={selectionKind ?? 'region'} eraId={eraId} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

const SELECTION_TO_EVENT: Partial<Record<SelectionKind, AtlasEventType>> = {
  settlement: 'place_open',
  region: 'region_open',
  'historical-macro-region': 'region_open',
  'atlas-route': 'segment_open',
  'atlas-journey': 'journey_open',
  'atlas-person': 'place_open',
  'prehistoric-site': 'place_open',
  'norman-site': 'place_open',
  'nf-ydna-lineage': 'place_open',
  'nf-mtdna-lineage': 'place_open',
  'user-ancestry-pin': 'place_open',
  'evidence': 'place_open',
  'viking-adna-site': 'place_open',
  'viking-archaeology-site': 'place_open',
};

function CollapsedRail({ onExpand }: { onExpand: () => void }) {
  const locale = useMapStore((s) => s.locale);
  const tooltipLabel = t('detail.fab.tooltipLabel', locale);
  const tooltipHint = t('detail.fab.tooltipHint', locale);
  return (
    <ChromeIconTooltip
      label={tooltipLabel}
      hint={tooltipHint}
      wrapperClassName="flex h-full w-10 flex-shrink-0"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={onExpand}
        aria-expanded={false}
        aria-label={t('detail.fab.aria', locale)}
        className="z-30 flex h-full w-full flex-col items-center justify-center border-l border-chrome-border-strong bg-chrome-popover/80 hover:bg-chrome-popover transition-colors duration-150 cursor-pointer"
        style={{
          backdropFilter: 'blur(40px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
        }}
      >
        <BookOpen className="h-[18px] w-[18px] text-gold/90" strokeWidth={1.6} />
      </motion.button>
    </ChromeIconTooltip>
  );
}

function MinimizeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-chrome-fill hover:bg-chrome-fill-active text-text-dim hover:text-text-muted transition-all duration-150 border border-transparent hover:border-chrome-border touch-target z-10"
      aria-label="Collapse panel"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

const HINT_STORAGE_KEY = 'atlas_detail_fab_hint_v1';

function MobileDetailReopenFab({ onReopen }: { onReopen: () => void }) {
  const reducedMotion = useReducedMotion();
  const locale = useMapStore((s) => s.locale);
  const storyMode = useMapStore((s) => s.storyMode);
  const selectionKind = useMapStore((s) => s.selectionKind);
  const isStoryEra = storyMode && selectionKind === 'era-info';
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (isStoryEra) {
      setShowHint(true);
      return;
    }
    try {
      if (!localStorage.getItem(HINT_STORAGE_KEY)) setShowHint(true);
    } catch { /* private browsing */ }
  }, [isStoryEra]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    if (!isStoryEra) {
      try { localStorage.setItem(HINT_STORAGE_KEY, '1'); } catch { /* */ }
    }
  }, [isStoryEra]);

  const handleClick = useCallback(() => {
    dismissHint();
    onReopen();
  }, [dismissHint, onReopen]);

  if (typeof document === 'undefined') return null;

  const pulseBoxShadow = reducedMotion
    ? '0 0 10px rgba(212,175,55,0.18), 0 2px 12px rgba(0,0,0,0.25)'
    : undefined;

  const tooltipLabel = t('detail.fab.tooltipLabel', locale);
  const tooltipHint = t('detail.fab.tooltipHint', locale);

  return createPortal(
    <div className="fixed top-52 right-3 z-40 pointer-events-auto flex flex-col items-end gap-2">
      <ChromeIconTooltip label={tooltipLabel} hint={tooltipHint}>
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            reducedMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  boxShadow: [
                    '0 0 8px rgba(212,175,55,0.12), 0 2px 12px rgba(0,0,0,0.25)',
                    '0 0 16px rgba(212,175,55,0.28), 0 2px 12px rgba(0,0,0,0.25)',
                    '0 0 8px rgba(212,175,55,0.12), 0 2px 12px rgba(0,0,0,0.25)',
                  ],
                }
          }
          exit={{ opacity: 0, scale: 0.8 }}
          transition={
            reducedMotion
              ? { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
              : {
                  opacity: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                  scale: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                  boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }
          }
          onClick={handleClick}
          aria-label={t('detail.fab.aria', locale)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-chrome-popover/95 backdrop-blur-xl touch-target"
          style={pulseBoxShadow ? { boxShadow: pulseBoxShadow } : undefined}
        >
          <BookOpen className="h-[18px] w-[18px] text-gold/90" strokeWidth={1.6} />
        </motion.button>
      </ChromeIconTooltip>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, delay: 0.4 }}
            className="rounded-lg border border-chrome-border bg-chrome-popover/95 px-3 py-2 backdrop-blur-xl max-w-[180px]"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px var(--color-chrome-tooltip-ring)' }}
          >
            <p className="text-[11px] leading-snug text-parchment/90">
              {t(isStoryEra ? 'detail.fab.hintStoryEra' : 'detail.fab.hint', locale)}
            </p>
            <button
              type="button"
              onClick={dismissHint}
              className="mt-1.5 text-[10px] font-medium text-gold/70 hover:text-gold transition-colors"
            >
              {t('detail.fab.hintDismiss', locale)}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default function HistoricalDetailPanel() {
  const selectedId = useMapStore((s) => s.selectedFeatureId);
  const selectionKind = useMapStore((s) => s.selectionKind);
  const detailOpen = useMapStore((s) => s.detailPanelOpen);
  const expanded = useMapStore((s) => s.detailPanelExpanded);
  const eraId = useMapStore((s) => s.eraId);
  const closeDetail = useMapStore((s) => s.closeDetail);
  const setExpanded = useMapStore((s) => s.setDetailPanelExpanded);
  const storyMode = useMapStore((s) => s.storyMode);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);
  const isMobile = useIsMobile();

  const show = detailOpen && !!selectedId;

  const handleExpand = useCallback(() => setExpanded(true), [setExpanded]);
  const handleCollapse = useCallback(() => setExpanded(false), [setExpanded]);

  const dwellStartRef = useRef<number>(0);
  const lastEmittedRef = useRef<string | null>(null);
  const prevStoryModeRef = useRef(false);

  useEffect(() => {
    if (!isMobile) {
      prevStoryModeRef.current = storyMode;
      return;
    }
    if (storyMode && !prevStoryModeRef.current) {
      setExpanded(false);
    }
    prevStoryModeRef.current = storyMode;
  }, [isMobile, storyMode, setExpanded]);

  useEffect(() => {
    if (!show || !selectedId || !selectionKind) return;

    const eventType = SELECTION_TO_EVENT[selectionKind];
    if (!eventType) return;

    dwellStartRef.current = Date.now();
    const emitKey = `${selectionKind}:${selectedId}`;

    if (lastEmittedRef.current !== emitKey) {
      emitProgressEvent(eventType, selectedId, { eraId });
      emitProgressEvent('era_visit', eraId, { eraId });
      lastEmittedRef.current = emitKey;
    }

    return () => {
      const dwell = Date.now() - dwellStartRef.current;
      if (dwell > 1500 && eventType) {
        emitProgressEvent(eventType, selectedId, { eraId, dwellMs: dwell });
      }
    };
  }, [show, selectedId, selectionKind, eraId]);

  if (storyEraIntroActive) return null;

  if (isMobile) {
    return (
      <>
        <MobileDetailSheet
          show={show && expanded}
          selectedId={selectedId}
          selectionKind={selectionKind}
          eraId={eraId}
          onClose={handleCollapse}
        />
        <AnimatePresence>
          {show && !expanded && (
            <MobileDetailReopenFab onReopen={handleExpand} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {show && !expanded && (
        <CollapsedRail key="collapsed-rail" onExpand={handleExpand} />
      )}
      {show && expanded && (
        <motion.aside
          key={`${selectionKind}-${selectedId}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          className="z-30 flex h-full w-[min(420px,100vw)] max-md:absolute max-md:right-0 max-md:top-0 max-md:min-h-0 max-md:max-h-full flex-col border-l border-chrome-border-strong bg-chrome-popover max-md:shadow-atlas-detail-mobile md:w-[min(420px,90vw)] md:shrink-0 md:shadow-atlas-detail-desktop"
          style={{
            backdropFilter: 'blur(40px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
          }}
        >
          <MinimizeButton onClick={handleCollapse} />

          <div className="flex-1 overflow-y-auto scrollbar-thin pb-6 pt-1">
            <DetailContent selectedId={selectedId!} selectionKind={selectionKind ?? 'region'} eraId={eraId} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
