import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll, vi } from "vitest";
import { SideBar } from "../../components/SideBar";
import { SidebarProvider } from "../../components/ui/sidebar";
import React from "react";

// Mock the use-mobile hook
const mockIsMobile = false;
vi.mock("../../hooks/use-mobile", () => ({
  useIsMobile: () => mockIsMobile,
}));

describe("SideBar", () => {
  beforeAll(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <SidebarProvider>
        <SideBar />
      </SidebarProvider>
    );
  });
  
  it("renders the TODO logo", () => {
    const logo = screen.getByText("TODO");
    expect(logo).toBeDefined();
  });

  it("renders navigation links", () => {
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Tasks")).toBeDefined();
    expect(screen.getByText("Teams")).toBeDefined();
  });
});
