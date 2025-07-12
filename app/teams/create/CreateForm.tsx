'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { teamsApi } from '@/lib/api/teams/teams.api'
import { TeamCreationSuccessModal } from '@/modules/dashboard/components/team-creation-success-modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { InviteForm } from './InviteForm'

export default function CreateTeamPage() {
  const { user } = useAuth()
  const [teamInfo, setTeamInfo] = useState<{ name: string; description: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()
  const [inviteCode, setInviteCode] = useState<string>('')

  const handleTeamInfoSubmit = (name: string, description: string) => {
    if (!name.trim()) {
      toast.error('Team name is required')
      return
    }
    setTeamInfo({ name, description })
  }

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
      setInviteCode(response.team.invite_code)
      toast.success('Team created successfully!')
      setShowSuccessModal(true)
    } catch (err: unknown) {
      const error = err as Error
      toast.error(error.message || 'Failed to create team')
    } finally {
      setLoading(false)
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    router.push('/teams')
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

  if (!teamInfo) {
    return (
      <div className="flex min-h-screen items-start justify-center bg-white px-4 py-6">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const target = e.target as HTMLFormElement
            const name = (target.elements.namedItem('teamName') as HTMLInputElement)?.value || ''
            const description =
              (target.elements.namedItem('description') as HTMLInputElement)?.value || ''
            handleTeamInfoSubmit(name, description)
          }}
          className="w-full"
        >
          <Card className="mx-auto w-full max-w-sm rounded-2xl p-4 shadow-md md:p-6">
            <CardContent className="flex flex-col items-start gap-4">
              <h2 className="text-center text-lg font-semibold md:text-xl">Create your Team</h2>

              <div className="w-full">
                <Label htmlFor="teamName" className="text-sm md:text-base">
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  name="teamName"
                  placeholder="Team Name"
                  className="mt-1 text-sm md:text-base"
                  disabled={loading}
                />
              </div>

              <div className="w-full">
                <Label htmlFor="description" className="text-sm md:text-base">
                  Team Description (optional)
                </Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Team Description ( optional )"
                  className="mt-1 text-sm md:text-base"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="h-10 w-full bg-neutral-800 text-sm font-medium text-white hover:bg-neutral-900 md:h-11 md:text-base"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Next'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    )
  }

  return (
    <InviteForm
      teamName={teamInfo.name}
      onCreateTeam={handleCreateTeam}
      loading={loading}
      onBack={() => setTeamInfo(null)}
      currentUser={user}
    />
  )
}
