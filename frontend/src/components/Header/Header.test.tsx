import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from 'src/store/slices/themeSlice';
import Header from './Header';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
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
  });

  it('renders the logo', () => {
    render(<Header />, { wrapper: TestWrapper });
    expect(screen.getByText('TravelScott')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
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

  it('renders mobile menu button on mobile view', () => {
    // Mock window.innerWidth for mobile view
    window.innerWidth = 767;
    window.dispatchEvent(new Event('resize'));

    render(<Header />, { wrapper: TestWrapper });
    expect(screen.getByTitle('Menu')).toBeInTheDocument();
  });

  it('hides desktop navigation on mobile view', () => {
    // Mock window.innerWidth for mobile view
    window.innerWidth = 767;
    window.dispatchEvent(new Event('resize'));

    render(<Header />, { wrapper: TestWrapper });
    const desktopNav = document.querySelector('.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();
  });
});
