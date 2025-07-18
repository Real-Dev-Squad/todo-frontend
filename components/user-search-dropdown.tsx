import { UsersApi } from '@/api/users/users.api'
import { TUser } from '@/api/users/users.types'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type UserSearchDropdownProps = {
  value?: string
  placeholder?: string
  onUserSelect: (user: TUser) => void
}

export const UserSearchDropdown = ({
  value,
  placeholder = 'Search user',
  onUserSelect,
}: UserSearchDropdownProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { data: usersList, isLoading } = useQuery({
    queryKey: UsersApi.users.key({ search }),
    queryFn: () => UsersApi.users.fn({ search: search || undefined }),
    select: (res) => res.data.users,
    enabled: open || search.length > 0,
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
                    {user.email && (
                      <div className="text-muted-foreground text-xs">{user.email}</div>
                    )}
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
