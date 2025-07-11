import { Task } from '@/app/types/tasks'
import { TaskList } from '@/components/TaskList'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

vi.mock('../../components/TaskCard.tsx', () => ({
  TaskCard: ({ task }: { task: Task }) => (
    <div data-testid={`task-${task.id}`}>Mocked Task Card</div>
  ),
}))

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Complete project',
    status: 'todo',
    assignee: 'John Doe',
    dueAt: '2024-12-31',
    profile: '/assets/john.png',
  },
  {
    id: 2,
    title: 'Review code',
    status: 'in-progress',
    assignee: 'Jane Smith',
    dueAt: '2024-12-25',
    profile: '/assets/jane.png',
  },
]

const renderTaskList = (tasks = mockTasks) => {
  return render(<TaskList tasks={tasks} />)
}

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

test('renders empty state when no tasks are present', () => {
  renderTaskList([])

  const emptyTaskList = screen.getByTestId('empty-task-list')
  expect(emptyTaskList).toBeDefined()
  expect(emptyTaskList.textContent).toBe('No tasks available in this section')
})

test('renders task cards when tasks are present', () => {
  renderTaskList()

  const taskList = screen.getByTestId('task-list')
  expect(taskList).toBeDefined()

  mockTasks.forEach((task) => {
    const taskCard = screen.getByTestId(`task-${task.id}`)
    expect(taskCard).toBeDefined()
  })
})

test('renders correct number of task cards', () => {
  renderTaskList()
  const taskCards = screen.getAllByTestId(/task-\d+/)
  expect(taskCards).toHaveLength(mockTasks.length)
})
