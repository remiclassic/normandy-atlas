'use client';

import { memo, useCallback, useMemo, useRef } from 'react';
import { Layers } from 'lucide-react';
import type { AtlasEra, AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { formatYear } from '@/lib/era-selector-model';
import { EraGlyph } from '@/lib/era-selector-icons';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import { t } from '@/lib/ui-strings';

export type EraFilterValue = 'all' | string;

interface Props {
  eras: AtlasEra[];
  value: EraFilterValue;
  onChange: (value: EraFilterValue) => void;
  locale: AtlasLocale;
}

function eraRangeHint(era: AtlasEra): string {
  return `${formatYear(era.range.start)} – ${formatYear(era.range.end)}`;
}

export const StoryLibraryEraFilterBar = memo(function StoryLibraryEraFilterBar({
  eras,
  value,
  onChange,
  locale,
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  const allValues = useMemo(() => ['all' as const, ...eras.map((e) => e.id)], [eras]);

  const allErasLabel = t('storyLibrary.filter.allEras', locale);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = allValues.indexOf(value);
      if (idx < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = allValues[(idx + 1) % allValues.length];
        onChange(next);
        focusPill(barRef.current, next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = allValues[(idx - 1 + allValues.length) % allValues.length];
        onChange(prev);
        focusPill(barRef.current, prev);
      }
    },
    [value, onChange, allValues],
  );

  if (eras.length === 0) return null;

  return (
    <div
      ref={barRef}
      role="tablist"
      aria-label={t('storyLibrary.aria.eraFilterBar', locale)}
      className="flex flex-wrap items-center gap-2 border-t px-4 py-3 lg:px-5"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      onKeyDown={handleKeyDown}
    >
      <ChromeIconTooltip label={allErasLabel} wrapperRole="presentation">
        <button
          key="all-eras"
          role="tab"
          type="button"
          aria-selected={value === 'all'}
          aria-label={allErasLabel}
          tabIndex={value === 'all' ? 0 : -1}
          data-era-filter="all"
          onClick={() => onChange('all')}
          className={iconTabClass(value === 'all')}
        >
          <Layers className="h-4 w-4" strokeWidth={1.6} aria-hidden />
        </button>
      </ChromeIconTooltip>

      {eras.map((era) => {
        const active = value === era.id;
        const eraLabel = pickI18n(era.label, locale);
        return (
          <ChromeIconTooltip
            key={era.id}
            label={eraLabel}
            hint={eraRangeHint(era)}
            wrapperRole="presentation"
          >
            <button
              role="tab"
              type="button"
              aria-selected={active}
              aria-label={eraLabel}
              tabIndex={active ? 0 : -1}
              data-era-filter={era.id}
              onClick={() => onChange(era.id)}
              className={iconTabClass(active)}
            >
              <EraGlyph id={era.id} className="relative z-10 h-4 w-4" />
            </button>
          </ChromeIconTooltip>
        );
      })}
    </div>
  );
});

function iconTabClass(active: boolean): string {
  return [
    'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 outline-none',
    'focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
    active
      ? 'border-amber-400/40 bg-amber-500/20 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.12)]'
      : 'border-white/10 bg-white/[0.06] text-white/55 hover:bg-white/[0.1] hover:text-white/85',
  ].join(' ');
}

function focusPill(container: HTMLElement | null, filter: EraFilterValue) {
  if (!container) return;
  const want = filter === 'all' ? 'all' : filter;
  const buttons = container.querySelectorAll<HTMLButtonElement>('[data-era-filter]');
  for (const btn of buttons) {
    if (btn.dataset.eraFilter === want) {
      btn.focus();
      break;
    }
  }
}
