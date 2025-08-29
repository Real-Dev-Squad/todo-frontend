'use client'
import { TasksApi } from '@/api/tasks/tasks.api'
import { TeamsApi } from '@/api/teams/teams.api'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { LeaveTeamDialog } from '@/modules/teams/components/leave-team-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const LeaveTeamButton = ({ teamId }: { teamId: string }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [showLeaveTeamDialog, setShowLeaveTeamDialog] = useState(false)

  const { isLoading: isAuthLoading, user } = useAuth()
  const leaveTeamMutation = useMutation({
    mutationFn: TeamsApi.removeFromTeam.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TeamsApi.getTeamById.key({ teamId }) })
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
      })
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeams.key,
      })
      queryClient.invalidateQueries({
        queryKey: TasksApi.getTasks.key(),
      })
      toast.success('Successfully left team')
      router.push('/dashboard')
    },
    onError: () => {
      toast.error('Failed to leave team')
    },
  })
  if (isAuthLoading) {
    return null
  }

  return (
    <LeaveTeamDialog
      title="Leave Team"
      description="Are you sure you want to leave this team? You will lose access to its tasks and members."
      buttonText="Leave Team"
      open={showLeaveTeamDialog}
      onOpenChange={setShowLeaveTeamDialog}
      onSubmit={() => {
        if (user?.id) {
          leaveTeamMutation.mutate({ teamId, memberId: user.id })
        } else {
          toast.error('User ID not found')
        }
      }}
    >
      <Button variant="destructive" size="sm" className="mx-1">
        <LogOut />
        Leave Team
      </Button>
    </LeaveTeamDialog>
  )
}
