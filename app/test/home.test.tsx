import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "../page";

test("renders the homepage correctly", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Hello World!")).toBeDefined();
});
