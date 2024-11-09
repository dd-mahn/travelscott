import { describe, it, expect, beforeEach } from "vitest";
import reducer, { toggleDarkMode, setDarkMode } from "./themeSlice";

describe("Theme Slice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      isDarkMode: false
    });
  });

  it("should handle toggleDarkMode", () => {
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, toggleDarkMode());
    expect(state.isDarkMode).toBe(true);
    expect(localStorage.getItem("isDarkMode")).toBe("true");

    const nextState = reducer(state, toggleDarkMode());
    expect(nextState.isDarkMode).toBe(false);
    expect(localStorage.getItem("isDarkMode")).toBe("false");
  });

  it("should handle setDarkMode", () => {
    const state = reducer(undefined, setDarkMode(true));
    expect(state.isDarkMode).toBe(true);
    expect(localStorage.getItem("isDarkMode")).toBe("true");

    const nextState = reducer(state, setDarkMode(false));
    expect(nextState.isDarkMode).toBe(false);
    expect(localStorage.getItem("isDarkMode")).toBe("false");
  });

  it("should load initial state from localStorage", () => {
    localStorage.setItem("isDarkMode", "true");
    const state = reducer(undefined, { type: "" });
    expect(state.isDarkMode).toBe(true);
  });
});
