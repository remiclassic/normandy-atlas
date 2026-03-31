'use client';

import { memo, useCallback, useState } from 'react';
import { arcChromeStyle, type EraArcEntry } from '@/data/atlas/era-arcs';
import type { StoryLibraryRowModel } from '@/lib/story-library-build';
import type { AtlasLocale } from '@/core/types';
import type { UiTheme } from '@/lib/ui-theme';
import { pickI18n } from '@/lib/locale';
import { t, type UiStringKey } from '@/lib/ui-strings';
import type { StoryCategory } from '@/data/atlas/story-library-meta';
import { getAtlasEra } from '@/core/era/engine';
import type { StoryProgressRecord } from '@/lib/story-progress';
import { Link2 } from 'lucide-react';

function categoryLabelKey(c: StoryCategory): UiStringKey {
  const m: Record<StoryCategory, UiStringKey> = {
    Origins: 'storyLibrary.category.origins',
    Conquest: 'storyLibrary.category.conquest',
    Expansion: 'storyLibrary.category.expansion',
    Exploration: 'storyLibrary.category.exploration',
    'New France': 'storyLibrary.category.newFrance',
    People: 'storyLibrary.category.people',
    Legacy: 'storyLibrary.category.legacy',
  };
  return m[c];
}

function replaceCount(template: string, count: number | string): string {
  return template.replace(/\{count\}/g, String(count));
}

function replacePct(template: string, pct: number): string {
  return template.replace(/\{pct\}/g, String(Math.round(pct)));
}

function replaceEra(template: string, era: string): string {
  return template.replace(/\{era\}/g, era);
}

