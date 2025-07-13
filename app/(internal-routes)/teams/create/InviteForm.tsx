import { UsersApi } from '@/api/users/users.api'
import { TUser } from '@/api/users/users.types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
// import { getUserInitials } from '@/lib/utils'
import { ArrowLeft, Loader2, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SelectPoc } from './SelectPoc'

interface InviteFormProps {
  onBack?: () => void
  teamName?: string
  onCreateTeam: (memberIds: string[], pocId: string | null) => void
  loading: boolean
  currentUser: TUser
}

const normalizeUser = (user: unknown): TUser => {
  const u = user as Record<string, unknown>
  return {
    user_id: (u.user_id as string) || (u.userId as string) || (u.id as string) || '',
    name: (u.name as string) || '',
    email: (u.email as string) || (u.email_id as string) || '',
    auth_type: (u.auth_type as string) || '',
    google_id: (u.google_id as string) || '',
  }
}

export function InviteForm({ onBack, onCreateTeam, loading, currentUser }: InviteFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<TUser[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [pocId, setPocId] = useState<string | null>(currentUser.user_id)

  const selectedUserIds = useMemo(
    () => new Set(selectedUsers.map((user) => user.user_id)),
    [selectedUsers],
  )

  useEffect(() => {
    if (!debouncedSearchTerm.trim() || debouncedSearchTerm.trim().length < 3) {
      setFilteredUsers([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    UsersApi.searchUser
      .fn(debouncedSearchTerm)
      .then((res: { data: { users: Partial<TUser>[] } }) => {
        const users = (res?.data?.users || []).map(normalizeUser)
        setFilteredUsers(users.filter((user: TUser) => !selectedUserIds.has(user.user_id)))
      })
      .catch(() => setFilteredUsers([]))
      .finally(() => setIsSearching(false))
  }, [debouncedSearchTerm, selectedUserIds])

  const handleAddUser = (user: TUser) => {
    setSelectedUsers((prev) => [...prev, normalizeUser(user)])
    setSearchTerm('')
    setShowSuggestions(false)
    setIsSearching(false)
  }

  const handleRemoveUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.user_id !== id))
  }

  const handleClearAllUsers = () => {
    setSelectedUsers([])
  }

  const handleGoBack = () => {
    if (onBack) {
      onBack()
      return
    }
    window.history.back()
  }

  const handleSubmit = () => {
    const memberIds = selectedUsers.map((u) => u.user_id)
    onCreateTeam(memberIds, pocId)
  }

  const handleSkipInviting = () => {
    onCreateTeam([], '')
  }

  const handleSearchFocus = () => {
    setSearchFocused(true)
    setShowSuggestions(true)
  }

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchFocused(false)
      if (searchTerm.trim() === '' && filteredUsers.length === 0) {
        setShowSuggestions(false)
      }
    }, 200)
  }

  const searchStats = useMemo(
    () => ({
      hasResults: filteredUsers.length > 0,
      resultCount: filteredUsers.length,
      selectedCount: selectedUsers.length,
      showingCount: Math.min(filteredUsers.length, 8),
      hasMore: filteredUsers.length > 8,
    }),
    [filteredUsers.length, selectedUsers.length],
  )

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-lg border-0 bg-white shadow-xl">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-b border-gray-100 p-4 sm:p-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 hover:bg-gray-100"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
              Invite Teammates
            </h2>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Search and invite teammates
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Type name or email to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="h-11 border-gray-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                />
                <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              </div>
              {searchStats.selectedCount > 0 && (
                <p className="text-xs text-gray-500">
                  {searchStats.selectedCount} teammate
                  {searchStats.selectedCount !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            {(showSuggestions || isSearching || filteredUsers.length > 0) && (
              <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out">
                {isSearching ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-gray-400" />
                    <span className="text-sm text-gray-500">Searching users...</span>
                  </div>
                ) : searchStats.hasResults ? (
                  <div>
                    <div className="border-b border-gray-100 bg-gray-50 px-4 py-2">
                      <span className="text-xs font-medium text-gray-600">
                        {searchStats.resultCount} user
                        {searchStats.resultCount !== 1 ? 's' : ''} found
                      </span>
                    </div>
                    {filteredUsers.slice(0, 8).map((user) => (
                      <div
                        key={user.user_id}
                        className="group flex cursor-pointer items-center gap-3 border-b border-gray-50 p-3 transition-colors duration-150 last:border-b-0 hover:bg-blue-50"
                        onMouseDown={(e) => {
                          e.preventDefault()
                        }}
                        onClick={() => handleAddUser(user)}
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-600">
                            {/* {getUserInitials(user.name)} */}
                            {user.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="truncate text-xs text-gray-600">{user.email}</div>
                        </div>
                        <div className="shrink-0 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                          + Add
                        </div>
                      </div>
                    ))}
                    {searchStats.hasMore && (
                      <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                        <span className="text-xs text-gray-500">
                          and {searchStats.resultCount - 8} more... Keep typing to narrow results
                        </span>
                      </div>
                    )}
                  </div>
                ) : debouncedSearchTerm.trim().length >= 3 ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="mb-3 text-gray-400">
                      <Search className="h-8 w-8" />
                    </div>
                    <span className="text-center text-sm font-medium text-gray-500">
                      No users found for &ldquo;{debouncedSearchTerm}&rdquo;
                    </span>
                    <span className="mt-1 text-center text-xs text-gray-400">
                      Try searching by name or email
                    </span>
                  </div>
                ) : searchFocused ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="mb-3 text-gray-400">
                      <Search className="h-8 w-8" />
                    </div>
                    <span className="text-center text-sm font-medium text-gray-500">
                      Type at least 3 characters to search for teammates
                    </span>
                  </div>
                ) : null}
              </div>
            )}

            {searchStats.selectedCount > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Selected Teammates ({searchStats.selectedCount})
                  </h3>
                  <button
                    onClick={handleClearAllUsers}
                    className="text-xs font-medium text-red-600 transition-colors hover:text-red-800"
                  >
                    Clear all
                  </button>
                </div>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {selectedUsers.map((user, index) => (
                    <div
                      key={user.user_id}
                      className="group flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 transition-colors hover:bg-blue-100"
                    >
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-600">
                          {/* {getUserInitials(user.name)} */}
                          {user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
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

            <div className="space-y-3 border-t border-gray-100 pt-6">
              <Button
                className="h-12 w-full cursor-pointer bg-black text-base font-medium text-white shadow-xs transition-colors hover:bg-gray-800"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Team'}
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-full cursor-pointer text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
                onClick={handleSkipInviting}
              >
                Skip Inviting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
