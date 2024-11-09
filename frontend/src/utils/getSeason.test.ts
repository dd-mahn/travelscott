import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { getSeason } from "./getSeason";

describe("getSeason", () => {
  beforeEach(() => {
    // Reset mocked date before each test
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'Winter' for December (month 11)", () => {
    vi.setSystemTime(new Date(2023, 11, 15));
    expect(getSeason()).toBe("Winter");
  });

  it("should return 'Winter' for January (month 0)", () => {
    vi.setSystemTime(new Date(2023, 0, 15));
    expect(getSeason()).toBe("Winter");
  });

  it("should return 'Winter-Spring' for February (month 1)", () => {
    vi.setSystemTime(new Date(2023, 1, 15));
    expect(getSeason()).toBe("Winter-Spring");
  });

  it("should return 'Spring' for March (month 2)", () => {
    vi.setSystemTime(new Date(2023, 2, 15));
    expect(getSeason()).toBe("Spring");
  });

  it("should return 'Spring-Summer' for May (month 4)", () => {
    vi.setSystemTime(new Date(2023, 4, 15));
    expect(getSeason()).toBe("Spring-Summer");
  });

  it("should return 'Summer' for July (month 6)", () => {
    vi.setSystemTime(new Date(2023, 6, 15));
    expect(getSeason()).toBe("Summer");
  });

  it("should return 'Summer-Fall' for August (month 7)", () => {
    vi.setSystemTime(new Date(2023, 7, 15));
    expect(getSeason()).toBe("Summer-Fall");
  });

  it("should return 'Fall' for September (month 8)", () => {
    vi.setSystemTime(new Date(2023, 8, 15));
    expect(getSeason()).toBe("Fall");
  });

  it("should return 'Fall-Winter' for November (month 10)", () => {
    vi.setSystemTime(new Date(2023, 10, 15));
    expect(getSeason()).toBe("Fall-Winter");
  });
});
