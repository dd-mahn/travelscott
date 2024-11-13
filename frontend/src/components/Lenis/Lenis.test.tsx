import React, { act } from 'react';
import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import LenisProvider from './Lenis';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn()
}));

// Create a mock Lenis instance
const mockLenisInstance = {
  start: vi.fn(),
  stop: vi.fn(),
  scrollTo: vi.fn(),
  on: vi.fn(),
  off: vi.fn()
};

// Mock lenis/react
vi.mock('lenis/react', () => ({
  ReactLenis: ({ children, root, options, ...props }: any) => (
    <div 
      data-testid="lenis-wrapper" 
      data-root={root} 
      data-options={JSON.stringify(options)} 
      {...props}
    >
      {children}
    </div>
  ),
  useLenis: () => mockLenisInstance
}));

describe('LenisProvider Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (useLocation as Mock).mockReturnValue({ pathname: '/' });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <LenisProvider>
        <div>Test Child</div>
      </LenisProvider>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('stops and starts Lenis on pathname change', () => {
    render(
      <LenisProvider>
        <div>Test Content</div>
      </LenisProvider>
    );

    // Simulate pathname change
    act(() => {
      (useLocation as Mock).mockReturnValue({ pathname: '/new-path' });
    });

    // Wait for the timeout
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(mockLenisInstance.stop).toHaveBeenCalled();
    expect(mockLenisInstance.start).toHaveBeenCalled();
  });

  it('scrolls to top on pathname change', () => {
    render(
      <LenisProvider>
        <div>Test Content</div>
      </LenisProvider>
    );

    // Simulate pathname change
    (useLocation as Mock).mockReturnValue({ pathname: '/new-path' });

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('applies correct props to ReactLenis component', () => {
    const { getByTestId } = render(
      <LenisProvider>
        <div>Test Content</div>
      </LenisProvider>
    );

    const lenisWrapper = getByTestId('lenis-wrapper');
    expect(lenisWrapper).toHaveClass('h-full');
    expect(lenisWrapper).toHaveAttribute('data-root', 'true');
    expect(lenisWrapper).toHaveAttribute('data-options');
  });
});
