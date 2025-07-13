import { Briefcase, ChartNetwork, Home, Users } from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'

import { Sidebar, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

//TODO: dummy team data

const dummyTeamData = [
  {
    id: 2,
    name: 'Design Team',
  },
  {
    id: 3,
    name: 'Development Team',
  },
  {
    id: 4,
    name: 'Marketing Team',
  },
]

const data = {
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: Briefcase,
    },
    {
      title: 'Teams',
      url: '/teams',
      icon: Users,
      isActive: true,
      items: [
        ...dummyTeamData.map((team) => ({
          title: team.name,
          url: `/teams/${team.id}`,
        })),
        {
          title: 'Create Team +',
          url: '/teams/create',
        },
        {
          title: 'Join Team +',
          url: '/teams/join',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex space-x-1 pt-2 pl-2">
          <ChartNetwork />
          <h1 className="text-xl font-semibold">Real Flow</h1>
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
