import { ListShimmer } from "@/components/shimmer/ListShimmer";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});



describe("List Shimmer Component Unit Test", () => {

  test("Should render the List shimmer animation when loading", () => {
    render(
      <ListShimmer count={5} />
    );
    const ListShimmerElement = screen.getByTestId('list-shimmer');
    expect(ListShimmerElement.children.length).toBe(5);

  });

})