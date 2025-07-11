// "use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ConditionalLayout } from '../components/ConditionalLayout'
import { QueryProvider } from './_provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Todo Project',
  description: 'Created by Real Dev Squad',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Introducing Todo Project</title>
      </head>

      <body>
        <QueryProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
