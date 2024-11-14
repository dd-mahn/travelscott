import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutWhy from './AboutWhy';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <div {...validProps}>{children}</div>;
    },
    p: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <p {...validProps}>{children}</p>;
    }
  }
}));

// Mock viewport width hook
vi.mock('src/hooks/useViewportWidth/useViewportWidth', () => ({
  useViewportWidth: () => 1024 // Mock desktop viewport
}));

describe('AboutWhy', () => {
  it('renders correctly', () => {
    render(<AboutWhy />);

    // Check if main section exists with correct classes
    const whySection = screen.getByTestId('about-why');
    expect(whySection).toBeInTheDocument();
    expect(whySection).toHaveClass('why', 'px-sect', 'relative');

    // Check if title is rendered
    expect(screen.getByText('Why?')).toBeInTheDocument();

    // Check if quote text is rendered
    expect(screen.getByText(/journey/)).toBeInTheDocument();
  });

  it('renders all airplane images', () => {
    render(<AboutWhy />);

    // Check if all three airplane images are rendered
    const airplane1 = screen.getByAltText('Airplane 1');
    const airplane2 = screen.getByAltText('Airplane 2');
    const airplane3 = screen.getByAltText('Airplane 3');

    expect(airplane1).toBeInTheDocument();
    expect(airplane2).toBeInTheDocument();
    expect(airplane3).toBeInTheDocument();

    // Check if images have correct classes
    expect(airplane1).toHaveClass('plane-1', 'absolute');
    expect(airplane2).toHaveClass('plane-2', 'absolute');
    expect(airplane3).toHaveClass('plane-3', 'absolute');
  });

  it('renders with correct styling', () => {
    render(<AboutWhy />);

    // Check heading styling
    const heading = screen.getByText('Why?').parentElement;
    expect(heading).toHaveClass('h3-inter', 'text-center');

    // Check quote paragraph styling
    const quote = screen.getByText(/journey/);
    expect(quote).toHaveClass('p-large');
  });
});
