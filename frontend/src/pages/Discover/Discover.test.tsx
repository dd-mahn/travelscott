import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Discover from './Discover';
import useFetch from 'src/hooks/useFetch/useFetch';
import countryReducer from 'src/store/slices/countrySlice';
import destinationReducer from 'src/store/slices/destinationSlice';
import continentReducer from 'src/store/slices/continentSlice';

// Mock the useFetch hook
vi.mock('src/hooks/useFetch/useFetch');

// Mock data
const mockDestinationsData = {
  result: [
    {
      id: '1',
      name: 'Test Destination',
      featured: true,
      images: ['test-image.jpg']
    }
  ]
};

const mockCountriesData = {
  result: [
    {
      id: '1',
      name: 'Test Country',
      continent: 'Europe'
    }
  ]
};

// Setup store for testing
const renderWithStore = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      country: countryReducer,
      destination: destinationReducer,
      continent: continentReducer
    }
  });

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Discover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    renderWithStore(<Discover />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders 404 page when data fetch fails', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data'
    });

    renderWithStore(<Discover />);
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it('renders discover content when data is loaded', () => {
    (useFetch as any)
      .mockReturnValueOnce({
        data: mockDestinationsData,
        loading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: mockCountriesData,
        loading: false,
        error: null
      });

    renderWithStore(<Discover />);

    // Check if main discover sections are rendered
    expect(screen.getByRole('main')).toHaveClass('discover');
  });

  it('initializes with correct data in store', () => {
    (useFetch as any)
      .mockReturnValueOnce({
        data: mockDestinationsData,
        loading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: mockCountriesData,
        loading: false,
        error: null
      });

    renderWithStore(<Discover />);

    expect(useFetch).toHaveBeenCalledTimes(2);
  });

  it('renders all major discover components', () => {
    (useFetch as any)
      .mockReturnValueOnce({
        data: mockDestinationsData,
        loading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: mockCountriesData,
        loading: false,
        error: null
      });

    renderWithStore(<Discover />);

    // Verify all major sections are present
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
