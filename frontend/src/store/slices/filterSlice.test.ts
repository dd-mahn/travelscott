import { describe, it, expect } from "vitest";
import reducer, {
  setDestinationContinents,
  setDestinationCountries,
  setDestinationTags,
  setDestinationSearchQuery,
  setBlogTags,
  setBlogSearchQuery,
} from "src/store/slices/filterSlice";

describe("Filter Slice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      destination: {
        continents: [],
        countries: [],
        tags: [],
        searchQuery: '',
      },
      blog: {
        tags: [],
        searchQuery: '',
      },
    });
  });

  it("should handle setDestinationContinents", () => {
    const continents = ["Asia", "Europe"];
    const state = reducer(undefined, setDestinationContinents(continents));
    expect(state.destination.continents).toEqual(continents);
  });

  it("should handle setDestinationCountries", () => {
    const countries = ["Japan", "France"];
    const state = reducer(undefined, setDestinationCountries(countries));
    expect(state.destination.countries).toEqual(countries);
  });

  it("should handle setDestinationTags", () => {
    const tags = ["beach", "mountain"];
    const state = reducer(undefined, setDestinationTags(tags));
    expect(state.destination.tags).toEqual(tags);
  });

  it("should handle setDestinationSearchQuery", () => {
    const searchQuery = "test query";
    const state = reducer(undefined, setDestinationSearchQuery(searchQuery));
    expect(state.destination.searchQuery).toBe(searchQuery);
  });

  it("should handle setBlogTags", () => {
    const tags = ["travel", "food"];
    const state = reducer(undefined, setBlogTags(tags));
    expect(state.blog.tags).toEqual(tags);
  });

  it("should handle setBlogSearchQuery", () => {
    const searchQuery = "blog search";
    const state = reducer(undefined, setBlogSearchQuery(searchQuery));
    expect(state.blog.searchQuery).toBe(searchQuery);
  });

  it("should not modify other state properties when updating destination filters", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, setDestinationContinents(["Asia"]));
    
    expect(state.destination.continents).toEqual(["Asia"]);
    expect(state.destination.countries).toEqual(initialState.destination.countries);
    expect(state.destination.tags).toEqual(initialState.destination.tags);
    expect(state.destination.searchQuery).toEqual(initialState.destination.searchQuery);
    expect(state.blog).toEqual(initialState.blog);
  });

  it("should not modify other state properties when updating blog filters", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, setBlogTags(["travel"]));
    
    expect(state.blog.tags).toEqual(["travel"]);
    expect(state.blog.searchQuery).toEqual(initialState.blog.searchQuery);
    expect(state.destination).toEqual(initialState.destination);
  });
});
