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
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { Shimmer } from './Shimmer'

const getSidebarLinks = (teams?: GetTeamsDto): TSidebarLink[] => {
  if (!teams || teams.teams.length === 0) {
    return SIDEBAR_LINKS
  }

  const sidebarLinks = SIDEBAR_LINKS.filter((link) => link.url !== '/teams')

  const teamsLinks = teams.teams.map((team) => ({
    title: team.name,
    url: `/teams/${team.id}`,
  }))

  return [
    ...sidebarLinks,
    {
      title: 'Teams',
      url: '#',
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
  isActive: boolean
}

const SidebarLink = ({ link, isActive }: SidebarLinkProps) => {
  if (link.items) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{link.title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {link.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <a href={item.url}>{item.title}</a>
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
      <SidebarMenuButton asChild isActive={isActive}>
        <a href={link.url}>{link.title}</a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname()

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
              {isLoading ? (
                <SidebarShimmer />
              ) : (
                getSidebarLinks(data).map((item) => (
                  <SidebarLink
                    link={item}
                    key={item.title}
                    isActive={pathname.startsWith(item.url)}
                  />
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
