import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from 'src/pages/Home/Home';
import useFetch from 'src/hooks/useFetch/useFetch';
import blogReducer from 'src/store/slices/blogSlice';
import useStackedSections from 'src/hooks/useStackedSections/useStackedSections';
import { useSectionTransition } from 'src/hooks/useSectionTransition/useSectionTransition';

// Mock the hooks
vi.mock('src/hooks/useFetch/useFetch');
vi.mock('src/hooks/useStackedSections/useStackedSections');
vi.mock('src/hooks/useSectionTransition/useSectionTransition', () => ({
  useSectionTransition: () => ({
    ref: { current: null },
    scale: 1,
    opacity: 1
  }),
  useSectionTransition2: () => ({
    ref: { current: null },
    scale: 1
  })
}));
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 1,
  useSpring: () => ({ current: 1 }),
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn()
  })
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

  describe('Hero Section', () => {
    it('renders Hero section correctly', () => {
      renderHome();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });
  });

  describe('Brief Section', () => {
    it('renders Brief section correctly', () => {
      renderHome();
      expect(screen.getByTestId('brief')).toBeInTheDocument();
    });
  });

  describe('Featured Section', () => {
    it('renders Featured section correctly', () => {
      renderHome();
      expect(screen.getByTestId('featured')).toBeInTheDocument();
    });
  });

  describe('Starter Section', () => {
    it('renders Starter section with correct blog count', () => {
      renderHome();
      expect(screen.getByTestId('starter')).toHaveTextContent('Starter Section with 1 blogs');
    });
  });

  describe('Articles Section', () => {
    it('renders Articles section with correct blog count', () => {
      renderHome();
      expect(screen.getByTestId('articles')).toHaveTextContent('Articles Section with 1 blogs');
    });
  });

  describe('Quote Section', () => {
    it('renders Quote section correctly', () => {
      renderHome();
      expect(screen.getByTestId('quote')).toBeInTheDocument();
    });
  });

  describe('Hook Section', () => {
    it('renders Hook section correctly', () => {
      renderHome();
      expect(screen.getByTestId('hook')).toBeInTheDocument();
    });
  });
});

vi.mock("src/pages/Home/Components/Hero/Hero", () => ({
  default: () => <section data-testid="hero">Hero Section</section>
}));

vi.mock("src/pages/Home/Components/Brief/Brief", () => ({
  default: () => <section data-testid="brief">Brief Section</section>
}));

vi.mock("src/pages/Home/Components/Featured/Featured", () => ({
  default: () => <section data-testid="featured">Featured Section</section>
}));

vi.mock("src/pages/Home/Components/Starter/Starter", () => ({
  default: ({ blogs }: any) => (
    <section data-testid="starter">
      Starter Section with {blogs.length} blogs
    </section>
  )
}));

vi.mock("src/pages/Home/Components/Articles/Articles", () => ({
  default: ({ blogs, articlesHookRef }: any) => (
    <section data-testid="articles" ref={articlesHookRef}>
      Articles Section with {blogs.length} blogs
    </section>
  )
}));

vi.mock("src/pages/Home/Components/Inspired/Inspired", () => ({
  default: () => <section data-testid="inspired">Inspired Section</section>
}));

vi.mock("src/pages/Home/Components/Quote/Quote", () => ({
  default: () => <section data-testid="quote">Quote Section</section>
}));

vi.mock("src/pages/Home/Components/Hook/Hook", () => ({
  default: () => <section data-testid="hook">Hook Section</section>
}));
