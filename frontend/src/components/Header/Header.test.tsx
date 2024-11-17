import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from 'src/store/slices/themeSlice';
import Header from 'src/components/Header/Header';

// Mock framer-motion
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal() as { motion: any };
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <div {...props}>{children}</div>,
      header: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <header {...props}>{children}</header>,
      h1: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <h1 {...props}>{children}</h1>,
      ul: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <ul {...props}>{children}</ul>,
      li: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <li {...props}>{children}</li>,
      button: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock HeaderSearch component
vi.mock('src/components/Header/Components/HeaderSearch', () => ({
  default: () => {
    return (
      <button title="Search">
        <i className="ri-search-2-line"></i>
      </button>
    );
  },
}));

// Create a mock store
const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

// Screen size breakpoints from tailwind config
const SCREEN_SIZES = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920
};

describe('Header Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Reset window width
    window.innerWidth = SCREEN_SIZES.xl;
    window.dispatchEvent(new Event('resize'));
  });

  it('renders the logo', () => {
    render(<Header />, { wrapper: TestWrapper });
    expect(screen.getByText('TravelScott')).toBeInTheDocument();
  });

  describe('Desktop Layout (>= 768px)', () => {
    beforeEach(() => {
      window.innerWidth = SCREEN_SIZES.md;
      window.dispatchEvent(new Event('resize'));
    });

    it('renders navigation menu', () => {
      render(<Header />, { wrapper: TestWrapper });
      const navItems = ['About', 'Discover', 'Inspiration', 'Contact'];
      navItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('renders search and theme buttons', () => {
      render(<Header />, { wrapper: TestWrapper });
      expect(screen.getByTitle('Search')).toBeInTheDocument();
      expect(screen.getByTitle('Toggle Contrast')).toBeInTheDocument();
    });

    it('does not render mobile menu button', () => {
      render(<Header />, { wrapper: TestWrapper });
      expect(screen.queryByTitle('Open Menu')).not.toBeInTheDocument();
    });
  });

  describe('Mobile Layout (< 768px)', () => {
    beforeEach(() => {
      window.innerWidth = SCREEN_SIZES.sm;
      window.dispatchEvent(new Event('resize'));
    });

    it('renders mobile menu button and search', () => {
      render(<Header />, { wrapper: TestWrapper });
      expect(screen.getByTitle('Open Menu')).toBeInTheDocument();
      expect(screen.getByTitle('Search')).toBeInTheDocument();
    });

    it('does not render desktop navigation', () => {
      render(<Header />, { wrapper: TestWrapper });
      const desktopNav = screen.queryByRole('list', { hidden: true });
      expect(desktopNav).not.toBeInTheDocument();
    });

    it('does not render desktop theme button', () => {
      render(<Header />, { wrapper: TestWrapper });
      expect(screen.queryByTitle('Toggle Contrast')).not.toBeInTheDocument();
    });
  });
});
