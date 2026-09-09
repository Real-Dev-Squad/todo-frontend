import { useState } from 'react'
import { TTeam } from '@/api/teams/teams.type'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { CheckIcon, UserIcon } from 'lucide-react'

type TeamFiltersProps = {
  teamId: string
  team?: TTeam
}

export const TeamFilters = ({ teamId, team }: TeamFiltersProps) => {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/_internal/teams/$teamId/todos' })
  const assigneeIds = Array.isArray(searchParams.assigneeId)
    ? searchParams.assigneeId
    : searchParams.assigneeId
      ? [searchParams.assigneeId]
      : []

  const teamMembers = team?.users ?? []

  const [selectedIds, setSelectedIds] = useState<string[]>(assigneeIds)
  const [isOpen, setIsOpen] = useState(false)

  useState(() => {
    setSelectedIds(assigneeIds)
  })

  const handleAssigneeToggle = (memberId: string) => {
    setSelectedIds((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  const handleClearAssignees = () => {
    setSelectedIds([])
  }

  const applyFilters = () => {
    navigate({
      to: '/teams/$teamId/todos',
      params: { teamId },
      search: (prev) => ({
        status: prev.status,
        search: prev.search,
        assigneeId: selectedIds.length ? selectedIds : undefined,
      }),
    })
  }

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          applyFilters()
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="-ml-3 border border-red-500 text-red-500 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
        >
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserIcon className="mr-2 size-4" />
            <span>Assignee</span>
            <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
              {selectedIds.length > 0 ? selectedIds.length : ''}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="p-0" sideOffset={8}>
            <Command>
              <CommandInput placeholder="Search team members..." autoFocus />
              <CommandList>
                <CommandEmpty>No member found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearAssignees}
                    className="justify-center text-center font-medium"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  {teamMembers.map((member) => {
                    const isSelected = selectedIds.includes(member.id)
                    return (
                      <CommandItem key={member.id} onSelect={() => handleAssigneeToggle(member.id)}>
                        <div
                          className={cn(
                            'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>
                        <span>{member.name}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
