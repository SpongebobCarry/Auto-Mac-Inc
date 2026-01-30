import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localeDetection: false,
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect root path `/` to `/fr`
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*'],
};
