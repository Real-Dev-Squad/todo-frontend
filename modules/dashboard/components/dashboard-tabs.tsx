'use client'

import { TTask } from '@/api/tasks/tasks.types'
import { TodoListTable } from '@/components/todo-list-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
import { CreateTodoButton } from './create-todo-button'
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

  const filteredTasks =
    currentTab === TabsConstants.All ? tasks : tasks.filter((task) => task.in_watchlist)

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={className}>
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="flex flex-row items-center justify-between pb-2">
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
          <TodoListTable tasks={filteredTasks} />
        </TabsContent>

        <TabsContent value={TabsConstants.WatchList}>
          <DashboardWatchlistTasksTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
