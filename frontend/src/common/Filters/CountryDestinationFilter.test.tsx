import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CountryDestinationFilter } from "src/common/Filters/CountryDestinationFilter";
import filterReducer from "src/store/slices/filterSlice";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, whileHover, whileTap, animate, variants, ...props }: any, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )),
    i: React.forwardRef(({ children, whileHover, whileTap, animate, variants, ...props }: any, ref) => (
      <i ref={ref} data-testid="ri-search-line" {...props}>
        {children}
      </i>
    )),
    button: React.forwardRef(({ children, whileHover, whileTap, animate, variants, ...props }: any, ref) => (
      <button ref={ref} {...props}>
        {children}
      </button>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const renderWithRedux = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      filter: filterReducer,
    },
  });

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe("CountryDestinationFilter", () => {
  it("renders search input", () => {
    renderWithRedux(<CountryDestinationFilter />);
    expect(screen.getByPlaceholderText("Search destinations...")).toBeInTheDocument();
  });

  it("renders all predefined tags", () => {
    renderWithRedux(<CountryDestinationFilter />);
    const predefinedTags = [
      "Wilderness",
      "Culture&Heritage",
      "FoodLovers",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
    ];

    predefinedTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("handles search input changes", () => {
    renderWithRedux(<CountryDestinationFilter />);
    const searchInput = screen.getByPlaceholderText("Search destinations...");
    
    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(searchInput).toHaveValue("test search");
  });

  it("toggles tag selection on click", () => {
    renderWithRedux(<CountryDestinationFilter />);
    const wildernessTag = screen.getByText("Wilderness");
    
    // Initial state - unselected
    expect(wildernessTag).toHaveClass("bg-background-light");
    
    // Click to select
    fireEvent.click(wildernessTag);
    expect(wildernessTag).toHaveClass("bg-background-dark");
    
    // Click again to unselect
    fireEvent.click(wildernessTag);
    expect(wildernessTag).toHaveClass("bg-background-light");
  });

  it("shows search icon on input focus", () => {
    renderWithRedux(<CountryDestinationFilter />);
    const searchInput = screen.getByPlaceholderText("Search destinations...");
    
    fireEvent.focus(searchInput);
    expect(screen.getByTestId("ri-search-line")).toBeInTheDocument();
  });

  it("applies correct styling to filter board container", () => {
    renderWithRedux(<CountryDestinationFilter />);
    const filterBoard = screen.getByText("Search").closest(".filter-board");
    
    expect(filterBoard).toHaveClass("bg-background-light");
    expect(filterBoard).toHaveClass("shadow-component");
    expect(filterBoard).toHaveClass("rounded-xl");
  });

  it("displays section headers", () => {
    renderWithRedux(<CountryDestinationFilter />);
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Tag filter")).toBeInTheDocument();
  });
});
