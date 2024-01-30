'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/redux/provider'
import Header from '@/layouts/header/Header'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from '@/redux/store'

const inter = Inter({ subsets: ['latin'] })
export let persistor = persistStore(store)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
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
