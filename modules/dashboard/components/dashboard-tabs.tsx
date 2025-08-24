'use client'

import { TTask } from '@/api/tasks/tasks.types'
import { TodoListTable } from '@/components/todo-list-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
import { CreateTodoButton } from '../../../components/create-todo-button'
import { DashboardDeferredTable } from './dashboard-deferred-table'
import { DashboardWatchlistTable } from './dashboard-watchlist-table'
import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'

type DashboardTabsProps = {
  tasks: TTask[]
  className?: string
  isPlaceholderData: boolean
}

export const DashboardTabs = ({ tasks, className, isPlaceholderData }: DashboardTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || TabsConstants.All
  const includeDoneTasks = searchParams.get('status') === TASK_STATUS_ENUM.DONE

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', value)

    if (includeDoneTasks && value !== TabsConstants.WatchList && value !== TabsConstants.Deferred) {
      params.set('status', TASK_STATUS_ENUM.DONE)
    } else {
      params.delete('status')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={className}>
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="flex flex-row items-center justify-between pb-2">
          <div>
            <TabsList>
              <TabsTrigger value={TabsConstants.All} className="cursor-pointer">
                {TabsConstants.All}
              </TabsTrigger>
              <TabsTrigger value={TabsConstants.WatchList} className="cursor-pointer">
                {TabsConstants.WatchList}
              </TabsTrigger>
              <TabsTrigger value={TabsConstants.Deferred} className="cursor-pointer">
                {TabsConstants.Deferred}
              </TabsTrigger>
            </TabsList>
          </div>
          <CreateTodoButton />
        </div>

        <TabsContent value={TabsConstants.All}>
          <TodoListTable showActions tasks={tasks} isPlaceholderData={isPlaceholderData} />
        </TabsContent>

        <TabsContent value={TabsConstants.WatchList}>
          <DashboardWatchlistTable />
        </TabsContent>

        <TabsContent value={TabsConstants.Deferred}>
          <DashboardDeferredTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
