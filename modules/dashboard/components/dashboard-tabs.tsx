'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TTask } from '@/api/tasks/tasks.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
import { CreateTodoButton } from './create-todo-button'
import { DashboardTasksTable } from './dashboard-tasks-table'
import { DashboardWatchlistTasksTable } from './dashboard-watchlist-tasks-table'

type DashboardTabsProps = {
  tasks: TTask[]
  className?: string
}

export const DashboardTabs = ({ tasks, className }: DashboardTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || TabsConstants.All

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={className}>
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="flex flex-row items-center justify-between">
          <TabsList>
            <TabsTrigger value={TabsConstants.All} className="cursor-pointer">
              {TabsConstants.All}
            </TabsTrigger>
            <TabsTrigger value={TabsConstants.WatchList} className="cursor-pointer">
              {TabsConstants.WatchList}
            </TabsTrigger>
          </TabsList>

          <CreateTodoButton />
        </div>
        <TabsContent value={TabsConstants.All}>
          <DashboardTasksTable tasks={tasks} />
        </TabsContent>
        <TabsContent value={TabsConstants.WatchList}>
          <DashboardWatchlistTasksTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
