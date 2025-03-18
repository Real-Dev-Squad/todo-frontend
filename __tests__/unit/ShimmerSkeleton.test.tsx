import { ShimmerSkeleton } from "@/components/ShimmerSkeleton";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

// Mock component to use as a child
const MockComponent = () => <div data-testid="shimmer-child-component">Child Content</div>;
const PlaceholderComponent = () => <div data-testid="shimmer-placeholder-component">placeholder Content</div>;

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

test("should render the shimmer animation when loading is true and placeholder component isn't provided", () => {
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

test("should render the placeholder when loading is true and placeholder component is provided", () => {
  render(
    <ShimmerSkeleton loading={true} placeholder={<PlaceholderComponent />}>
      <MockComponent />
    </ShimmerSkeleton>
  );

  // The child component should not be in the document
  const childElement = screen.queryByTestId("shimmer-child-component");
  expect(childElement).toBeNull();

  // The placeholder component should be in the document
  const placeholderElement = screen.queryByTestId("shimmer-placeholder-component");
  expect(placeholderElement).not.toBeNull();
});

test("should render the children when loading is false", () => {
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

test("should applies custom dimensions when provided", () => {
  render(
    <ShimmerSkeleton loading={true} width="200px" height="100px" borderRadius="8px">
      <MockComponent />
    </ShimmerSkeleton>
  );

  // Get the shimmer container
  const shimmerContainer = screen.getByTestId("shimmer-container");
  expect(shimmerContainer).not.toBeNull();

  // Check if custom dimensions are applied
  expect(shimmerContainer.getAttribute("style")).toContain("width: 200px");
  expect(shimmerContainer.getAttribute("style")).toContain("height: 100px");
  expect(shimmerContainer.getAttribute("style")).toContain("border-radius: 8px");

});

test("should applies default dimensions when not provided", () => {
  render(
    <ShimmerSkeleton loading={true}>
      <MockComponent />
    </ShimmerSkeleton>
  );

  // Get the shimmer container
  const shimmerContainer = screen.getByTestId("shimmer-container");
  expect(shimmerContainer).not.toBeNull();

  // Check if default dimensions are applied
  expect(shimmerContainer.getAttribute("style")).not.toContain("width");
  expect(shimmerContainer.getAttribute("style")).toContain("height: 100px");
  expect(shimmerContainer.getAttribute("style")).not.toContain("border-radius");
});