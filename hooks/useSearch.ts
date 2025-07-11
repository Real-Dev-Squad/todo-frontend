import { useState, useCallback } from 'react';
import { dummyUsers } from '@/__mocks__/Task';
import { User } from '@/app/types/user';
import { dummyTeams } from '@/__mocks__/Team';

export interface SearchResult {
  type: 'user' | 'task' | 'team';
  id: string;
  title: string;
  subtitle: string;
  data: any;
}

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const results: SearchResult[] = [];

    // Search users
    const userResults = dummyUsers
      .filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const searchTerm = query.toLowerCase();
        return (
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          fullName.includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      })
      .slice(0, 5) // Limit to 5 results
      .map(user => ({
        type: 'user' as const,
        id: user.id,
        title: `${user.firstName} ${user.lastName}`,
        subtitle: user.email,
        data: user
      }));

    results.push(...userResults);

    const teamResults = dummyTeams.filter(team =>{
      const teamName = team.name.toLowerCase();
      const searchTerm = query.toLowerCase();
      return(
        teamName.toLowerCase().includes(searchTerm)
      )
    })
    .slice(0, 5)
    .map(team=> ({
      type: 'team' as const,
      id: team.id,
      title: team.name,
      subtitle: "",
      data: team
    }))

    results.push(...teamResults)
    // TODO: Add task and team search when those data sources are available
    // For now, we'll add some mock task results
    if (query.toLowerCase().includes('task')) {
      results.push({
        type: 'task',
        id: '1',
        title: 'Sample Task',
        subtitle: 'Complete project setup',
        data: { id: '1', title: 'Sample Task' }
      });
    }

    setSearchResults(results);
    setIsSearching(false);
  }, []);

  return {
    searchResults,
    isSearching,
    performSearch
  };
};
