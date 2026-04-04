import type { CSSProperties } from 'react';

/**
 * Set on hub shell columns (header + ReferenceHubTabs + scroll region) so in-content
 * headings can use `scroll-mt-[var(--atlas-hub-sticky-offset,...)]`.
 */
export const atlasHubShellStyle = {
  '--atlas-hub-sticky-offset':
    'calc(env(safe-area-inset-top, 0px) + 7.75rem + 0.5rem)',
} as CSSProperties;
