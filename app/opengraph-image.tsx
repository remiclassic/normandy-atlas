import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const alt = 'Norman Atlas — A Living Map of People, Movement, and Time';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const gold = '#c9b081';
const cream = '#f0ead6';
const muted = '#8b949e';
const line = '#30363d';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(ellipse 90% 70% at 50% 18%, #161b22 0%, #0d1117 42%, #010409 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 920,
            maxWidth: '100%',
            padding: '56px 64px',
            borderRadius: 28,
            border: `2px solid ${line}`,
            background: 'rgba(13, 17, 23, 0.94)',
            boxShadow: '0 28px 96px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              marginBottom: 28,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path
                fill={gold}
                d="M12 1.6 14.7 9h8.1L17 13.3l2.5 7.7L12 16.9 4.4 21l2.5-7.7L3.2 9h8.1L12 1.6z"
              />
            </svg>
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path
                fill={gold}
                d="M12 1.6 14.7 9h8.1L17 13.3l2.5 7.7L12 16.9 4.4 21l2.5-7.7L3.2 9h8.1L12 1.6z"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.28em',
              color: gold,
              textTransform: 'uppercase',
              marginBottom: 18,
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            A living historical atlas
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: cream,
              textAlign: 'center',
              lineHeight: 1.05,
              marginBottom: 28,
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Norman Atlas
          </div>
          <div
            style={{
              fontSize: 28,
              color: muted,
              textAlign: 'center',
              lineHeight: 1.45,
              maxWidth: 780,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Navigate through time from Neolithic Normandy to the expansion of Norman culture across
            Europe and beyond.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
