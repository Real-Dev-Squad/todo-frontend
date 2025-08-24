'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function IncludeDoneSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [includeDoneTasks, setIncludeDoneTasks] = useState(searchParams.get('status') === 'DONE')

  const handleIncludeDoneChange = (checked: boolean) => {
    setIncludeDoneTasks(checked)

    const params = new URLSearchParams(searchParams)
    if (checked) {
      params.set('status', 'DONE')
    } else {
      params.delete('status')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center px-4">
      <Switch
        id="includeDoneTasks"
        checked={includeDoneTasks}
        onCheckedChange={handleIncludeDoneChange}
      />
      <Label htmlFor="includeDoneTasks" className="px-2">
        Include Done
      </Label>
    </div>
  )
}
