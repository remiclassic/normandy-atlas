'use client';

import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useAtlasProgress';
import { getActiveExpedition } from '@/lib/progress/expedition-progress';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { Compass } from 'lucide-react';

interface Props {
  onOpenLedger?: () => void;
  compact?: boolean;
}

function ExpeditionProgressChip({ onOpenLedger, compact }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const progress = useProgress();
  const locale = useLocale();

  const active = useMemo(() => getActiveExpedition(progress), [progress]);

  const handleClick = useCallback(() => {
    onOpenLedger?.();
  }, [onOpenLedger]);

  if (!mounted || !active) return null;

  const title = pickI18n(active.title, locale);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1.5 rounded-full border border-gold/15 bg-gold/5 py-1 text-[11px] font-medium text-gold/80 transition-all duration-200 hover:border-gold/25 hover:bg-gold/10 hover:text-gold ${compact ? 'px-2' : 'px-2.5 max-w-[180px]'}`}
      aria-label={`${title} — ${active.completed}/${active.total}`}
    >
      <Compass className="h-3 w-3 shrink-0" strokeWidth={1.8} aria-hidden />
      {!compact && <span className="truncate">{title}</span>}
      <span className="shrink-0 tabular-nums text-gold/60">
        {active.completed}/{active.total}
      </span>
    </button>
  );
}

export default memo(ExpeditionProgressChip);
