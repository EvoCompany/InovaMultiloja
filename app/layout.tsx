import React from "react"
import type { Metadata, Viewport } from 'next'
import { Roboto_Slab, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const robotoSlab = Roboto_Slab({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Inova Multiloja - Os Melhores Produtos com os Melhores Preços',
  description: 'Encontre smartphones, eletrônicos, acessórios e muito mais com preços imbatíveis. Frete grátis e desconto no Pix!',
  generator: 'v0.app',
  keywords: ['loja online', 'eletrônicos', 'smartphones', 'acessórios', 'promoções'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2d1b69',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
