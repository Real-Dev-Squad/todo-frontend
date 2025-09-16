import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { AppSidebar } from '../../components/layout/app-sidebar'

describe.skip('SideBar', () => {
  beforeAll(() => {
    render(<AppSidebar />)
  })
  it('renders the TODO logo', () => {
    const logo = screen.getByText('Real Flow')
    expect(logo).toBeDefined()
  })

  it('renders navigation links', () => {
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Tasks')).toBeDefined()
    expect(screen.getByText('Teams')).toBeDefined()
  })
})
