'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/redux/provider'
import Header from '@/layouts/header/Header'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='google-site-verification'
          content='cmuhdzW-y4zcB7lipsL3erlCLwqoRRhIIxwismXZZ-w'
        />
        <meta
          name='naver-site-verification'
          content='0b81540707fd681ebb03ae8b8b059a0d691aa5c8'
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            {' '}
            <Header />
            {children}
          </PersistGate>
        </Providers>
      </body>
    </html>
  )
}
