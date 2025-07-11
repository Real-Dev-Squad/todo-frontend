'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { InviteForm } from './InviteForm'
import Image from 'next/image'

export default function CreateTeamPage() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [teamName, setTeamName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ avatar?: string; teamName?: string }>({})
  const [showInviteForm, setShowInviteForm] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
        setErrors((prev) => ({ ...prev, avatar: undefined }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: typeof errors = {}
    if (!avatar) newErrors.avatar = 'Avatar is required'
    if (!teamName.trim()) newErrors.teamName = 'Team name is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setShowInviteForm(true)
  }

  if (showInviteForm) {
    return <InviteForm onBack={() => setShowInviteForm(false)} teamName={teamName} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-6">
      <form onSubmit={handleSubmit} className="w-full">
        <Card className="mx-auto w-full max-w-sm rounded-2xl bg-gray-200 p-4 shadow-md md:p-6">
          <CardContent className="flex flex-col items-center gap-4">
            <h2 className="text-center text-lg font-semibold md:text-xl">Create your Team</h2>

            <label htmlFor="avatar-upload" className="flex cursor-pointer flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gray-500 md:h-16 md:w-16">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Avatar"
                    width={500}
                    height={300}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="text-sm text-gray-500">+</div>
                )}
              </div>
              <span className="text-muted-foreground mt-1 text-xs">Add Avatar</span>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              {errors.avatar && (
                <p className="mt-1 text-center text-xs text-red-600">{errors.avatar}</p>
              )}
            </label>

            <div className="w-full">
              <Label htmlFor="teamName" className="text-sm md:text-base">
                Team Name
              </Label>
              <Input
                id="teamName"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value)
                  setErrors((prev) => ({ ...prev, teamName: undefined }))
                }}
                className="mt-1 text-sm md:text-base"
              />
              {errors.teamName && <p className="mt-1 text-xs text-red-600">{errors.teamName}</p>}
            </div>

            <div className="w-full">
              <Label htmlFor="description" className="text-sm md:text-base">
                Team Description (optional)
              </Label>
              <Input
                id="description"
                placeholder="Team Description ( optional )"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 text-sm md:text-base"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full bg-neutral-800 text-sm font-medium text-white hover:bg-neutral-900 md:h-11 md:text-base"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
