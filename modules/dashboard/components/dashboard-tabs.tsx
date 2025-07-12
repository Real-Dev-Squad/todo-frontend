'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { FORM_MODE } from '@/config/task'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { TaskFormData, TodoForm } from '../../../components/TodoForm'
import { Button } from '../../../components/ui/button'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'
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

  const createTaskMutation = useMutation({
    mutationFn: (task: TTask) => TasksApi.createTask.fn(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key })
      toast.success('Task created successfully')
      setShowCreateTaskForm(false)
    },
    onError: () => {
      toast.error('Failed to create task')
    },
  })

  const handleCreateTask = (task: TaskFormData) => {
    createTaskMutation.mutate(task as TTask)
  }

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
          <div className="flex flex-row items-center justify-end">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setShowCreateTaskForm(true)}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>
        <TabsContent value={TabsConstants.All}>
          <DashboardTasksTable type={TabsConstants.All} tasks={tasks} />
        </TabsContent>
        <TabsContent value={TabsConstants.WatchList}>
          <DashboardTasksTable type={TabsConstants.WatchList} tasks={tasks} />
        </TabsContent>
      </Tabs>

      {/* Create Task Form */}
      <TodoForm
        open={showCreateTaskForm}
        onClose={() => setShowCreateTaskForm(false)}
        onSubmit={handleCreateTask as (data: TaskFormData) => void}
        mode={FORM_MODE.CREATE}
      />
    </div>
  )
}
