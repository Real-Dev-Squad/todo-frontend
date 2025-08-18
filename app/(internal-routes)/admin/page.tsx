'use client'

import { AdminInviteCodesManager } from '@/components/admin/admin-invite-codes-manager'
import { ADMIN_USER_IDS } from '@/config/app-config'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const isAdmin = user ? ADMIN_USER_IDS.includes(user.id) : false

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/dashboard')
    }
  }, [isLoading, isAdmin, router])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage creation team invite codes</p>
      </div>

      <AdminInviteCodesManager />
    </div>
  )
}
