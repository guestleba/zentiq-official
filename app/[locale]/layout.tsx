import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import "@/app/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "@/app/providers";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

// --- NOVO: IDENTIDADE VISUAL ---
export const metadata = {
  title: 'ZENTIQ | Global Privacy Layer',
  description: 'The first privacy protocol designed for global business operations. Shield your transactions with enterprise-grade encryption.',
  icons: {
    icon: '/icon.png', // Vamos criar isso no próximo passo
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <Toaster position="bottom-right" theme="dark" richColors />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}