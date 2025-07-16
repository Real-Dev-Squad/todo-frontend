'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { TodoListTable } from '@/components/todo-list-table'
import { useQuery } from '@tanstack/react-query'

type TeamTasksProps = {
  teamId: string
}

export const TeamTasks = ({ teamId }: TeamTasksProps) => {
  const { data, isLoading } = useQuery({
    queryKey: TasksApi.getTasks.key(teamId),
    queryFn: () => TasksApi.getTasks.fn({ teamId }),
  })

  return <TodoListTable isLoading={isLoading} tasks={data?.tasks} />
}
