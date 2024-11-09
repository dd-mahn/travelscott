import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { DestinationFilter } from "./DestinationFilter";
import filterReducer from "src/store/slices/filterSlice";
import countryReducer from "src/store/slices/countrySlice";
import continentReducer from "src/store/slices/continentSlice";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    i: ({ children, ...props }: any) => <i {...props}>{children}</i>,
  },
}));

const mockStore = configureStore<{
  filter: ReturnType<typeof filterReducer>;
  country: ReturnType<typeof countryReducer>;
  continent: ReturnType<typeof continentReducer>;
}>({
  reducer: {
    filter: filterReducer,
    country: countryReducer,
    continent: continentReducer,
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
    country: {
      currentCountry: null,
      countryDestinations: [],
      countryBlogs: [],
      loading: false,
      error: null,
      countries: [
        { 
          _id: "1",
          name: "Japan",
          images: {
            flagImages: [],
            mapImages: [], 
            otherImages: [],
          },
          description: [],
          capital: "",
          language: "",
          currency: "",
          continent: "",
          visaRequirement: "",
          dialInCode: "",
          timeZone: "",
            additionalInfo: {
                whenToVisit: "",
                transportation: "",
                healthAndSafety: ""
            },
          totalDestinations: 0
        },
        {
          _id: "2", 
          name: "Korea",
          images: {
            flagImages: [],
            mapImages: [],
            otherImages: []
          },
          description: [],
          capital: "",
          language: "",
          currency: "",
          continent: "",
          visaRequirement: "",
          dialInCode: "",
          timeZone: "",
          additionalInfo: {
            whenToVisit: "",
            transportation: "",
            healthAndSafety: ""
          },
          totalDestinations: 0
        },
      ],
    },
    continent: {
      continents: [
        { 
          name: "Asia",
          countries: [],
          count: 0,
          image: ""
        },
        {
          name: "Europe",
          countries: [],
          count: 0,
          image: ""
        },
      ],
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

describe("DestinationFilter", () => {
  it("renders search input", () => {
    renderWithRedux(<DestinationFilter />);
    expect(screen.getByPlaceholderText("Search destinations...")).toBeInTheDocument();
  });

  it("renders location filter section with continents and countries", () => {
    renderWithRedux(<DestinationFilter />);
    expect(screen.getByText("Location filter")).toBeInTheDocument();
    expect(screen.getByText("Asia")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("renders tag filter section with predefined tags", () => {
    renderWithRedux(<DestinationFilter />);
    expect(screen.getByText("Tag filter")).toBeInTheDocument();
    expect(screen.getByText("Wilderness")).toBeInTheDocument();
    expect(screen.getByText("Culture&Heritage")).toBeInTheDocument();
  });

  it("handles search input changes", () => {
    renderWithRedux(<DestinationFilter />);
    const searchInput = screen.getByPlaceholderText("Search destinations...");
    
    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(searchInput).toHaveValue("test search");
  });

  it("toggles continent selection on click", () => {
    renderWithRedux(<DestinationFilter />);
    const asiaButton = screen.getByText("Asia");
    
    // Initial state
    expect(asiaButton).toHaveClass("bg-background-light");
    
    // Click to select
    fireEvent.click(asiaButton);
    expect(asiaButton).toHaveClass("bg-background-dark");
  });

  it("toggles country selection on click", () => {
    renderWithRedux(<DestinationFilter />);
    const japanButton = screen.getByText("Japan");
    
    // Initial state
    expect(japanButton).toHaveClass("bg-background-light");
    
    // Click to select
    fireEvent.click(japanButton);
    expect(japanButton).toHaveClass("bg-background-dark");
  });

  it("toggles tag selection on click", () => {
    renderWithRedux(<DestinationFilter />);
    const wildernessTag = screen.getByText("Wilderness");
    
    // Initial state
    expect(wildernessTag).toHaveClass("bg-background-light");
    
    // Click to select
    fireEvent.click(wildernessTag);
    expect(wildernessTag).toHaveClass("bg-background-dark");
  });

  it("shows search icon on input focus", () => {
    renderWithRedux(<DestinationFilter />);
    const searchInput = screen.getByPlaceholderText("Search destinations...");
    
    fireEvent.focus(searchInput);
    expect(screen.getByTestId("ri-search-line")).toBeInTheDocument();
  });

  it("applies correct styling to filter board container", () => {
    renderWithRedux(<DestinationFilter />);
    const filterBoard = screen.getByText("Search").closest(".filter-board");
    
    expect(filterBoard).toHaveClass("bg-background-light");
    expect(filterBoard).toHaveClass("shadow-section");
    expect(filterBoard).toHaveClass("rounded-2xl");
  });
});
