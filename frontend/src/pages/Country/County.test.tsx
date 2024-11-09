import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Country from './Country';
import countryReducer from 'src/store/slices/countrySlice';
import themeReducer from 'src/store/slices/themeSlice';
import useFetch from 'src/hooks/useFetch/useFetch';
import useStackedSections from 'src/hooks/useStackedSections/useStackedSections';

// Mock the hooks
vi.mock('src/hooks/useFetch/useFetch');
vi.mock('src/hooks/useStackedSections/useStackedSections');

// Mock country data
const mockCountryData = {
  id: '1',
  name: 'Test Country',
  description: 'Test description',
  images: {
    heroImages: ['hero.jpg'],
    mapImages: ['map-light.jpg', 'map-dark.jpg'],
    overviewImages: ['overview.jpg']
  },
  overview: {
    title: 'Overview Title',
    description: 'Overview description'
  },
  guide: {
    sections: []
  },
  articles: [],
  destinations: []
};

// Create mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      country: countryReducer,
      theme: themeReducer
    }
  });
};

const renderCountry = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

describe('Country', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock implementation of useStackedSections
    (useStackedSections as any).mockReturnValue({
      refs: { current: [] },
      setRef: vi.fn((index) => (el: any) => {})
    });
  });

  it('renders loading state initially', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    renderCountry();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders 404 page when country not found', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Not found'
    });

    renderCountry();
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it('renders country content when data is loaded', () => {
    (useFetch as any).mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null
    });

    renderCountry();

    // Check if main country sections are rendered
    expect(screen.getByRole('main')).toHaveClass('country');
    expect(screen.getByAltText(`${mockCountryData.name} map`)).toBeInTheDocument();
    expect(screen.getByText('More countries')).toBeInTheDocument();
  });

  it('initializes with correct hooks and store', () => {
    (useFetch as any).mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null
    });

    renderCountry();

    expect(useFetch).toHaveBeenCalled();
    expect(useStackedSections).toHaveBeenCalled();
  });

  it('renders all major country components', () => {
    (useFetch as any).mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null
    });

    renderCountry();

    // Verify all major sections are present
    const mainElement = screen.getByRole('main');
    expect(mainElement).toContainElement(screen.getByAltText(`${mockCountryData.name} map`));
    expect(screen.getByText('More countries')).toBeInTheDocument();
  });
});
