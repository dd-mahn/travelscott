import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import DiscoverCountries from "src/pages/Discover/Components/Countries/DiscoverCountries";

// Mock components and modules
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, ...validProps } = props;
      return <div {...validProps}>{children}</div>;
    },
    h1: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, ...validProps } = props;
      return <h1 {...validProps}>{children}</h1>;
    },
    h2: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, ...validProps } = props;
      return <h2 {...validProps}>{children}</h2>;
    },
    img: ({ children, ...props }: any) => {
      const { whileHover, variants, ...validProps } = props;
      return <img {...validProps}>{children}</img>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock("@material-tailwind/react", () => ({
  Select: ({ children, onChange }: any) => (
    <select data-testid="continent-select" title="Select continent" onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  ),
  Option: ({ children, value }: any) => <option value={value}>{children}</option>,
}));

vi.mock("src/common/Cards/CountryCard", () => ({
  default: ({ country }: any) => (
    <div data-testid="country-card">
      {country.name}
    </div>
  ),
}));

vi.mock("src/common/RelatedSections/RelatedSections", () => ({
  default: ({ type, data }: any) => (
    <div data-testid="related-sections">
      Related {type} for {data}
    </div>
  ),
}));

const mockContinents = [
  {
    name: "Asia",
    image: "asia.jpg",
    countries: [
      { _id: "1", name: "Japan", continent: "Asia" },
      { _id: "2", name: "China", continent: "Asia" }
    ],
    count: 2
  },
  {
    name: "Europe", 
    image: "europe.jpg",
    countries: [
      { _id: "3", name: "France", continent: "Europe" }
    ],
    count: 1
  }
];

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      continent: (state = { continents: mockContinents }) => state,
      country: (state = { loading: false, error: null }) => state
    },
    preloadedState: initialState
  });
};

describe("DiscoverCountries", () => {
  it("renders the component with initial continent selection", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <DiscoverCountries />
      </Provider>
    );

    expect(screen.getByText("Discover countries")).toBeInTheDocument();
    expect(screen.getByTestId("continent-select")).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Asia' })).toBeInTheDocument();
  });

  it("displays country cards for selected continent", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <DiscoverCountries />
      </Provider>
    );

    const countryCards = screen.getAllByTestId("country-card");
    expect(countryCards).toHaveLength(2); // Asia has 2 countries
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("China")).toBeInTheDocument();
  });

  it("changes continent selection and updates display", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <DiscoverCountries />
      </Provider>
    );

    const select = screen.getByTestId("continent-select");
    fireEvent.change(select, { target: { value: "Europe" } });

    const countryCards = screen.getAllByTestId("country-card");
    expect(countryCards).toHaveLength(1); // Europe has 1 country
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  it("shows loading state when loading is true", () => {
    const store = createTestStore({
      country: { loading: true, error: null }
    });
    
    render(
      <Provider store={store}>
        <DiscoverCountries />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state when there is an error", () => {
    const store = createTestStore({
      country: { loading: false, error: "Error loading countries" }
    });
    
    render(
      <Provider store={store}>
        <DiscoverCountries />
      </Provider>
    );

    expect(screen.getByText("Error... Please reload the page or try again later.")).toBeInTheDocument();
  });

  it("renders related sections", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <DiscoverCountries />
      </Provider>
    );

    expect(screen.getByText("Related articles")).toBeInTheDocument();
    expect(screen.getByTestId("related-sections")).toBeInTheDocument();
  });
});
