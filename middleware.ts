import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const I18N_ROUTING = {
  locales: ['en', 'ar'],
  locale: 'en',
  defaultLocale: 'en',
};

const intlMiddleware = createMiddleware({
  locales: I18N_ROUTING.locales,
  defaultLocale: I18N_ROUTING.defaultLocale,
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
};
