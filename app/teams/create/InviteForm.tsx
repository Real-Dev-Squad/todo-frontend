import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, ArrowLeft, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/app/types/user";
import { dummyUsers } from "@/__mocks__/Task";
import { SuccessModal } from "@/components/dashboard/SuccessModal";

interface InviteFormProps {
  onBack?: () => void;
  teamName?: string;
}

export function InviteForm({ onBack, teamName }: InviteFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const selectedUserIds = useMemo(
    () => new Set(selectedUsers.map((user) => user.id)),
    [selectedUsers]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const performSearch = useCallback(
    async (term: string) => {
      if (term.trim() === "") {
        setFilteredUsers([]);
        setShowSuggestions(false);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const searchTermLower = term.toLowerCase();
      const filtered = dummyUsers.filter((user) => {
        if (selectedUserIds.has(user.id)) return false;

        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return (
          user.firstName.toLowerCase().includes(searchTermLower) ||
          user.lastName.toLowerCase().includes(searchTermLower) ||
          fullName.includes(searchTermLower) ||
          user.email.toLowerCase().includes(searchTermLower)
        );
      });

      setFilteredUsers(filtered);
      setShowSuggestions(true);
      setIsSearching(false);
    },
    [selectedUserIds]
  );

  useEffect(() => {
    if (searchFocused || debouncedSearchTerm.length > 0) {
      performSearch(debouncedSearchTerm);
    } else if (!searchFocused && debouncedSearchTerm.length === 0) {
      setFilteredUsers([]);
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm, searchFocused, performSearch]);

  const handleAddUser = useCallback((user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setShowSuggestions(false);
    setIsSearching(false);
  }, []);

  const handleRemoveUser = useCallback((userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  const handleClearAllUsers = useCallback(() => {
    setSelectedUsers([]);
  }, []);

  const handleGoBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    window.history.back();
  }, [onBack]);

  const getInitials = useCallback((firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  const handleCreateTeam = useCallback(() => {
    console.log("Creating team with users:", selectedUsers);
    setShowSuccessModal(true);
  }, [selectedUsers]);

  const handleSkipInviting = useCallback(() => {
    console.log("Skipping inviting process");
  }, []);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
    setShowSuggestions(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setSearchFocused(false);
      if (searchTerm.trim() === "") {
        setShowSuggestions(false);
      }
    }, 200);
  }, [searchTerm]);

  const searchStats = useMemo(
    () => ({
      hasResults: filteredUsers.length > 0,
      resultCount: filteredUsers.length,
      selectedCount: selectedUsers.length,
      showingCount: Math.min(filteredUsers.length, 8),
      hasMore: filteredUsers.length > 8,
    }),
    [filteredUsers.length, selectedUsers.length]
  );

  if (showSuccessModal) {
    return (
      <SuccessModal
        teamName={teamName}
        onClose={() => setShowSuccessModal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg mx-auto bg-white shadow-xl border-0">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0 hover:bg-gray-100"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              Invite Teammates
            </h2>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 block">
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
                  className="pr-10 text-sm sm:text-base h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {searchStats.selectedCount > 0 && (
                <p className="text-xs text-gray-500">
                  {searchStats.selectedCount} teammate
                  {searchStats.selectedCount !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            {(showSuggestions || isSearching) && (
              <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto transition-all duration-200 ease-in-out">
                {isSearching ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin mr-2" />
                    <span className="text-sm text-gray-500">
                      Searching users...
                    </span>
                  </div>
                ) : searchStats.hasResults ? (
                  <div>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium">
                        {searchStats.resultCount} user
                        {searchStats.resultCount !== 1 ? "s" : ""} found
                      </span>
                    </div>
                    {filteredUsers.slice(0, 8).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors duration-150 group"
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => handleAddUser(user)}
                      >
                        <Avatar className="h-9 w-9 flex-shrink-0">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-600 font-medium">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                        <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 font-medium">
                          + Add
                        </div>
                      </div>
                    ))}
                    {searchStats.hasMore && (
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          and {searchStats.resultCount - 8} more... Keep typing
                          to narrow results
                        </span>
                      </div>
                    )}
                  </div>
                ) : debouncedSearchTerm.length > 0 ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="text-gray-400 mb-3">
                      <Search className="h-8 w-8" />
                    </div>
                    <span className="text-sm text-gray-500 text-center font-medium">
                      No users found for "{debouncedSearchTerm}"
                    </span>
                    <span className="text-xs text-gray-400 text-center mt-1">
                      Try searching by name or email
                    </span>
                  </div>
                ) : searchFocused ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="text-gray-400 mb-3">
                      <Search className="h-8 w-8" />
                    </div>
                    <span className="text-sm text-gray-500 text-center">
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
                    className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg group hover:bg-blue-100 transition-colors border border-blue-100"
                    >
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600 font-medium">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {user.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full font-medium">
                          #{index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600"
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

            <div className="space-y-3 pt-6 border-t border-gray-100">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white h-12 text-base font-medium transition-colors shadow-sm"
                onClick={handleCreateTeam}
              >
                Create Team
              </Button>
              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-50 h-12 text-base font-medium transition-colors"
                onClick={handleSkipInviting}
              >
                Skip Inviting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
