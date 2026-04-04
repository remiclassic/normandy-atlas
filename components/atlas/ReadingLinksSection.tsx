'use client';

import { memo } from 'react';
import type { AtlasReadingLink, AtlasLocale, ReadingLinkKind } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';

const KIND_KEY_MAP: Record<ReadingLinkKind, `sources.kind.${ReadingLinkKind}`> = {
  primary: 'sources.kind.primary',
  synthesis: 'sources.kind.synthesis',
  popular: 'sources.kind.popular',
  museum: 'sources.kind.museum',
  database: 'sources.kind.database',
};

const ExternalIcon = memo(function ExternalIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 opacity-50 group-hover/link:opacity-80 transition-opacity"
      aria-hidden
    >
      <path
        d="M4.5 1.5H2.25A.75.75 0 001.5 2.25v7.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75V7.5M7.5 1.5h3m0 0v3m0-3L5.25 6.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

const ReadingLinksSection = memo(function ReadingLinksSection({
  links,
  locale,
  className,
}: {
  links: AtlasReadingLink[] | undefined;
  locale: AtlasLocale;
  className?: string;
}) {
  if (!links || links.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">
        {t('sources.sectionTitle', locale)}
      </h3>
      <ul className="space-y-2">
        {links.map((link, i) => {
          const label = pickI18n(link.label, locale);
          const note = link.note ? pickI18n(link.note, locale) : undefined;
          const kindKey = link.kind ? KIND_KEY_MAP[link.kind] : undefined;

          return (
            <li key={link.url + i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-start gap-2.5 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-3 py-2.5 hover:border-gold/20 hover:bg-gold/[0.04] transition-colors"
                title={t('sources.opensExternal', locale)}
              >
                <ExternalIcon />
                <div className="min-w-0 flex-1">
                  <span className="text-[12px] leading-snug text-text/80 group-hover/link:text-gold/90 transition-colors line-clamp-2">
                    {label}
                  </span>
                  {(note || kindKey) && (
                    <span className="flex items-center gap-2 mt-1">
                      {kindKey && (
                        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-gold/40 bg-gold/[0.06] px-1.5 py-0.5 rounded">
                          {t(kindKey, locale)}
                        </span>
                      )}
                      {note && (
                        <span className="text-[11px] text-text-dim/60 italic truncate">
                          {note}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default ReadingLinksSection;
