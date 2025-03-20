import { ShimmerSkeleton } from "@/components/ShimmerSkeleton";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";


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

  const shimmerElement = screen.getByTestId("shimmer");
  expect(shimmerElement).not.toBeNull();

  const childElement = screen.queryByTestId("shimmer-child-component");
  expect(childElement).toBeNull();
});

test("should render the placeholder when loading is true and placeholder component is provided", () => {
  render(
    <ShimmerSkeleton loading={true} placeholder={<PlaceholderComponent />}>
      <MockComponent />
    </ShimmerSkeleton>
  );

  const childElement = screen.queryByTestId("shimmer-child-component");
  expect(childElement).toBeNull();

  const placeholderElement = screen.queryByTestId("shimmer-placeholder-component");
  expect(placeholderElement).not.toBeNull();
});

test("should render the children when loading is false", () => {
  render(
    <ShimmerSkeleton loading={false}>
      <MockComponent />
    </ShimmerSkeleton>
  );

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

  const shimmerContainer = screen.getByTestId("shimmer-container");
  expect(shimmerContainer).not.toBeNull();

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

  const shimmerContainer = screen.getByTestId("shimmer-container");
  expect(shimmerContainer).not.toBeNull();

  expect(shimmerContainer.getAttribute("style")).not.toContain("width");
  expect(shimmerContainer.getAttribute("style")).toContain("height: 100px");
  expect(shimmerContainer.getAttribute("style")).not.toContain("border-radius");
});