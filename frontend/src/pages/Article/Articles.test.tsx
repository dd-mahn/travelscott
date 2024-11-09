import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Article from './Article';
import useFetch from 'src/hooks/useFetch/useFetch';

// Mock the useFetch hook
vi.mock('src/hooks/useFetch/useFetch');

// Mock blog data
const mockBlogData = {
  id: '1',
  title: 'Test Article',
  category: 'Technology',
  author: 'John Doe',
  time: '2024-01-01',
  image: 'test-image.jpg',
  content: [
    {
      sectionTitle: 'Test Section',
      sectionText: ['Test paragraph'],
      sectionImages: [{ url: 'test-section-image.jpg', description: 'Test image description' }]
    }
  ]
};

describe('Article', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders 404 page when article not found', () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Not found'
    });

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it('renders article content when data is loaded', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogData,
      loading: false,
      error: null
    });

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if main article elements are rendered
    expect(screen.getByText(mockBlogData.title)).toBeInTheDocument();
    expect(screen.getByText(mockBlogData.category)).toBeInTheDocument();
    expect(screen.getByText(mockBlogData.author)).toBeInTheDocument();
    expect(screen.getByText(mockBlogData.content[0].sectionTitle)).toBeInTheDocument();
    expect(screen.getByText(mockBlogData.content[0].sectionText[0])).toBeInTheDocument();
    expect(screen.getByAltText(mockBlogData.content[0].sectionTitle)).toBeInTheDocument();
  });

  it('renders related articles section', () => {
    (useFetch as any).mockReturnValue({
      data: mockBlogData,
      loading: false,
      error: null
    });

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('More articles')).toBeInTheDocument();
  });
});
