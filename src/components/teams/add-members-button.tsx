import { TeamsApi } from '@/api/teams/teams.api'
import { TUser } from '@/api/users/users.types'
import { UserSelection } from '@/components/users/user-selection'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button, type TButtonVariants } from '../ui/button'

type AddMemberButtonProps = {
  teamId: string
  variant?: TButtonVariants
}

export const AddMembersButton = ({ teamId, variant }: AddMemberButtonProps) => {
  const queryClient = useQueryClient()

  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([])
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false)

  const { data: teamWithMembers } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId, member: true }),
  })

  const addMembersMutation = useMutation({
    mutationFn: TeamsApi.addMembers.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
      })
      queryClient.invalidateQueries({ queryKey: TeamsApi.getTeamById.key({ teamId }) })

      toast.success('Member added successfully!')
      handleCloseModal()
    },
    onError: () => {
      toast.error('Failed to add members')
    },
  })

  const handleAddMembers = () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one member to add')
      return
    }

    const memberIds = selectedUsers.map((u) => u.id).filter((id) => id && !id.startsWith('temp-'))

    if (memberIds.length === 0) {
      toast.error('No valid user IDs found')
      return
    }

    addMembersMutation.mutate({ teamId, member_ids: memberIds })
  }

  const handleCloseModal = () => {
    setSelectedUsers([])
    setIsAddMembersModalOpen(false)
  }

  return (
    <>
      <Button size="sm" variant={variant} onClick={() => setIsAddMembersModalOpen(true)}>
        Add members
      </Button>

      <AlertDialog open={isAddMembersModalOpen} onOpenChange={handleCloseModal}>
        <AlertDialogContent
          className="w-96 !max-w-sm"
          style={{ maxWidth: '384px', width: '384px' }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Add Members to Team</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-6">
            <UserSelection
              selectedUsers={selectedUsers}
              onUsersChange={setSelectedUsers}
              excludeUserIds={teamWithMembers?.users?.map((user) => user.id) || []}
              placeholder="Type to search for members..."
              searchPlaceholder="Search by name or email..."
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCloseModal}
                disabled={addMembersMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleAddMembers}
                disabled={addMembersMutation.isPending || selectedUsers.length === 0}
              >
                {addMembersMutation.isPending ? 'Adding...' : 'Add Members'}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
