import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import Featured from 'src/pages/Home/Components/Featured/Featured';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from 'src/store/slices/destinationSlice';

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

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterMotionProps(props)}>{children}</div>
    )),
    h1: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <h1 ref={ref} {...filterMotionProps(props)}>{children}</h1>
    )),
    p: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <p ref={ref} {...filterMotionProps(props)}>{children}</p>
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock components
vi.mock('src/pages/Home/Components/Featured/FeaturedHorizontalScroller', () => ({
  default: () => <div data-testid="horizontal-scroller">Horizontal Scroller</div>
}));

vi.mock('src/common/Buttons/Button', () => ({
  SecondaryButton: ({ text, link }: { text: string, link: string }) => (
    <a href={link}>{text}</a>
  )
}));

vi.mock('src/common/Catalogs/CatalogStates', () => ({
  LoadingState: ({ keyName }: { keyName: string }) => <div data-testid="loading-state">{keyName}</div>,
  ErrorState: ({ keyName }: { keyName: string }) => <div data-testid="error-state">{keyName}</div>
}));

// Mock hooks
vi.mock('src/hooks/useViewportWidth/useViewportWidth', () => ({
  useViewportWidth: () => 1024
}));

vi.mock('src/hooks/useFetch/useFetch', () => ({
  default: () => ({
    data: {
      result: [
        { id: 1, name: 'Destination 1' },
        { id: 2, name: 'Destination 2' },
        { id: 3, name: 'Destination 3' },
        { id: 4, name: 'Destination 4' },
        { id: 5, name: 'Destination 5' }
      ]
    },
    loading: false,
    error: null
  })
}));

// Mock animation variants
vi.mock('src/utils/constants/variants', () => ({
  VisibilityVariants: {
    hidden: {},
    hiddenY: {},
    hiddenFullY: {},
    visible: {}
  }
}));

describe('Featured Component', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        destinations: destinationReducer
      }
    });
  });

  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  it('renders the main heading correctly', () => {
    renderWithProvider(<Featured />);
    expect(screen.getByText('Featured Destinations')).toBeInTheDocument();
  });

  it('renders the horizontal scroller when data is available', () => {
    renderWithProvider(<Featured />);
    expect(screen.getByTestId('horizontal-scroller')).toBeInTheDocument();
  });

  it('renders the destinations count text', () => {
    renderWithProvider(<Featured />);
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/destinations that we have covered in our Catalogue./)).toBeInTheDocument();
  });

  it('renders the discover more button with correct link', () => {
    renderWithProvider(<Featured />);
    const button = screen.getByText('Discover More');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/discover');
  });
});
