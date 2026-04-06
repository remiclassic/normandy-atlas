import { Suspense } from 'react';
import DeepOriginsClient from '@/components/ancestry/DeepOriginsClient';

export default function GenealogyDeepOriginsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-[var(--color-background)] text-[13px] text-text-dim">
          Loading…
        </div>
      }
    >
      <DeepOriginsClient />
    </Suspense>
  );
}
