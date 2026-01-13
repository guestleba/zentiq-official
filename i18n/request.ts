import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Tenta pegar o idioma que o navegador pediu
  let locale = await requestLocale;

  // Se não tiver idioma ou for um idioma desconhecido, força Inglês
  if (!locale || !['en', 'pt'].includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});