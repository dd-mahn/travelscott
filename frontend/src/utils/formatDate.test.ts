import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format date string to 'Month Day, Year' format", () => {
    const dateString = "2023-12-25";
    const result = formatDate(dateString);
    expect(result).toBe("December 25, 2023");
  });

  it("should handle different months correctly", () => {
    const dateString = "2023-03-15";
    const result = formatDate(dateString);
    expect(result).toBe("March 15, 2023");
  });

  it("should handle single digit days correctly", () => {
    const dateString = "2023-07-05";
    const result = formatDate(dateString);
    expect(result).toBe("July 5, 2023");
  });

  it("should handle different years correctly", () => {
    const dateString = "2024-01-01";
    const result = formatDate(dateString);
    expect(result).toBe("January 1, 2024");
  });
});
