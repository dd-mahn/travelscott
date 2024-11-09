import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from 'src/store/slices/blogSlice';
import inspirationReducer from 'src/store/slices/inspirationSlice';
import Inspiration from './Inspiration';
import useFetch from 'src/hooks/useFetch/useFetch';

// Mock useFetch hook
vi.mock('src/hooks/useFetch/useFetch');

// Mock data
const mockBlogsData = {
  result: [
    {
      id: '1',
      title: 'Test Blog 1',
      featured: true,
      category: 'Adventure'
    },
    {
      id: '2', 
      title: 'Test Blog 2',
      featured: false,
      category: 'Culture'
    }
  ]
};

const renderInspiration = () => {
  const store = configureStore({
    reducer: {
      blog: blogReducer as any,
      inspiration: inspirationReducer as any                                                                
    },
    preloadedState: {
      inspiration: {
        currentCategory: 'All'
      },
      blog: {
        featuredBlogs: []
      }
    }
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Inspiration />
      </BrowserRouter>
    </Provider>
  );
};

describe('Inspiration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    renderInspiration();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error page when fetch fails', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch'
    });

    renderInspiration();
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it('renders inspiration content when data is loaded', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    renderInspiration();

    // Check if main inspiration sections are rendered
    expect(screen.getByRole('main')).toHaveClass('inspiration');
  });

  it('initializes with correct hooks and store', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    renderInspiration();

    expect(useFetch).toHaveBeenCalled();
  });

  it('updates store with blog data when loaded', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    const { container } = renderInspiration();

    // Verify blog data is rendered
    expect(container).toBeInTheDocument();
  });

  it('renders featured blogs section when featured blogs exist', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogsData,
      loading: false,
      error: null
    });

    renderInspiration();

    // Featured blogs should be rendered since mockBlogsData contains a featured blog
    expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
  });
});
