import { TeamsApi } from '@/api/teams/teams.api'
import { UsersApi } from '@/api/users/users.api'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronDown, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
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

type TUserOrTeamOption = {
  label: string
  value: string
  type: 'user' | 'team'
}

type TeamOptionProps = {
  name: string
}

const TeamOption = ({ name }: TeamOptionProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="truncate">{name}</div>
      <div className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500">
        Team
      </div>
    </div>
  )
}

type UserAndTeamSearchProps = {
  placeholder?: string
  value: TUserOrTeamOption | null
  onChange: (value: TUserOrTeamOption | null) => void
}

export const UserAndTeamSearch = ({
  value,
  onChange,
  placeholder = 'Select user...',
}: UserAndTeamSearchProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedOption, setSelectedOption] = useState<TUserOrTeamOption | null>(null)

  const { data: usersList, isLoading: isUsersLoading } = useQuery({
    queryKey: UsersApi.users.key({ search }),
    queryFn: () => UsersApi.users.fn({ search: search || undefined }),
    select: (res) => res.data.users,
  })

  const { data: teamsList, isLoading: isTeamsLoading } = useQuery({
    queryKey: TeamsApi.getTeams.key,
    queryFn: TeamsApi.getTeams.fn,
  })

  const isDataLoading = isUsersLoading || isTeamsLoading
  const filteredTeams =
    teamsList?.teams.filter((team) => team.name.toLowerCase().includes(search.toLowerCase())) ?? []

  const userOptions: TUserOrTeamOption[] =
    usersList?.map((user) => ({
      label: user.name,
      value: user.id,
      type: 'user',
      searchValue: user.name,
    })) ?? []

  const teamOptions: TUserOrTeamOption[] = filteredTeams.map((team) => ({
    label: team.name,
    value: team.id,
    type: 'team',
    searchValue: team.name,
  }))

  // Always include the selected option in the list, even if it's not in current results
  const allOptions = [...userOptions, ...teamOptions]

  // Add selected option if it exists and is not already in the current options
  const optionsWithSelectedUser =
    selectedOption && !allOptions.some((opt) => opt.value === selectedOption.value)
      ? [selectedOption, ...allOptions]
      : allOptions

  const options = optionsWithSelectedUser.sort((a, b) => {
    if (a.value === selectedOption?.value) return -1
    if (b.value === selectedOption?.value) return 1
    return a.label.localeCompare(b.label)
  })

  const handleSelect = (option: TUserOrTeamOption) => {
    setSelectedOption(option)
    onChange(option)
    setOpen(false)
    setSearch('')
  }

  const handleClear = () => {
    setSelectedOption(null)
    onChange(null)
    setOpen(false)
  }

  // Sync selectedOption with value prop when it changes externally
  useEffect(() => {
    if (value) {
      setSelectedOption(value)
      return
    }

    if (!value && selectedOption) {
      setSelectedOption(null)
    }
  }, [value, selectedOption, options])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption ? (
            <div className="flex flex-1 items-center gap-2 truncate font-normal">
              {selectedOption.type === 'team' ? (
                <TeamOption name={selectedOption.label} />
              ) : (
                selectedOption.label
              )}
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center gap-2 font-normal">
              {placeholder}
            </div>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command>
          <CommandInput placeholder="Search users..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>{isDataLoading ? 'Loading...' : 'No users found.'}</CommandEmpty>

            <CommandGroup>
              {selectedOption && (
                <CommandItem key="clear" onSelect={handleClear} className="text-muted-foreground">
                  <XIcon className="mr-2 h-4 w-4" />
                  Clear selection
                </CommandItem>
              )}
              {options.map((option, index) => (
                <CommandItem
                  value={option.label}
                  key={`${option.value}-${index}`}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center gap-2"
                >
                  <div className="w-full">
                    {option.type === 'team' ? <TeamOption name={option.label} /> : option.label}
                  </div>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedOption?.value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
