import React, { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface InviteFormProps {
  onBack?: () => void;
}

export const InviteForm: React.FC<InviteFormProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const dummyUsers: User[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@gmail.com",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@gmail.com",
    },
    {
      id: "4",
      firstName: "Emily",
      lastName: "Brown",
      email: "emily.brown@gmail.com",
    },
    {
      id: "5",
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@gmail.com",
    },
    {
      id: "6",
      firstName: "Sarah",
      lastName: "Davis",
      email: "sarah.davis@gmail.com",
    },
    {
      id: "7",
      firstName: "Robert",
      lastName: "Miller",
      email: "robert.miller@gmail.com",
    },
    {
      id: "8",
      firstName: "Lisa",
      lastName: "Garcia",
      email: "lisa.garcia@gmail.com",
    },
    {
      id: "9",
      firstName: "James",
      lastName: "Martinez",
      email: "james.martinez@gmail.com",
    },
    {
      id: "10",
      firstName: "Jessica",
      lastName: "Anderson",
      email: "jessica.anderson@gmail.com",
    },
    {
      id: "11",
      firstName: "Christopher",
      lastName: "Taylor",
      email: "christopher.taylor@gmail.com",
    },
    {
      id: "12",
      firstName: "Ashley",
      lastName: "Thomas",
      email: "ashley.thomas@gmail.com",
    },
    {
      id: "13",
      firstName: "Matthew",
      lastName: "Jackson",
      email: "matthew.jackson@gmail.com",
    },
    {
      id: "14",
      firstName: "Amanda",
      lastName: "White",
      email: "amanda.white@gmail.com",
    },
    {
      id: "15",
      firstName: "Daniel",
      lastName: "Harris",
      email: "daniel.harris@gmail.com",
    },
    {
      id: "16",
      firstName: "Stephanie",
      lastName: "Martin",
      email: "stephanie.martin@gmail.com",
    },
    {
      id: "17",
      firstName: "Kevin",
      lastName: "Thompson",
      email: "kevin.thompson@gmail.com",
    },
    {
      id: "18",
      firstName: "Michelle",
      lastName: "Garcia",
      email: "michelle.garcia@gmail.com",
    },
    {
      id: "19",
      firstName: "Ryan",
      lastName: "Rodriguez",
      email: "ryan.rodriguez@gmail.com",
    },
    {
      id: "20",
      firstName: "Nicole",
      lastName: "Lewis",
      email: "nicole.lewis@gmail.com",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

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

      await new Promise((resolve) => setTimeout(resolve, 150));

      const filtered = dummyUsers.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const isAlreadySelected = selectedUsers.some(
          (selected) => selected.id === user.id
        );

        return (
          !isAlreadySelected &&
          (user.firstName.toLowerCase().includes(term.toLowerCase()) ||
            user.lastName.toLowerCase().includes(term.toLowerCase()) ||
            fullName.includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase()))
        );
      });

      setFilteredUsers(filtered);
      setShowSuggestions(filtered.length > 0 || term.length > 0);
      setIsSearching(false);
    },
    [selectedUsers]
  );

  useEffect(() => {
    if (searchFocused || debouncedSearchTerm.length > 0) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, performSearch, searchFocused]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredUsers([]);
      setShowSuggestions(false);
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  const handleAddUser = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setShowSuggestions(false);
    setIsSearching(false);
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));

    if (debouncedSearchTerm.length > 0) {
      performSearch(debouncedSearchTerm);
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    window.history.back();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleCreateTeam = () => {
    console.log("Creating team with users:", selectedUsers);
  };

  const handleSkipInviting = () => {
    console.log("Skipping inviting process");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="min-w-80 max-w-md bg-gray-200 shadow-lg">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Invite Teammates to join</h2>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Invite by Email
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {(showSuggestions || isSearching) && (
              <div className="border rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto transition-all duration-200 ease-in-out">
                {isSearching ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin mr-2" />
                    <span className="text-sm text-gray-500">
                      Searching users...
                    </span>
                  </div>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.slice(0, 8).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors duration-150"
                      onClick={() => handleAddUser(user)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to add
                      </div>
                    </div>
                  ))
                ) : debouncedSearchTerm.length > 0 ? (
                  <div className="flex items-center justify-center p-4">
                    <span className="text-sm text-gray-500">
                      No users found
                    </span>
                  </div>
                ) : null}
              </div>
            )}

            {selectedUsers.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={handleCreateTeam}
              >
                Create Team
              </Button>
              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800"
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
};
