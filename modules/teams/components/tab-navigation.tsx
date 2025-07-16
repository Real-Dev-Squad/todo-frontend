'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TeamDashboardHeader, TeamTab } from '../../../components/teams/TeamDashboardHeader'

const tabs: Record<TeamTab, string> = {
  tasks: 'Tasks',
  activities: 'Activities',
  members: 'Members',
}
export function TeamTabsNavigation() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const teamId = segments[1]
  const activeTab = Object.keys(tabs).includes(segments[2] as TeamTab)
    ? (segments[2] as TeamTab)
    : 'tasks'
  return (
    <>
      <Tabs value={activeTab}>
        <TabsList>
          {Object.entries(tabs).map(([key, label]) => (
            <TabsTrigger key={key} value={key} asChild>
              <Link href={`/teams/${teamId}/${key}`}>{label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <TeamDashboardHeader activeTab={activeTab} />
    </>
  )
}
