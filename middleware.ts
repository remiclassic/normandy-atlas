import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NORMAN_GEO_LOCALE_COOKIE, geoCookieLocaleValue } from '@/lib/locale-geo';

function clientCountry(request: NextRequest): string | undefined {
  const h = request.headers;
  const v = h.get('x-vercel-ip-country') || h.get('cf-ipcountry');
  if (v && v !== 'XX' && v.length === 2) return v;
  return undefined;
}

/** ISO 3166-2 subdivision (e.g. QC for Quebec when country is CA). Vercel: x-vercel-ip-country-region. */
function clientCountryRegion(request: NextRequest): string | undefined {
  const v =
    request.headers.get('x-vercel-ip-country-region') ||
    request.headers.get('cf-region-code');
  const t = v?.trim();
  return t || undefined;
}

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const suggested = geoCookieLocaleValue(clientCountry(request), clientCountryRegion(request));
  if (suggested) {
    res.cookies.set(NORMAN_GEO_LOCALE_COOKIE, suggested, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)'],
};
