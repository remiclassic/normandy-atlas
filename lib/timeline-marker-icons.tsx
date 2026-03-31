import {
  Swords,
  Scroll,
  Crown,
  Landmark,
  TrendingUp,
  Compass,
  Route,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { memo } from 'react';
import type { TimelineMarkerKind } from '@/core/types';

const KIND_ICON: Record<TimelineMarkerKind, LucideIcon> = {
  battle: Swords,
  treaty: Scroll,
  person: Crown,
  foundation: Landmark,
  expansion: TrendingUp,
  exploration: Compass,
  migration: Route,
  story: BookOpen,
};

export const TimelineMarkerGlyph = memo(function TimelineMarkerGlyph({
  kind,
  className,
}: {
  kind: TimelineMarkerKind;
  className?: string;
}) {
  const Icon = KIND_ICON[kind];
  return <Icon className={className} strokeWidth={1.6} />;
});
