import type { Metadata } from 'next';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Crimson_Pro } from 'next/font/google';
import { LOCALE_STORAGE_KEY } from '@/lib/locale';
import { NORMAN_GEO_LOCALE_COOKIE } from '@/lib/locale-geo';
import { REDUCE_MOTION_STORAGE_KEY } from '@/lib/reduced-motion';
import { HIGH_CONTRAST_STORAGE_KEY } from '@/lib/high-contrast';
import ClientBootstrap from '@/components/layout/ClientBootstrap';
import AtlasMotionConfig from '@/components/layout/AtlasMotionConfig';
import './globals.css';

/** Runs before React: first visit with no saved locale copies geo cookie (set in middleware) into localStorage. */
const localeGeoBootstrapScript = `(function(){try{var sk=${JSON.stringify(LOCALE_STORAGE_KEY)};if(localStorage.getItem(sk))return;var m=document.cookie.match(/(?:^|;\\s*)${NORMAN_GEO_LOCALE_COOKIE}=([^;]*)/);var v=m?decodeURIComponent(m[1].trim()):'';if(v==='fr'||v==='es'||v==='it'||v==='nb'||v==='sv'||v==='da')localStorage.setItem(sk,v);}catch(e){}})();`;

/** Inline in `<head>` so it runs before paint; avoids `next/script` in the body (React 19 client-tree script warning). */
const blockingPreferenceRestoreScript = [
  "(function(){try{var k='norman-atlas-ui-theme';var v=localStorage.getItem(k);if(v==='light'||v==='dark')document.documentElement.dataset.uiTheme=v;else if(v==='auto'){var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)');document.documentElement.dataset.uiTheme=m&&m.matches?'light':'dark';}}catch(e){}})();",
  "(function(){try{var k='norman-atlas-basemap-mode';var v=localStorage.getItem(k);if(v==='dark'||v==='parchment')document.documentElement.dataset.atlasBasemap=v;else if(v==='auto'){var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)');document.documentElement.dataset.atlasBasemap=m&&m.matches?'parchment':'dark';}}catch(e){}})();",
  "(function(){try{var v=localStorage.getItem('normanAtlas.textSize');var c=document.documentElement.classList;c.remove('text-size-standard','text-size-large');c.add(v==='large'?'text-size-large':'text-size-standard');}catch(e){document.documentElement.classList.add('text-size-standard');}})();",
  `(function(){try{var f=localStorage.getItem(${JSON.stringify(REDUCE_MOTION_STORAGE_KEY)})==='true';var s=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(f||s)document.documentElement.classList.add('atlas-reduced-motion');}catch(e){}})();`,
  `(function(){try{if(localStorage.getItem(${JSON.stringify(HIGH_CONTRAST_STORAGE_KEY)})==='true')document.documentElement.dataset.highContrast='true';}catch(e){}})();`,
  localeGeoBootstrapScript,
].join('');

const META_PIXEL_INIT = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2017702515818757');
fbq('track', 'PageView');`;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const crimson = Crimson_Pro({
  variable: '--font-crimson',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

const siteTitle = 'Norman Atlas — A Living Map of People, Movement, and Time';
const siteDescription =
  'A dynamic historical atlas exploring the origins, movements, and global influence of the Normans. Navigate through time from Neolithic Normandy to the expansion of Norman culture across Europe and beyond.';

function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return new URL(explicit.endsWith('/') ? explicit.slice(0, -1) : explicit);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL('http://localhost:3000');
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`} suppressHydrationWarning>
      <head>
        <script
          id="atlas-blocking-preferences"
          dangerouslySetInnerHTML={{ __html: blockingPreferenceRestoreScript }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2017702515818757&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <ClientBootstrap />
        <AtlasMotionConfig>
          {children}
        </AtlasMotionConfig>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT }}
        />
        <GoogleAnalytics gaId="G-Q97Y9MCQ0T" />
      </body>
    </html>
  );
}
