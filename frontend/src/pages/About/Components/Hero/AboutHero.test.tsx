import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutHero from 'src/pages/About/Components/Hero/AboutHero';

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    video: ({ children, ...props }: any) => <video {...props}>{children}</video>
  },
  useAnimation: () => ({
    start: vi.fn(),
  }),
  useScroll: () => ({
    scrollYProgress: { current: 0 }
  }),
  useTransform: () => 1
}));

describe('AboutHero', () => {
  it('renders correctly', () => {
    render(<AboutHero />);

    // Check if main section exists with correct classes
    const heroSection = screen.getByTestId('about-hero');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('hero', 'px-sect', 'relative', 'flex', 'flex-col', 'items-center');

    // Check if title text is rendered
    expect(screen.getByText('Travel')).toBeInTheDocument();
    expect(screen.getByText('Scott,')).toBeInTheDocument();
    expect(screen.getByText('guide')).toBeInTheDocument();

    // Check if paragraphs are rendered
    expect(screen.getByText(/We simply want to awaken the passion for/)).toBeInTheDocument();
    expect(screen.getByText('We simplify your travel experience.')).toBeInTheDocument();
    expect(screen.getByText('We want you to travel.')).toBeInTheDocument();
  });

  it('renders video element with correct attributes', () => {
    render(<AboutHero />);
    
    const video = screen.getByTestId('about-hero-video');
    expect(video).toBeInTheDocument();

  });

});
