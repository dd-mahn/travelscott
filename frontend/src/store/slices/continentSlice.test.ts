import { describe, it, expect } from "vitest";
import reducer, { setContinents, updateContinent } from "src/store/slices/continentSlice";
import type Country from "src/types/Country";

describe("Continent Slice", () => {
  const sampleCountry: Country = {
    _id: "1",
    name: "Test Country",
    continent: "Test Continent",
    description: ["Test Description"],
    images  : {
      flagImages: ["flag.jpg"],
      mapImages: ["map.jpg"],
      otherImages: ["other.jpg"]
    },
    capital: "Test Capital",
    currency: "Test Currency",
    language: "Test Language",
    visaRequirement: "Test Visa Requirement",
    dialInCode: "Test Dial-in Code",
    timeZone: "Test Time Zone",
    additionalInfo: {
      whenToVisit: "Test When to Visit",
      transportation: "Test Transportation",
      healthAndSafety: "Test Health and Safety"
    },
    totalDestinations: 1
  };

  const sampleContinent = {
    name: "Test Continent",
    countries: [sampleCountry],
    count: 1,
    image: "test.jpg"
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      continents: []
    });
  });

  it("should handle setContinents", () => {
    const continents = [sampleContinent];
    const state = reducer(undefined, setContinents(continents));
    expect(state.continents).toEqual(continents);
  });

  it("should handle updateContinent for new continent", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, updateContinent(sampleContinent));
    expect(state.continents).toHaveLength(1);
    expect(state.continents[0]).toEqual(sampleContinent);
  });

  it("should handle updateContinent for existing continent", () => {
    const initialState = {
      continents: [sampleContinent]
    };
    
    const updatedContinent = {
      ...sampleContinent,
      count: 2,
      countries: [...sampleContinent.countries, sampleCountry]
    };

    const state = reducer(initialState, updateContinent(updatedContinent));
    expect(state.continents).toHaveLength(1);
    expect(state.continents[0]).toEqual(updatedContinent);
  });

  it("should not modify other continents when updating one continent", () => {
    const otherContinent = {
      name: "Other Continent",
      countries: [sampleCountry],
      count: 1,
      image: "other.jpg"
    };

    const initialState = {
      continents: [sampleContinent, otherContinent]
    };

    const updatedContinent = {
      ...sampleContinent,
      count: 2
    };

    const state = reducer(initialState, updateContinent(updatedContinent));
    expect(state.continents).toHaveLength(2);
    expect(state.continents.find(c => c.name === otherContinent.name)).toEqual(otherContinent);
  });
});