export const StoryLibraryCard = memo(function StoryLibraryCard({
  row,
  locale,
  uiTheme,
  variant,
  progress,
  onPlay,
  onResume,
}: {
  row: StoryLibraryRowModel;
  locale: AtlasLocale;
  uiTheme: UiTheme;
  variant: 'default' | 'hero';
  progress?: StoryProgressRecord;
  onPlay: () => void;
  onResume: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const entry: EraArcEntry | null = row.arcEntry;
  const st = entry ? arcChromeStyle(entry, uiTheme) : null;

  const title = row.meta.displayTitle
    ? pickI18n(row.meta.displayTitle, locale)
    : entry
      ? pickI18n(entry.label, locale)
      : '';

  const blurb = pickI18n(row.meta.blurb, locale);
  const hook = row.meta.hook ? pickI18n(row.meta.hook, locale) : '';

  const canResume = Boolean(progress && !progress.completed && progress.lastStep > 0);
  const completed = Boolean(progress?.completed);
  const pct =
    row.sceneCount > 0 && progress
      ? ((progress.lastStep + 1) / row.sceneCount) * 100
      : 0;

  const recommended =
    row.meta.recommendedEraId != null
      ? (() => {
          const era = getAtlasEra(row.meta.recommendedEraId);
          if (!era) return null;
          return replaceEra(t('storyLibrary.startsInEra', locale), pickI18n(era.label, locale));
        })()
      : null;

  const onCopyLink = useCallback(() => {
    if (typeof window === 'undefined') return;
    const u = new URL(window.location.href);
    u.search = '';
    const storyKey = row.meta.arcId ?? '';
    u.searchParams.set('story', storyKey);
    u.searchParams.set('step', String(progress?.lastStep ?? 0));
    void navigator.clipboard.writeText(u.toString()).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [row.meta.arcId, progress?.lastStep]);

  const borderRing = st
    ? `${st.border} ${st.borderHover}`
    : 'border-cyan-400/20 hover:border-cyan-400/35';

  const hero = variant === 'hero';

  return (
    <article
      className={`rounded-2xl overflow-hidden border bg-chrome-popover/90 backdrop-blur-md transition-shadow duration-200 ${
        hero ? `shadow-lg shadow-black/20 ${borderRing}` : `${borderRing} hover:shadow-md hover:shadow-cyan-500/5`
      }`}
    >
      <div
        className={`relative ${hero ? 'min-h-[140px] sm:min-h-[160px]' : 'h-24'} bg-gradient-to-br from-chrome-shade-strong/80 via-chrome-shade/50 to-transparent`}
        style={
          entry
            ? undefined
            : {
                background: `linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 60%)`,
              }
        }
      >
        {row.meta.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.meta.thumb}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
        ) : null}
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-background/90 via-background/20 to-transparent">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-text-dim mb-1">
            {t(categoryLabelKey(row.meta.category), locale)}
          </p>
          <h3
            className={`font-display font-bold text-parchment tracking-tight ${hero ? 'text-xl sm:text-2xl' : 'text-base'}`}
          >
            {title}
          </h3>
          {(hook || hero) && hook ? (
            <p className={`mt-1.5 text-text-muted ${hero ? 'text-[13px] sm:text-sm max-w-prose' : 'text-[11px] line-clamp-2'}`}>
              {hook}
            </p>
          ) : null}
        </div>
      </div>

      <div className={`space-y-3 ${hero ? 'p-5' : 'p-4'}`}>
        <div className="flex flex-wrap gap-1.5">
          {row.meta.featured ? (
            <span className="rounded-md bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
              {t('storyLibrary.badge.featured', locale)}
            </span>
          ) : null}
          {row.meta.isNew ? (
            <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-300">
              {t('storyLibrary.badge.new', locale)}
            </span>
          ) : null}
          {canResume ? (
            <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200/90">
              {t('storyLibrary.badge.inProgress', locale)}
            </span>
          ) : null}
          {completed ? (
            <span className="rounded-md bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200/90">
              {t('storyLibrary.badge.completed', locale)}
            </span>
          ) : null}
        </div>

        <p className={`text-text-muted leading-relaxed ${hero ? 'text-[13px]' : 'text-[12px] line-clamp-3'}`}>{blurb}</p>

        <div className="flex flex-wrap gap-3 text-[11px] text-text-dim">
          <span>{replaceCount(t('storyLibrary.scenes', locale), row.sceneCount)}</span>
          {row.meta.estimatedMinutes != null ? (
            <span>{replaceCount(t('storyLibrary.durationMinutes', locale), row.meta.estimatedMinutes)}</span>
          ) : null}
          {canResume && !completed ? (
            <span className="text-gold/80">{replacePct(t('storyLibrary.progressPercent', locale), pct)}</span>
          ) : null}
        </div>

        {row.chapterTitles.length > 0 ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim mb-1.5">
              {t('storyLibrary.chapters', locale)}
            </p>
            <ul className="space-y-1 text-[12px] text-text-muted list-disc list-inside">
              {row.chapterTitles.map((ch) => (
                <li key={ch}>{ch}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {recommended ? <p className="text-[11px] text-text-dim">{recommended}</p> : null}

        <div className={`flex flex-col gap-2 ${hero ? 'sm:flex-row sm:flex-wrap' : ''}`}>
          <button
            type="button"
            onClick={onPlay}
            className={`flex min-h-[44px] items-center justify-center rounded-xl bg-gold/15 border border-gold/25 px-5 text-[13px] font-semibold text-gold hover:bg-gold/22 hover:border-gold/35 transition-colors touch-target ${hero ? 'sm:flex-1' : 'w-full'}`}
          >
            {t('storyLibrary.play', locale)}
          </button>
          {canResume ? (
            <button
              type="button"
              onClick={onResume}
              className={`flex min-h-[44px] items-center justify-center rounded-xl border border-chrome-border-bright px-5 text-[13px] font-medium text-parchment hover:bg-chrome-fill-badge transition-colors touch-target ${hero ? 'sm:flex-1' : 'w-full'}`}
            >
              {t('storyLibrary.resume', locale)}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onCopyLink}
            className="flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-transparent px-3 text-[12px] text-text-dim hover:bg-chrome-fill hover:text-text-muted touch-target"
            aria-label={t('storyLibrary.copyLink', locale)}
          >
            <Link2 className="h-3.5 w-3.5 opacity-70" aria-hidden />
            {copied ? t('storyLibrary.linkCopied', locale) : t('storyLibrary.copyLink', locale)}
          </button>
        </div>
      </div>
    </article>
  );
});
