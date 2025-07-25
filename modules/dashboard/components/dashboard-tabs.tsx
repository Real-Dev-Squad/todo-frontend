'use client'

import { TTask } from '@/api/tasks/tasks.types'
import { TodoListTable } from '@/components/todo-list-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
import { CreateTodoButton } from './create-todo-button'
import { DashboardWatchlistTable } from './dashboard-watchlist-table'

type DashboardTabsProps = {
  tasks: TTask[]
  className?: string
  includeDone: boolean
  isPlaceholderData: boolean
  onIncludeDoneChange: (checked: boolean) => void
}

export const DashboardTabs = ({
  tasks,
  className,
  includeDone,
  isPlaceholderData,
  onIncludeDoneChange,
}: DashboardTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || TabsConstants.All

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', value)

    if (value === TabsConstants.WatchList) {
      params.delete('status')
    } else {
      if (includeDone) {
        params.set('status', 'Done')
      }
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
            </TabsList>
          </div>
          <CreateTodoButton />
        </div>

        <TabsContent value={TabsConstants.All}>
          <TodoListTable
            showActions
            tasks={tasks}
            isPlaceholderData={isPlaceholderData}
            includeDone={includeDone}
            onIncludeDoneChange={onIncludeDoneChange}
          />
        </TabsContent>

        <TabsContent value={TabsConstants.WatchList}>
          <DashboardWatchlistTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
