import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import Hero from 'src/pages/Home/Components/Hero/Hero';
import { render, screen } from '@testing-library/react';

// Helper function to filter Framer Motion props
const filterMotionProps = (props: any) => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => 
      !key.startsWith('while') && 
      !key.startsWith('drag') && 
      !key.startsWith('animate') && 
      !key.startsWith('initial') && 
      !key.startsWith('variants') && 
      !key.startsWith('transition') && 
      !key.startsWith('viewport')
    )
  );
};

// All mocks must be defined before any other imports
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterMotionProps(props)}>
        {children}
      </div>
    )),
    h1: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <h1 ref={ref} {...filterMotionProps(props)}>
        {children}
      </h1>
    )),
    p: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <p ref={ref} {...filterMotionProps(props)}>
        {children}
      </p>
    )),
    i: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <i ref={ref} {...filterMotionProps(props)}>
        {children}
      </i>
    )),
    img: React.forwardRef(({ ...props }: any, ref: any) => (
      <img ref={ref} {...filterMotionProps(props)} />
    )),
    span: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <span ref={ref} {...filterMotionProps(props)}>
        {children}
      </span>
    )),
  },
  useAnimation: () => ({
    start: vi.fn(),
  }),
}));

// Mock SVG imports
vi.mock('src/assets/svg/airplane-1.svg', () => ({
  default: 'airplane1.svg'
}));
vi.mock('src/assets/svg/airplane-2.svg', () => ({
  default: 'airplane2.svg'
}));
vi.mock('src/assets/svg/airplane-3.svg', () => ({
  default: 'airplane3.svg'
}));

// Mock button components
vi.mock('src/common/Buttons/Button', () => ({
  PrimaryButton: ({ text, link }: { text: string; link: string }) => (
    <a href={link}>{text}</a>
  ),
  SecondaryButton: ({ text, link }: { text: string; link: string }) => (
    <a href={link}>{text}</a>
  ),
}));

// Mock animation variants
vi.mock('src/utils/constants/variants', () => ({
  HoverVariants: {
    hoverScale: {},
  },
  VisibilityVariants: {
    hiddenY: {},
    hiddenFullY: {},
    visible: {},
    hiddenFullScale: {},
  },
}));

// Mock viewport width hook
vi.mock('src/hooks/useViewportWidth/useViewportWidth', () => ({
  useViewportWidth: () => 1024, // Default to desktop width
}));

// Mock window resize listener
const mockAddEventListener = vi.spyOn(window, 'addEventListener');
const mockRemoveEventListener = vi.spyOn(window, 'removeEventListener');

// Mock Element.clientWidth and clientHeight
Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
  configurable: true,
  value: 1000,
});

Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  value: 1000,
});

// Mock offsetHeight
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  value: 100,
});

describe('Hero Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  it('renders main heading text correctly', () => {
    render(<Hero />);
    expect(screen.getByText(/travel guide/i)).toBeInTheDocument();
    expect(screen.getByText(/experience/i)).toBeInTheDocument();
    expect(screen.getAllByText(/unforgettable/i)).toHaveLength(4);
  });

  it('renders description text', () => {
    render(<Hero />);
    expect(screen.getByText(/From the smallest idea to the most memorable journeys/i)).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('renders airplane images', () => {
    render(<Hero />);
    const airplaneImages = screen.getAllByAltText('Airplane');
    expect(airplaneImages).toHaveLength(3);
  });

  it('has correct button links', () => {
    render(<Hero />);
    const getStartedButton = screen.getByText('Get started').closest('a');
    const learnMoreButton = screen.getByText('Learn more').closest('a');

    expect(getStartedButton).toHaveAttribute('href', '/discover');
    expect(learnMoreButton).toHaveAttribute('href', '/about');
  });

  it('renders with correct CSS classes', () => {
    render(<Hero />);
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toHaveClass('hero');
    expect(heroSection).toHaveClass('px-sect');
    expect(heroSection).toHaveClass('flex');
  });
});
