'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';
import { createPortal } from 'react-dom';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCommandContext } from '@/hooks/useCommandContext';
import { useCommandRegistry } from '@/hooks/useCommandRegistry';
import { executePaletteResult } from '@/lib/command-palette/execute-result';
import type { PaletteResult, CommandRuntime } from '@/lib/command-palette/types';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import CommandGroup from '@/components/command-palette/CommandGroup';
import CommandItem from '@/components/command-palette/CommandItem';

function paletteOpenHintKey(): 'commandPalette.hint.openMac' | 'commandPalette.hint.openWin' {
  if (typeof navigator === 'undefined') return 'commandPalette.hint.openWin';
  const ua = navigator.userAgent;
  const platform = navigator.platform ?? '';
  const macLike =
    /Mac|iPhone|iPad|iPod/.test(platform) || /Mac OS|iPhone|iPad/.test(ua);
  return macLike ? 'commandPalette.hint.openMac' : 'commandPalette.hint.openWin';
}

const CommandPaletteSurface = memo(function CommandPaletteSurface({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ctx = useCommandContext();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [aiStubMessage, setAiStubMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();
  const rowPrefix = `${dialogId}-row`;

  const { sections, flatResults } = useCommandRegistry(ctx, query);

  const hintOpenKey = useMemo(() => paletteOpenHintKey(), []);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    setAiStubMessage(null);
    queueMicrotask(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (activeIndex >= flatResults.length) {
      setActiveIndex(Math.max(0, flatResults.length - 1));
    }
  }, [activeIndex, flatResults.length]);

  const runtime: CommandRuntime = useMemo(
    () => ({
      navigate: (path: string) => {
        router.push(path);
        onClose();
      },
      notifyAIStub: (message: string) => {
        setAiStubMessage(message);
      },
    }),
    [router, onClose],
  );

  const activeResult = flatResults[activeIndex] ?? null;

  const pick = useCallback(
    (result: PaletteResult) => {
      if (result.kind === 'command' && result.command.group === 'ai') {
        result.command.action(ctx, runtime);
        return;
      }
      executePaletteResult(result, ctx, runtime);
      onClose();
    },
    [ctx, runtime, onClose],
  );

  const onContainerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(flatResults.length - 1, 0)));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (flatResults.length > 0) pick(flatResults[Math.min(activeIndex, flatResults.length - 1)]);
      }
    },
    [activeIndex, flatResults, onClose, pick],
  );

  useEffect(() => {
    if (!open || !activeResult) return;
    const el = document.getElementById(
      `${rowPrefix}-${activeResult.kind}-${activeResult.id}`,
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeResult, rowPrefix]);

  if (!open || typeof document === 'undefined') return null;

  const ariaLabel = t('commandPalette.aria.label', ctx.locale);

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-start justify-center bg-black/55 px-3 pt-[min(12vh,120px)] backdrop-blur-[2px]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal
        aria-label={ariaLabel}
        className="flex max-h-[min(76vh,640px)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-cyan-500/25 bg-[color-mix(in_oklab,#0b0d12_96%,white)] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-black/40"
        onKeyDown={onContainerKeyDown}
      >
        <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(46,184,214,0.08),transparent)] px-4 py-3">
          <div className="flex items-start gap-3">
            <Terminal
              className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300/65"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <input
                ref={inputRef}
                data-command-palette-input="true"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('commandPalette.placeholder', ctx.locale)}
                className="w-full border-0 bg-transparent text-[15px] text-parchment outline-none placeholder:text-text-muted"
                aria-autocomplete="list"
                aria-controls={`${dialogId}-results`}
              />
              <p className="mt-1.5 text-[11px] leading-snug text-text-muted">
                {t(hintOpenKey, ctx.locale)} {t('commandPalette.hint.context', ctx.locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid max-h-[min(56vh,520px)] flex-1 grid-cols-1 divide-x divide-white/10 md:grid-cols-[1fr_280px]">
          <div
            id={`${dialogId}-results`}
            role="listbox"
            aria-label={ariaLabel}
            className="min-h-0 overflow-y-auto overscroll-contain py-2 pr-1"
          >
            {flatResults.length === 0 ? (
              <p className="px-4 py-8 text-center text-[13px] text-text-muted">
                {t('commandPalette.empty', ctx.locale)}
              </p>
            ) : (
              sections.map((section) => (
                <CommandGroup key={section.id} title={t(section.labelKey as Parameters<typeof t>[0], ctx.locale)}>
                  {section.results.map((result) => {
                    const globalIdx = flatResults.indexOf(result);
                    return (
                      <CommandItem
                        key={`${result.kind}-${result.id}`}
                        idPrefix={rowPrefix}
                        result={result}
                        active={globalIdx === activeIndex}
                        onPick={() => pick(result)}
                      />
                    );
                  })}
                </CommandGroup>
              ))
            )}
          </div>

          <aside className="hidden min-h-0 flex-col gap-3 overflow-y-auto p-4 text-[12px] text-parchment/85 md:flex">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">
                {t('commandPalette.preview.context', ctx.locale)}
              </p>
              <p className="text-text-muted">
                <span className="text-parchment/90">{t('commandPalette.preview.era', ctx.locale)}: </span>
                {ctx.currentEra ? pickI18n(ctx.currentEra.label, ctx.locale) : '—'}
              </p>
              <p className="mt-1 text-text-muted">
                <span className="text-parchment/90">{t('commandPalette.preview.region', ctx.locale)}: </span>
                {ctx.currentRegion?.label ?? '—'}
              </p>
              {ctx.regionsInViewport.length > 1 ? (
                <p className="mt-1 text-[11px] leading-snug text-text-muted">
                  {ctx.regionsInViewport
                    .slice(1, 4)
                    .map((r) => r.label)
                    .join(' · ')}
                </p>
              ) : null}
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">
                {t('commandPalette.preview.selection', ctx.locale)}
              </p>
              <p className="leading-snug text-text-muted">
                {ctx.selectedEntity
                  ? `${ctx.selectedEntity.label} (${ctx.selectedEntity.kind})`
                  : '—'}
              </p>
              {ctx.userHaplogroup ? (
                <p className="mt-2 text-[11px] text-text-muted">DNA: {ctx.userHaplogroup}</p>
              ) : null}
            </div>

            {activeResult ? (
              <div className="border-t border-white/10 pt-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
                  Active
                </p>
                {activeResult.kind === 'command' && activeResult.command.description ? (
                  <p className="leading-relaxed text-text-muted">{activeResult.command.description}</p>
                ) : (
                  <p className="leading-relaxed text-text-muted">
                    {activeResult.kind === 'command'
                      ? activeResult.command.label
                      : activeResult.kind === 'story'
                        ? activeResult.label
                        : `${activeResult.label} · ${activeResult.kind}`}
                  </p>
                )}
              </div>
            ) : null}
          </aside>
        </div>

        {aiStubMessage ? (
          <div className="border-t border-cyan-500/20 bg-cyan-950/25 px-4 py-2 text-[12px] text-cyan-100/90">
            {aiStubMessage}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
});

export default function CommandPalette(
  props: Readonly<{ open: boolean; onClose: () => void }>,
) {
  return <CommandPaletteSurface {...props} />;
}
