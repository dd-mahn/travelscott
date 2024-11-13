import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach, Mock } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';

// Mock all required components and hooks
vi.mock('react-router-dom', async () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Outlet: () => <div data-testid="mock-outlet">Outlet</div>
}));

vi.mock('src/components/Header/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock('src/components/Footer/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock('src/common/AnimatedLogoScreen/AnimatedLogoScreen', () => ({
  default: () => <div data-testid="mock-logo-screen">Logo Screen</div>,
}));

vi.mock('src/common/Cursors/Cursors', () => ({
  default: () => <div data-testid="mock-cursor">Cursor</div>,
}));

vi.mock('src/components/Lenis/Lenis', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-lenis">{children}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children, mode }: any) => <div data-testid="animate-presence" data-mode={mode}>{children}</div>,
}));

describe('Layout Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (useLocation as Mock).mockReturnValue({ pathname: '/' });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders loading screen initially on home page', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    
    expect(screen.getByTestId('mock-logo-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-footer')).not.toBeInTheDocument();
  });

  it('transitions to main layout after timeout on home page', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(screen.queryByTestId('mock-logo-screen')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cursor')).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('renders main layout immediately on non-home pages', () => {
    (useLocation as Mock).mockReturnValue({ pathname: '/about' });
    render(<Layout />, { wrapper: BrowserRouter });
    
    expect(screen.queryByTestId('mock-logo-screen')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-lenis')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cursor')).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('uses AnimatePresence with wait mode', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('animate-presence')).toHaveAttribute('data-mode', 'wait');
  });
});
