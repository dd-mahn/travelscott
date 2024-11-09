import { describe, it, expect } from "vitest";
import reducer, {
  setCurrentCountry,
  setCountries,
  setCountryDestinations,
  setCountryBlogs,
  setLoading,
  setError
} from "./countrySlice";
import type Country from "src/types/Country";
import type Destination from "src/types/Destination";
import type Blog from "src/types/Blog";

describe("Country Slice", () => {
  const sampleCountry: Country = {
    _id: "1",
    name: "Test Country",
    continent: "Test Continent",
    description: ["Test Description"],
    images: {
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

  const sampleDestination: Destination = {
    _id: "1",
    name: "Test Destination",
    location: "Test Location",
    video: "test.mp4",
    images: ["test.jpg"],
    country: "Test Country",
    continent: "Test Continent",
    description: "Test Description",
    additionalInfo: {
      whenToVisit: "Test When to Visit",
      whoToGoWith: "Test Who to Go With",
      whatToExpect: "Test What to Expect",
      healthAndSafety: "Test Health and Safety"
    },
    places: {
      to_stay: [],
      to_visit: [],
      to_eat: []
    },
    transportation: {
      overview: "Test Overview",
      types: []
    },
    tags: ["test"],
    insight: {
      from_us: {
        tips: [],
        article: []
      }
    },
    summary: "Test Summary",
    featured: false
  };

  const sampleBlog: Blog = {
    _id: "1",
    title: "Test Blog",
    content: [],
    image: "test.jpg",
    category: "Test Category",
    tags: ["test"],
    featured: false,
    author: "Test Author",
    time: "10",
    related_destination: "Test Destination"
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      currentCountry: null,
      countries: [],
      countryDestinations: [],
      countryBlogs: [],
      loading: false,
      error: null
    });
  });

  it("should handle setCurrentCountry", () => {
    const state = reducer(undefined, setCurrentCountry(sampleCountry));
    expect(state.currentCountry).toEqual(sampleCountry);
  });

  it("should handle setCountries", () => {
    const countries = [sampleCountry];
    const state = reducer(undefined, setCountries(countries));
    expect(state.countries).toEqual(countries);
  });

  it("should handle setCountryDestinations", () => {
    const destinations = [sampleDestination];
    const state = reducer(undefined, setCountryDestinations(destinations));
    expect(state.countryDestinations).toEqual(destinations);
  });

  it("should handle setCountryBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setCountryBlogs(blogs));
    expect(state.countryBlogs).toEqual(blogs);
  });

  it("should handle setLoading", () => {
    const state = reducer(undefined, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it("should handle setError", () => {
    const errorMessage = "Test error message";
    const state = reducer(undefined, setError(errorMessage));
    expect(state.error).toBe(errorMessage);
  });

  it("should not modify other state properties when updating one property", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, setCurrentCountry(sampleCountry));
    
    expect(state.currentCountry).toEqual(sampleCountry);
    expect(state.countries).toEqual(initialState.countries);
    expect(state.countryDestinations).toEqual(initialState.countryDestinations);
    expect(state.countryBlogs).toEqual(initialState.countryBlogs);
    expect(state.loading).toEqual(initialState.loading);
    expect(state.error).toEqual(initialState.error);
  });
});
