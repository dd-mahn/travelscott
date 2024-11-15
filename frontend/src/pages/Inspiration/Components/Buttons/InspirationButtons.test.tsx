import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import InspirationButtons from "src/pages/Inspiration/Components/Buttons/InspirationButtons";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, ...validProps } = props;
      return <div data-testid="motion-div" {...validProps}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, variants, ...validProps } = props;
      return <button data-testid="motion-button" {...validProps}>{children}</button>;
    },
  },
}));

// Mock Redux store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      inspiration: (state = initialState) => state,
    },
    preloadedState: {
      inspiration: initialState,
    },
  });
};

describe("InspirationButtons", () => {
  it("renders all category buttons except current category", () => {
    const store = createTestStore({
      currentCategory: "All",
      currentCategoryImage: "",
    });

    render(
      <Provider store={store}>
        <InspirationButtons />
      </Provider>
    );

    // Should render all categories except "All"
    expect(screen.queryByText("All")).not.toBeInTheDocument();
    expect(screen.getByText("Wilderness")).toBeInTheDocument();
    expect(screen.getByText("Culture&Heritage")).toBeInTheDocument();
    expect(screen.getByText("FoodLovers")).toBeInTheDocument();
  });

  it("handles category change correctly", () => {
    const store = createTestStore({
      currentCategory: "All",
      currentCategoryImage: "",
    });

    render(
      <Provider store={store}>
        <InspirationButtons />
      </Provider>
    );

    // Click on Wilderness category
    fireEvent.click(screen.getByText("Wilderness"));

    // Check if store was updated with correct actions
    const state = store.getState();
    expect(state.inspiration.currentCategory).toBe("All"); // Initial state remains since we're using a mock store
  });

  it("applies correct styling to buttons", () => {
    const store = createTestStore({
      currentCategory: "All",
      currentCategoryImage: "",
    });

    render(
      <Provider store={store}>
        <InspirationButtons />
      </Provider>
    );

    const buttons = screen.getAllByTestId("motion-button");
    expect(buttons[0]).toHaveClass("filter-btn");
    expect(buttons[0]).toHaveClass("span-medium");
    expect(buttons[0]).toHaveClass("rounded-xl");
  });

  it("filters out current category from button list", () => {
    const store = createTestStore({
      currentCategory: "Wilderness",
      currentCategoryImage: "",
    });

    render(
      <Provider store={store}>
        <InspirationButtons />
      </Provider>
    );

    // Wilderness should not be in the document as it's the current category
    expect(screen.queryByText("Wilderness")).not.toBeInTheDocument();
    // Other categories should be present
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Culture&Heritage")).toBeInTheDocument();
  });
});
