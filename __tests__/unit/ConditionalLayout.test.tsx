import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import * as AuthHook from '../../app/hooks/useAuth'
import { ConditionalLayout } from '../../components/ConditionalLayout'

const DummyChild = () => <div>App Content</div>

describe('ConditionalLayout', () => {
  it('renders LandingPage when not authenticated', () => {
    vi.spyOn(AuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isError: false,
    })
    render(
      <ConditionalLayout>
        <DummyChild />
      </ConditionalLayout>,
    )
    const hero = screen.getByText(/Real Flow is your/i)
    expect(hero).toBeDefined()
    expect(screen.queryByText('App Content')).toBeNull()
  })
})
