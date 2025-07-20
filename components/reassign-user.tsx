import { TasksApi } from '@/api/tasks/tasks.api'
import { TUser } from '@/api/users/users.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserSearchIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { TeamUserSearchDropdown } from './team-user-search-dropdown'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type ReassignUserModalProps = {
  taskId: string
  teamId: string
  open: boolean
  children: ReactNode
  onOpenChange: (open: boolean) => void
}

const ReassignUserModal = ({
  open,
  taskId,
  teamId,
  children,
  onOpenChange,
}: ReassignUserModalProps) => {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)

  const reassignTaskMutation = useMutation({
    mutationFn: TasksApi.reassignTask.fn,
    onSuccess: () => {
      toast.success(`Task assigned to ${selectedUser?.name}`)
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key(teamId) })
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      onOpenChange(false)
      setSelectedUser(null)
    },
    onError: () => {
      toast.error('Failed to reassign task, please try again')
    },
  })

  const handleReassign = () => {
    if (!selectedUser) return

    reassignTaskMutation.mutate({
      task_id: taskId,
      executor_id: selectedUser.id,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reassign user</AlertDialogTitle>
        </AlertDialogHeader>

        <TeamUserSearchDropdown
          teamId={teamId}
          value={selectedUser?.id}
          placeholder="Search user"
          onUserSelect={setSelectedUser}
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={reassignTaskMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReassign}
            disabled={!selectedUser || reassignTaskMutation.isPending}
          >
            {reassignTaskMutation.isPending ? 'Reassigning...' : 'Reassign'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

type ReassignUserProps = {
  taskId: string
  teamId: string
}

export const ReassignUser = ({ taskId, teamId }: ReassignUserProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <ReassignUserModal open={showModal} onOpenChange={setShowModal} taskId={taskId} teamId={teamId}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowModal(true)}
            className="cursor-pointer hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
          >
            <UserSearchIcon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reassign user</TooltipContent>
      </Tooltip>
    </ReassignUserModal>
  )
}
