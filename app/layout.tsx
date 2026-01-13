import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // A linha mágica que carrega o estilo

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}