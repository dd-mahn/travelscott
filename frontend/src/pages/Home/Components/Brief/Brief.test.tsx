import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import Brief from 'src/pages/Home/Components/Brief/Brief';
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
      !key.startsWith('viewport') &&
      !key.startsWith('style')
    )
  );
};

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterMotionProps(props)}>{children}</div>
    )),
    img: React.forwardRef(({ ...props }: any, ref: any) => (
      <img ref={ref} {...filterMotionProps(props)} />
    )),
    p: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <p ref={ref} {...filterMotionProps(props)}>{children}</p>
    ))
  },
  useScroll: () => ({
    scrollYProgress: { get: () => 0.5 }
  }),
  useTransform: () => 1
}));

// Mock assets
vi.mock('src/assets/svg/airplane-1.svg', () => ({
  default: 'airplane1.svg'
}));

vi.mock('src/assets/videos/brief.mp4', () => ({
  default: 'brief.mp4'
}));

// Mock animation variants
vi.mock('src/utils/constants/variants', () => ({
  VisibilityVariants: {
    hiddenY: {},
    hiddenFullY: {},
    visible: {}
  }
}));

// Mock viewport width hook
vi.mock('src/hooks/useViewportWidth/useViewportWidth', () => ({
  useViewportWidth: () => 1024
}));

describe('Brief Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the main heading correctly', () => {
    render(<Brief />);
    expect(screen.getByTestId('brief-header')).toBeInTheDocument();
    expect(screen.getByTestId('brief-subheader')).toBeInTheDocument();
  });

  it('renders all three paragraphs', () => {
    render(<Brief />);
    expect(screen.getByText(/Take a break from your daily routine/i)).toBeInTheDocument();
    expect(screen.getByText(/To help you get started, explore our virtual gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/For more insights, visit our blog/i)).toBeInTheDocument();
  });

  it('renders the video element', () => {
    render(<Brief />);
    const video = screen.getByTestId('brief-video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'brief.mp4');
  });

  it('renders the airplane image', () => {
    render(<Brief />);
    const airplane = screen.getByAltText('Decorative airplane');
    expect(airplane).toHaveAttribute('src', 'airplane1.svg');
  });

  it('renders with correct CSS classes', () => {
    render(<Brief />);
    const briefSection = screen.getByTestId('brief-section');
    expect(briefSection).toHaveClass('brief');
    expect(briefSection).toHaveClass('px-sect');
    expect(briefSection).toHaveClass('flex');
  });
});
