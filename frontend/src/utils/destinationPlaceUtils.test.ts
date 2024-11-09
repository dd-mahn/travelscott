import { describe, it, expect } from "vitest";
import {
  getSelectedCategoryPlaces,
  getDestinationPlaceHeading,
  getPlaceCategoryChange
} from "./destinationPlaceUtils";
import { destinationPlace } from "src/types/Destination";

describe("Destination Place Utils", () => {
  const samplePlaces: destinationPlace = {
    to_stay: [{ name: "Hotel A", description: "Nice hotel", type: "hotel", image_url: "hotel.jpg", location: { on_map: "", address: "USA" }, price: { currency: "USD", value: 100 }, rating: { website: "https://example.com", value: 4.5, link: "https://example.com" } }],
    to_visit: [{ name: "Museum B", description: "Historic museum", type: "museum", image_url: "museum.jpg", location: { on_map: "", address: "France" }, tips: ["Tip 1", "Tip 2"] }],
    to_eat: [{ name: "Restaurant C", description: "Local cuisine", type: "restaurant", image_url: "restaurant.jpg", location: { on_map: "", address: "Japan" }, price: { currency: "JPY", value: 20 }, rating: { website: "https://example.com", value: 4.0, link: "https://example.com" }, favorites: ["Favorite 1", "Favorite 2"] }]
  };

  describe("getSelectedCategoryPlaces", () => {
    it("should return to_stay places when category is to_stay", () => {
      const result = getSelectedCategoryPlaces("to_stay", samplePlaces);
      expect(result).toEqual(samplePlaces.to_stay);
    });

    it("should return to_visit places when category is to_visit", () => {
      const result = getSelectedCategoryPlaces("to_visit", samplePlaces);
      expect(result).toEqual(samplePlaces.to_visit);
    });

    it("should return to_eat places for default case", () => {
      const result = getSelectedCategoryPlaces("to_eat", samplePlaces);
      expect(result).toEqual(samplePlaces.to_eat);
    });
  });

  describe("getDestinationPlaceHeading", () => {
    it('should return "To stay" for to_stay category', () => {
      expect(getDestinationPlaceHeading("to_stay")).toBe("To stay");
    });

    it('should return "To visit" for to_visit category', () => {
      expect(getDestinationPlaceHeading("to_visit")).toBe("To visit");
    });

    it('should return "To eat" for default case', () => {
      expect(getDestinationPlaceHeading("to_eat")).toBe("To eat");
    });
  });

  describe("getPlaceCategoryChange", () => {
    it("should handle to_stay place category correctly", () => {
      expect(getPlaceCategoryChange("to_stay", "visit")).toBe("to_visit");
      expect(getPlaceCategoryChange("to_stay", "eat")).toBe("to_eat");
    });

    it("should handle to_visit place category correctly", () => {
      expect(getPlaceCategoryChange("to_visit", "eat")).toBe("to_eat");
      expect(getPlaceCategoryChange("to_visit", "stay")).toBe("to_stay");
    });

    it("should handle to_eat place category correctly", () => {
      expect(getPlaceCategoryChange("to_eat", "stay")).toBe("to_stay");
      expect(getPlaceCategoryChange("to_eat", "visit")).toBe("to_visit");
    });
  });
});
