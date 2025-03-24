import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Discover from 'src/pages/Discover/Discover';
import useFetch from 'src/hooks/useFetch/useFetch';
import countryReducer from 'src/store/slices/countrySlice';
import destinationReducer from 'src/store/slices/destinationSlice';
import continentReducer from 'src/store/slices/continentSlice';
import config from 'src/config/config';

// Mock hooks and components
vi.mock('src/hooks/useFetch/useFetch');

vi.mock("@material-tailwind/react", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Carousel: ({ children, ...props }: any) => <div data-testid="mock-carousel" {...props}>{children}</div>,
  Card: ({ children, ...props }: any) => <div data-testid="mock-card" {...props}>{children}</div>,
  CardBody: ({ children, ...props }: any) => <div data-testid="mock-card-body" {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div data-testid="mock-card-header" {...props}>{children}</div>,
  Select: ({ children, ...props }: any) => <div data-testid="mock-select" {...props}>{children}</div>,
  Option: ({ children, ...props }: any) => <div data-testid="mock-option" {...props}>{children}</div>
}));

vi.mock("src/pages/Discover/Components/Destinations/DiscoverDestinations", () => ({
  default: () => <div data-testid="mock-destinations">Discover destinations</div>
}));

vi.mock("src/pages/Discover/Components/Countries/DiscoverCountries", () => ({
  default: () => <div data-testid="mock-countries">Discover countries</div>
}));

vi.mock("src/pages/Discover/Components/Poster/DiscoverPoster", () => ({
  default: ({ featuredDestinations }: any) => (
    <div data-testid="mock-poster">
      {featuredDestinations.map((dest: any) => (
        <div key={dest.id}>{dest.name}</div>
      ))}
    </div>
  )
}));

vi.mock("src/common/RelatedSections/RelatedSections", () => ({
  default: ({ type, data }: any) => (
    <div data-testid="mock-related-sections">Related {type} for {data}</div>
  )
}));

// Test data
const mockDestinations = {
  result: [{
    id: '1',
    name: 'Test Destination',
    featured: true,
    images: ['test-image.jpg'],
    country: 'Test Country',
    continent: 'Europe'
  }]
};

const mockCountries = {
  result: [{
    id: '1',
    name: 'Test Country',
    continent: 'Europe',
    _id: '1',
    image: 'test-image.jpg'
  }]
};

// Test utils
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      country: countryReducer as any,
      destination: destinationReducer as any,
      continent: continentReducer as any,
      filter: (state = { destination: { continents: [], countries: [], tags: [], searchQuery: '' } }) => state
    },
    preloadedState: {
      country: { countries: [] },
      destination: {
        allDestinations: [],
        featuredDestinations: [],
        destinations: [],
        totalDestinations: 0,
        loading: false,
        error: null
      },
      continent: { continents: [] },
      filter: {
        destination: {
          continents: [],
          countries: [],
          tags: [],
          searchQuery: ''
        }
      }
    }
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={createTestStore()}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('Discover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (useFetch as any).mockReturnValue({ data: null, loading: true, error: null });
    renderWithProviders(<Discover />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows error page on fetch failure', () => {
    (useFetch as any).mockReturnValue({ data: null, loading: false, error: 'Error' });
    renderWithProviders(<Discover />);
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it('renders content when data loads successfully', () => {
    (useFetch as any)
      .mockReturnValueOnce({ data: mockDestinations, loading: false, error: null })
      .mockReturnValueOnce({ data: mockCountries, loading: false, error: null });

    renderWithProviders(<Discover />);

    expect(screen.getByRole('main')).toHaveClass('discover');
    expect(screen.getByTestId('mock-poster')).toBeInTheDocument();
    expect(screen.getByTestId('mock-countries')).toBeInTheDocument();
    expect(screen.getByTestId('mock-destinations')).toBeInTheDocument();
  });

  it('makes correct API calls', () => {
    (useFetch as any)
      .mockReturnValueOnce({ data: mockDestinations, loading: false, error: null })
      .mockReturnValueOnce({ data: mockCountries, loading: false, error: null });

    renderWithProviders(<Discover />);

    expect(useFetch).toHaveBeenCalledWith(`/api/destinations?limit=1000`);
    expect(useFetch).toHaveBeenCalledWith(`/api/countries?limit=1000`);
  });
});
