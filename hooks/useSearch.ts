'use client'

import { TUser } from '@/api/users/users.types'
import { apiClient } from '@/lib/api-client'
import { useCallback, useEffect, useState } from 'react'

export interface SearchResult {
  type: 'user' | 'task' | 'team'
  id: string
  title: string
  subtitle: string
  data: any
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      setError(null)
      return
    }
    setIsSearching(true)
    setError(null)
    try {
      const { data } = await apiClient.get<TUser[]>(
        `/v1/users?search=${encodeURIComponent(searchTerm)}`,
      )
      const userResults: SearchResult[] = (data || []).slice(0, 10).map((user) => ({
        type: 'user' as const,
        id: user.user_id,
        title: `${user.name}`,
        subtitle: user.email,
        data: user,
      }))
      setSearchResults(userResults)
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch users')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Trigger search when debouncedQuery changes
  useEffect(() => {
    performSearch(debouncedQuery)
  }, [debouncedQuery, performSearch])

  return {
    searchResults,
    isSearching,
    error,
    query,
    setQuery,
    performSearch, // still exposed if you want to trigger manually
  }
}
