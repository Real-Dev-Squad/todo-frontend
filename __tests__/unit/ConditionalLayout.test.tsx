import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import * as AuthHook from '../../app/hooks/useAuth';
import { ConditionalLayout } from '../../components/ConditionalLayout';

// Mock child component
const DummyChild = () => <div>App Content</div>;

describe('ConditionalLayout', () => {
  it('renders LandingPage when not authenticated', () => {
    vi.spyOn(AuthHook, 'useAuth').mockReturnValue({ isAuthenticated: false });
    render(<ConditionalLayout><DummyChild /></ConditionalLayout>);
    const hero = screen.getByText(/Real Flow is your/i);
    expect(hero).toBeDefined();
    expect(screen.queryByText('App Content')).toBeNull();
  });

  it('renders SideBar, NavBar, and children when authenticated', () => {
    vi.spyOn(AuthHook, 'useAuth').mockReturnValue({ isAuthenticated: true });
    render(<ConditionalLayout><DummyChild /></ConditionalLayout>);
    const dashboard = screen.getByText('Dashboard');
    const content = screen.getByText('App Content');
    expect(dashboard).toBeDefined();
    expect(content).toBeDefined();
  });
}); 