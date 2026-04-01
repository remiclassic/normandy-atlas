import { memo, useMemo } from 'react';
import { getEraTimelineIcons, type EraIconSummary } from '@/lib/atlas/getEraTimelineIcons';
import { ATLAS_ICON_COMPONENTS } from '@/components/atlas/icons';
import { ICON_META } from '@/lib/atlas/iconRegistry';

/**
 * Compact icon strip showing the types of features present in an era.
 * Used inside the EraSelector jump panel rows.
 */
const EraIconStrip = memo(function EraIconStrip({
  eraId,
  atlasMode,
  maxIcons = 6,
}: {
  eraId: string;
  atlasMode: boolean;
  maxIcons?: number;
}) {
  const icons = useMemo(
    () => getEraTimelineIcons(eraId, atlasMode),
    [eraId, atlasMode],
  );

  if (icons.length === 0) return null;

  const visible = icons.slice(0, maxIcons);
  const overflow = icons.length - maxIcons;

  return (
    <span className="flex items-center gap-1 mt-0.5" aria-hidden>
      {visible.map(({ icon, count }) => {
        const Comp = ATLAS_ICON_COMPONENTS[icon];
        const meta = ICON_META[icon];
        return (
          <span
            key={icon}
            className="relative flex items-center"
            title={`${meta.title}${count > 1 ? ` (${count})` : ''}`}
          >
            <Comp
              className="h-3 w-3 flex-shrink-0"
              style={{ color: meta.accent }}
            />
            {count > 1 && (
              <span
                className="absolute -top-1.5 -right-1.5 flex h-3 min-w-[12px] items-center justify-center rounded-full bg-white/10 text-[7px] font-semibold leading-none text-parchment/70 tabular-nums"
              >
                {count > 99 ? '99+' : count}
              </span>
            )}
          </span>
        );
      })}
      {overflow > 0 && (
        <span className="text-[8px] text-text-dim/50 tabular-nums">
          +{overflow}
        </span>
      )}
    </span>
  );
});

export default EraIconStrip;

/**
 * Micro sparkline of colored dots for the compact era rail.
 * Shows the top 3 feature icon types as tiny colored indicators.
 */
export const EraIconDots = memo(function EraIconDots({
  eraId,
  atlasMode,
}: {
  eraId: string;
  atlasMode: boolean;
}) {
  const icons = useMemo(
    () => getEraTimelineIcons(eraId, atlasMode),
    [eraId, atlasMode],
  );

  if (icons.length === 0) return null;

  const top = icons.slice(0, 3);

  return (
    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-[2px]" aria-hidden>
      {top.map(({ icon }) => (
        <span
          key={icon}
          className="h-[2px] w-[2px] rounded-full"
          style={{ backgroundColor: ICON_META[icon].accent, opacity: 0.6 }}
        />
      ))}
    </span>
  );
});
