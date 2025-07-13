'use client'

import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type DatePickerSelectProps = {
  id?: string
  value: Date | undefined
  isDateDisabled?: (date: Date) => boolean
  onChange: (date: Date | undefined) => void
}

export const DatePickerSelect = ({
  id,
  value,
  onChange,
  isDateDisabled,
}: DatePickerSelectProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          data-selected={value ? 'true' : 'false'}
          className="w-full justify-between font-normal data-[selected=false]:text-gray-500"
        >
          {value ? value.toLocaleDateString() : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          isDateDisabled={isDateDisabled}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
