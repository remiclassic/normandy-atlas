'use client';

import { useCallback, useEffect, useState } from 'react';
import CommandPalette from '@/components/command-palette/CommandPalette';
import { OPEN_COMMAND_PALETTE_EVENT } from '@/lib/command-palette/open-command-palette';

export default function CommandPaletteHost() {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpenRequest = () => setOpen(true);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return;
      const el = e.target as HTMLElement | null;
      if (el?.getAttribute('data-command-palette-input') === 'true') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (el?.isContentEditable) return;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      setOpen((o) => !o);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!open) return null;
  return <CommandPalette open={open} onClose={onClose} />;
}
