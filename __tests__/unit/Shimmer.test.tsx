import { Shimmer } from "@/components/shimmer/shimmer";
import { ListShimmer } from "@/components/shimmer/ListShimmer";
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

  });
})

describe("List Shimmer Component Unit Test", () => {

  test("Should render the List shimmer animation when loading", () => {
    render(
      <ListShimmer count={5} />
    );
    const ListShimmerElement = screen.getByTestId('list-shimmer');
    expect(ListShimmerElement.children.length).toBe(5);

  });

})