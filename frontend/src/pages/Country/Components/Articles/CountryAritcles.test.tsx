// Import vi first to avoid hoisting issues
import { vi } from 'vitest';
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CountryArticles from 'src/pages/Country/Components/Articles/CountryArticles';
import countryReducer from 'src/store/slices/countrySlice';
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

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    h1: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <h1 ref={ref} {...filterMotionProps(props)}>{children}</h1>
    )),
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterMotionProps(props)}>{children}</div>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock FeaturedBlogs component
vi.mock('src/common/FeaturedBlogsSlider/FeaturedBlogs', () => ({
  default: ({ blogs }: any) => <div data-testid="featured-blogs">{blogs.length} blogs</div>,
}));

// Mock LoadingState component
vi.mock('src/common/Catalogs/CatalogStates', () => ({
  LoadingState: ({ keyName }: { keyName: string }) => (
    <div data-testid="loading-state">Loading: {keyName}</div>
  ),
  ErrorState: ({ keyName }: any) => <div data-testid="error-state">{keyName}</div>,
  NotFoundState: ({ keyName }: any) => <div data-testid="not-found-state">{keyName}</div>,
}));

describe('CountryArticles', () => {
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

  const mockBlogs = {
    result: [
      { id: 1, title: 'Blog 1' },
      { id: 2, title: 'Blog 2' },
    ],
  };

  let store: any;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    store = configureStore({
      reducer: {
        country: countryReducer as any,
      },
      preloadedState: {
        country: {
          countryBlogs: [], // Initialize with empty array
        },
      },
    });
  });

  it('renders articles when blogs are fetched successfully', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogs,
      loading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <CountryArticles country={mockCountry} />
      </Provider>
    );

    expect(screen.getByText('Latest articles in TestCountry')).toBeInTheDocument();
    expect(screen.getByTestId('featured-blogs')).toBeInTheDocument();
  });

  it('returns null when there is an error', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching blogs',
    });

    const { container } = render(
      <Provider store={store}>
        <CountryArticles country={mockCountry} />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('returns null when there are no blogs', () => {
    (useFetch as any).mockReturnValue({
      data: { result: [] },
      loading: false,
      error: null,
    });

    const { container } = render(
      <Provider store={store}>
        <CountryArticles country={mockCountry} />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});
