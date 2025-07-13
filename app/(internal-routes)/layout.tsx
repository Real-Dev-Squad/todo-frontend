'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { PageHeader } from '@/components/page-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'

type InternalLayoutProps = { children: React.ReactNode }

const MainContainerWrapper = ({ children }: InternalLayoutProps) => {
  const { user, isLoading, isError } = useAuth()

  if (isLoading && !user) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  if (isError) {
    return null
  }

  return <>{children}</>
}

export default function InternalLayout({ children }: InternalLayoutProps) {
  return (
    <MainContainerWrapper>
      <div className="relative">
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="relative">
            <PageHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </MainContainerWrapper>
  )
}
