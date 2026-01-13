import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import "@/app/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "@/app/providers";
import { Toaster } from 'sonner'; // <--- 1. Importar aqui

const inter = Inter({ subsets: ["latin"] });

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
            {/* 2. Adicionar o Toaster aqui para mostrar as mensagens */}
            <Toaster position="bottom-right" theme="dark" richColors />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}