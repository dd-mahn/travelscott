import React from 'react';
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import LenisProvider from './Lenis';
import { useLenis } from 'lenis/react';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn()
}));

// Mock react-lenis
vi.mock('@studio-freight/react-lenis', () => ({
  ReactLenis: ({ children, ...props }: any) => <div data-testid="lenis-wrapper" {...props}>{children}</div>,
  useLenis: vi.fn()
}));

describe('LenisProvider Component', () => {
  const mockLenis = {
    start: vi.fn(),
    stop: vi.fn()
  };

  beforeEach(() => {
    (useLocation as Mock).mockReturnValue({ pathname: '/' });
    (useLenis as Mock).mockReturnValue(mockLenis);
    vi.clearAllMocks();
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

    expect(mockLenis.stop).toHaveBeenCalled();
    expect(mockLenis.start).toHaveBeenCalled();
  });

  it('scrolls to top on pathname change', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo');
    
    render(
      <LenisProvider>
        <div>Test Content</div>
      </LenisProvider>
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('applies correct props to ReactLenis component', () => {
    const { getByTestId } = render(
      <LenisProvider>
        <div>Test Content</div>
      </LenisProvider>
    );

    const lenisWrapper = getByTestId('lenis-wrapper');
    expect(lenisWrapper).toHaveClass('h-full');
    expect(lenisWrapper).toHaveAttribute('root');
  });
});
