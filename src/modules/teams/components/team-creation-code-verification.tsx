import { TeamsApi } from '@/api/teams/teams.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { Shield } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  onCodeVerified: (code: string) => void
}

export const TeamCreationCodeVerification = ({ onCodeVerified }: Props) => {
  const [teamCreationCode, setTeamCreationCode] = useState('')
  const [error, setError] = useState('')

  const verifyCodeMutation = useMutation({
    mutationFn: TeamsApi.verifyTeamCreationCode.fn,
    onSuccess: (_, variables) => {
      toast.success('Code verified successfully!')
      onCodeVerified(variables.code)
    },
    onError: () => {
      toast.error('The code appears to be invalid. Please enter a valid code to create a team.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!teamCreationCode.trim()) {
      setError('Team creation code is required')
      return
    }

    verifyCodeMutation.mutate({ code: teamCreationCode.trim() })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-20">
      <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-8 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
              <Shield className="h-8 w-8 text-neutral-800" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Enter Team Creation Invite Code</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input
                id="teamCreationCode"
                name="teamCreationCode"
                type="text"
                value={teamCreationCode}
                placeholder="Enter your team creation invite code"
                className="text-center text-base"
                onChange={(e) => setTeamCreationCode(e.target.value)}
                aria-label="Team creation invite code"
                disabled={verifyCodeMutation.isPending}
                autoComplete="off"
                autoFocus
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={verifyCodeMutation.isPending || !teamCreationCode.trim()}
            >
              {verifyCodeMutation.isPending ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-neutral-500">
              Each invite code allows you to create one team. Please get your code from an admin
              such as Ankush.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
