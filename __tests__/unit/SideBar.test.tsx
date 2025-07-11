import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import { SideBar } from '../../components/SideBar'
import { SidebarProvider } from '../../components/ui/sidebar'
import React from 'react'

describe('SideBar', () => {
  beforeAll(() => {
    render(
      <SidebarProvider>
        <SideBar />
      </SidebarProvider>,
    )
  })
  it('renders the TODO logo', () => {
    const logo = screen.getByText('TODO')
    expect(logo).toBeDefined()
  })

  it('renders navigation links', () => {
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Tasks')).toBeDefined()
    expect(screen.getByText('Teams')).toBeDefined()
  })
})
