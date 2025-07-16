import { UsersApi } from '@/api/users/users.api'
import { TUser } from '@/api/users/users.types'
import { PageContainer } from '@/components/page-container'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Combobox, type ComboboxOption } from '@/components/ui/combobox'
import { useDebounce } from '@/hooks/useDebounce'
import { ArrowLeft, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SelectPoc } from './select-poc'

type InviteFormProps = {
  onBack?: () => void
  teamName?: string
  onCreateTeam: (memberIds: string[], pocId: string | null) => void
  loading: boolean
  currentUser: TUser
}

const normalizeUser = (user: unknown): TUser => {
  const u = user as Record<string, unknown>
  const userId = (u.user_id as string) || (u.userId as string) || (u.id as string) || ''
  return {
    user_id: userId || `temp-${Math.random().toString(36).substr(2, 9)}`,
    name: (u.name as string) || '',
    email: (u.email as string) || (u.email_id as string) || '',
    auth_type: (u.auth_type as string) || '',
    google_id: (u.google_id as string) || '',
  }
}

export const InviteForm = ({ onBack, onCreateTeam, loading, currentUser }: InviteFormProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([])
  const [availableUsers, setAvailableUsers] = useState<TUser[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [pocId, setPocId] = useState<string | null>(currentUser.user_id)

  const selectedUserIds = useMemo(
    () => new Set(selectedUsers.map((user) => user.user_id)),
    [selectedUsers],
  )

  // Convert users to combobox options
  const userOptions = useMemo((): ComboboxOption[] => {
    return availableUsers
      .filter((user) => !selectedUserIds.has(user.user_id))
      .map((user) => ({
        value: user.user_id,
        label: `${user.name} (${user.email})`,
        user: user,
      }))
  }, [availableUsers, selectedUserIds])

  useEffect(() => {
    if (!debouncedSearchTerm.trim() || debouncedSearchTerm.trim().length < 3) {
      setAvailableUsers([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    UsersApi.searchUser
      .fn(debouncedSearchTerm)
      .then((res: { data: { users: Partial<TUser>[] } }) => {
        const users = (res?.data?.users || []).map(normalizeUser)
        setAvailableUsers(users)
      })
      .catch(() => setAvailableUsers([]))
      .finally(() => setIsSearching(false))
  }, [debouncedSearchTerm, selectedUserIds])

  const handleUserSelect = (value: string, option: ComboboxOption) => {
    const user = option.user as TUser
    setSelectedUsers((prev) => [...prev, normalizeUser(user)])
  }

  const handleRemoveUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.user_id !== id))
  }

  const handleClearAllUsers = () => {
    setSelectedUsers([])
  }

  const handleSubmit = () => {
    const memberIds = selectedUsers.map((u) => u.user_id)
    onCreateTeam(memberIds, pocId)
  }

  const handleSkipInviting = () => {
    onCreateTeam([], '')
  }

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  const renderUserOption = (option: ComboboxOption) => {
    const user = option.user as TUser
    return (
      <div className="flex w-full items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-600">
            {user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-gray-900">{user.name}</div>
          <div className="truncate text-xs text-gray-600">{user.email}</div>
        </div>
      </div>
    )
  }

  return (
    <PageContainer className="flex-1 py-12 md:py-20 xl:py-28">
      <div className="mx-auto w-full max-w-xs rounded-lg border border-black bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-2 pb-8 xl:pb-10">
          <Button
            size="icon"
            variant="ghost"
            onClick={onBack}
            className="h-9 w-9 shrink-0 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h2 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
            Invite Teammates
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Search and invite teammates
            </label>

            <div className="w-full">
              <Combobox
                options={userOptions}
                onSelect={handleUserSelect}
                onSearchChange={handleSearchChange}
                placeholder="Type to search for teammates..."
                searchPlaceholder="Search by name or email..."
                emptyText={
                  searchTerm.length < 3 ? 'Type at least 3 characters to search' : 'No users found'
                }
                loading={isSearching}
                renderOption={renderUserOption}
                className="w-full"
              />
            </div>

            {selectedUsers.length > 0 && (
              <p className="text-xs text-gray-500">
                {selectedUsers.length} teammate
                {selectedUsers.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {selectedUsers.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  Selected Teammates ({selectedUsers.length})
                </h3>
                <button
                  onClick={handleClearAllUsers}
                  className="text-xs font-medium text-red-600 transition-colors hover:text-red-800"
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {selectedUsers.map((user, index) => (
                  <div
                    key={user.user_id}
                    className="group flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 transition-colors"
                  >
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-600">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="truncate text-xs text-gray-600">{user.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-200 px-2 py-1 text-xs font-medium text-blue-600">
                        #{index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                        onClick={() => handleRemoveUser(user.user_id)}
                        title={`Remove ${user.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SelectPoc
            currentUser={currentUser}
            members={selectedUsers}
            value={pocId}
            onChange={setPocId}
          />

          <div className="flex w-full flex-col gap-2">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading || !selectedUsers.length}
            >
              {loading ? 'Creating...' : 'Create Team'}
            </Button>

            <Button variant="outline" className="w-full" onClick={handleSkipInviting}>
              Skip Inviting
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
