import { AppSidebar } from '@/components/app-sidebar'
import { PageHeader } from '@/components/page-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

type DashboardLayoutProps = { children: React.ReactNode }

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="relative">
          <PageHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
