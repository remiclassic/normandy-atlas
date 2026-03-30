'use client';

import { memo, useCallback } from 'react';
import { Mountain } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

function TerrainToggleInner() {
  const locale = useLocale();
  const enabled = useMapStore((s) => s.terrain3dEnabled);
  const setEnabled = useMapStore((s) => s.setTerrain3dEnabled);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={t('terrain.aria.toggle', locale)}
      className={`
        flex items-center gap-1.5 rounded-full px-2.5 py-1
        border backdrop-blur-sm transition-all duration-200
        ${enabled
          ? 'bg-chrome-fill-pressed text-parchment border-gold/35 shadow-[0_0_12px_rgba(196,169,98,0.15),inset_0_1px_0_var(--color-chrome-inset-soft)]'
          : 'bg-chrome-fill-badge text-text-muted border-chrome-border-strong hover:bg-chrome-fill-hover hover:text-text'
        }
      `}
    >
      <Mountain className="h-[13px] w-[13px]" strokeWidth={1.75} aria-hidden />
      <span className="text-[11px] font-medium tracking-wide select-none">
        {t('terrain.label', locale)}
      </span>
    </button>
  );
}

export default memo(TerrainToggleInner);
