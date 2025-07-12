'use client'

import { Mode, Task } from '@/app/types/tasks'
import { FORM_MODE, TASK_PRIORITY } from '@/config/task'
import { FormEvent, useState } from 'react'
import { TaskDetails } from './TaskDetails'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'

//Import Svg for icons
import calendarIcon from '@/public/assets/calendar.svg'
import TagsIcon from '@/public/assets/priceTag.svg'
import SaveIcon from '@/public/assets/save.svg'
import SendIcon from '@/public/assets/send.svg'
import StatusIcon from '@/public/assets/status.svg'

interface TodoFormProps {
  initialData?: TaskFormData
  onSubmit?: (data: TaskFormData) => void
  mode?: Mode
  onAcknowledge?: () => void
  onClose: () => void
  open?: boolean
}
export type TaskFormData = Omit<Task, 'assignee'>
const DEFAULT_FORM_DATA: TaskFormData = {
  id: '',
  title: '',
  description: '',
  dueAt: '',
  tags: [],
}

export function TodoForm({
  initialData,
  onSubmit,
  mode = FORM_MODE.CREATE,
  onAcknowledge,
  onClose,
  open = true,
}: TodoFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialData ?? DEFAULT_FORM_DATA)
  const Icon = mode === FORM_MODE.CREATE ? SendIcon : SaveIcon
  const ctaText = mode === FORM_MODE.CREATE ? 'Submit' : 'Save'
  const altText = mode === FORM_MODE.CREATE ? 'Create todo' : 'Save todo'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  if (mode === FORM_MODE.VIEW && initialData && onAcknowledge) {
    return (
      <TaskDetails
        onClose={onClose}
        onAcknowledge={onAcknowledge}
        initialData={initialData as Task}
      />
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-indigo-600">
            {mode === FORM_MODE.CREATE ? 'Create a Todo' : 'Edit Todo'}
          </DialogTitle>
          <DialogDescription>
            {mode === FORM_MODE.CREATE
              ? 'Create a new task to organize your work'
              : 'Edit your existing task details'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                data-testid="title"
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="text-primary w-full rounded-md border-none border-[#E5E7EB] bg-[#F5F5FF] p-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="e.g Cool new title for my todo"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                data-testid="description"
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="text-primary min-h-[100px] w-full rounded-md border-none border-[#E5E7EB] bg-[#F5F5FF] p-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="e.g Nothing is cool in here"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Properties</h3>

            <hr className="mb-4" />

            <div className="flex flex-row items-center justify-start gap-2">
              <Image src={calendarIcon} alt={'due data icon'} width={15} height={15} />

              <label
                htmlFor="dueAt"
                className="mb-1 block w-32 max-w-44 text-sm font-medium text-gray-700"
              >
                Due Date<span className="text-red-500">*</span>
              </label>
              <input
                data-testid="due-date"
                id="dueAt"
                type="date"
                placeholder="Please enter due date"
                value={formData.dueAt ? new Date(formData.dueAt).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueAt: e.target.value }))}
                className="text-primary w-full rounded-md border-none border-[#E5E7EB] bg-[#F5F5FF] p-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <Image src={StatusIcon} alt={'due data icon'} width={15} height={15} />
              <label
                htmlFor="priority"
                className="mb-1 block w-32 max-w-44 text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: e.target.value as Task['priority'],
                  }))
                }
                className="text-primary w-full rounded-md border-none border-[#E5E7EB] bg-[#F5F5FF] p-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              >
                {Object.entries(TASK_PRIORITY).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {/* todo @tejas-gp or @anuj: add assignee later 
          -- currently we don't have API which brings assignee details
          */}

            {/* <div className="flex flex-row gap-2 justify-start items-center  ">
            <Image
              src={AccountIcon}
              alt={"due data icon"}
              width={15}
              height={15}
            />
            <label
              htmlFor="dueAt"
              className="block text-sm font-medium text-gray-700 mb-1 w-32 max-w-44"
            >
              Assignee<span className="text-red-500">*</span>
            </label>
            <input
              data-testid="assignee"
              id="assignee"
              type="text"
              value={formData.assignee.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  assignee: { ...prev.assignee, name: e.target.value },
                }))
              }
              className="w-full p-2 text-sm bg-[#F5F5FF] text-primary  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g @ankush"
              required
            />
          </div> */}

            <div className="flex flex-row items-center justify-start gap-2">
              <Image src={TagsIcon} alt={'due data icon'} width={15} height={15} />
              <label
                htmlFor="tags"
                className="mb-1 block w-32 max-w-44 text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={(formData.tags ?? []).join(', ')}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: e.target.value.split(/,\s*/),
                  }))
                }
                className="text-primary w-full rounded-md border-none border-[#E5E7EB] bg-[#F5F5FF] p-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="e.g frontend"
              />
            </div>

            {mode === FORM_MODE.EDIT && (
              <div className="flex flex-row items-center justify-start gap-2">
                <Image src={StatusIcon} alt={'due data icon'} width={15} height={15} />
                <label
                  htmlFor="status"
                  className="mb-1 block w-32 max-w-44 text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as Task['status'],
                    }))
                  }
                  className="text-primary w-full rounded-md border-none border-[#E5E7EB] bg-[#F5F5FF] p-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              data-testid="task-form-submit-button"
              type="submit"
              className="flex w-fit flex-row items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-[#4F46E5] focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none"
            >
              <span className="flex flex-row gap-2">
                <Image src={Icon} alt={altText} width={20} height={20} />
                {ctaText}
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
