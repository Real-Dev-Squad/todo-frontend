import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { X, ArrowLeft, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { User } from '@/app/types/user'
import { dummyUsers } from '@/__mocks__/Task'
import { SuccessModal } from '@/components/dashboard/SuccessModal'

interface InviteFormProps {
  onBack?: () => void
  teamName?: string
}

export function InviteForm({ onBack, teamName }: InviteFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const selectedUserIds = useMemo(
    () => new Set(selectedUsers.map((user) => user.id)),
    [selectedUsers],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 250)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const performSearch = useCallback(
    async (term: string) => {
      if (term.trim() === '') {
        setFilteredUsers([])
        setShowSuggestions(false)
        setIsSearching(false)
        return
      }

      setIsSearching(true)

      await new Promise((resolve) => setTimeout(resolve, 50))

      const searchTermLower = term.toLowerCase()
      const filtered = dummyUsers.filter((user) => {
        if (selectedUserIds.has(user.id)) return false

        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
        return (
          user.firstName.toLowerCase().includes(searchTermLower) ||
          user.lastName.toLowerCase().includes(searchTermLower) ||
          fullName.includes(searchTermLower) ||
          user.email.toLowerCase().includes(searchTermLower)
        )
      })

      setFilteredUsers(filtered)
      setShowSuggestions(true)
      setIsSearching(false)
    },
    [selectedUserIds],
  )

  useEffect(() => {
    if (searchFocused || debouncedSearchTerm.length > 0) {
      performSearch(debouncedSearchTerm)
    } else if (!searchFocused && debouncedSearchTerm.length === 0) {
      setFilteredUsers([])
      setShowSuggestions(false)
    }
  }, [debouncedSearchTerm, searchFocused, performSearch])

  const handleAddUser = (user: User) => {
    setSelectedUsers((prev) => [...prev, user])
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setShowSuggestions(false)
    setIsSearching(false)
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId))
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const handleCreateTeam = () => {
    console.log('Creating team with users:', selectedUsers)
    setShowSuccessModal(true)
  }

  const handleSkipInviting = () => {
    console.log('Skipping inviting process')
  }

  const handleSearchFocus = () => {
    setSearchFocused(true)
    setShowSuggestions(true)
  }

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchFocused(false)
      if (searchTerm.trim() === '') {
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

  if (showSuccessModal) {
    return <SuccessModal teamName={teamName} onClose={() => setShowSuccessModal(false)} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
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

            {(showSuggestions || isSearching) && (
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
                        key={user.id}
                        className="group flex cursor-pointer items-center gap-3 border-b border-gray-50 p-3 transition-colors duration-150 last:border-b-0 hover:bg-blue-50"
                        onMouseDown={(e) => {
                          e.preventDefault()
                        }}
                        onClick={() => handleAddUser(user)}
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-600">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="truncate text-xs text-gray-500">{user.email}</div>
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
                ) : debouncedSearchTerm.length > 0 ? (
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
                    <span className="text-center text-sm text-gray-500">
                      Start typing to search for teammates
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
                      key={user.id}
                      className="group flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 transition-colors hover:bg-blue-100"
                    >
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-600">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
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
                          onClick={() => handleRemoveUser(user.id)}
                          title={`Remove ${user.firstName} ${user.lastName}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 border-t border-gray-100 pt-6">
              <Button
                className="h-12 w-full bg-black text-base font-medium text-white shadow-xs transition-colors hover:bg-gray-800"
                onClick={handleCreateTeam}
              >
                Create Team
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-full text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
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
