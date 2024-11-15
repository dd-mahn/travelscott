import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import InspirationHero from "src/pages/Inspiration/Components/Hero/InspirationHero";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, ...validProps } = props;
      return <div data-testid="motion-div" {...validProps}>{children}</div>;
    },
  },
}));

// Mock Redux store
const createTestStore = (initialState = { inspiration: {}, theme: { isDarkMode: false } }) => {
  return configureStore({
    reducer: {
      inspiration: (state = initialState.inspiration || {}) => state,
      theme: (state = initialState.theme || { isDarkMode: false }) => state,
    },
    preloadedState: initialState,
  });
};

describe("InspirationHero", () => {
  it("renders with 'All' category correctly", () => {
    const store = createTestStore({
      inspiration: {
        currentCategoryImage: "test-image.jpg",
      },
      theme: {
        isDarkMode: false,
      },
    });

    render(
      <Provider store={store}>
        <InspirationHero currentCategory="All" />
      </Provider>
    );

    const heroDiv = screen.getByTestId("hero-container");
    expect(heroDiv).toHaveClass("absolute top-0 z-0 h-screen w-full");
  });

  it("renders with specific category correctly", () => {
    const store = createTestStore({
      inspiration: {
        currentCategoryImage: "test-image.jpg",
      },
      theme: {
        isDarkMode: false,
      },
    });

    render(
      <Provider store={store}>
        <InspirationHero currentCategory="Nature" />
      </Provider>
    );

    const heroDiv = screen.getByTestId("hero-container");
    expect(heroDiv).toHaveStyle({
      backgroundImage: "url(test-image.jpg)",
    });
  });

  it("applies dark mode styles correctly", () => {
    const store = createTestStore({
      inspiration: {
        currentCategoryImage: "test-image.jpg",
      },
      theme: {
        isDarkMode: true,
      },
    });

    render(
      <Provider store={store}>
        <InspirationHero currentCategory="Nature" />
      </Provider>
    );

    const overlayDiv = screen.getByTestId("hero-overlay");
    expect(overlayDiv).toHaveStyle({
      background: "linear-gradient(180deg, rgba(30, 33, 37, 0.5) 50%, #1e2125 100%)",
    });
  });
});
