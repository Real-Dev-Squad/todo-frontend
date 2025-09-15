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
  const options = [currentUser, ...members]

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">Point of Contact (POC)</label>
      <div className="flex items-center gap-2">
        <Select value={value ?? ''} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a POC" />
          </SelectTrigger>
          <SelectContent>
            {options.map((user, index) => (
              <SelectItem key={user.id || `user-${index}`} value={user.id}>
                {user.name} {user.id === currentUser.id && '(You)'}
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
      {!value && (
        <span className="mt-2 block rounded-md border border-gray-200 bg-gray-50 p-2 text-sm text-gray-600">
          Note: You will become the default Point of contact(POC), if no POC is selected{' '}
        </span>
      )}
    </div>
  )
}
