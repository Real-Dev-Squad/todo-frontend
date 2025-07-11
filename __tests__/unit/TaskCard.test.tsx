import { Task, TASK_STATUS } from '@/app/types/tasks'
import { TaskCard } from '@/components/TaskCard'
import { DateFormats, DateUtil } from '@/utils/dateUtil'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

const mockTask: Task = {
  id: '1',
  title: 'Complete project',
  status: TASK_STATUS.TODO,
  assignee: { id: '1', name: 'John Doe' },
  dueAt: '2024-12-31',
}

const renderTaskCard = (task = mockTask, className = '') => {
  return render(<TaskCard task={task} className={className} setActiveTask={vi.fn()} />)
}

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

test('renders task card with correct information', () => {
  renderTaskCard()

  const taskTitle = screen.getByText(mockTask.title)
  const statusIcon = screen.getByAltText('task-status-icon') as HTMLImageElement
  const assignee = screen.getByText(mockTask.assignee.name)
  const formattedDueAt = screen.getByText(
    new DateUtil(mockTask.dueAt ?? '').format(DateFormats.D_MMM_YYYY),
  )

  expect(taskTitle).toBeDefined()
  expect(statusIcon.src).toContain('/assets/ToDoEllipse.svg')
  expect(assignee).toBeDefined()
  expect(formattedDueAt).toBeDefined()
})

test('renders in-progress status icon correctly', () => {
  renderTaskCard({ ...mockTask, status: TASK_STATUS.IN_PROGRESS })

  const statusIcon = screen.getByAltText('task-status-icon') as HTMLImageElement

  expect(statusIcon.src).toContain('/assets/InProgressEllipse.svg')
})

test('applies custom className to task card', () => {
  const customClass = 'custom-test-class'
  renderTaskCard(mockTask, customClass)

  const taskCard = screen.getByTestId(`task-${mockTask.id}`)
  expect(taskCard.className).toContain(customClass)
})

test('renders default profile image when profile is not provided', () => {
  renderTaskCard({ ...mockTask })

  const profileImage = screen.getByAltText('assignee-profile') as HTMLImageElement
  const encodedPath = encodeURIComponent('/assets/user.png')
  expect(profileImage.src).toContain(encodedPath)
})
