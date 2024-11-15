import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import DiscoverDestinations from "src/pages/Discover/Components/Destinations/DiscoverDestinations";

const mockDestinations = [
  {
    _id: "1",
    name: "Tokyo",
    location: "Japan",
    country: "Japan",
    continent: "Asia",
    description: "Capital of Japan",
    images: ["tokyo.jpg"],
    video: "",
    additionalInfo: {
      whenToVisit: "",
      whoToGoWith: "",
      whatToExpect: "",
      healthAndSafety: ""
    },
    places: {},
    transportation: {},
    tags: [],
    insight: {},
    summary: "",
    featured: false
  },
  {
    _id: "2",
    name: "Paris",
    location: "France",
    country: "France",
    continent: "Europe",
    description: "City of Light",
    images: ["paris.jpg"],
    video: "",
    additionalInfo: {
      whenToVisit: "",
      whoToGoWith: "",
      whatToExpect: "",
      healthAndSafety: ""
    },
    places: {},
    transportation: {},
    tags: [],
    insight: {},
    summary: "",
    featured: false
  }
];

// Mock useFetch to return test data
vi.mock('src/hooks/useFetch/useFetch', () => ({
  default: () => ({
    data: {
      result: mockDestinations,
      count: 2
    },
    loading: false,
    error: null
  })
}));

// Mock DestinationCatalog
vi.mock('src/common/Catalogs/DestinationCatalog', () => ({
  __esModule: true,
  default: ({ destinations }: { destinations: any[] }) => (
    <div data-testid="destination-catalog">
      {destinations?.map((dest: any) => (
        <div key={dest._id} data-testid="destination-item">
          <h3>{dest.name}</h3>
          <p>{dest.description}</p>
        </div>
      ))}
    </div>
  )
}));

// Other mocks remain the same...

// Create a test store with initial state
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      filter: (state = {
        destination: {
          continents: [],
          countries: [],
          tags: [],
          searchQuery: ""
        }
      }) => state,
      destination: (state = {
        destinations: mockDestinations, // Initialize with mock data
        totalDestinations: 2,
        loading: false,
        error: null
      }) => state
    },
    preloadedState: initialState
  });
};

describe('DiscoverDestinations', () => {
  it('displays destination items from the API', async () => {
    const store = createTestStore({
      destination: {
        destinations: mockDestinations,
        totalDestinations: 2,
        loading: false,
        error: null
      }
    });

    render(
      <Provider store={store}>
        <DiscoverDestinations />
      </Provider>
    );

    await waitFor(() => {
      const destinationItems = screen.getAllByTestId('destination-item');
      expect(destinationItems).toHaveLength(2);
    });

    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Capital of Japan')).toBeInTheDocument();
    expect(screen.getByText('City of Light')).toBeInTheDocument();
  });
});
