'use client'

import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { TTask } from '@/api/tasks/tasks.types'
import { TodoListTable } from '@/components/todos/todo-list-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { CreateTodoButton } from '../../../components/todos/create-todo-button'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
import { DashboardDeferredTable } from './dashboard-deferred-table'
import { DashboardWatchlistTable } from './dashboard-watchlist-table'

type DashboardTabsProps = {
  tasks: TTask[]
  className?: string
  isPlaceholderData: boolean
}

export const DashboardTabs = ({ tasks, className, isPlaceholderData }: DashboardTabsProps) => {
  const navigate = useNavigate()
  const search = useSearch({ from: '/_internal/dashboard' })
  const currentTab = search.tab || TabsConstants.All
  const includeDoneTasks = search.status === TASK_STATUS_ENUM.DONE

  const handleTabChange = (value: string) => {
    navigate({
      to: '/dashboard',
      search: (prev) => ({
        status:
          includeDoneTasks && value !== TabsConstants.WatchList && value !== TabsConstants.Deferred
            ? TASK_STATUS_ENUM.DONE
            : undefined,
        tab: value,
        search: prev.search || undefined,
      }),
    })
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
