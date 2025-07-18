'use client'

import { TApiResponse } from '@/api/common/common.types'
import { UsersApi } from '@/api/users/users.api'
import { TUser, TUsersSearchResponse } from '@/api/users/users.types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Combobox, type ComboboxOption } from '@/components/ui/combobox'
import { useDebounce } from '@/hooks/useDebounce'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type UserSelectionProps = {
  selectedUsers: TUser[]
  onUsersChange: (users: TUser[]) => void
  excludeUserIds?: string[]
  placeholder?: string
  searchPlaceholder?: string
}

const normalizeUser = (user: unknown): TUser => {
  const u = user as Record<string, unknown>

  const userId =
    (u.user_id as string) || (u.userId as string) || (u.id as string) || (u._id as string) || ''

  const normalized = {
    id: userId || `temp-${Math.random().toString(36).substr(2, 9)}`,
    name: (u.name as string) || (u.fullName as string) || '',
    email: (u.email as string) || (u.email_id as string) || (u.emailId as string) || '',
    picture: (u.picture as string) || (u.avatar as string) || (u.profilePicture as string) || '',
  }
  return normalized
}

export const UserSelection = ({
  selectedUsers,
  onUsersChange,
  excludeUserIds = [],
  placeholder = 'Type to search for teammates...',
  searchPlaceholder = 'Search by name or email...',
}: UserSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [availableUsers, setAvailableUsers] = useState<TUser[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const selectedUserIds = useMemo(
    () => new Set(selectedUsers.map((user) => user.id)),
    [selectedUsers],
  )

  // Convert users to combobox options
  const userOptions = useMemo((): ComboboxOption[] => {
    return availableUsers
      .filter((user) => !selectedUserIds.has(user.id) && !excludeUserIds.includes(user.id))
      .map((user) => ({
        value: user.id,
        label: `${user.name} (${user.email})`,
        user: user,
      }))
  }, [availableUsers, selectedUserIds, excludeUserIds])

  useEffect(() => {
    if (!debouncedSearchTerm.trim() || debouncedSearchTerm.trim().length < 3) {
      setAvailableUsers([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    UsersApi.users
      .fn({ search: debouncedSearchTerm })
      .then((res: TApiResponse<TUsersSearchResponse>) => {
        const users = (res?.data?.users || []).map(normalizeUser)
        setAvailableUsers(users)
      })
      .catch(() => setAvailableUsers([]))
      .finally(() => setIsSearching(false))
  }, [debouncedSearchTerm])

  const handleUserSelect = (value: string, option: ComboboxOption) => {
    const user = option.user as TUser
    onUsersChange([...selectedUsers, normalizeUser(user)])
  }

  const handleRemoveUser = (id: string) => {
    onUsersChange(selectedUsers.filter((user) => user.id !== id))
  }

  const handleClearAllUsers = () => {
    onUsersChange([])
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Search and invite teammates</label>

      <div className="w-full">
        <Combobox
          options={userOptions}
          onSelect={handleUserSelect}
          onSearchChange={handleSearchChange}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
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
                key={user.id}
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
                    onClick={() => handleRemoveUser(user.id)}
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
    </div>
  )
}
