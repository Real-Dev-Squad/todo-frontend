'use client'

import { TUser } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectPocProps {
  currentUser: TUser
  members: TUser[]
  value: string | null
  onChange: (id: string | null) => void
}

export const SelectPoc = ({ currentUser, members, value, onChange }: SelectPocProps) => {
  const options = [currentUser, ...members].filter(
    (u, i, arr) => arr.findIndex((x) => x.user_id === u.user_id) === i,
  )

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">Point of Contact (POC)</label>
      <div className="flex items-center gap-2">
        <Select value={value ?? ''} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a POC" />
          </SelectTrigger>
          <SelectContent>
            {options.map((user) => (
              <SelectItem key={user.user_id} value={user.user_id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value && (
          <Button type="button" size="icon" variant="ghost" onClick={() => onChange(null)}>
            ×
          </Button>
        )}
      </div>
    </div>
  )
}
