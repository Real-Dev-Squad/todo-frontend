import { ListShimmer, Shimmer } from "@/components/Shimmer";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("Shimmer Component Unit Test", () => {

  test("should render the shimmer animation when loading", () => {
    render(
      <Shimmer />
    );
    const shimmerElement = screen.getByTestId("shimmer");
    expect(shimmerElement).not.toBeNull();
    expect(shimmerElement.classList.contains("animate-pulse")).toBe(true)

  });
})

describe("List Shimmer Component Unit Test", () => {

  test("Should render the List shimmer animation when loading", () => {
    render(
      <ListShimmer count={5} />
    );
    const ListShimmerElement = screen.getByTestId('list-shimmer');
    expect(ListShimmerElement.children.length).toBe(5);
    expect(ListShimmerElement.children[0].classList.contains("animate-pulse")).toBe(true);

  });

})