import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Layout from './Layout';

// Mock all required components and hooks
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn(),
}));

vi.mock('src/components/Header/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock('src/components/Footer/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock('src/common/AnimatedLogoScreen', () => ({
  default: () => <div data-testid="mock-logo-screen">Logo Screen</div>,
}));

vi.mock('src/common/Cursors', () => ({
  default: () => <div data-testid="mock-cursor">Cursor</div>,
}));

vi.mock('src/components/Lenis/Lenis', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-lenis">{children}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Layout Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (useLocation as Mock).mockReturnValue({ pathname: '/' });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders header and footer', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('shows loading screen on home page', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    
    expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument();
    
    vi.advanceTimersByTime(2000);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('shows loading screen initially on home page', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    
    expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument();
    
    vi.advanceTimersByTime(2000);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});

