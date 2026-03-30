import { memo, type SVGProps } from 'react';
import type { AtlasIconId } from '@/lib/atlas/atlasIconId';

type P = SVGProps<SVGSVGElement>;

// Shared viewBox and defaults — all icons are 24×24, currentColor.
const base = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const CityIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="10" width="5" height="11" rx="0.5" />
    <rect x="10" y="4" width="5" height="17" rx="0.5" />
    <rect x="17" y="8" width="4" height="13" rx="0.5" />
    <line x1="12.5" y1="1" x2="12.5" y2="4" />
    <circle cx="12.5" cy="1" r="0.5" fill="currentColor" stroke="none" />
  </svg>
));
CityIcon.displayName = 'CityIcon';

export const SettlementIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M4 21V12l8-8 8 8v9" />
    <path d="M9 21v-6h6v6" />
  </svg>
));
SettlementIcon.displayName = 'SettlementIcon';

export const FortressIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M2 21V11h4V7h4V3h4v4h4v4h4v10" />
    <rect x="9" y="15" width="6" height="6" rx="3" />
  </svg>
));
FortressIcon.displayName = 'FortressIcon';

export const ReligiousIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2v6M9 5h6" />
    <path d="M7 8l5 3 5-3" />
    <path d="M7 8v13h10V8" />
    <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
  </svg>
));
ReligiousIcon.displayName = 'ReligiousIcon';

export const BattleIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M5 3l7 7M19 3l-7 7" />
    <path d="M3 5l2-2M21 5l-2-2" />
    <circle cx="12" cy="14" r="6" />
    <path d="M9 14l2 2 4-4" strokeWidth="1.8" />
  </svg>
));
BattleIcon.displayName = 'BattleIcon';

export const PortIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M12 4v10" />
    <path d="M12 8l6 3-6 3" />
  </svg>
));
PortIcon.displayName = 'PortIcon';

export const TradeIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v4l3 2" />
    <path d="M8 15h8" strokeWidth="1.8" />
  </svg>
));
TradeIcon.displayName = 'TradeIcon';

export const BurialIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2v20" />
    <path d="M7 7h10" />
    <path d="M6 21c0-4 3-6 6-6s6 2 6 6" />
  </svg>
));
BurialIcon.displayName = 'BurialIcon';

export const MegalithIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M4 21L7 6h4l-1 15" />
    <path d="M14 21l-1-15h4l3 15" />
    <path d="M6 6h12" strokeWidth="2.2" />
  </svg>
));
MegalithIcon.displayName = 'MegalithIcon';

export const PalaceIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V10" />
    <path d="M19 21V10" />
    <path d="M3 10l9-7 9 7" />
    <path d="M9 21v-5h6v5" />
    <line x1="9" y1="13" x2="9" y2="13.01" strokeWidth="2" />
    <line x1="15" y1="13" x2="15" y2="13.01" strokeWidth="2" />
  </svg>
));
PalaceIcon.displayName = 'PalaceIcon';

export const ExpeditionIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a15 15 0 0 1 0 18" />
    <path d="M12 3a15 15 0 0 0 0 18" />
    <path d="M3 12h18" />
  </svg>
));
ExpeditionIcon.displayName = 'ExpeditionIcon';

export const PersonIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
  </svg>
));
PersonIcon.displayName = 'PersonIcon';

export const ArtifactIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
  </svg>
));
ArtifactIcon.displayName = 'ArtifactIcon';

export const MilitaryCampIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M3 21l9-16 9 16H3z" />
    <path d="M12 12v5" />
    <path d="M10 17h4" />
  </svg>
));
MilitaryCampIcon.displayName = 'MilitaryCampIcon';

export const CulturalIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h5" />
  </svg>
));
CulturalIcon.displayName = 'CulturalIcon';

export const HillfortIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M2 21c3-3 6-10 10-14s7 4 10-2" />
    <path d="M9 10v-2h6v2" />
    <rect x="10" y="10" width="4" height="5" rx="0.5" />
  </svg>
));
HillfortIcon.displayName = 'HillfortIcon';

export const GenericIcon = memo((p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
));
GenericIcon.displayName = 'GenericIcon';

// Registry: AtlasIconId → React component
export const ATLAS_ICON_COMPONENTS: Record<AtlasIconId, React.FC<P>> = {
  city: CityIcon,
  settlement: SettlementIcon,
  fortress: FortressIcon,
  religious: ReligiousIcon,
  battle: BattleIcon,
  port: PortIcon,
  trade: TradeIcon,
  burial: BurialIcon,
  megalith: MegalithIcon,
  palace: PalaceIcon,
  expedition: ExpeditionIcon,
  person: PersonIcon,
  artifact: ArtifactIcon,
  militaryCamp: MilitaryCampIcon,
  cultural: CulturalIcon,
  hillfort: HillfortIcon,
  generic: GenericIcon,
};
