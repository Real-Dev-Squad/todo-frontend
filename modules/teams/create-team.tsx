'use client'

import { teamsApi, TeamsApi } from '@/api/teams/teams.api'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { TeamCreationSuccessModal } from '@/modules/dashboard/components/team-creation-success-modal'
import { InviteForm } from '@/modules/teams/components/invite-team-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type TTeamInfo = {
  name: string
  description?: string
}

const DEFAULT_TEAM_INFO: TTeamInfo = {
  name: '',
  description: '',
}

export const CreateTeam = () => {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [showInviteForm, setShowInviteForm] = useState(false)
  const [teamInfo, setTeamInfo] = useState<TTeamInfo>(DEFAULT_TEAM_INFO)
  const [teamId, setTeamId] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [inviteCode, setInviteCode] = useState<string>('')

  const handleCreateTeam = async (memberIds: string[], pocId: string | null) => {
    setLoading(true)
    if (!teamInfo?.name.trim()) {
      toast.error('Team name is required')
      return
    }
    try {
      const response = await teamsApi.createTeam.fn({
        name: teamInfo?.name,
        description: teamInfo?.description,
        member_ids: memberIds,
        poc_id: pocId,
      })

      queryClient.invalidateQueries({ queryKey: TeamsApi.getTeams.key })

      setInviteCode(response.team.invite_code)
      toast.success('Team created successfully!')
      setShowSuccessModal(true)
      setTeamId(response.team.id)
    } catch (err: unknown) {
      const error = err as Error
      toast.error(error.message || 'Failed to create team')
    } finally {
      setLoading(false)
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    router.push(`/teams/${teamId}`)
  }

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowInviteForm(true)
  }

  if (showSuccessModal) {
    return (
      <TeamCreationSuccessModal
        teamName={teamInfo?.name || ''}
        inviteCode={inviteCode}
        onClose={handleSuccessModalClose}
      />
    )
  }

  if (showInviteForm) {
    return (
      <InviteForm
        loading={loading}
        currentUser={user}
        teamName={teamInfo.name}
        onCreateTeam={handleCreateTeam}
        onBack={() => setShowInviteForm(false)}
      />
    )
  }

  return (
    <PageContainer className="flex-1 py-12 md:py-20 xl:py-28">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="pb-8 text-center text-2xl font-bold xl:pb-10 xl:text-3xl">
          Create your team
        </h1>

        <form className="space-y-4" onSubmit={handleFormSubmission}>
          <div>
            <Label htmlFor="teamName" className="text-sm md:text-base">
              Team Name
            </Label>

            <Input
              id="teamName"
              name="teamName"
              disabled={loading}
              value={teamInfo.name}
              placeholder="Your team name"
              className="mt-1 text-sm md:text-base"
              onChange={(e) => setTeamInfo((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="pb-4">
            <Label htmlFor="description" className="text-sm md:text-base">
              Description <span className="text-xs text-gray-500">(optional)</span>
            </Label>

            <Input
              id="description"
              name="description"
              disabled={loading}
              value={teamInfo.description}
              placeholder="Your team description"
              className="mt-1 text-sm md:text-base"
              onChange={(e) => setTeamInfo((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!teamInfo.name}>
            Next
          </Button>
        </form>
      </div>
    </PageContainer>
  )
}
