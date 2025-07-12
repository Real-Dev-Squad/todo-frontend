'use client'

import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
