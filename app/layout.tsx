import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Crimson_Pro } from 'next/font/google';
import Script from 'next/script';
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

export const metadata: Metadata = {
  title: 'Norman Atlas — A Living Map of People, Movement, and Time',
  description:
    'A dynamic historical atlas exploring the origins, movements, and global influence of the Normans. Navigate through time from Neolithic Normandy to the expansion of Norman culture across Europe and beyond.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="theme-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='norman-atlas-ui-theme';var v=localStorage.getItem(k);if(v==='light'||v==='dark')document.documentElement.dataset.uiTheme=v;}catch(e){}})();",
          }}
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
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-Q97Y9MCQ0T" />
    </html>
  );
}
