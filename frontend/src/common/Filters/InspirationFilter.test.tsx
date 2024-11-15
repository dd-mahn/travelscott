import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { InspirationFilter } from "src/common/Filters/InspirationFilter";
import filterReducer from "src/store/slices/filterSlice";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, whileHover, whileTap, whileInView, animate, variants, ...props }: any, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )),
    i: React.forwardRef(({ children, whileHover, whileTap, whileInView, animate, variants, ...props }: any, ref) => (
      <i ref={ref} data-testid="ri-search-line" {...props}>
        {children}
      </i>
    )),
    button: React.forwardRef(({ children, whileHover, whileTap, whileInView, animate, variants, ...props }: any, ref) => (
      <button ref={ref} {...props}>
        {children}
      </button>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockStore = configureStore({
  reducer: {
    filter: filterReducer,
  },
  preloadedState: {
    filter: {
      destination: {
        continents: [],
        countries: [],
        tags: [],
        searchQuery: "",
      },
      blog: {
        tags: [],
        searchQuery: "",
      },
    },
  },
});

const renderWithRedux = (component: React.ReactNode) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

const mockContinents = ["Asia", "Europe", "Africa"];

describe("InspirationFilter", () => {
  it("renders search input", () => {
    renderWithRedux(<InspirationFilter continentNames={mockContinents} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders all continent buttons", () => {
    renderWithRedux(<InspirationFilter continentNames={mockContinents} />);
    mockContinents.forEach(continent => {
      expect(screen.getByText(continent)).toBeInTheDocument();
    });
  });

  it("handles search input changes", () => {
    renderWithRedux(<InspirationFilter continentNames={mockContinents} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    
    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(searchInput).toHaveValue("test search");
  });

  it("toggles continent selection on click", () => {
    renderWithRedux(<InspirationFilter continentNames={mockContinents} />);
    const asiaButton = screen.getByText("Asia");
    
    // Initial state - unselected
    expect(asiaButton).toHaveClass("bg-transparent");
    
    // Click to select
    fireEvent.click(asiaButton);
    expect(asiaButton).toHaveClass("bg-background-dark");
    
    // Click again to unselect
    fireEvent.click(asiaButton);
    expect(asiaButton).toHaveClass("bg-transparent");
  });

  it("shows search icon when input is focused", () => {
    renderWithRedux(<InspirationFilter continentNames={mockContinents} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    
    fireEvent.focus(searchInput);
    expect(screen.getByTestId("ri-search-line")).toBeInTheDocument();
  });

  it("applies correct styling to filter container", () => {
    renderWithRedux(<InspirationFilter continentNames={mockContinents} />);
    const filterContainer = screen.getByRole("button", { name: mockContinents[0] }).closest(".continent-filter");
    
    expect(filterContainer).toHaveClass("shadow-component");
    expect(filterContainer).toHaveClass("rounded-xl");
  });
});
