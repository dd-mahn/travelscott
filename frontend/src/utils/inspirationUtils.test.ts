import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { getInspirationHeading, getBackgroundKey } from "src/utils/inspirationUtils";
import { getSeason } from "src/utils/getSeason";

vi.mock("src/utils/getSeason");

describe("inspirationUtils", () => {
  describe("getInspirationHeading", () => {
    beforeEach(() => {
      vi.mocked(getSeason).mockReturnValue("Winter");
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should return correct heading for Wilderness category", () => {
      expect(getInspirationHeading("Wilderness")).toBe("Wilderness");
    });

    it("should return correct heading for Culture&Heritage category", () => {
      expect(getInspirationHeading("Culture&Heritage")).toBe("Culture & Heritage");
    });

    it("should return correct heading for FoodLovers category", () => {
      expect(getInspirationHeading("FoodLovers")).toBe("Food Lovers");
    });

    it("should return season and year for unknown category", () => {
      vi.setSystemTime(new Date(2024, 0, 1));
      expect(getInspirationHeading("Unknown")).toBe("Winter 2024");
    });
  });

  describe("getBackgroundKey", () => {
    it("should return correct background key for All category", () => {
      expect(getBackgroundKey("All")).toBe("background-dark");
    });

    it("should return correct background key for Wilderness category", () => {
      expect(getBackgroundKey("Wilderness")).toBe("wilderness");
    });

    it("should return correct background key for Culture&Heritage category", () => {
      expect(getBackgroundKey("Culture&Heritage")).toBe("cultureheritage");
    });

    it("should return default background key for unknown category", () => {
      expect(getBackgroundKey("Unknown")).toBe("background-dark");
    });
  });
});
