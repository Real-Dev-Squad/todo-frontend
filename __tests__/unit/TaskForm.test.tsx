import { initialData } from '@/__mocks__/Task'
import { Task } from '@/app/types/tasks'
import { TodoForm } from '@/components/TodoForm'
import { FORM_MODE } from '@/config/task'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

// Mock TaskDetails component
vi.mock('./TaskDetails', () => ({
  default: ({ initialData }: { initialData: Task }) => (
    <div data-testid={`task-details-${initialData.id}`}>Mocked Task Details</div>
  ),
}))

const renderTodoForm = (props = {}) => {
  const defaultProps = {
    mode: FORM_MODE.CREATE as 'create' | 'view' | 'edit',
    onSubmit: vi.fn(),
    onClose: vi.fn(),
    onAcknowledge: vi.fn(),
  }
  return render(<TodoForm {...defaultProps} {...props} />)
}

let mockOnAcknowledge: () => void
let mockOnClose: () => void
let mockOnSubmit: () => void
let user: any

beforeEach(() => {
  mockOnAcknowledge = vi.fn()
  mockOnClose = vi.fn()
  mockOnSubmit = vi.fn()
  user = userEvent.setup()
})

afterEach(() => {
  cleanup()
})

test('should renders create mode with all required fields', async () => {
  renderTodoForm()

  const requiredFields = ['Title', 'Description', 'Due Date']
  requiredFields.forEach((field) => {
    const label = screen.getByText(new RegExp(field))
    expect(label).toBeDefined()
  })

  expect(screen.getByText('Create a Todo')).toBeDefined()
  expect(screen.getByText('Submit')).toBeDefined()
})

test('should renders edit mode with initial data', async () => {
  renderTodoForm({ mode: FORM_MODE.EDIT, initialData: initialData })
  expect(screen.getByDisplayValue(initialData.title ?? '')).toBeDefined()
  expect(screen.getByDisplayValue(initialData.description ?? '')).toBeDefined()
  expect(screen.getByText('Edit Todo')).toBeDefined()
  expect(screen.getByText('Save')).toBeDefined()
  expect(screen.getByText('Status')).toBeDefined()
  expect(screen.getByText('Priority')).toBeDefined()
})

test('should renders view mode with TaskDetails component', async () => {
  renderTodoForm({
    mode: FORM_MODE.VIEW,
    initialData: initialData,
    onAcknowledge: mockOnAcknowledge,
  })

  expect(screen.getByTestId(`task-details-${initialData.id}`)).toBeDefined()
  expect(screen.queryByText('Create a Todo')).toBeNull()
  expect(screen.queryByText('Edit Todo')).toBeNull()
})

test.skip('should submit form with correct data in create mode', async () => {
  renderTodoForm({ onSubmit: mockOnSubmit })

  const testData = {
    id: '',
    title: 'Test Task',
    description: 'Test Description',
    dueAt: '2024-12-31',
    tags: ['frontend'],
    priority: TASK_PRIORITY.LOW,
  }

  await user.type(screen.getByTestId('title'), testData.title)
  await user.type(screen.getByTestId('description'), testData.description)
  await user.type(screen.getByTestId('due-at'), testData.dueAt)
  await user.type(screen.getByLabelText(/tags/i), testData.tags.join(', '))
  await user.selectOptions(screen.getByTestId('priority'), testData.priority)

  await user.click(screen.getByTestId('task-form-submit-button'))
  expect(mockOnSubmit).toHaveBeenCalledTimes(1)
})

test('should closes form when close button is clicked', async () => {
  renderTodoForm({ onClose: mockOnClose })

  const closeButton = screen.getByRole('button', { name: /close/i })
  await user.click(closeButton)
  expect(mockOnClose).toHaveBeenCalledTimes(1)
})

test('should validates required fields before submission', async () => {
  renderTodoForm({ onSubmit: mockOnSubmit })

  await user.click(screen.getByTestId('task-form-submit-button'))
  expect(mockOnSubmit).not.toHaveBeenCalled()

  // Fill only zero required field
  await user.click(screen.getByTestId('task-form-submit-button'))
  expect(mockOnSubmit).not.toHaveBeenCalled()
})

test('should renders tags field as optional', async () => {
  renderTodoForm()

  const tagsLabel = screen.getByText(/tags/i)
  expect(tagsLabel).toBeDefined()
  expect(tagsLabel.textContent).not.toContain('*')
  expect(tagsLabel.nextElementSibling?.getAttribute('required')).toBeNull()
})
