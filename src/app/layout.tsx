'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/redux/provider'
import Header from '@/layouts/header/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {' '}
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
