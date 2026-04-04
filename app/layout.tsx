import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Crimson_Pro } from 'next/font/google';
import './globals.css';

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
        {/*
          Use plain <script> in this Server Component layout. next/script maps to client behavior that
          triggers React 19 "Scripts inside React components are never executed on the client" in Next 16.
          These tags are emitted as real HTML and run in the browser when parsed.
        */}
        <script
          id="theme-restore"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='norman-atlas-ui-theme';var v=localStorage.getItem(k);if(v==='light'||v==='dark')document.documentElement.dataset.uiTheme=v;}catch(e){}})();",
          }}
        />
        <script
          id="text-size-restore"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var v=localStorage.getItem('normanAtlas.textSize');var c=document.documentElement.classList;c.remove('text-size-standard','text-size-large');c.add(v==='large'?'text-size-large':'text-size-standard');}catch(e){document.documentElement.classList.add('text-size-standard');}})();",
          }}
        />
        {children}
        <script
          id="meta-pixel"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT }}
        />
        <GoogleAnalytics gaId="G-Q97Y9MCQ0T" />
      </body>
    </html>
  );
}
