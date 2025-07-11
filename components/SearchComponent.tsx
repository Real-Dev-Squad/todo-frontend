import React, { useState, useEffect } from 'react'
import { Search, User, FileText, Users, Loader2 } from 'lucide-react'
import { useSearch, SearchResult } from '@/hooks/useSearch'

interface SearchComponentProps {
  className?: string
  placeholder?: string
  onResultSelect?: (result: SearchResult) => void
}

export const SearchComponent = ({
  className = '',
  placeholder = 'Search tasks, teams, or users...',
  onResultSelect,
}: SearchComponentProps) => {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const { searchResults, isSearching, performSearch } = useSearch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, performSearch])

  const handleResultClick = (result: SearchResult) => {
    setQuery('')
    setShowResults(false)
    onResultSelect?.(result)

    // Basic navigation logic (you can expand this)
    console.log('Selected:', result)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4 text-blue-500" />
      case 'task':
        return <FileText className="h-4 w-4 text-green-500" />
      case 'team':
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 md:h-5 md:w-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-8 text-sm text-black placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-hidden md:pl-10 md:text-base"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (query.length > 0 || searchResults.length > 0) && (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {isSearching ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-gray-400" />
              <span className="text-sm text-gray-500">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                >
                  {getResultIcon(result.type)}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-900">{result.title}</div>
                    <div className="truncate text-xs text-gray-500">{result.subtitle}</div>
                  </div>
                  <div className="text-xs text-gray-400 capitalize">{result.type}</div>
                </button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="flex items-center justify-center p-4">
              <span className="text-sm text-gray-500">No results found</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
