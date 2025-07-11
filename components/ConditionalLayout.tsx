'use client'
import React from 'react'
import { NavBar } from './NavBar'
import { useAuth } from '../app/hooks/useAuth'
import { LandingPage } from './LandingPage'
import { Toaster } from 'sonner'
import { AppSidebar } from './app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="pt-16">
          <NavBar />
          <SidebarTrigger className="" />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
