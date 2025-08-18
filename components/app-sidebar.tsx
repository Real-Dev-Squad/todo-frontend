'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { GetTeamsDto } from '@/api/teams/teams.type'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
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
import { ADMIN_USER_IDS, appConfig } from '@/config/app-config'
import { SIDEBAR_LINKS, TSidebarLink } from '@/config/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronRight, PlusIcon, UserPlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Shimmer } from './Shimmer'
import { StrideAppLogo } from './stride-app-logo'

const getSidebarLinks = (teams?: GetTeamsDto, isAdmin: boolean = false): TSidebarLink[] => {
  let baseLinks = SIDEBAR_LINKS

  if (!isAdmin) {
    baseLinks = SIDEBAR_LINKS.filter((link) => link.id !== 'admin')
  }

  if (!teams || teams.teams.length === 0) {
    return baseLinks
  }

  const sidebarLinks = baseLinks.filter((link) => link.id !== 'teams')

  const teamsLinks: TSidebarLink[] = teams.teams.map((team) => ({
    id: team.id,
    title: team.name,
    url: `/teams/${team.id}/todos`,
    baseUrl: `/teams/${team.id}`,
  }))

  return [
    ...sidebarLinks,
    {
      id: 'teams_list',
      title: 'Teams',
      url: '#',
      baseUrl: '#',
      items: teamsLinks,
    },
    {
      id: 'separator',
      title: '',
      url: '#',
      baseUrl: '#',
    },
    {
      id: 'create_team_cta',
      title: 'Create a team',
      url: '/teams/create',
      baseUrl: '/teams/create',
      icon: PlusIcon,
    },
    {
      id: 'join_team_cta',
      title: 'Join a team',
      url: '/teams/join',
      baseUrl: '/teams/join',
      icon: UserPlusIcon,
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
  const [isTeamsOpen, setIsTeamsOpen] = useState(true)

  if (link.id === 'separator') {
    return (
      <div className="px-2 py-1">
        <Separator />
      </div>
    )
  }

  if (link.items && link.id === 'teams_list') {
    return (
      <SidebarMenuItem className="px-2">
        <Collapsible open={isTeamsOpen} onOpenChange={setIsTeamsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full justify-between">
              <div className="flex items-center gap-2">
                <span>{link.title}</span>
              </div>
              {isTeamsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent className="pl-1">
            <SidebarMenu>
              {link.items.map((item) => (
                <SidebarMenuItem key={item.id} className="px-2">
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.baseUrl)}>
                    <Link href={item.url}>
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
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    )
  }

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
                      (item.id === 'create_team_cta' || item.id === 'join_team_cta') &&
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
        <Link
          href={link.url}
          className={cn(
            (link.id === 'create_team_cta' || link.id === 'join_team_cta') &&
              'opacity-75 hover:opacity-100 focus:opacity-100 active:opacity-100',
          )}
        >
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const { user } = useAuth()
  const isAdmin = user ? ADMIN_USER_IDS.includes(user.id) : false

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-3 pl-2">
            <div className="relative">
              <StrideAppLogo />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-lg font-bold tracking-tight">{appConfig.appName}</span>
              <span className="text-[10px] font-medium text-neutral-500">By RDS</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading && !data ? (
                <SidebarShimmer />
              ) : (
                getSidebarLinks(data, isAdmin).map((item) => (
                  <SidebarLink link={item} key={item.id} />
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
