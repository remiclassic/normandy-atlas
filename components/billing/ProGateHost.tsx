'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ProGateReason } from '@/lib/billing/types';
import ProUpgradeModal from '@/components/billing/ProUpgradeModal';

const GATE_EVENT = 'norman-atlas-pro-gate';

/** Listens for upgrade prompts from map + lineage gates; keeps story mode uninterrupted. */
export default function ProGateHost() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ProGateReason | null>(null);

  const onClose = useCallback(() => {
    setOpen(false);
    setReason(null);
  }, []);

  useEffect(() => {
    const handler = (ev: Event) => {
      const ce = ev as CustomEvent<{ reason?: ProGateReason }>;
      const r = ce.detail?.reason;
      setReason(r === 'macro_csv' || r === 'lineage_compare' || r === 'macro_compare' ? r : 'macro_compare');
      setOpen(true);
    };
    window.addEventListener(GATE_EVENT, handler);
    return () => window.removeEventListener(GATE_EVENT, handler);
  }, []);

  return <ProUpgradeModal open={open} reason={reason} onClose={onClose} />;
}

export function emitProGate(reason: ProGateReason): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(GATE_EVENT, { detail: { reason } }));
}
