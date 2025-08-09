import { GetTeamsDto } from '@/api/teams/teams.type'
import { AppSidebar } from '@/components/app-sidebar'
import { PageHeader } from '@/components/page-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { FetchClient } from '@/lib/fetch-client'
import { Toaster } from 'sonner'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const teams = FetchClient.get<GetTeamsDto>('/v1/teams', ['TeamsApi.getTeams'])

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
