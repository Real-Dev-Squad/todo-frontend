import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import * as AuthHook from '../../app/hooks/useAuth';
import { ConditionalLayout } from '../../components/ConditionalLayout';

const DummyChild = () => <div>App Content</div>;

describe('ConditionalLayout', () => {
  beforeEach(() => {
    // Mock window.matchMedia for use-mobile hook
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders LandingPage when not authenticated', () => {
    vi.spyOn(AuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isError: false,
    });
    render(<ConditionalLayout><DummyChild /></ConditionalLayout>);
    const hero = screen.getByText(/Real Flow is your/i);
    expect(hero).toBeDefined();
    expect(screen.queryByText('App Content')).toBeNull();
  });

  it('renders SideBar, NavBar, and children when authenticated', () => {
    vi.spyOn(AuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user: {},
      isLoading: false,
      isError: false,
    });
    render(<ConditionalLayout><DummyChild /></ConditionalLayout>);
    const dashboard = screen.getByText('Home');
    const content = screen.getByText('App Content');
    expect(dashboard).toBeDefined();
    expect(content).toBeDefined();
  });
}); 