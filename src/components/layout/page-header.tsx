import { SIDEBAR_LINKS } from '@/config/sidebar'
import { useLocation } from '@tanstack/react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../ui/breadcrumb'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'
import { UserProfileMenu } from '../users/user-profile-menu'

export function PageHeader() {
  const pathname = useLocation().pathname
  const pageHeaderTitle = SIDEBAR_LINKS.find((link) => pathname.startsWith(link.url))?.title

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-white">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{pageHeaderTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto px-3">
        <UserProfileMenu />
      </div>
    </header>
  )
}
