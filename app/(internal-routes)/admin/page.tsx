'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ADMIN_USER_IDS } from '@/config/app-config'
import { useAuth } from '@/hooks/useAuth'
import { AdminInviteCodesManager } from '@/modules/admin/admin-invite-codes-manager'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeTab = searchParams.get('tab') || 'invite-codes'

  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    if (!searchParams.has('tab')) {
      updateSearchParams({ tab: 'invite-codes' })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  const isAdmin = user ? ADMIN_USER_IDS.includes(user.id) : false

  if (!isLoading && !isAdmin) {
    router.push('/dashboard')
  }

  const tabs = [
    {
      id: 'invite-codes',
      label: 'Manage Invite Codes',
      content: <AdminInviteCodesManager />,
      disabled: false,
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="py-8 text-center">
          <p className="text-neutral-500">System Settings (Coming Soon)</p>
        </div>
      ),
      disabled: true,
    },
  ]

  const handleTabChange = (tabId: string) => {
    if (tabId === 'invite-codes') {
      updateSearchParams({ tab: tabId })
    } else {
      const params = new URLSearchParams()
      params.set('tab', tabId)
      router.push(`?${params.toString()}`)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex flex-row items-center justify-between pb-2">
          <div>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  disabled={tab.disabled}
                  className="cursor-pointer"
                >
                  {tab.label}
                  {tab.disabled && <span className="ml-1 text-xs">(Soon)</span>}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </Tabs>
    </div>
  )
}
