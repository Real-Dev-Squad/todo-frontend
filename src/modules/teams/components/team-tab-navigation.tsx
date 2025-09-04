'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link, useLocation, useParams } from '@tanstack/react-router'

const getTabsList = (teamId: string) => {
  return [
    {
      label: 'Todos',
      href: `/teams/${teamId}/todos`,
    },
    {
      label: 'Activities',
      href: `/teams/${teamId}/activities`,
    },
    {
      label: 'Members',
      href: `/teams/${teamId}/members`,
    },
  ]
}

export const TeamTabNavigation = () => {
  const { teamId } = useParams({ from: '/_internal/teams/$teamId' })
  const location = useLocation()
  const pathname = location.pathname

  const tabsList = teamId ? getTabsList(teamId as string) : []

  // Determine the current tab based on the pathname
  const getCurrentTab = () => {
    if (pathname.includes('/todos')) return 'Todos'
    if (pathname.includes('/activities')) return 'Activities'
    if (pathname.includes('/members')) return 'Members'
    return 'Todos' // default
  }

  return (
    <Tabs value={getCurrentTab()} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {tabsList.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label} asChild>
            <Link to={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
