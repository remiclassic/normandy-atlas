import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Crimson_Pro } from 'next/font/google';
import './globals.css';

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
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='norman-atlas-ui-theme';var v=localStorage.getItem(k);if(v==='light'||v==='dark')document.documentElement.dataset.uiTheme=v;}catch(e){}})();",
          }}
        />
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-Q97Y9MCQ0T" />
    </html>
  );
}
