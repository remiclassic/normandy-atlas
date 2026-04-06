'use client';

import { memo } from 'react';
import type { PaletteResult } from '@/lib/command-palette/types';

const CommandItem = memo(function CommandItem({
  result,
  active,
  onPick,
  idPrefix,
}: {
  result: PaletteResult;
  active: boolean;
  onPick: () => void;
  idPrefix: string;
}) {
  const rowId = `${idPrefix}-${result.kind}-${result.id}`;

  const primary =
    result.kind === 'command'
      ? result.command.label
      : result.kind === 'story'
        ? result.label
        : result.label;

  const secondary =
    result.kind === 'command'
      ? (result.command.description ?? result.command.group)
      : result.kind === 'story'
        ? result.arcId
          ? `Arc · ${result.arcId}`
          : 'Full timeline'
        : result.kind === 'place'
          ? 'Place'
          : result.kind === 'person'
            ? 'Person'
            : null;

  return (
    <button
      type="button"
      id={rowId}
      role="option"
      aria-selected={active}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onPick}
      className={[
        'flex w-full flex-col gap-0.5 rounded-md px-3 py-2 text-left text-[13px] transition-colors',
        active
          ? 'bg-cyan-500/15 text-parchment ring-1 ring-cyan-400/35'
          : 'text-parchment/90 hover:bg-white/5',
      ].join(' ')}
    >
      <span className="font-medium leading-tight">{primary}</span>
      {secondary ? (
        <span className="text-[11px] uppercase tracking-wide text-text-muted">{secondary}</span>
      ) : null}
    </button>
  );
});

export default CommandItem;
