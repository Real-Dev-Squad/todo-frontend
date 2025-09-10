'use client'

import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { LablesApi } from '@/api/labels/labels.api'
import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
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
import { Textarea } from '@/components/ui/textarea'
import { cn, isPastDate } from '@/lib/utils'
import { SelectLabels } from '@/modules/dashboard/components/select-labels'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { CalendarIcon, CircleDotIcon, LucideIcon, PlayIcon, TagIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm, UseFormWatch } from 'react-hook-form'
import { z } from 'zod'
import { DatePickerSelect } from './date-picker-select'
import { DeferredTaskButton } from './deferred-task-button'
import { UserAndTeamSearch } from './user-and-team-search'

const todoFormSchema = z.object({
  taskId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(TASK_PRIORITY_ENUM).optional(),
  status: z.enum(TASK_STATUS_ENUM).optional(),
  labels: z.array(z.string()).optional(),
  assignee: z.object(
    {
      label: z.string(),
      value: z.string(),
      type: z.enum(USER_TYPE_ENUM, { message: 'Assignee is required' }),
    },
    { error: 'Assignee is required' },
  ),
  createdBy: z.object({
    label: z.string(),
    value: z.string(),
  }),
})

export type TTodoFormData = z.infer<typeof todoFormSchema>

type FormInputProps = {
  label: string
  htmlFor?: string
  icon?: LucideIcon
  required?: boolean
  errorMessage?: string
  children: React.ReactNode
  direction?: 'row' | 'column'
}

const FormInput = ({
  children,
  label,
  htmlFor,
  icon: Icon,
  required,
  errorMessage,
  direction = 'row',
}: FormInputProps) => {
  return (
    <div className={cn('flex items-center', direction === 'row' ? 'gap-4' : 'flex-col gap-2')}>
      <div
        className={cn('flex items-center gap-2', direction === 'row' ? 'w-28 shrink-0' : 'w-full')}
      >
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}

        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      </div>

      {children}
      {errorMessage && <p className="w-full text-sm text-red-500">{errorMessage}</p>}
    </div>
  )
}

type SubmitButtonProps = {
  text: string
  isLoading?: boolean
  isDisabled?: boolean
  watch: UseFormWatch<TTodoFormData>
}

const SubmitButton = ({ text, isLoading, isDisabled, watch }: SubmitButtonProps) => {
  const title = watch('title')
  const dueDate = watch('dueDate')
  const assignee = watch('assignee')

  const isButtonDisabled = !title || !dueDate || !assignee || isLoading || isDisabled

  return (
    <Button type="submit" disabled={isButtonDisabled}>
      {text}
    </Button>
  )
}

type CreateEditTodoFormProps = {
  isSubmitting?: boolean
  mode?: 'create' | 'edit'
  initialData?: Partial<TTodoFormData>
  onCancel: () => void
  onSubmit: (data: TTodoFormData) => void
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
  } = useForm<TTodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || undefined,
      dueDate: initialData?.dueDate || '',
      priority: initialData?.priority || TASK_PRIORITY_ENUM.LOW,
      status: initialData?.status || TASK_STATUS_ENUM.TODO,
      labels: initialData?.labels || [],
      assignee: initialData?.assignee || undefined,
      createdBy: initialData?.assignee || undefined,
    },
  })

  const buttonText = mode === 'create' ? 'Create' : 'Save'
  const buttonLoadingText = mode === 'create' ? 'Creating...' : 'Saving...'
  const [deferModalOpen, setDeferModalOpen] = useState(false)

  const handleFormSubmit = (data: TTodoFormData) => {
    onSubmit(data)
  }

  const { data: labels = [] } = useQuery({
    queryKey: LablesApi.getLabel.key,
    queryFn: LablesApi.getLabel.fn,
    staleTime: 5 * 60 * 1000,
  })

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Title */}
      <FormInput
        required
        label="Title"
        htmlFor="title"
        direction="column"
        errorMessage={errors.title?.message}
      >
        <Input
          id="title"
          type="text"
          placeholder="e.g Cool new title for my todo"
          {...register('title')}
        />
      </FormInput>

      {/* Description */}
      <FormInput
        label="Description"
        htmlFor="description"
        direction="column"
        errorMessage={errors.description?.message}
      >
        <Textarea
          id="description"
          placeholder="e.g Nothing is cool in here"
          {...register('description')}
        />
      </FormInput>

      {/* Assignee */}
      <Controller
        control={control}
        name="assignee"
        render={({ field }) => (
          <FormInput
            required
            label="Assignee"
            htmlFor="assigneeId"
            direction="column"
            errorMessage={errors.assignee?.message}
          >
            <UserAndTeamSearch
              value={field.value}
              placeholder="Select assignee"
              onChange={(selectedOption) => field.onChange(selectedOption)}
            />
          </FormInput>
        )}
      />

      {/* Properties Section */}
      <div className="pt-4">
        <h3 className="text-md pb-2 font-medium text-gray-700">Properties</h3>

        <div className="space-y-4">
          {/* Due Date */}
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <FormInput
                required
                label="Due Date"
                htmlFor="dueDate"
                icon={CalendarIcon}
                errorMessage={errors.dueDate?.message}
              >
                <div className="flex-1">
                  <DatePickerSelect
                    isDateDisabled={(date) => isPastDate(date)}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                </div>
              </FormInput>
            )}
          />

          {/* Priority */}
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <FormInput
                label="Priority"
                htmlFor="priority"
                icon={PlayIcon}
                errorMessage={errors.priority?.message}
              >
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
              </FormInput>
            )}
          />

          {/*status*/}
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormInput
                label="Status"
                htmlFor="status"
                icon={CircleDotIcon}
                errorMessage={errors.status?.message}
              >
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    const isAlreadyDeferred = field.value === TASK_STATUS_ENUM.DEFERRED
                    if (value === TASK_STATUS_ENUM.DEFERRED && !isAlreadyDeferred) {
                      setDeferModalOpen(true)
                    } else {
                      field.onChange(value as TASK_STATUS_ENUM)
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select task status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value={TASK_STATUS_ENUM.TODO}>Todo</SelectItem>
                    <SelectItem value={TASK_STATUS_ENUM.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TASK_STATUS_ENUM.DONE}>Done</SelectItem>

                    {initialData && (
                      <SelectItem value={TASK_STATUS_ENUM.DEFERRED}>Defer</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {initialData && (
                  <DeferredTaskButton
                    todo={initialData}
                    open={deferModalOpen}
                    setOpen={setDeferModalOpen}
                  />
                )}
              </FormInput>
            )}
          />

          {/* Label */}
          <Controller
            control={control}
            name="labels"
            render={({ field }) => (
              <FormInput
                label="Labels"
                htmlFor="labels"
                icon={TagIcon}
                errorMessage={errors.labels?.message}
              >
                <SelectLabels
                  labelData={labels}
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              </FormInput>
            )}
          />

          {/* Created By (only in edit mode) */}
          {mode === 'edit' && initialData?.createdBy && (
            <FormInput label="Created By" htmlFor="createdBy" icon={UserIcon}>
              <p className="pl-3 text-sm text-gray-700">{initialData.createdBy.label}</p>
            </FormInput>
          )}
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
          isLoading={isSubmitting}
          isDisabled={mode === 'edit' ? !isDirty : false}
          text={isSubmitting ? buttonLoadingText : buttonText}
        />
      </div>
    </form>
  )
}
