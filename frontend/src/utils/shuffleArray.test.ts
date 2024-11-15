import { describe, it, expect } from "vitest";
import { shuffleArray } from "src/utils/shuffleArray";

describe("shuffleArray", () => {
  it("should return an array with the same length as input", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffleArray(input);
    expect(result.length).toBe(input.length);
  });

  it("should contain all the same elements as input array", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffleArray(input);
    expect(result).toEqual(expect.arrayContaining(input));
  });

  it("should not modify the original array", () => {
    const input = ["a", "b", "c", "d"];
    const originalInput = [...input];
    shuffleArray(input);
    expect(input).toEqual(originalInput);
  });

  it("should return a different order than the input (most of the time)", () => {
    const input = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const result = shuffleArray(input);
    // While technically the shuffle could return the same order,
    // it's extremely unlikely with 10 elements
    expect(result.join("")).not.toBe(input.join(""));
  });

  it("should handle empty array", () => {
    const input: string[] = [];
    const result = shuffleArray(input);
    expect(result).toEqual([]);
  });

  it("should handle single element array", () => {
    const input = ["a"];
    const result = shuffleArray(input);
    expect(result).toEqual(["a"]);
  });
});
