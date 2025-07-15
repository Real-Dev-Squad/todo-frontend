'use client'

import { TASK_PRIORITY_ENUM } from '@/api/tasks/tasks.enum'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { isPastDate } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, PlayIcon } from 'lucide-react'
import { Controller, useForm, UseFormWatch } from 'react-hook-form'
import { z } from 'zod'
import { DatePickerSelect } from './date-picker-select'

const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(TASK_PRIORITY_ENUM).optional(),
})

export type TodoFormData = z.infer<typeof todoFormSchema>

type SubmitButtonProps = {
  text: string
  isLoading?: boolean
  isDisabled?: boolean
  watch: UseFormWatch<TodoFormData>
}

const SubmitButton = ({ text, isLoading, isDisabled, watch }: SubmitButtonProps) => {
  const title = watch('title')
  const description = watch('description')
  const dueDate = watch('dueDate')

  const isButtonDisabled = !title || !description || !dueDate || isLoading || isDisabled

  return (
    <Button type="submit" disabled={isButtonDisabled}>
      {text}
    </Button>
  )
}

type CreateEditTodoFormProps = {
  isSubmitting?: boolean
  mode?: 'create' | 'edit'
  initialData?: Partial<TodoFormData>
  onCancel: () => void
  onSubmit: (data: TodoFormData) => void
}

export const CreateEditTodoForm = ({
  onCancel,
  onSubmit,
  initialData,
  isSubmitting,
  mode = 'create',
}: CreateEditTodoFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      dueDate: initialData?.dueDate || '',
      priority: initialData?.priority || TASK_PRIORITY_ENUM.LOW,
    },
  })

  const buttonText = mode === 'create' ? 'Create' : 'Save'
  const buttonLoadingText = mode === 'create' ? 'Creating...' : 'Saving...'

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title<span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g Cool new title for my todo"
          {...register('title')}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description Field */}
      <div className="space-y-2 pb-4">
        <Label htmlFor="description">
          Description<span className="text-red-500">*</span>
        </Label>
        <Input
          id="description"
          type="text"
          placeholder="e.g Nothing is cool in here"
          {...register('description')}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      {/* Properties Section */}
      <div>
        <h3 className="text-md pb-2 font-medium text-gray-700">Properties</h3>

        <div className="space-y-4">
          {/* Due Date */}
          <div className="flex items-center gap-4">
            <div className="flex w-28 items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <Label htmlFor="dueDate">
                Due Date<span className="text-red-500">*</span>
              </Label>
            </div>

            <div className="flex-1">
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <DatePickerSelect
                    isDateDisabled={(date) => isPastDate(date)}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-center gap-4">
            <div className="flex w-28 items-center gap-2">
              <PlayIcon className="h-4 w-4 text-gray-500" />
              <Label htmlFor="priority">Priority</Label>
            </div>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <div className="flex-1">
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value as TASK_PRIORITY_ENUM)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TASK_PRIORITY_ENUM.LOW}>Low</SelectItem>
                      <SelectItem value={TASK_PRIORITY_ENUM.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={TASK_PRIORITY_ENUM.HIGH}>High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-2 pt-4">
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <SubmitButton
          watch={watch}
          isDisabled={mode === 'edit' ? !isDirty : false}
          isLoading={isSubmitting}
          text={isSubmitting ? buttonLoadingText : buttonText}
        />
      </div>
    </form>
  )
}
