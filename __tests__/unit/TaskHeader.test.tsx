import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { expect, test, vi, afterEach, beforeEach } from 'vitest'
import { TaskHeader } from '@/components/TaskHeader'

const defaultProps = {
  title: 'My Tasks',
  className: 'custom-class',
  icon: '/assets/custom-icon.svg',
  onCreateTask: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

const renderTaskHeader = (props = {}) => {
  return render(<TaskHeader {...defaultProps} {...props} />)
}

test('renders the title and custom icon', () => {
  renderTaskHeader()

  const header = screen.getByTestId('header-my-tasks')
  const icon = screen.getByAltText('header-icon') as HTMLImageElement

  expect(header).toBeDefined()
  expect(header.querySelector('h2')?.textContent).toBe(defaultProps.title)
  expect(icon.src).toContain(defaultProps.icon)
})

test('renders with the default icon when no custom icon is provided', () => {
  renderTaskHeader({ icon: undefined })

  const icon = screen.getByAltText('header-icon') as HTMLImageElement
  expect(icon.src).toContain('/assets/ToDoEllipse.svg')
})

test('applies additional classNames', () => {
  renderTaskHeader()

  const header = screen.getByTestId('header-my-tasks')
  expect(header.classList.contains(defaultProps.className)).toBe(true)
})

test('triggers onCreateTask when the button is clicked', () => {
  renderTaskHeader()

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(defaultProps.onCreateTask).toHaveBeenCalledTimes(1)
})

test('renders the plus icon in the button', () => {
  renderTaskHeader()

  const plusIcon = screen.getByAltText('plusIcon') as HTMLImageElement
  expect(plusIcon).toBeDefined()
  expect(plusIcon.src).toContain('/assets/plus.svg')
})
