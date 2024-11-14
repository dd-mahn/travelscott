import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// Helper function to filter Framer Motion props
const filterMotionProps = (props: any) => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => 
      !key.startsWith('while') && 
      !key.startsWith('animate') && 
      !key.startsWith('initial') && 
      !key.startsWith('variants') && 
      !key.startsWith('transition') && 
      !key.startsWith('viewport') &&
      !key.startsWith('style')
    )
  );
};

// All mocks must be defined before any component imports
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    Suspense: ({ children }: { children: React.ReactNode }) => children,
  };
});

vi.mock('framer-motion', () => ({
  motion: {
    section: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <section 
        ref={ref} 
        data-testid="motion-section" 
        {...filterMotionProps(props)}
      >
        {children}
      </section>
    )),
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div 
        ref={ref} 
        data-testid="motion-container" 
        {...filterMotionProps(props)}
      >
        {children}
      </div>
    )),
  },
  useTransform: () => vi.fn(),
  useScroll: () => ({
    scrollYProgress: { get: () => 0.5 },
  }),
}));

vi.mock('src/common/Loading/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock('src/pages/Home/Components/Featured/FeaturedDestinationCard', () => ({
  default: ({ destination }: { destination: any }) => (
    <div data-testid="destination-card">
      {destination.name}
    </div>
  ),
}));

vi.mock('src/utils/constants/variants', () => ({
  HoverVariants: {
    hoverScale: {},
    hoverX: {},
  },
  VisibilityVariants: {
    hiddenY: {},
    hiddenScale: {},
    hiddenX: {},
    visible: {},
  },
}));

// Import the component and testing utilities after all mocks are defined
import { render, screen } from '@testing-library/react';
import HorizontalScrollCarousel from 'src/pages/Home/Components/Featured/FeaturedHorizontalScroller';
import Destination from 'src/types/Destination';

// Mock data
const mockDestinations = [
  { _id: '1', name: 'Paris', images: ['paris.jpg'] },
  { _id: '2', name: 'Tokyo', images: ['tokyo.jpg'] },
  { _id: '3', name: 'New York', images: ['nyc.jpg'] },
];

describe('HorizontalScrollCarousel Component', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    vi.clearAllMocks();
    originalInnerWidth = window.innerWidth;
    
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1024
    });
    
    Object.defineProperty(window, 'getComputedStyle', {
      configurable: true,
      value: () => ({
        paddingLeft: '24px',
      }),
    });
  });

  afterEach(() => {
    // Restore original window properties
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalInnerWidth
    });
  });

  it('renders the carousel container with correct structure', () => {
    render(<HorizontalScrollCarousel data={mockDestinations as Destination[]} />);
    expect(screen.getByTestId('motion-section')).toBeInTheDocument();
    expect(screen.getByTestId('motion-container')).toBeInTheDocument();
  });

  it('renders all destination cards', () => {
    render(<HorizontalScrollCarousel data={mockDestinations as Destination[]} />);
    
    const cards = screen.getAllByTestId('destination-card');
    expect(cards).toHaveLength(mockDestinations.length);
    
    mockDestinations.forEach((dest, index) => {
      expect(cards[index]).toHaveTextContent(dest.name);
    });
  });

  it('applies correct CSS classes to the container', () => {
    render(<HorizontalScrollCarousel data={mockDestinations as Destination[]} />);
    
    const container = screen.getByTestId('motion-container');
    expect(container).toHaveClass('px-sect');
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('grid-flow-col');
  });

  it('handles window resize events', () => {
    const { rerender } = render(<HorizontalScrollCarousel data={mockDestinations as Destination[]} />);
    
    // Update innerWidth with the new configurable property
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 768
    });
    
    window.dispatchEvent(new Event('resize'));
    rerender(<HorizontalScrollCarousel data={mockDestinations as Destination[]} />);
    
    expect(screen.getByTestId('motion-container')).toBeInTheDocument();
  });

  it('applies correct height to scroll container', () => {
    render(<HorizontalScrollCarousel data={mockDestinations as Destination[]} />);
    
    const section = screen.getByTestId('motion-section');
    expect(section).toHaveClass('h-[400svh]');
  });

  it('handles empty data gracefully', () => {
    render(<HorizontalScrollCarousel data={[]} />);
    
    expect(screen.queryAllByTestId('destination-card')).toHaveLength(0);
    expect(screen.getByTestId('motion-container')).toBeInTheDocument();
  });
});
