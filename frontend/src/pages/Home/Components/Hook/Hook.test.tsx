import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Hook from 'src/pages/Home/Components/Hook/Hook';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: React.forwardRef(({ children, whileInView, ...props }: any, ref) => (
      <h2 ref={ref} {...props}>{children}</h2>
    ))
  }
})); 

describe('Hook', () => {
  it('renders correctly', () => {
    render(<Hook />);

    // Check if main text content is rendered
    expect(screen.getByText('If you are still hesitant,')).toBeInTheDocument();
    expect(screen.getByText('perhaps some of the articles below can help.')).toBeInTheDocument();

    // Check if section has correct classes
    const section = screen.getByTestId('hook');
    expect(section).toHaveClass('hook', 'px-sect', 'flex', 'h-[120svh]', 'items-center');
  });

  it('has correct structure and styling', () => {
    render(<Hook />);
    
    // Check sticky container
    const stickyContainer = screen.getByTestId('hook').parentElement;
    expect(stickyContainer).toHaveClass('sticky', 'top-0', '-z-10');

    // Check heading elements
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    headings.forEach(heading => {
      expect(heading).toHaveClass('h2-inter'); 
    });
  });
});
