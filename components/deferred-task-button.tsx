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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CalendarClock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { TTodoFormData } from './create-edit-todo-form'
import { DatePickerSelect } from './date-picker-select'

type DeferredTaskButtonProps = {
  todo: Partial<TTodoFormData>
}

export const DeferredTaskButton = ({ todo }: DeferredTaskButtonProps) => {
  const [open, setOpen] = useState(false)
  const [deferredTill, setDeferredTill] = useState<Date>()
  const queryClient = useQueryClient()

  const deferTaskMutation = useMutation({
    mutationFn: TasksApi.deferredTask.fn,
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

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setDeferredTill(undefined)
    }
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-md p-2 duration-300 hover:bg-gray-100">
          <CalendarClock className="h-4 w-4" />
          <span className="text-sm">Defer Todo</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Defer Todo</DialogTitle>
          <DialogDescription>
            Defer &quot;{todo.title}&quot; to a later date. The todo will be moved to your deferred
            todos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deferredTill" className="text-right">
              Defer Until
            </Label>
            <div className="col-span-3">
              <DatePickerSelect
                value={deferredTill}
                onChange={setDeferredTill}
                isDateDisabled={(date) => date <= new Date()}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleDeferTask}
            disabled={!deferredTill || deferTaskMutation.isPending}
          >
            {deferTaskMutation.isPending ? 'Deferring...' : 'Defer Todo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
