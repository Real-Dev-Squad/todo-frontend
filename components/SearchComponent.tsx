import React, { useState, useEffect } from 'react';
import { Search, User, FileText, Users, Loader2 } from 'lucide-react';
import { useSearch, SearchResult } from '@/hooks/useSearch';

interface SearchComponentProps {
  className?: string;
  placeholder?: string;
  onResultSelect?: (result: SearchResult) => void;
}

export const SearchComponent = ({ 
  className = "", 
  placeholder = "Search tasks, teams, or users...",
  onResultSelect
}: SearchComponentProps) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { searchResults, isSearching, performSearch } = useSearch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const handleResultClick = (result: SearchResult) => {
    setQuery('');
    setShowResults(false);
    onResultSelect?.(result);
    
    // Basic navigation logic (you can expand this)
    console.log('Selected:', result);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'task':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'team':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full pl-8 md:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 text-sm md:text-base"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (query.length > 0 || searchResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {isSearching ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  {getResultIcon(result.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {result.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {result.subtitle}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {result.type}
                  </div>
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
  );
};
