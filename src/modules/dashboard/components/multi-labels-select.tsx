import { Check, ChevronsUpDown, X } from 'lucide-react'
import * as React from 'react'

import type { Label } from '@/api/labels/labels.types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface LabelMultiSelectProps {
  labels: Label[]
  selectedLabels: Label[]
  onSelectionChange: (labels: Label[]) => void
  placeholder?: string
  className?: string
}

export function LabelMultiSelect({
  labels,
  selectedLabels,
  onSelectionChange,
  placeholder = 'Select labels...',
  className,
}: LabelMultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (label: Label) => {
    const isSelected = selectedLabels.some((selected) => selected.id === label.id)

    if (isSelected) {
      onSelectionChange(selectedLabels.filter((selected) => selected.id !== label.id))
    } else {
      onSelectionChange([...selectedLabels, label])
    }
  }

  const handleRemove = (labelId: string) => {
    onSelectionChange(selectedLabels.filter((label) => label.id !== labelId))
  }

  return (
    <div className={cn('w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto min-h-8 w-full justify-between bg-transparent"
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {selectedLabels.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selectedLabels.map((label) => (
                  <Badge
                    key={label.id}
                    variant="secondary"
                    className="text-xs"
                    style={{
                      backgroundColor: `${label.color}20`,
                      color: label.color,
                      borderColor: label.color,
                    }}
                  >
                    {label.name}
                    <span
                      tabIndex={0}
                      role="button"
                      className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleRemove(label.id)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={() => handleRemove(label.id)}
                    >
                      <X size={2} />
                    </span>
                  </Badge>
                ))
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No labels found.</CommandEmpty>
              <CommandGroup>
                {labels.map((label) => {
                  const isSelected = selectedLabels.some((selected) => selected.id === label.id)
                  return (
                    <CommandItem
                      key={label.id}
                      value={label.name}
                      onSelect={() => handleSelect(label)}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full border"
                          style={{ backgroundColor: label.color, borderColor: label.color }}
                        />
                        <span style={{ color: label.color }} className="text-sm">
                          {label.name}
                        </span>
                      </div>
                      <Check className={cn('h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
