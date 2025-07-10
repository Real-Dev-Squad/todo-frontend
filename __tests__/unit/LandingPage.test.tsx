import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";
import { LandingPage } from "../../components/LandingPage";
import React from "react";

describe("LandingPage", () => {
  beforeAll(() => {
    render(<LandingPage />);
  });
  it("renders the hero section", () => {
    const hero = screen.getByText(/Real Flow is your/i);
    const tagline = screen.getByText(/Get Things Done. Simplified./i);
    expect(hero).toBeDefined();
    expect(tagline).toBeDefined();
  });

  it("renders the features section", () => {
    expect(
      screen.getByText(/Everything you need to stay organized/i)
    ).toBeDefined();
    expect(screen.getByText(/Smart Task Organization/i)).toBeDefined();
  });
  it("renders the stats section", () => {
    expect(screen.getByText(/Active Users/i)).toBeDefined();
    expect(screen.getByText(/Tasks Completed/i)).toBeDefined();
  });

  it("renders the testimonials section", () => {
    expect(screen.getByText(/Loved by teams worldwide/i)).toBeDefined();
    expect(screen.getByText(/Sarah Johnson/i)).toBeDefined();
  });

  it("renders all testimonials", () => {
    expect(
      screen.getByText(/Real Flow transformed how our team manages projects/i)
    ).toBeDefined();
    expect(screen.getByText(/Sarah Johnson/i)).toBeDefined();
    expect(screen.getByText(/Product Manager/i)).toBeDefined();
    expect(screen.getByText(/TechCorp/i)).toBeDefined();
    expect(
      screen.getByText(/The best task management tool we've used/i)
    ).toBeDefined();
    expect(screen.getByText(/Michael Chen/i)).toBeDefined();
    expect(screen.getByText(/Engineering Lead/i)).toBeDefined();
    expect(screen.getByText(/StartupXYZ/i)).toBeDefined();
    expect(
      screen.getByText(
        /Real Flow's analytics help us identify bottlenecks and optimize our workflow/i
      )
    ).toBeDefined();
    expect(screen.getByText(/Emily Rodriguez/i)).toBeDefined();
    expect(screen.getByText(/Operations Director/i)).toBeDefined();
    expect(screen.getByText(/GrowthCo/i)).toBeDefined();
  });

  it("renders the CTA section", () => {
    expect(screen.getByText(/Ready to transform your workflow/i)).toBeDefined();
    expect(screen.getByText(/Start Free Trial/i)).toBeDefined();
  });

  it("renders the footer", () => {
    expect(screen.getAllByText(/Real Flow/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
  });
});
