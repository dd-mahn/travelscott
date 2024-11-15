// Import vi first to avoid hoisting issues
import { vi } from 'vitest';
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CountryDestinations from 'src/pages/Country/Components/Destinations/CountryDestinations';
import destinationReducer from 'src/store/slices/destinationSlice';
import filterReducer from 'src/store/slices/filterSlice';
import useFetch from 'src/hooks/useFetch/useFetch';

// Mock the useFetch hook
vi.mock('src/hooks/useFetch/useFetch');

// Helper function to filter Framer Motion props
const filterMotionProps = (props: any) => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => 
      !key.startsWith('while') && 
      !key.startsWith('drag') && 
      !key.startsWith('animate') && 
      !key.startsWith('initial') && 
      !key.startsWith('variants') && 
      !key.startsWith('transition') && 
      !key.startsWith('viewport')
    )
  );
};

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <section ref={ref} {...filterMotionProps(props)}>{children}</section>
    )),
    h1: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <h1 ref={ref} {...filterMotionProps(props)}>{children}</h1>
    )),
    p: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <p ref={ref} {...filterMotionProps(props)}>{children}</p>
    )),
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterMotionProps(props)}>{children}</div>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock components
vi.mock('src/common/Filters/CountryDestinationFilter', () => ({
  CountryDestinationFilter: () => <div data-testid="destination-filter">Filter Component</div>
}));

vi.mock('src/common/Filters/FilterButton', () => ({
  default: ({ children }: any) => <div data-testid="filter-button">{children}</div>
}));

vi.mock('src/common/Catalogs/DestinationCatalog', () => ({
  default: ({ destinations }: any) => (
    <div data-testid="destination-catalog">
      {destinations.length} destinations
    </div>
  )
}));

// Mock viewport hook
vi.mock('src/hooks/useViewportWidth/useViewportWidth', () => ({
  useViewportWidth: () => 1024
}));

describe('CountryDestinations', () => {
  const mockCountry = {
    _id: "test-id",
    name: "TestCountry",
    images: {
      flagImages: [],
      mapImages: [],
      otherImages: []
    },
    description: [],
    capital: "",
    continent: "",
    currency: "",
    language: "",
    visaRequirement: "",
    dialInCode: "",
    timeZone: "",
    additionalInfo: {
      whenToVisit: "",
      transportation: "",
      healthAndSafety: ""
    },
    totalDestinations: 0
  };

  const mockDestinations = {
    result: [
      { _id: '1', name: 'Destination 1' },
      { _id: '2', name: 'Destination 2' }
    ],
    count: 2
  };

  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    store = configureStore({
      reducer: {
        destination: destinationReducer as any,
        filter: filterReducer as any
      },
      preloadedState: {
        destination: {
          destinations: [],
          totalDestinations: 0,
          loading: false,
          error: null
        },
        filter: {
          destination: {
            tags: [],
            searchQuery: ''
          }
        }
      }
    });
  });

  it('renders destinations section with correct title', () => {
    (useFetch as any).mockReturnValue({
      data: mockDestinations,
      loading: false,
      error: null
    });

    render(
      <Provider store={store}>
        <CountryDestinations country={mockCountry} />
      </Provider>
    );

    expect(screen.getByText(`${mockCountry.name}'s destinations`)).toBeInTheDocument();
    expect(screen.getByTestId('destination-catalog')).toBeInTheDocument();
    expect(screen.getByTestId('filter-button')).toBeInTheDocument();
  });

  it('handles loading state correctly', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    render(
      <Provider store={store}>
        <CountryDestinations country={mockCountry} />
      </Provider>
    );

    expect(screen.getByTestId('destination-catalog')).toHaveTextContent('0 destinations');
  });

  it('handles error state correctly', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching destinations'
    });

    render(
      <Provider store={store}>
        <CountryDestinations country={mockCountry} />
      </Provider>
    );

    expect(screen.getByTestId('destination-catalog')).toHaveTextContent('0 destinations');
  });
});
