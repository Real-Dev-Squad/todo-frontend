// Replace with the actual path to your module

import { cn } from "@/utils/utils";
import { describe, expect, test } from "vitest";

describe("cn utility function", () => {
  test("combines class names correctly", () => {
    // Test basic string concatenation
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");

    // Test conditional classes
    expect(cn("text-lg", true && "font-bold", false && "italic")).toBe(
      "text-lg font-bold"
    );

    // Test with arrays
    expect(cn(["px-4", "py-2"])).toBe("px-4 py-2");

    // Test with objects
    expect(cn({ "border-2": true, rounded: true, shadow: false })).toBe(
      "border-2 rounded"
    );

    // Test with mixed inputs
    expect(
      cn("flex", ["items-center", "justify-between"], {
        "p-4": true,
        "mx-auto": false,
      })
    ).toBe("flex items-center justify-between p-4");

    // Test tailwind-merge functionality (conflicting classes)
    expect(cn("p-2 p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    expect(cn("text-sm md:text-lg", "md:text-xl")).toBe("text-sm md:text-xl");

    // Test more complex tailwind merge cases
    expect(cn("w-full max-w-md", "w-auto")).toBe("max-w-md w-auto");
    expect(cn("border-gray-200 border-2", "border-blue-500")).toBe(
      "border-2 border-blue-500"
    );
  });
});
