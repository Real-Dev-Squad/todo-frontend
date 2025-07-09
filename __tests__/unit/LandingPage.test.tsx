import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LandingPage } from '../../components/LandingPage';
import React from 'react';

describe('LandingPage', () => {
  it('renders the hero section', () => {
    render(<LandingPage />);
    const hero = screen.getByText(/Real Flow is your/i);
    const tagline = screen.getByText(/Get Things Done. Simplified./i);
    expect(hero).toBeDefined();
    expect(tagline).toBeDefined();
  });

  it('renders the features section', () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/Everything you need to stay organized/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Smart Task Organization/i).length).toBeGreaterThan(0);
  });

  it('renders the stats section', () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/Active Users/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tasks Completed/i).length).toBeGreaterThan(0);
  });

  it('renders the testimonials section', () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/Loved by teams worldwide/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sarah Johnson/i).length).toBeGreaterThan(0);
  });

  it('renders all testimonials', () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/Real Flow transformed how our team manages projects/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sarah Johnson/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Product Manager/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TechCorp/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/The best task management tool we've used/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Michael Chen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Engineering Lead/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/StartupXYZ/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Real Flow's analytics help us identify bottlenecks and optimize our workflow/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Emily Rodriguez/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Operations Director/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/GrowthCo/i).length).toBeGreaterThan(0);
  });

  it('renders the CTA section', () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/Ready to transform your workflow/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Start Free Trial/i).length).toBeGreaterThan(0);
  });

  it('renders the footer', () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/Real Flow/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/All rights reserved/i).length).toBeGreaterThan(0);
  });
}); 