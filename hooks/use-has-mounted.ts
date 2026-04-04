'use client';

import { useEffect, useState } from 'react';

/** True only after mount — avoids SSR vs localStorage mismatch (e.g. profile / ledger UI). */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
