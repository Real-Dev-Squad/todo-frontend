// components/teams/TeamTabsNavigation.tsx
'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TeamDashboardHeader, TeamTab } from './TeamDashboardHeader'

export function TeamTabsNavigation({ teamId }: { teamId: string }) {
  const pathname = usePathname()
  const tabs: TeamTab[] = ['tasks', 'activities', 'members']
  const activeTab = tabs.find((tab) => pathname.endsWith(`/${tab}`)) ?? 'tasks'

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
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Link>
        ))}
      </div>
      <TeamDashboardHeader activeTab={activeTab as TeamTab} />
    </>
  )
}
