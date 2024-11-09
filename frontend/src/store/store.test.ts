import { describe, it, expect } from "vitest";
import { store } from "./store";
import type { RootState } from "./store";

describe("Redux Store", () => {
  it("should initialize with all required reducers", () => {
    const state = store.getState();

    // Check if all reducers are present
    expect(state).toHaveProperty("inspiration");
    expect(state).toHaveProperty("blog"); 
    expect(state).toHaveProperty("filter");
    expect(state).toHaveProperty("country");
    expect(state).toHaveProperty("destination");
    expect(state).toHaveProperty("continent");
    expect(state).toHaveProperty("theme");
  });

  it("should have correct type inference for RootState", () => {
    const state = store.getState();

    // Type check - this is a compile-time test
    const typedState: RootState = state;
    expect(typedState).toBe(state);
  });

  it("should have working dispatch function", () => {
    // Verify store has dispatch method
    expect(store.dispatch).toBeDefined();
    expect(typeof store.dispatch).toBe("function");
  });

  it("should have working getState function", () => {
    // Verify store has getState method
    expect(store.getState).toBeDefined();
    expect(typeof store.getState).toBe("function");
  });

  it("should have working subscribe function", () => {
    // Verify store has subscribe method
    expect(store.subscribe).toBeDefined();
    expect(typeof store.subscribe).toBe("function");
  });
});
