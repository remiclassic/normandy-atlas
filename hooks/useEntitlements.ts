'use client';

import { useEffect, useState } from 'react';
import type { EntitlementsResponse } from '@/lib/billing/types';
import { getPublicEntitlements } from '@/lib/billing/public-entitlements';

export function useEntitlements(): { loading: boolean; data: EntitlementsResponse | null } {
  const [data, setData] = useState<EntitlementsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void getPublicEntitlements()
      .then((j) => {
        if (!cancelled) setData(j);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, data };
}
