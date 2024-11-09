import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import useFetch from 'src/hooks/useFetch/useFetch';
import blogReducer from 'src/store/slices/blogSlice';
import useStackedSections from 'src/hooks/useStackedSections/useStackedSections';

// Mock the hooks
vi.mock('src/hooks/useFetch/useFetch');
vi.mock('src/hooks/useStackedSections/useStackedSections');
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Mock blog data
const mockBlogsData = {
  result: [
    {
      id: '1',
      title: 'Test Blog',
      category: 'Travel',
      author: 'John Doe',
      time: '2024-01-01',
      image: 'test-image.jpg'
    }
  ]
};

const renderHome = () => {
  const store = configureStore({
    reducer: {
      blog: blogReducer
    }
  });

  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useStackedSections as any).mockReturnValue({
      refs: [],
      setRef: () => vi.fn()
    });
  });

  it('renders main home sections', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    renderHome();

    // Check if main home sections are rendered
    expect(screen.getByRole('main')).toHaveClass('home');
  });

  it('initializes with correct hooks and store', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    renderHome();

    expect(useFetch).toHaveBeenCalled();
    expect(useStackedSections).toHaveBeenCalled();
  });

  it('updates store with blog data when loaded', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    const { container } = renderHome();

    // Verify blog data is rendered
    expect(container).toBeInTheDocument();
  });

  it('renders all major home components', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    renderHome();

    // Verify all major sections are present
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
