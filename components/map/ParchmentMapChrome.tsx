'use client';

import { memo } from 'react';

/**
 * Non-interactive parchment atmosphere: vignette, paper wash, subtle grain motion.
 * Sits above the map with pointer-events: none so MapLibre still receives input.
 *
 * Compass rose counter-rotates with map bearing so “N” stays aligned with true north.
 */
const ParchmentMapChrome = memo(function ParchmentMapChrome({
  bearing,
  waterAtmosphere = false,
}: {
  bearing: number;
  waterAtmosphere?: boolean;
}) {
  return (
    <div
      className="parchment-map-chrome pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      {waterAtmosphere ? (
        <>
          {/* Cool drifting sheen — suggests tidal light on seas (whole-map overlay; subtle) */}
          <div
            className="parchment-chrome-blend absolute inset-0 parchment-water-sheen-motion opacity-[0.11] mix-blend-soft-light"
            style={{
              background:
                'radial-gradient(ellipse 130% 95% at 38% 58%, rgba(95, 145, 165, 0.55) 0%, transparent 52%), radial-gradient(ellipse 110% 100% at 72% 32%, rgba(70, 120, 138, 0.4) 0%, transparent 48%)',
            }}
          />
          {/* Low-frequency noise drift — breaks uniformity without map repaints */}
          <div
            className="parchment-chrome-blend absolute inset-0 parchment-water-noise-motion opacity-[0.035] mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E")`,
              backgroundSize: '220px 220px',
            }}
          />
        </>
      ) : null}

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
        className="parchment-chrome-blend absolute inset-0 parchment-grain-motion opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Decorative compass — bottom-left; inner rose rotates so N points geographic north */}
      <div className="absolute bottom-6 left-5 w-[72px] h-[72px] opacity-[0.22] text-[#3a3028]">
        <div
          className="h-full w-full will-change-transform"
          style={{
            transform: `rotate(${-bearing}deg)`,
            transformOrigin: '50% 50%',
          }}
        >
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
    </div>
  );
});

export default ParchmentMapChrome;
