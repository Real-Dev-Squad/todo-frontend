'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { DashboardTasksTableTabs as TabsConstants } from './constants'
import { DashboardTasksTable } from './DashboardTasksTable'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { TTask } from '@/lib/api/tasks/tasks.dto'
import { PlusIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { TaskFormData, TodoForm } from '../TodoForm'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '@/lib/api/tasks/tasks.api'
import { toast } from 'sonner'
import { FORM_MODE } from '@/app/constants/Task'

export function DashboardTasksTableTabs({ tasks }: { tasks: TTask[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || TabsConstants.All
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: (task: TTask) => tasksApi.createTask.fn(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksApi.getTasks.key })
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
    <div className="">
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
