import { Suspense } from 'react';
import LineageCompareClient from '@/components/lineage-explorer/LineageCompareClient';

export default function LineageComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-text-dim">Loading…</div>
      }
    >
      <LineageCompareClient />
    </Suspense>
  );
}
