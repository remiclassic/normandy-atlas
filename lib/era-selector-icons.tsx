import {
  Landmark,
  Pickaxe,
  Flame,
  Columns3,
  Church,
  Shield,
  Crown,
  Swords,
  Ship,
  Compass,
  Anchor,
  Castle,
  Globe,
  Sailboat,
  Flag,
  Skull,
  MapPin,
  Wheat,
  Scroll,
  type LucideIcon,
} from 'lucide-react';
import { memo } from 'react';

const ICON_MAP: Record<string, LucideIcon> = {
  // Atlas: deep-time
  'neolithic-normandy': Landmark,
  'bronze-age-channel': Pickaxe,
  'iron-age-gaul': Flame,
  'roman-gaul': Columns3,
  // Atlas: medieval
  'post-roman-gaul': Church,
  neustria: Shield,
  'frankish-carolingian': Crown,
  'viking-age': Ship,
  'norman-origins': Castle,
  'norman-expansion': Swords,
  // Atlas: atlantic
  'age-of-exploration': Compass,
  'new-france-foundations': Anchor,
  'royal-new-france': Flag,
  'atlantic-imprint': Globe,
  // Legacy eras
  frankish: Crown,
  viking: Ship,
  'early-normandy': Castle,
  duchy: Crown,
  'late-medieval-france': Scroll,
  'early-french-colonial': Sailboat,
  'new-france': Anchor,
  'acadia-atlantic': Anchor,
  'louisiana-interior': MapPin,
  'seven-years-war': Skull,
};

const FALLBACK_ICON: LucideIcon = Wheat;

export const EraGlyph = memo(function EraGlyph({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const Icon = ICON_MAP[id] ?? FALLBACK_ICON;
  return <Icon className={className} strokeWidth={1.6} />;
});
