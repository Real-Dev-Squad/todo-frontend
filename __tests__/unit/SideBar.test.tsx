import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SideBar } from '../../components/SideBar';
import React from 'react';

describe('SideBar', () => {
  it('renders the TODO logo', () => {
    render(<SideBar />);
    const logo = screen.getByText('TODO');
    expect(logo).toBeDefined();
  });

  it('renders navigation links', () => {
    render(<SideBar />);
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tasks').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Teams').length).toBeGreaterThan(0);
  });
}); 