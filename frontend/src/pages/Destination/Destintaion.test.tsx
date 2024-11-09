import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from 'src/store/slices/destinationSlice';
import DestinationPage from './Destination';
import useFetch from 'src/hooks/useFetch/useFetch';
import useStackedSections from 'src/hooks/useStackedSections/useStackedSections';

// Mock the hooks
vi.mock('src/hooks/useFetch/useFetch');
vi.mock('src/hooks/useStackedSections/useStackedSections');

// Mock destination data
const mockDestinationData = {
  id: '1',
  name: 'Test Destination',
  country: 'Test Country',
  description: 'Test Description',
  video: 'test-video-code',
  additionalInfo: {
    whenToVisit: 'Test when to visit',
    whoToGoWith: 'Test who to go with',
    whatToExpect: 'Test what to expect',
    healthAndSafety: 'Test health and safety'
  },
  transportation: {
    title: 'Test Transportation',
    options: []
  },
  places: [],
  summary: 'Test Summary'
};

// Create a mock store
const createMockStore = () => configureStore({
  reducer: {
    destination: destinationReducer
  }
});

const renderDestination = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/destination/1']}>
        <Routes>
          <Route path="/destination/:id" element={<DestinationPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('DestinationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    renderDestination();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders 404 page when destination not found', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Not found'
    });

    renderDestination();
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it('renders destination content when data is loaded', () => {
    (useFetch as any).mockReturnValue({
      data: mockDestinationData,
      loading: false,
      error: null
    });

    renderDestination();

    // Check if main destination sections are rendered
    expect(screen.getByRole('main')).toHaveClass('destination');
    expect(screen.getByText('When to visit?')).toBeInTheDocument();
    expect(screen.getByText('Who to go with?')).toBeInTheDocument();
    expect(screen.getByText('What to expect?')).toBeInTheDocument();
    expect(screen.getByText('Health and safety')).toBeInTheDocument();
    expect(screen.getByText('More destinations')).toBeInTheDocument();
  });

  it('initializes with correct hooks and store', () => {
    (useFetch as any).mockReturnValue({
      data: mockDestinationData,
      loading: false,
      error: null
    });

    renderDestination();

    expect(useFetch).toHaveBeenCalled();
    expect(useStackedSections).toHaveBeenCalled();
  });

  it('renders additional info section correctly', () => {
    (useFetch as any).mockReturnValue({
      data: mockDestinationData,
      loading: false,
      error: null
    });

    renderDestination();

    expect(screen.getByText(mockDestinationData.additionalInfo.whenToVisit)).toBeInTheDocument();
    expect(screen.getByText(mockDestinationData.additionalInfo.whoToGoWith)).toBeInTheDocument();
    expect(screen.getByText(mockDestinationData.additionalInfo.whatToExpect)).toBeInTheDocument();
    expect(screen.getByText(mockDestinationData.additionalInfo.healthAndSafety)).toBeInTheDocument();
  });
});
