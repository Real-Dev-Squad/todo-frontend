'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { PageHeader } from '@/components/page-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import Providers from '../../components/providers'

type InternalLayoutProps = { children: React.ReactNode }

const MainContainerWrapper = ({ children }: InternalLayoutProps) => {
  const { isLoading, isError } = useAuth()

  if (isLoading) {
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
    return (
      <div className="p-6 text-center">
        <div className="mb-4 text-red-500">
          <h2 className="text-lg font-semibold">Error loading user data</h2>
          <p className="text-muted-foreground text-sm">Please try refreshing the page</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
        >
          Refresh
        </button>
      </div>
    )
  }

  return <>{children}</>
}

export default function InternalLayout({ children }: InternalLayoutProps) {
  return (
    <Providers>
      <div className="relative">
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="relative">
            <PageHeader />
            <MainContainerWrapper>{children}</MainContainerWrapper>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Providers>
  )
}
