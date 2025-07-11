'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { TaskFormData, TodoForm } from '../TodoForm'
import { tasksApi } from '@/lib/api/tasks/tasks.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { TTask } from '@/lib/api/tasks/tasks.dto'
import { useAuth } from '@/app/hooks/useAuth'

export const DashboardWelcomeScreen = () => {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
  const { user } = useAuth()
  const name = user?.data?.name || 'Guest'
  const queryClient = useQueryClient()
  const createTaskMutation = useMutation({
    mutationFn: (task: TTask) => tasksApi.createTask.fn(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksApi.getTasks.key })
      toast.success('Task created successfully')
      setShowCreateTaskForm(false)
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string)
    },
  })

  const handleCreateTask = (task: TTask) => {
    createTaskMutation.mutate(task)
  }

  return (
    <div className="flex min-h-[60vh] flex-col p-4 md:p-6">
      <div className="mb-6 text-center md:mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Welcome, {name}</h1>
        <p className="text-base text-gray-600 md:text-lg">Let&apos;s setup your workspace</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-50">
            <Image
              src="/dashboard-welcome.png"
              alt="Welcome"
              width={300}
              height={300}
              className="h-48 w-48 md:h-72 md:w-72 lg:h-80 lg:w-80"
            />
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row md:gap-4">
          <button
            type="button"
            className="bg-primary hover:bg-primary-dark flex-1 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:cursor-pointer md:px-10 md:py-4 md:text-base"
            onClick={() => setShowCreateTaskForm(true)}
          >
            Create Task
          </button>
          <button
            type="button"
            className="bg-primary hover:bg-primary-dark flex-1 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors duration-200 md:px-10 md:py-4 md:text-base"
          >
            Create Team
          </button>
        </div>
      </div>
      <TodoForm
        open={showCreateTaskForm}
        onClose={() => setShowCreateTaskForm(false)}
        onSubmit={handleCreateTask as (data: TaskFormData) => void}
      />
    </div>
  )
}
