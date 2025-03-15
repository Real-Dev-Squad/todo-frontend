import { ShimmerSkeleton } from "@/components/SimmerSkeleton";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

// Mock component to use as a child
const MockComponent = () => <div data-testid="shimmer-child-component">Child Content</div>;

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

test("renders the shimmer when loading is true", () => {
  render(
    <ShimmerSkeleton loading={true}>
      <MockComponent />
    </ShimmerSkeleton>
  );

  // The shimmer element should be in the document
  const shimmerElement = screen.getByTestId("shimmer");
  expect(shimmerElement).not.toBeNull();

  // The child component should not be in the document
  const childElement = screen.queryByTestId("shimmer-child-component");
  expect(childElement).toBeNull();
});

test("renders the children when loading is false", () => {
  render(
    <ShimmerSkeleton loading={false}>
      <MockComponent />
    </ShimmerSkeleton>
  );

  // The child component should be in the document
  const childElement = screen.getByTestId("shimmer-child-component");
  expect(childElement).not.toBeNull();
  expect(childElement.textContent).toBe("Child Content");


});

test("applies custom dimensions when provided", () => {
  render(
    <ShimmerSkeleton loading={true} width="200px" height="100px" borderRadius="8px">
      <MockComponent />
    </ShimmerSkeleton>
  );

  // Get the shimmer container
  const shimmerContainer = screen.getByTestId("shimmer-container");
  expect(shimmerContainer).not.toBeNull();

  // Check if custom dimensions are applied
  if (shimmerContainer) {
    expect(shimmerContainer.getAttribute("style")).toContain("width: 200px");
    expect(shimmerContainer.getAttribute("style")).toContain("height: 100px");
    expect(shimmerContainer.getAttribute("style")).toContain("border-radius: 8px");
  }
});

test("applies default dimensions when not provided", () => {
  render(
    <ShimmerSkeleton loading={true}>
      <MockComponent />
    </ShimmerSkeleton>
  );

  // Get the shimmer container
  const shimmerContainer = screen.getByTestId("shimmer-container");
  expect(shimmerContainer).not.toBeNull();

  // Check if default dimensions are applied
  if (shimmerContainer) {
    expect(shimmerContainer.getAttribute("style")).toContain("width: 100%");
    expect(shimmerContainer.getAttribute("style")).toContain("height: 100%");
    expect(shimmerContainer.getAttribute("style")).not.toContain("border-radius");
  }
});