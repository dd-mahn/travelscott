import { describe, it, expect } from "vitest";
import reducer, { setCategory, setCategoryImage } from "./inspirationSlice";

describe("Inspiration Slice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      currentCategory: 'All',
      currentCategoryImage: ''
    });
  });

  it("should handle setCategory", () => {
    const category = "Nature";
    const state = reducer(undefined, setCategory(category));
    expect(state.currentCategory).toBe(category);
  });

  it("should handle setCategoryImage", () => {
    const image = "nature.jpg";
    const state = reducer(undefined, setCategoryImage(image));
    expect(state.currentCategoryImage).toBe(image);
  });

  it("should not modify other state properties when updating category", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, setCategory("Nature"));
    
    expect(state.currentCategory).toBe("Nature");
    expect(state.currentCategoryImage).toBe(initialState.currentCategoryImage);
  });

  it("should not modify other state properties when updating category image", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, setCategoryImage("nature.jpg"));
    
    expect(state.currentCategoryImage).toBe("nature.jpg");
    expect(state.currentCategory).toBe(initialState.currentCategory);
  });
});
