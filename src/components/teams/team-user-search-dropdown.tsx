import { TeamsApi } from '@/api/teams/teams.api'
import { TUser } from '@/api/users/users.types'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

type TeamUserSearchDropdownProps = {
  teamId: string
  value?: string
  placeholder?: string
  onUserSelect: (user: TUser) => void
}

export const TeamUserSearchDropdown = ({
  teamId,
  value,
  placeholder = 'Search user',
  onUserSelect,
}: TeamUserSearchDropdownProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { data: usersList, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId, member: true }),
    select: (res) => res.users,
  })

  const selectedUser = usersList?.find((user) => user.id === value)

  const handleSelect = (user: TUser) => {
    onUserSelect(user)
    setOpen(false)
    setSearch('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between font-normal',
            !selectedUser && 'text-muted-foreground',
          )}
        >
          {selectedUser?.name ?? placeholder}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command>
          <CommandInput placeholder={placeholder} value={search} onValueChange={setSearch} />

          <CommandList>
            <CommandEmpty>{isLoading ? 'Searching users...' : 'No users found.'}</CommandEmpty>

            <CommandGroup>
              {usersList?.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => handleSelect(user)}
                  className="flex items-center gap-2"
                >
                  <User className="text-muted-foreground h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
