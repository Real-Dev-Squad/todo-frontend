'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

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
  const { teamId } = useParams()
  const pathname = usePathname()

  const tabsList = teamId ? getTabsList(teamId as string) : []
  const activeTab = tabsList.find((tab) => pathname.includes(tab.href))?.label

  return (
    <Tabs value={activeTab}>
      <TabsList>
        {tabsList.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label} asChild>
            <Link href={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
