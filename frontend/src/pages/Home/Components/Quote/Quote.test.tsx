import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Move mocks before component import
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, initial, animate, whileInView, variants, viewport, transition, ...props }: any, ref) => (
      <div 
        ref={ref}
        className={className}
        data-testid="motion-div"
        data-motion-props={{ initial, animate, whileInView, variants, viewport, transition }}
        {...props}
      >
        {children}
      </div>
    )),
    h1: React.forwardRef(({ children, className, initial, animate, whileInView, variants, viewport, transition, ...props }: any, ref) => (
      <h1 
        ref={ref}
        className={className}
        data-testid="motion-h1"
        data-motion-props={{ initial, animate, whileInView, variants, viewport, transition }}
        {...props}
      >
        {children}
      </h1>
    )),
    i: React.forwardRef(({ children, className, initial, whileInView, variants, viewport, transition, ...props }: any, ref) => (
      <i 
        ref={ref}
        className={className}
        data-testid="motion-icon"
        data-motion-props={{ initial, whileInView, variants, viewport, transition }}
        {...props}
      >
        {children}
      </i>
    )),
    span: React.forwardRef(({ children, className, initial, whileInView, variants, viewport, ...props }: any, ref) => (
      <span 
        ref={ref}
        className={className}
        data-testid="motion-span"
        data-motion-props={{ initial, whileInView, variants, viewport }}
        {...props}
      >
        {children}
      </span>
    )),
  },
  useAnimation: () => ({
    start: vi.fn(),
  }),
  useInView: () => true,
}));

vi.mock('src/common/Buttons/Button', () => ({
  PrimaryButton: React.forwardRef(({ text, link, ...props }: any, ref) => (
    <button
      ref={ref}
      data-testid="primary-button"
      data-link={link}
      {...props}
    >
      {text}
    </button>
  )),
}));

// Import components after mocks
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Quote from 'src/pages/Home/Components/Quote/Quote';

describe('Quote Component', () => {
  const renderQuote = () => {
    return render(
      <BrowserRouter>
        <Quote />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Quote component', () => {
    renderQuote();
    
    const motionDivs = screen.getAllByTestId('motion-div');
    const motionH1s = screen.getAllByTestId('motion-h1');
    const motionIcons = screen.getAllByTestId('motion-icon');
    const motionSpans = screen.getAllByTestId('motion-span');

    expect(motionDivs.length).toBeGreaterThan(0);
    expect(motionH1s.length).toBeGreaterThan(0);
    expect(motionIcons.length).toBeGreaterThan(0);
    expect(motionSpans.length).toBeGreaterThan(0);

    motionDivs.forEach(div => {
      expect(div).toBeInTheDocument();
    });

    motionH1s.forEach(h1 => {
      expect(h1).toBeInTheDocument();
    });

    motionIcons.forEach(icon => {
      expect(icon).toBeInTheDocument();
    });

    motionSpans.forEach(span => {
      expect(span).toBeInTheDocument();
    });
  });

  it('should render the PrimaryButton component', () => {
    renderQuote();
    expect(screen.getByTestId('primary-button')).toBeInTheDocument();
  });
});
