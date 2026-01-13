import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Por enquanto, vamos forçar o inglês para o build passar
  // (Na próxima etapa faremos a detecção automática)
  const locale = 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});