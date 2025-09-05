import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DashboardTasksTableTabs as TabsConstants } from '@/modules/dashboard/constants'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

type IncludeDoneSwitchProps = {
  onStatusChange?: (includeDone: boolean) => void
  initialChecked?: boolean
}

export function IncludeDoneSwitch({
  onStatusChange,
  initialChecked = false,
}: IncludeDoneSwitchProps) {
  const router = useNavigate()
  const location = useLocation()
  const [includeDoneTasks, setIncludeDoneTasks] = useState(initialChecked)

  const handleIncludeDoneChange = (checked: boolean) => {
    setIncludeDoneTasks(checked)

    if (onStatusChange) {
      onStatusChange(checked)
      return
    }

    if (location.pathname.includes('/teams/')) {
      return
    } else {
      router({
        to: '/dashboard',
        search: (prev) => ({
          status: checked ? TASK_STATUS_ENUM.DONE : undefined,
          tab: prev.tab || TabsConstants.All,
          search: prev.search || undefined,
        }),
      })
    }
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
