import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from 'src/pages/About/About';
import useStackedSections from 'src/hooks/useStackedSections/useStackedSections';
import { useSectionTransition, useSectionTransition2 } from 'src/hooks/useSectionTransition/useSectionTransition';

// Mock the hooks
vi.mock('src/hooks/useStackedSections/useStackedSections');
vi.mock('src/hooks/useSectionTransition/useSectionTransition');

describe('About', () => {
  beforeEach(() => {
    // Mock implementation of useStackedSections
    (useStackedSections as any).mockReturnValue({
      refs: { current: [] },
      setRef: vi.fn((index) => (el: any) => {}),
    });

    // Mock implementation of useSectionTransition hooks
    (useSectionTransition as any).mockReturnValue({
      ref: { current: null },
      scale: 1,
      opacity: 1,
    });

    (useSectionTransition2 as any).mockReturnValue({
      ref: { current: null },
      scale: 1,
    });
  });

  it('renders the main about section', () => {
    render(<About />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('about');
  });

  it('renders the "How?" heading', () => {
    render(<About />);
    expect(screen.getByText('How?')).toBeInTheDocument();
  });

  it('renders all major section components', () => {
    render(<About />);
    
    // Check if all major sections are rendered
    expect(screen.getByTestId('about-hero')).toBeInTheDocument();
    expect(screen.getByTestId('about-how')).toBeInTheDocument();
    expect(screen.getByTestId('about-who')).toBeInTheDocument();
    expect(screen.getByTestId('about-why')).toBeInTheDocument();
  });

  it('initializes with correct hooks', () => {
    render(<About />);
    
    expect(useStackedSections).toHaveBeenCalled();
    expect(useSectionTransition).toHaveBeenCalled();
    expect(useSectionTransition2).toHaveBeenCalled();
  });

  it('applies motion styling to sections', () => {
    render(<About />);
    
    // Check if motion sections have correct classes
    const stackedSection = screen.getByTestId('stacked-section');
    expect(stackedSection).toHaveClass('flex', 'flex-col', 'items-center', 'justify-start');
  });
});
