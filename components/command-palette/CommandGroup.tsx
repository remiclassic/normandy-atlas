'use client';

import { memo } from 'react';
import type { ReactNode } from 'react';

const CommandGroup = memo(function CommandGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="sticky top-0 z-[1] mb-1 bg-[color-mix(in_oklab,#0b0d12_96%,white)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80 backdrop-blur-sm">
        {title}
      </div>
      <div className="flex flex-col gap-0.5 px-1">{children}</div>
    </div>
  );
});

export default CommandGroup;
