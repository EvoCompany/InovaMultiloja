import React from "react";
import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/context/cart-context";
import { CartDrawerWrapper } from "@/components/cart-drawer-wrapper";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Inova Multiloja - Os Melhores Produtos com os Melhores Preços",
  description:
    "Encontre smartphones, eletrônicos, acessórios e muito mais com preços imbatíveis. Frete grátis e desconto no Pix!",
  keywords: ["loja online", "eletrônicos", "smartphones", "acessórios", "promoções"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0070CD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.whatsapp.com" />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased`}
      >
        <CartProvider>
          {children}
          <CartDrawerWrapper />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
