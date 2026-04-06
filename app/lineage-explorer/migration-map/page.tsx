import { Suspense } from 'react';
import MigrationMapPageClient from '@/components/lineage-explorer/MigrationMapPageClient';

export default function LineageMigrationMapPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-[var(--color-background)] text-[13px] text-text-dim">
          Loading…
        </div>
      }
    >
      <MigrationMapPageClient />
    </Suspense>
  );
}
