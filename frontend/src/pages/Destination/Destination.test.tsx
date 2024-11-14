import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from 'src/store/slices/destinationSlice';
import DestinationPage from './Destination';
import useFetch from 'src/hooks/useFetch/useFetch';
import useStackedSections from 'src/hooks/useStackedSections/useStackedSections';
import { ThemeProvider } from '@material-tailwind/react';

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
  tags: ['tag1', 'tag2'],
  additionalInfo: {
    whenToVisit: 'Test when to visit',
    whoToGoWith: 'Test who to go with',
    whatToExpect: 'Test what to expect',
    healthAndSafety: 'Test health and safety'
  },
  transportation: {
    title: 'Test Transportation',
    options: [
      {
        type: 'Bus',
        description: 'Test bus description'
      },
      {
        type: 'Train', 
        description: 'Test train description'
      }
    ]
  },
  places: [
    {
      name: 'Test Place 1',
      description: 'Test place 1 description',
      images: ['image1.jpg']
    },
    {
      name: 'Test Place 2', 
      description: 'Test place 2 description',
      images: ['image2.jpg']
    }
  ],
  summary: 'Test Summary',
  images: ['main1.jpg', 'main2.jpg'],
  rating: 4.5,
  reviews: 120,
  relatedDestinations: [
    {
      id: '2',
      name: 'Related Destination 1'
    }
  ]
};

// Create a mock store
const createMockStore = () => configureStore({
  reducer: {
    destination: destinationReducer
  }
});

const renderDestination = () => {
  const store = createMockStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/destination/1']}>
            <Routes>
              <Route path="/destination/:id" element={<DestinationPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )
  };
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

  describe('Hero Section', () => {
    beforeEach(() => {
      (useFetch as any).mockReturnValue({
        data: mockDestinationData,
        loading: false,
        error: null
      });
    });

    it('displays destination name and rating', () => {
      renderDestination();
      expect(screen.getByText(mockDestinationData.name)).toBeInTheDocument();
      expect(screen.getByText(mockDestinationData.rating.toString())).toBeInTheDocument();
      expect(screen.getByText(`${mockDestinationData.reviews} reviews`)).toBeInTheDocument();
    });

    it('renders hero images correctly', () => {
      renderDestination();
      const images = screen.getAllByTestId('optimized-image');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe('Transportation Section', () => {
    beforeEach(() => {
      (useFetch as any).mockReturnValue({
        data: mockDestinationData,
        loading: false,
        error: null
      });
    });

    it('displays all transportation options', () => {
      renderDestination();
      mockDestinationData.transportation.options.forEach(option => {
        expect(screen.getByText(option.type)).toBeInTheDocument();
        expect(screen.getByText(option.description)).toBeInTheDocument();
      });
    });
  });

  describe('Places Section', () => {
    beforeEach(() => {
      (useFetch as any).mockReturnValue({
        data: mockDestinationData,
        loading: false,
        error: null
      });
    });

    it('renders all destination places', () => {
      renderDestination();
      mockDestinationData.places.forEach(place => {
        expect(screen.getByText(place.name)).toBeInTheDocument();
        expect(screen.getByText(place.description)).toBeInTheDocument();
      });
    });
  });

  describe('Redux Integration', () => {
    it('updates store with destination data', async () => {
      (useFetch as any).mockReturnValue({
        data: mockDestinationData,
        loading: false,
        error: null
      });

      const { store } = renderDestination();

      await waitFor(() => {
        const state = store.getState().destination;
        expect(state.currentDestination).toEqual(mockDestinationData);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
      });
    });

    it('handles error state in store', async () => {
      const error = 'Failed to fetch destination';
      (useFetch as any).mockReturnValue({
        data: null,
        loading: false,
        error
      });

      const { store } = renderDestination();

      await waitFor(() => {
        const state = store.getState().destination;
        expect(state.error).toBe(error);
      });
    });
  });

  describe('Related Destinations Section', () => {
    beforeEach(() => {
      (useFetch as any).mockReturnValue({
        data: mockDestinationData,
        loading: false,
        error: null
      });
    });

    it('renders related destinations correctly', () => {
      renderDestination();
      expect(screen.getByText('More destinations')).toBeInTheDocument();
      mockDestinationData.relatedDestinations.forEach(destination => {
        expect(screen.getByText(destination.name)).toBeInTheDocument();
      });
    });
  });
});

// Mocks
vi.mock("@material-tailwind/react", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Carousel: ({ children, ...props }: any) => (
    <div data-testid="mock-carousel" {...props}>{children}</div>
  ),
  Card: ({ children, ...props }: any) => (
    <div data-testid="mock-card" {...props}>{children}</div>
  )
}));

vi.mock("src/pages/Destination/Components/Overview/DestinationOverview", () => ({
  default: ({ destination }: any) => (
    <section data-testid="destination-overview">
      <h1>{destination.name}</h1>
      <p>{destination.description}</p>
      <div>Tags: {destination.tags?.join(', ')}</div>
    </section>
  )
}));

vi.mock('react-player', () => ({
  default: ({ url }: any) => (
    <div data-testid="mock-video-player">
      Playing video: {url}
    </div>
  )
}));

vi.mock("src/pages/Destination/Components/Video/DestinationVideo", () => ({
  default: ({ videoCode }: any) => (
    <div data-testid="mock-video">
      Video code: {videoCode}
    </div>
  )
}));

vi.mock("src/components/Carousel/Carousel", () => ({
  default: ({ children, autoPlay, autoplayDelay, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}));
