'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { hasValidDeferDates, isDateValidForDefer } from '@/lib/date-util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { TTodoFormData } from './create-edit-todo-form'
import { DatePickerSelect } from './date-picker-select'

type DeferredTaskButtonProps = {
  todo: Partial<TTodoFormData>
  open: boolean
  setOpen: (open: boolean) => void
}

export const DeferredTaskButton = ({ todo, open, setOpen }: DeferredTaskButtonProps) => {
  const [deferredTill, setDeferredTill] = useState<Date>()
  const queryClient = useQueryClient()

  const canDeferTask = useMemo(() => hasValidDeferDates(todo.dueDate), [todo.dueDate])

  const deferTaskMutation = useMutation({
    mutationFn: TasksApi.deferTask.fn,
    onSuccess: () => {
      toast.success('Task deferred successfully')
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      void queryClient.invalidateQueries({
        queryKey: TasksApi.getTasks.key({ status: 'DEFERRED' }),
      })
      setOpen(false)
      setDeferredTill(undefined)
    },
    onError: () => {
      toast.error('Failed to defer task, please try again')
    },
  })

  const handleDeferTask = () => {
    if (!deferredTill) {
      toast.error('Please select a defer date')
      return
    }

    deferTaskMutation.mutate({
      taskId: todo.taskId ?? '',
      deferredTill: deferredTill.toISOString(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Defer Todo</DialogTitle>
          {canDeferTask ? (
            <DialogDescription>Defer &quot;{todo.title}&quot; to a later date.</DialogDescription>
          ) : (
            <DialogDescription>
              Cannot defer this task. The due date is today or has already passed.
            </DialogDescription>
          )}
        </DialogHeader>
        {canDeferTask && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deferredTill" className="text-right">
                Defer Until
              </Label>
              <div className="col-span-3">
                <DatePickerSelect
                  value={deferredTill}
                  onChange={setDeferredTill}
                  isDateDisabled={(date) => !isDateValidForDefer(date, todo.dueDate)}
                />
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleDeferTask}
            disabled={!canDeferTask || !deferredTill || deferTaskMutation.isPending}
          >
            {deferTaskMutation.isPending ? 'Deferring...' : 'Defer Todo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
