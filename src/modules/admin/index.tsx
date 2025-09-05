import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { appConfig } from '@/config/app-config'
import { useAuth } from '@/hooks/useAuth'
import { AdminInviteCodesManager } from '@/modules/admin/admin-invite-codes-manager'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Suspense, useCallback, useEffect } from 'react'

function AdminContent() {
  const { user, isLoading } = useAuth()
  const router = useNavigate()
  const searchParams = useSearch({ from: '/_internal/admin' })

  const activeTab = searchParams.tab || 'invite-codes'

  const updateSearchParams = useCallback(
    (updates: Record<string, string>) => {
      router({
        to: '/admin',
        search: (prev) => ({
          page: prev.page,
          limit: prev.limit,
          tab: updates.tab || prev.tab,
        }),
      })
    },
    [router],
  )

  useEffect(() => {
    if (!searchParams.tab) {
      updateSearchParams({ tab: 'invite-codes' })
    }
  }, [searchParams.tab, updateSearchParams])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  const isAdmin = user?.email ? appConfig.adminEmails.includes(user.email) : false

  if (!isLoading && !isAdmin) {
    router({
      to: '/dashboard',
      search: {
        status: undefined,
        tab: undefined,
        search: undefined,
      },
    })
    return null
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
    updateSearchParams({ tab: tabId })
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

export function Admin() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-6">
          <div className="flex h-64 items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  )
}
