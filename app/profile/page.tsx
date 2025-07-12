'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { logoutUser } from '@/lib/api-client'

export default function Page() {
  const { user } = useAuth()
  const name = user?.data?.name || 'Guest'
  const email = user?.data?.email || 'No email'

  return (
    <div className="flex min-h-screen items-start justify-start bg-gray-50 p-4">
      <div className="mt-8 ml-4 flex w-full max-w-sm flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-4 w-full text-center">
          <div className="mb-1 text-xl font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
        <Button
          onClick={logoutUser}
          type="button"
          variant="destructive"
          className="w-full cursor-pointer"
        >
          Log out
        </Button>
      </div>
    </div>
  )
}
