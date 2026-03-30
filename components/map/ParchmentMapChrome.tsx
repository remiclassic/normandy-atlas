'use client';

import { memo } from 'react';

/**
 * Non-interactive parchment atmosphere: vignette, paper wash, subtle grain motion.
 * Sits above the map with pointer-events: none so MapLibre still receives input.
 */
const ParchmentMapChrome = memo(function ParchmentMapChrome() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      {/* Warm paper wash — reinforces basemap without hiding geography */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          background:
            'linear-gradient(165deg, rgba(255,248,230,0.5) 0%, transparent 42%, rgba(180,160,120,0.12) 100%)',
        }}
      />

      {/* Edge burn / vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 140px 70px rgba(42, 34, 24, 0.28), inset 0 0 60px 24px rgba(28, 22, 16, 0.18)',
        }}
      />

      {/* SVG film grain — GPU-friendly, CSS-animated (no React re-renders) */}
      <div
        className="absolute inset-0 parchment-grain-motion opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Decorative compass — bottom-left, matches medieval atlas framing */}
      <div className="absolute bottom-6 left-5 w-[72px] h-[72px] opacity-[0.22] text-[#3a3028]">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full drop-shadow-sm">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          <path d="M50 12 L54 42 L50 38 L46 42 Z" fill="currentColor" opacity="0.85" />
          <path d="M50 88 L46 58 L50 62 L54 58 Z" fill="currentColor" opacity="0.35" />
          <text x="50" y="11" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="Georgia, serif">
            N
          </text>
          <text x="50" y="97" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.5" fontFamily="Georgia, serif">
            S
          </text>
          <text x="6" y="52" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.5" fontFamily="Georgia, serif">
            W
          </text>
          <text x="94" y="52" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.5" fontFamily="Georgia, serif">
            E
          </text>
        </svg>
      </div>
    </div>
  );
});

export default ParchmentMapChrome;
