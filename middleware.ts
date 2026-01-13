import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A lista de idiomas que suportamos
  locales: ['en', 'pt'],
 
  // O idioma padrão se não soubermos de onde o usuário vem
  defaultLocale: 'en'
});
 
export const config = {
  // Ignora arquivos internos do Next.js e estáticos
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};