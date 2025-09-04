'use client'

import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

export function IncludeDoneSwitch() {
  const router = useNavigate()
  const searchParams = useSearch({ from: '/_internal/dashboard' })
  const [includeDoneTasks, setIncludeDoneTasks] = useState(
    searchParams.status === TASK_STATUS_ENUM.DONE,
  )

  const handleIncludeDoneChange = (checked: boolean) => {
    setIncludeDoneTasks(checked)

    router({
      to: '/dashboard',
      search: (prev) => ({
        status: checked ? TASK_STATUS_ENUM.DONE : undefined,
        tab: prev.tab || 'all',
        search: prev.search || undefined,
      }),
    })
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
