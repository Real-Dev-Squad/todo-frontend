import { ShimmerSkeleton } from "@/components/ShimmerSkeleton";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";


const MockComponent = () => <div data-testid="shimmer-child-component">Child Content</div>;
const PlaceholderComponent = () => <div data-testid="shimmer-placeholder-component">placeholder Content</div>;

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("Shimmer Skeleton Component Unit Test", () => {

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

  test("should apply custom dimensions when provided", () => {
    render(
      <ShimmerSkeleton loading={true} className="h-[100px] w-[200px] border-[8px]"  >
        <MockComponent />
      </ShimmerSkeleton>
    );

    const shimmerContainer = screen.getByTestId("shimmer-container");
    expect(shimmerContainer).not.toBeNull();

    expect(shimmerContainer.classList.contains("h-[100px]")).toBe(true);
    expect(shimmerContainer.classList.contains("w-[200px]")).toBe(true);
    expect(shimmerContainer.classList.contains("border-[8px]")).toBe(true);
  });

  test("should apply default dimensions when not provided", () => {
    render(
      <ShimmerSkeleton loading={true}>
        <MockComponent />
      </ShimmerSkeleton>
    );

    const shimmerContainer = screen.getByTestId("shimmer-container");
    expect(shimmerContainer).not.toBeNull();

    expect(shimmerContainer.classList.contains("h-[100px]")).toBe(false);
    expect(shimmerContainer.classList.contains("max-w-full")).toBe(true);
    expect(shimmerContainer.classList.contains("mx-6")).toBe(true);
  });

  test("should also apply style object if provided", () => {
    render(
      <ShimmerSkeleton loading={true} style={{
        height: "200px",
        width: "200px",
        borderRadius: "8px"
      }}>
        <MockComponent />
      </ShimmerSkeleton>
    );

    const shimmerContainer = screen.getByTestId("shimmer-container");
    expect(shimmerContainer).not.toBeNull();

    expect(shimmerContainer.getAttribute("style")).toContain("height: 200px");
    expect(shimmerContainer.getAttribute("style")).toContain("width: 200px");
    expect(shimmerContainer.getAttribute("style")).toContain("border-radius: 8px");
    expect(shimmerContainer.classList.contains("max-w-full")).toBe(true);
  });

})