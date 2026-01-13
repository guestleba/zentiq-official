import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css'; // <--- CSS do RainbowKit
import { Providers } from "./providers"; // <--- Nosso componente novo

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zentiq | Privacy Protocol",
  description: "Global business privacy infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}