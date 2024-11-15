import { describe, it, expect } from "vitest";
import reducer, {
  setCurrentDestination,
  setDestinations,
  setAllDestinations,
  setFeaturedDestinations,
  setTotalDestinations,
  setLoading,
  setError
} from "src/store/slices/destinationSlice";
import type Destination from "src/types/Destination";

describe("Destination Slice", () => {
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

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      currentDestination: null,
      destinations: [],
      allDestinations: [],
      featuredDestinations: [],
      totalDestinations: 0,
      loading: false,
      error: null
    });
  });

  it("should handle setCurrentDestination", () => {
    const state = reducer(undefined, setCurrentDestination(sampleDestination));
    expect(state.currentDestination).toEqual(sampleDestination);
  });

  it("should handle setDestinations", () => {
    const destinations = [sampleDestination];
    const state = reducer(undefined, setDestinations(destinations));
    expect(state.destinations).toEqual(destinations);
  });

  it("should handle setAllDestinations", () => {
    const destinations = [sampleDestination];
    const state = reducer(undefined, setAllDestinations(destinations));
    expect(state.allDestinations).toEqual(destinations);
  });

  it("should handle setFeaturedDestinations", () => {
    const destinations = [sampleDestination];
    const state = reducer(undefined, setFeaturedDestinations(destinations));
    expect(state.featuredDestinations).toEqual(destinations);
  });

  it("should handle setTotalDestinations", () => {
    const total = 5;
    const state = reducer(undefined, setTotalDestinations(total));
    expect(state.totalDestinations).toBe(total);
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
    const state = reducer(initialState, setCurrentDestination(sampleDestination));
    
    expect(state.currentDestination).toEqual(sampleDestination);
    expect(state.destinations).toEqual(initialState.destinations);
    expect(state.allDestinations).toEqual(initialState.allDestinations);
    expect(state.featuredDestinations).toEqual(initialState.featuredDestinations);
    expect(state.totalDestinations).toEqual(initialState.totalDestinations);
    expect(state.loading).toEqual(initialState.loading);
    expect(state.error).toEqual(initialState.error);
  });
});
