import { TeamsApi } from '@/api/teams/teams.api'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useMatch } from '@tanstack/react-router'
import { Check, ChevronDown, XIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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

const mapUserToOption = (user: { id: string; name: string }): TUserOrTeamOption => ({
  label: user.name,
  value: user.id,
  type: 'user',
})

const mapTeamToOption = (team: { id: string; name: string }): TUserOrTeamOption => ({
  label: team.name,
  value: team.id,
  type: 'team',
})

const filterByTerm = (options: TUserOrTeamOption[], term: string) =>
  options.filter((o) => o.label.toLowerCase().includes(term))

export const UserAndTeamSearch = ({
  value,
  onChange,
  placeholder = 'Select assignee...',
}: UserAndTeamSearchProps) => {
  const { user: currentUser } = useAuth()
  const teamMatch = useMatch({ from: '/_internal/teams/$teamId', shouldThrow: false })
  const isTeamScope = !!teamMatch?.params?.teamId
  const teamId = teamMatch?.params?.teamId

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedOption, setSelectedOption] = useState<TUserOrTeamOption | null>(null)

  const { data: userTeams, isLoading: isUserTeamsLoading } = useQuery({
    enabled: !isTeamScope,
    queryKey: TeamsApi.getTeams.key,
    queryFn: TeamsApi.getTeams.fn,
    select: (res) => res.teams,
  })

  const { data: teamWithMembers, isLoading: isTeamLoading } = useQuery({
    enabled: isTeamScope && !!teamId,
    queryKey: TeamsApi.getTeamById.key({ teamId: teamId!, member: true }),
    queryFn: async () => TeamsApi.getTeamById.fn({ teamId: teamId!, member: true }),
  })

  const isDataLoading = isTeamScope ? isTeamLoading : isUserTeamsLoading

  const options = useMemo<TUserOrTeamOption[]>(() => {
    const term = search.trim().toLowerCase()

    if (isTeamScope) {
      const teamOption = teamWithMembers ? [mapTeamToOption(teamWithMembers)] : []
      const memberOptions = teamWithMembers?.users?.map(mapUserToOption) ?? []
      return filterByTerm([...teamOption, ...memberOptions], term)
    }

    const selfOption = currentUser?.id ? [mapUserToOption(currentUser)] : []
    const teamOptions = userTeams?.map(mapTeamToOption) ?? []
    return filterByTerm([...selfOption, ...teamOptions], term)
  }, [isTeamScope, currentUser, userTeams, teamWithMembers, search])

  const finalOptions = useMemo(() => {
    const hasSelected = selectedOption && !options.some((opt) => opt.value === selectedOption.value)
    const merged = hasSelected ? [selectedOption, ...options] : options
    return merged.sort((a, b) => {
      if (a.value === selectedOption?.value) return -1
      if (b.value === selectedOption?.value) return 1
      return a.label.localeCompare(b.label)
    })
  }, [options, selectedOption])

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
          <CommandInput placeholder="Search assignee..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>{isDataLoading ? 'Loading...' : 'No users found.'}</CommandEmpty>

            <CommandGroup>
              {selectedOption && (
                <CommandItem key="clear" onSelect={handleClear} className="text-muted-foreground">
                  <XIcon className="mr-2 h-4 w-4" />
                  Clear selection
                </CommandItem>
              )}
              {finalOptions.map((option, index) => (
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
