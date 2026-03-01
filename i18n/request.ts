import {getRequestConfig} from 'next-intl/server';

const LOCALES = ['en', 'ar'] as const;
const DEFAULT_LOCALE = 'en';

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = LOCALES.includes(requestedLocale as (typeof LOCALES)[number])
    ? requestedLocale
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
