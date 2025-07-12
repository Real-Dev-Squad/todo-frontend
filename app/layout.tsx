import { appConfig, validateAppConfig } from '@/config/app-config'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryProvider } from './_provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.appDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  validateAppConfig(appConfig)

  return (
    <html lang="en" className={inter.className}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
