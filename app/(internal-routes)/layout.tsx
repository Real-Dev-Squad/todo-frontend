import { TeamsFetchApi } from '@/api/teams/teams-fetch.api'
import { AppSidebar } from '@/components/app-sidebar'
import { PageHeader } from '@/components/page-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from 'sonner'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const teams = TeamsFetchApi.getTeams.fn()

  return (
    <div className="relative">
      <SidebarProvider>
        <AppSidebar teams={teams} />
        <Toaster position="top-right" />
        <SidebarInset className="relative">
          <PageHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
