import { TeamsApi } from '@/api/teams/teams.api'
import { TTeam } from '@/api/teams/teams.type'
import { TUser } from '@/api/users/users.types'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronDown, XIcon } from 'lucide-react'
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
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type TUserOrTeamOption = {
  value: string
  type: 'user' | 'team'
  label: React.ReactNode
}

type TeamOptionProps = {
  team: TTeam
}

const TeamOption = ({ team }: TeamOptionProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="truncate">{team.name}</div>
      <div className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500">
        Team
      </div>
    </div>
  )
}

type UserAndTeamSearchProps = {
  label?: string
  value?: string
  placeholder?: string
  onChange: (value: TUserOrTeamOption | null) => void
}

export const UserAndTeamSearch = ({
  value,
  onChange,
  placeholder = 'Select user...',
  label = 'Assignee',
}: UserAndTeamSearchProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // const { data: users, isLoading: isUsersLoading } = useQuery({
  //   enabled: !!search.length,
  //   queryKey: UsersApi.users.key({ search }),
  //   queryFn: () => UsersApi.users.fn({ search: search || undefined }),
  //   select: (data) => data.data,
  // })

  const users: TUser[] = []
  const isUsersLoading = false

  const { data: teamsList, isLoading: isTeamsLoading } = useQuery({
    enabled: !!search.length,
    queryKey: TeamsApi.getTeams.key,
    queryFn: TeamsApi.getTeams.fn,
  })

  const isDataLoading = isUsersLoading || isTeamsLoading
  const filteredTeams =
    teamsList?.teams.filter((team) => team.name.toLowerCase().includes(search.toLowerCase())) ?? []

  const userOptions: TUserOrTeamOption[] =
    users?.map((user) => ({
      label: user.name,
      value: user.userId,
      type: 'user',
    })) ?? []

  const teamOptions: TUserOrTeamOption[] = filteredTeams.map((team) => ({
    label: <TeamOption team={team} />,
    value: team.id,
    type: 'team',
  }))

  const options = [...userOptions, ...teamOptions]
  const selectedUser = options.find((option) => option.value === value)

  const handleSelect = (option: TUserOrTeamOption) => {
    onChange(option)
    setOpen(false)
  }

  const handleClear = () => {
    onChange(null)
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? (
              <div className="flex flex-1 items-center gap-2 truncate font-normal">
                {selectedUser?.label}
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
                {value && (
                  <CommandItem key="clear" onSelect={handleClear} className="text-muted-foreground">
                    <XIcon className="mr-2 h-4 w-4" />
                    Clear selection
                  </CommandItem>
                )}
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-full">{option.label}</div>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
