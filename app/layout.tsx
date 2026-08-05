import React from "react";
import type { Metadata, Viewport } from "next";
import { Roboto_Slab, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-serif",
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
  title: "TFT Motors - Veículos Seminovos com Qualidade e Garantia",
  description:
    "Encontre o carro ideal com qualidade, procedência e as melhores condições de financiamento. Amplo estoque de seminovos.",
  keywords: ["veículos seminovos", "carros usados", "concessionária", "TFT Motors", "financiamento"],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
