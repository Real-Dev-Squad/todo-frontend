'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { GetTeamsDto } from '@/api/teams/teams.type'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { appConfig } from '@/config/app-config'
import { SIDEBAR_LINKS, TSidebarLink } from '@/config/sidebar'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shimmer } from './Shimmer'

const getSidebarLinks = (teams?: GetTeamsDto): TSidebarLink[] => {
  if (!teams || teams.teams.length === 0) {
    return SIDEBAR_LINKS
  }

  const sidebarLinks = SIDEBAR_LINKS.filter((link) => link.id !== 'teams')

  const teamsLinks: TSidebarLink[] = teams.teams.map((team) => ({
    id: team.id,
    title: team.name,
    url: `/teams/${team.id}/tasks`,
    baseUrl: `/teams/${team.id}`,
  }))

  teamsLinks.push({
    id: 'create_team_cta',
    title: 'Create a team',
    url: '/teams/create',
    baseUrl: '/teams/create',
    icon: PlusIcon,
  })

  return [
    ...sidebarLinks,
    {
      id: 'teams_list',
      title: 'Teams',
      url: '#',
      baseUrl: '#',
      items: teamsLinks,
    },
  ]
}

const SidebarShimmer = () => {
  return (
    <>
      {new Array(4).fill(0).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton asChild>
            <Shimmer className="h-8 w-full bg-gray-200" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  )
}

type SidebarLinkProps = {
  link: TSidebarLink
}

const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname()

  if (link.items) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{link.title}</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {link.items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.baseUrl)}>
                  <Link
                    href={item.url}
                    className={cn(
                      item.id === 'create_team_cta' &&
                        'opacity-75 hover:opacity-100 focus:opacity-100 active:opacity-100',
                    )}
                  >
                    {item.icon && (
                      <div className="pr-0.5">
                        <item.icon className="h-4 w-4" />
                      </div>
                    )}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarMenuItem className="px-2">
      <SidebarMenuButton asChild isActive={pathname.startsWith(link.baseUrl)}>
        <Link href={link.url}>
          {link.icon && (
            <div className="pr-0.5">
              <link.icon className="h-4 w-4" />
            </div>
          )}

          {link.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data, isLoading } = useQuery({
    queryKey: TeamsApi.getTeams.key,
    queryFn: TeamsApi.getTeams.fn,
  })

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="px-2 py-1 text-xl font-semibold">{appConfig.appName}</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading && !data ? (
                <SidebarShimmer />
              ) : (
                getSidebarLinks(data).map((item) => <SidebarLink link={item} key={item.id} />)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
