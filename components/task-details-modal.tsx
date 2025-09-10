'use client'

import { TTask } from '@/api/tasks/tasks.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { CalendarIcon, ClockIcon, TagIcon, UserIcon, UserPlusIcon } from 'lucide-react'
import { useState } from 'react'
import { TaskPriorityLabel } from './task-priority-label'
import { TodoLabelsList } from './todo-labels-list'
import { TodoStatusTable } from './todo-status-table'

type TaskDetailsModalProps = {
  task: TTask
  children: React.ReactNode
}

export function TaskDetailsModal({ task, children }: TaskDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Task Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Task Title */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Task Title
            </Label>
            <div className="text-lg font-medium text-gray-900">
              {task.title}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Description
            </Label>
            <div className="min-h-[120px] p-3 bg-gray-50 rounded-md border">
              <Textarea
                value={task.description || 'No description provided'}
                readOnly
                className="min-h-[100px] resize-none border-none bg-transparent p-0 focus:ring-0"
              />
            </div>
          </div>

          <Separator />

          {/* Task Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Status
              </Label>
              <div className="flex items-center">
                <TodoStatusTable status={task.status} />
              </div>
            </div>

            {/* Priority */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Priority
              </Label>
              <div className="flex items-center">
                {task.priority ? (
                  <TaskPriorityLabel priority={task.priority} />
                ) : (
                  <span className="text-gray-500">No priority set</span>
                )}
              </div>
            </div>

            {/* Assignee */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <UserIcon className="inline w-4 h-4 mr-1" />
                Assignee
              </Label>
              <div className="text-gray-900">
                {task.assignee ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {task.assignee.assignee_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{task.assignee.assignee_name || 'Unknown User'}</span>
                  </div>
                ) : (
                  'Unassigned'
                )}
              </div>
            </div>

            {/* Created By */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <UserPlusIcon className="inline w-4 h-4 mr-1" />
                Created By
              </Label>
              <div className="text-gray-900">
                {task.createdBy ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {task.createdBy.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{task.createdBy.name || 'Unknown User'}</span>
                  </div>
                ) : (
                  'Unknown'
                )}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <CalendarIcon className="inline w-4 h-4 mr-1" />
                Due Date
              </Label>
              <div className="text-gray-900">
                {task.dueAt ? (
                  new DateUtil(task.dueAt).format(DateFormats.D_MMM_YYYY)
                ) : (
                  'No due date'
                )}
              </div>
            </div>

            {/* Task ID */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <ClockIcon className="inline w-4 h-4 mr-1" />
                Task ID
              </Label>
              <div className="text-gray-900 font-mono text-sm">
                {task.id}
              </div>
            </div>
          </div>

          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <TagIcon className="inline w-4 h-4 mr-1" />
                Labels
              </Label>
              <div className="flex flex-wrap gap-2">
                <TodoLabelsList labels={task.labels} />
              </div>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Tags
              </Label>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Watchlist Status */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Watchlist
            </Label>
            <div className="text-gray-900">
              {task.in_watchlist ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ⭐ In Watchlist
                </span>
              ) : (
                <span className="text-gray-500">Not in watchlist</span>
              )}
            </div>
          </div>

          {/* Deferred Details */}
          {task.deferredDetails?.deferredTill && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Deferred Until
              </Label>
              <div className="text-gray-900">
                {new DateUtil(task.deferredDetails.deferredTill).format(DateFormats.D_MMM_YYYY)}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
