'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TeamDashboardHeader, TeamTab } from './TeamDashboardHeader'

const tabs: TeamTab[] = ['tasks', 'activities', 'members']

const TAB_LABELS: Record<TeamTab, string> = {
  tasks: 'Tasks',
  activities: 'Activities',
  members: 'Members',
}

export function TeamTabsNavigation({ teamId }: { teamId: string }) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const activeTab = tabs.includes(segments[2] as TeamTab) ? (segments[2] as TeamTab) : 'tasks'
  return (
    <>
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab}
            href={`/teams/${teamId}/${tab}`}
            className={cn(
              'm-2 border-b-2 px-2 text-lg',
              activeTab === tab
                ? 'text-primary border-primary font-semibold'
                : 'text-muted-foreground border-transparent',
            )}
          >
            {TAB_LABELS[tab]}
          </Link>
        ))}
      </div>
      <TeamDashboardHeader activeTab={activeTab} />
    </>
  )
}
