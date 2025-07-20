import Providers from '@/components/providers'
import { appConfig, validateAppConfig } from '@/config/app-config'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { enableMocking } from '@/__mocks__/init'

enableMocking()

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.appDescription,
  icons: {
    icon: '/favicon.ico',
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
