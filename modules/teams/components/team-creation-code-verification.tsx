'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Shield } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const codeVerificationSchema = z.object({
  teamCreationCode: z.string().min(1, 'Team creation code is required'),
})

type TCodeVerificationData = z.infer<typeof codeVerificationSchema>

type Props = {
  onCodeVerified: (code: string) => void
}

export const TeamCreationCodeVerification = ({ onCodeVerified }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TCodeVerificationData>({
    resolver: zodResolver(codeVerificationSchema),
    defaultValues: {
      teamCreationCode: '',
    },
  })

  const verifyCodeMutation = useMutation({
    mutationFn: TeamsApi.verifyTeamCreationCode.fn,
    onSuccess: (_, variables) => {
      toast.success('Code verified successfully!')
      onCodeVerified(variables.code)
    },
    onError: () => {
      toast.error('Invalid code. Please enter a valid code to create a team.')
    },
  })

  const handleFormSubmission = (data: TCodeVerificationData) => {
    verifyCodeMutation.mutate({ code: data.teamCreationCode.trim() })
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

          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmission)}>
            <Controller
              control={control}
              name="teamCreationCode"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    id="teamCreationCode"
                    name="teamCreationCode"
                    type="text"
                    value={field.value}
                    placeholder="Enter your team creation invite code"
                    className="text-center text-base"
                    onChange={field.onChange}
                    disabled={verifyCodeMutation.isPending}
                    autoComplete="off"
                    autoFocus
                  />
                  {errors.teamCreationCode && (
                    <p className="text-sm text-red-500">{errors.teamCreationCode.message}</p>
                  )}
                </div>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={verifyCodeMutation.isPending || !watch('teamCreationCode')}
            >
              {verifyCodeMutation.isPending ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-neutral-500">
              Each invite code allows you to create one team. Please get your code from an
              administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
