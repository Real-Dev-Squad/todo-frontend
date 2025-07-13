'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { TTask } from '@/api/tasks/tasks.types'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
import { CreateTodoButton } from './create-todo-button'
import { DashboardTasksTable } from './dashboard-tasks-table'

type DashboardTabsProps = {
  tasks: TTask[]
  className?: string
}

export const DashboardTabs = ({ tasks, className }: DashboardTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || TabsConstants.All
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
  const queryClient = useQueryClient()

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
          <DashboardTasksTable type={TabsConstants.All} tasks={tasks} />
        </TabsContent>
        <TabsContent value={TabsConstants.WatchList}>
          <DashboardTasksTable type={TabsConstants.WatchList} tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
