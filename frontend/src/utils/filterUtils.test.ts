import { describe, it, expect } from "vitest";
import { getCountryByContinent, getFeaturedDestinations } from "./filterUtils";
import Country from "src/types/Country";
import Destination from "src/types/Destination";

describe("Filter Utils", () => {
  describe("getCountryByContinent", () => {
    const sampleCountries: Country[] = [
      { 
        _id: "1",
        name: "Japan",
        continent: "Asia",
        images: { flagImages: [], mapImages: [], otherImages: [] },
        description: [],
        capital: "Tokyo",
        currency: "JPY",
        language: "Japanese",
        visaRequirement: "Required",
        dialInCode: "+81",
        timeZone: "UTC+9",
        additionalInfo: {},
        totalDestinations: 5
      },
      {
        _id: "2", 
        name: "France",
        continent: "Europe",
        images: { flagImages: [], mapImages: [], otherImages: [] },
        description: [],
        capital: "Paris",
        currency: "EUR",
        language: "French",
        visaRequirement: "Required",
        dialInCode: "+33",
        timeZone: "UTC+1",
        additionalInfo: {},
        totalDestinations: 3
      },
      {
        _id: "3",
        name: "Thailand",
        continent: "Asia", 
        images: { flagImages: [], mapImages: [], otherImages: [] },
        description: [],
        capital: "Bangkok",
        currency: "THB",
        language: "Thai",
        visaRequirement: "Required",
        dialInCode: "+66",
        timeZone: "UTC+7",
        additionalInfo: {},
        totalDestinations: 4
      }
    ];

    it("should return countries from specified continent", () => {
      const asianCountries = getCountryByContinent(sampleCountries, "Asia");
      expect(asianCountries).toHaveLength(2);
      expect(asianCountries.map(country => country.name)).toEqual(["Japan", "Thailand"]);
    });

    it("should return empty array if no countries match continent", () => {
      const result = getCountryByContinent(sampleCountries, "Africa");
      expect(result).toHaveLength(0);
    });
  });

  describe("getFeaturedDestinations", () => {
    const sampleDestinations: Destination[] = [
      { 
        _id: "1",
        name: "Tokyo",
        location: "Japan",
        video: "",
        images: [],
        country: "Japan", 
        continent: "Asia",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: true
      },
      {
        _id: "2", 
        name: "Paris",
        location: "France",
        video: "",
        images: [],
        country: "France",
        continent: "Europe", 
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: true
      },
      {
        _id: "3",
        name: "Bangkok", 
        location: "Thailand",
        video: "",
        images: [],
        country: "Thailand",
        continent: "Asia",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: false
      },
      {
        _id: "4",
        name: "Kyoto",
        location: "Japan",
        video: "",
        images: [],
        country: "Japan",
        continent: "Asia",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: true
      },
      {
        _id: "5",
        name: "Nice",
        location: "France", 
        video: "",
        images: [],
        country: "France",
        continent: "Europe",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: true
      },
      {
        _id: "6",
        name: "Osaka",
        location: "Japan",
        video: "",
        images: [],
        country: "Japan", 
        continent: "Asia",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: true
      },
      {
        _id: "7",
        name: "Phuket",
        location: "Thailand",
        video: "",
        images: [],
        country: "Thailand",
        continent: "Asia",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: true
      }
    ];

    it("should return top 5 featured destinations", () => {
      const featuredDests = getFeaturedDestinations(sampleDestinations);
      expect(featuredDests).toHaveLength(5);
      expect(featuredDests.every(dest => dest.featured)).toBe(true);
    });

    it("should return empty array if no featured destinations", () => {
      const noFeatured = [
        { 
          _id: "1",
          name: "Test", 
          location: "Test", 
          video: "",
          images: [],
          country: "Test",
          continent: "Test",
          featured: false,
          description: "",
          additionalInfo: {},
          places: {},
          transportation: {},
          tags: [],
          insight: {},
          summary: ""
        }
      ];
      const result = getFeaturedDestinations(noFeatured);
      expect(result).toHaveLength(0);
    });
  });
});
