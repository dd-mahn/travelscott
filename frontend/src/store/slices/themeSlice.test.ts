import { describe, it, expect, beforeEach, vi } from "vitest";
import reducer, { toggleDarkMode, setDarkMode } from "./themeSlice";

describe("Theme Slice", () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    // Replace global localStorage with mock
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  it("should return the initial state", () => {
    localStorageMock.getItem.mockReturnValue(null);
    expect(reducer(undefined, { type: "" })).toEqual({
      isDarkMode: false
    });
  });

  it("should handle toggleDarkMode", () => {
    localStorageMock.getItem.mockReturnValue(null);
    const initialState = reducer(undefined, { type: "" });
    const state = reducer(initialState, toggleDarkMode());
    expect(state.isDarkMode).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("isDarkMode", "true");

    const nextState = reducer(state, toggleDarkMode());
    expect(nextState.isDarkMode).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("isDarkMode", "false");
  });

  it("should handle setDarkMode", () => {
    localStorageMock.getItem.mockReturnValue(null);
    const state = reducer(undefined, setDarkMode(true));
    expect(state.isDarkMode).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("isDarkMode", "true");

    const nextState = reducer(state, setDarkMode(false));
    expect(nextState.isDarkMode).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("isDarkMode", "false");
  });

  it("should load initial state from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("true");
    const state = reducer(undefined, { type: "" });
    expect(state.isDarkMode).toBe(true);
  });
});
