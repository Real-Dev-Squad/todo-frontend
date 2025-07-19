'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const JoinTeam = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [inviteCode, setInviteCode] = useState('')

  const joinByInviteCodeMutation = useMutation({
    mutationFn: TeamsApi.joinTeamByInviteCode.fn,
    onSuccess: (data) => {
      toast.success(`Joined team ${data.name}`)
      queryClient.invalidateQueries({ queryKey: TeamsApi.getTeams.key })
      router.push(`/teams/${data.id}/todos`)
    },
    onError: () => {
      toast.error('Failed to join team, please try again later')
    },
  })

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inviteCode) {
      toast.error('Please enter an invite code')
      return
    }

    joinByInviteCodeMutation.mutate({ inviteCode })
  }

  return (
    <PageContainer className="flex-1 py-12 md:py-20 xl:py-28">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="pb-8 text-center text-2xl font-bold xl:pb-10 xl:text-3xl">Join a team</h1>

        <form className="space-y-4" onSubmit={handleFormSubmission}>
          <div>
            <Label htmlFor="inviteCode" className="text-sm md:text-base">
              Invite Code
            </Label>

            <Input
              id="inviteCode"
              name="inviteCode"
              value={inviteCode}
              placeholder="Enter invite code"
              className="mt-1 text-sm md:text-base"
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={joinByInviteCodeMutation.isPending || !inviteCode}
          >
            {joinByInviteCodeMutation.isPending ? 'Joining...' : 'Join Team'}
          </Button>
        </form>
      </div>
    </PageContainer>
  )
}
