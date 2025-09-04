import { TasksApi } from '@/api/tasks/tasks.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type WatchListButtonProps = {
  taskId: string
  isInWatchlist?: boolean | null
  teamId?: string // used to invalidate task list for a team
}

export const WatchListButton = ({ taskId, teamId, isInWatchlist }: WatchListButtonProps) => {
  const queryClient = useQueryClient()

  const addTaskToWatchlistMutation = useMutation({
    mutationFn: TasksApi.addTaskToWatchList.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })

      if (teamId) {
        void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key({ teamId }) })
      }

      toast.success('Task added to watchlist!')
    },
    onError: () => {
      toast.error('Failed to add task in watchlist!')
    },
  })

  const toggleWatchListStatusMutation = useMutation({
    mutationFn: TasksApi.toggleTaskWatchListStatus.fn,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      void queryClient.invalidateQueries({ queryKey: TasksApi.getWatchListTasks.key })

      if (teamId) {
        void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key({ teamId }) })
      }

      toast.success(
        variables.isActive ? 'Task added to watchlist!' : 'Task removed from watchlist!',
      )
    },
    onError: () => {
      toast.error('Failed to update watchlist status!')
    },
  })

  const isLoading = addTaskToWatchlistMutation.isPending || toggleWatchListStatusMutation.isPending

  const handleAddTaskToWatchlist = () => {
    if (isInWatchlist == null) {
      addTaskToWatchlistMutation.mutate({ taskId })
      return
    }

    toggleWatchListStatusMutation.mutate({ taskId, isActive: true })
  }

  if (isInWatchlist) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
            onClick={() => toggleWatchListStatusMutation.mutate({ taskId, isActive: false })}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove task from watchlist</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
          onClick={handleAddTaskToWatchlist}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Eye className="h-5 w-5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add task to watchlist</TooltipContent>
    </Tooltip>
  )
}
