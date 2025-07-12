import React from 'react'
import { useAuth } from '../app/hooks/useAuth'
import { LandingPage } from './LandingPage'
import { NavBar } from './NavBar'
import { AppSidebar } from './app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return (
    <>
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
