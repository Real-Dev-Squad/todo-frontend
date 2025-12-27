import { LablesApi } from '@/api/labels/labels.api'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { CalendarIcon, CircleDotIcon, LucideIcon, PlayIcon, TagIcon } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { TTodoFormData } from './create-edit-todo-form'
import { TaskPriorityLabel } from './task-priority-label'
import { TodoStatusTable } from './todo-status-table'

type ViewFieldProps = {
  label: string
  children: React.ReactNode
  icon?: LucideIcon
  direction?: 'row' | 'column'
}

const ViewField = ({ label, children, icon: Icon, direction = 'row' }: ViewFieldProps) => {
  return (
    <div className={cn('flex', direction === 'row' ? 'my-4 gap-4' : 'flex-col gap-2')}>
      <div
        className={cn('flex items-center gap-2', direction === 'row' ? 'w-28 shrink-0' : 'w-full')}
      >
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}

        <Label>{label}</Label>
      </div>

      {children}
    </div>
  )
}

type ViewTodoModalProps = {
  data: Partial<TTodoFormData>
  onClose: () => void
  onEdit: () => void
}

export const ViewTodoModal = ({ data, onClose, onEdit }: ViewTodoModalProps) => {
  const { data: labels = [] } = useQuery({
    queryKey: LablesApi.getLabel.key,
    queryFn: LablesApi.getLabel.fn,
    staleTime: 5 * 60 * 1000,
  })
  const selectedLabels = labels.filter((label) => data.labels?.includes(label.id))

  return (
    <>
      <ViewField label="Title" direction="column">
        {data.title}
      </ViewField>
      <ViewField label="Description" direction="column">
        {data.description}
      </ViewField>
      <ViewField label="Assignee" direction="column">
        {data.assignee?.label || '--'}
      </ViewField>

      <div className="pt-4">
        <h3 className="text-md pb-2 font-medium text-gray-700">Properties</h3>
        <ViewField label="Due Date" icon={CalendarIcon}>
          {data.dueDate ? new DateUtil(data.dueDate).format(DateFormats.D_MMM_YYYY) : '--'}
        </ViewField>
        <ViewField label="Priority" icon={PlayIcon}>
          {data.priority ? <TaskPriorityLabel priority={data.priority} /> : '--'}
        </ViewField>
        <ViewField label="Status" icon={CircleDotIcon}>
          {data.status ? <TodoStatusTable status={data.status} /> : '--'}
        </ViewField>
        <ViewField label="Label" icon={TagIcon}>
          <div className="flex flex-1 flex-wrap gap-1">
            {selectedLabels.map((label) => (
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
              </Badge>
            ))}
          </div>
        </ViewField>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        {onClose && (
          <Button variant="outline" type="button" onClick={onClose}>
            Close
          </Button>
        )}
        {onEdit && (
          <Button variant="default" type="button" onClick={onEdit}>
            Edit
          </Button>
        )}
      </div>
    </>
  )
}
