import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from 'src/store/slices/blogSlice';
import React from 'react';
import Blog from 'src/types/Blog';
import { act } from '@testing-library/react';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, whileHover, whileInView, drag, dragControls, dragMomentum, dragElastic, dragConstraints, ...props }: any, ref) => (
      <div 
        ref={ref} 
        data-testid="motion-div" 
        data-motion-props={{
          whileHover,
          whileInView,
          drag,
          dragControls,
          dragMomentum,
          dragElastic,
          dragConstraints
        }}
        {...props}
      >
        {children}
      </div>
    )),
    span: React.forwardRef(({ children, whileHover, ...props }: any, ref) => (
      <span 
        ref={ref} 
        data-testid="motion-span"
        data-motion-props={{ whileHover }}
        {...props}
      >
        {children}
      </span>
    )),
  },
  useDragControls: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
}));

// Mock OptimizedImage
vi.mock('src/common/OptimizedImage/OptimizedImage', () => ({
  default: React.forwardRef(({ src, alt, whileHover, ...props }: any, ref) => (
    <img 
      ref={ref}
      src={src}
      alt={alt}
      data-testid="optimized-image"
      data-motion-props={{ whileHover }}
      {...props}
    />
  )),
}));

// Import component after mocks
import StarterBlogs from 'src/pages/Home/Components/Starter/StarterBlog';

// Mock data
const mockBlogs: Blog[] = [
  {
    _id: '1',
    title: 'First Time in Japan',
    author: 'John Doe',
    category: 'FirstTimeAbroad',
    image: 'japan.jpg',
    content: [{ sectionText: ['Experience the beauty of Japan'], sectionTitle: 'Experience the beauty of Japan', sectionImages: [] }],
    time: '2024-03-20',
    tags: ['travel'],
    related_destination: 'Japan',
    featured: true
  },
  {
    _id: '2',
    title: 'Paris Adventure',
    author: 'Jane Smith',
    category: 'FirstTimeAbroad',
    image: 'paris.jpg',
    content: [{ sectionText: ['Exploring the city of lights'], sectionTitle: 'Exploring the city of lights', sectionImages: [] }],
    time: '2024-03-21',
    tags: ['travel'],
    related_destination: 'Paris',
    featured: false
  }
];

// Create mock store
const createMockStore = (preloadedState = {}) => configureStore({
  reducer: {
    blog: blogReducer as any,
  },
  preloadedState: {
    blog: {
      starterBlogs: mockBlogs,
      ...preloadedState
    }
  }
});

// Test renderer helper
const renderWithProviders = (
  component: React.ReactElement,
  preloadedState = {}
) => {
  return render(
    <Provider store={createMockStore(preloadedState)}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('StarterBlogs Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window dimensions
    global.innerWidth = 1024;
    global.innerHeight = 768;
    global.dispatchEvent(new Event('resize'));
  });

  it('renders starter blogs correctly', () => {
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    // Check if blog titles are rendered
    expect(screen.getByText('First Time in Japan')).toBeInTheDocument();
    expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
  });

  it('renders blog images with OptimizedImage component', () => {
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    const images = screen.getAllByTestId('optimized-image');
    expect(images).toHaveLength(mockBlogs.length);
    
    // Check image sources
    expect(images[0]).toHaveAttribute('src', 'japan.jpg');
    expect(images[1]).toHaveAttribute('src', 'paris.jpg');
  });

  it('renders blog authors correctly', () => {
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders blog content previews', () => {
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    expect(screen.getByText('Experience the beauty of Japan')).toBeInTheDocument();
    expect(screen.getByText('Exploring the city of lights')).toBeInTheDocument();
  });

  it('contains correct navigation links', () => {
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    // Get all "View" links specifically
    const viewLinks = screen.getAllByText('View')
      .map(el => el.closest('a'));
    
    expect(viewLinks[0]).toHaveAttribute('href', '/inspiration/1');
    expect(viewLinks[1]).toHaveAttribute('href', '/inspiration/2');
  });

  it('initializes with correct drag constraints', () => {
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    // Get only the blog container elements
    const dragContainers = screen.getAllByTestId('motion-div')
      .filter(el => el.classList.contains('blog'));
    
    // Check if drag containers have proper styling
    dragContainers.forEach(container => {
      expect(container).toHaveClass('absolute');
    });
  });

  it('filters blogs by FirstTimeAbroad category', () => {
    const mixedBlogs = [
      ...mockBlogs,
      {
        _id: '3',
        title: 'Local Trip',
        author: 'Bob Wilson',
        category: 'Local',
        image: 'local.jpg',
        content: [{ sectionText: ['Local adventure'], sectionTitle: 'Local adventure', sectionImages: [] }],
        time: '2024-03-22',
        tags: ['local'],
        related_destination: 'Local',
        featured: false
      }
    ];

    renderWithProviders(<StarterBlogs blogs={mixedBlogs as Blog[]} />);
    
    // Should only render FirstTimeAbroad blogs
    expect(screen.getByText('First Time in Japan')).toBeInTheDocument();
    expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
    expect(screen.queryByText('Local Trip')).not.toBeInTheDocument();
  });

  // Test responsive behavior
  it('adjusts layout for different screen sizes', async () => {
    // Test mobile layout
    await act(async () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
    });
    
    renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    const mobileContainers = screen.getAllByTestId('motion-div')
      .filter(el => el.classList.contains('blog'));
    
    mobileContainers.forEach(container => {
      expect(container).toHaveClass('w-1/2');
    });
    
    // Clean up and test desktop layout
    await act(async () => {
      global.innerWidth = 1440;
      global.dispatchEvent(new Event('resize'));
    });
    
    const { container } = renderWithProviders(<StarterBlogs blogs={mockBlogs} />);
    
    const desktopContainers = screen.getAllByTestId('motion-div')
      .filter(el => el.classList.contains('blog'));
    
    desktopContainers.forEach(container => {
      expect(container).toHaveClass('lg:w-1/3');
    });
  });
});
