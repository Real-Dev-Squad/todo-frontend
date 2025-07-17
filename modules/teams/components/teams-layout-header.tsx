'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { TUser } from '@/api/users/users.types'
import { Shimmer } from '@/components/Shimmer'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserRoundPlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { UserSelection } from './user-selection'

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between py-6">{children}</div>
}

type TeamsLayoutHeaderProps = {
  teamId: string
}

export const TeamsLayoutHeader = ({ teamId }: TeamsLayoutHeaderProps) => {
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([])
  const queryClient = useQueryClient()

  const { data: team, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId }),
  })

  const { data: teamWithMembers } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId, member: true }),
  })

  const addMembersMutation = useMutation({
    mutationFn: TeamsApi.addMembers.fn,
    onSuccess: () => {
      // Invalidate and refetch team data
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
      })
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeamById.key({ teamId }),
      })

      toast.success('Members added successfully!')
      handleCloseModal()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add members')
    },
  })

  const handleAddMembers = () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one member to add')
      return
    }

    const memberIds = selectedUsers
      .map((u) => u.userId)
      .filter((id) => id && !id.startsWith('temp-'))

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

  if (isLoading) {
    return (
      <Container>
        <Shimmer className="h-8 w-56" />
        <Shimmer className="h-8 w-24" />
      </Container>
    )
  }

  return (
    <div className="flex items-center justify-between pt-6 pb-8">
      <h2 className="text-2xl font-bold">{team?.name}</h2>

      <Button size="sm" onClick={() => setIsAddMembersModalOpen(true)}>
        <UserRoundPlusIcon />
        Add a member
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
    </div>
  )
}
