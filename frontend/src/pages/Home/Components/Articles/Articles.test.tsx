import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Articles from 'src/pages/Home/Components/Articles/Articles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from 'src/store/slices/blogSlice';
import themeReducer from 'src/store/slices/themeSlice';
import React from 'react';
import Blog from 'src/types/Blog'; 

// Mock data
const mockBlogs = [
  {
    _id: '1',
    title: 'Test Blog 1',
    category: 'Technology',
    image: 'test-image-1.jpg',
    content: [{ sectionText: ['Test content 1'] }],
    time: '2024-03-20'
  },
  {
    _id: '2',
    title: 'Test Blog 2',
    category: 'Design',
    image: 'test-image-2.jpg',
    content: [{ sectionText: ['Test content 2'] }],
    time: '2024-03-21'
  }
];

// Mock store with preloaded state
const createMockStore = (preloadedState = { blog: {}, theme: {} }) => configureStore({
  reducer: {
    blog: blogReducer as any,
    theme: themeReducer as any
  },
  preloadedState: {
    blog: {
      blogChunks: [mockBlogs], // Initialize with mock data
      ...preloadedState.blog
    },
    theme: {
      isDarkMode: false,
      ...preloadedState.theme
    }
  }
});

// Update the render helper
const renderWithProviders = (
  component: React.ReactElement,
  preloadedState = {}
) => {
  return render(
    <Provider store={createMockStore(preloadedState as any)}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

// Mock modules
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
  };
});

vi.mock('src/utils/getSeason', () => ({
  getSeason: () => 'Spring'
}));

vi.mock('src/common/SeasonHeading/SeasonHeading', () => ({
  default: () => <div data-testid="season-heading">Mock Season Heading</div>
}));

vi.mock('src/common/OptimizedImage/OptimizedImage', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="optimized-image" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('src/common/FeaturedBlogsSlider/FeaturedContentSlider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="featured-content-slider">{children}</div>
  ),
}));

vi.mock('src/utils/formatDate', () => ({
  formatDate: () => '2024-01-01'
}));

vi.mock('src/utils/createBlogChunks', () => ({
  createBlogChunks: (blogs: any[]) => {
    return [blogs.slice(0, 4)]; // Creates a single chunk of up to 4 blogs
  }
}));

vi.mock('src/utils/constants/variants', () => ({
  HoverVariants: {
    hoverScale: {},
    hoverX: {}
  },
  VisibilityVariants: {
    hiddenY: {},
    hiddenFullY: {},
    hiddenScale: {},
    visible: {}
  }
}));

describe('Articles Component', () => {
  const mockRef = { current: null };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<Articles articlesHookRef={mockRef} blogs={mockBlogs as Blog[]} />);
    expect(screen.getByText('Discover the latest articles in')).toBeInTheDocument();
  });

  it('displays blog titles correctly', () => {
    renderWithProviders(<Articles articlesHookRef={mockRef} blogs={mockBlogs as Blog[]} />);
    
    // Use findByText instead of getByText for async rendering
    expect(screen.getByText('Test Blog 1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Test Blog 2', { exact: false })).toBeInTheDocument();
  });

  it('renders optimized images for blogs', () => {
    renderWithProviders(<Articles articlesHookRef={mockRef} blogs={mockBlogs as Blog[]} />);
    const images = screen.getAllByTestId('optimized-image');
    expect(images).toHaveLength(mockBlogs.length);
  });

  it('renders with empty blogs array', () => {
    renderWithProviders(<Articles articlesHookRef={mockRef} blogs={[]} />);
    expect(screen.getByText('Discover the latest articles in')).toBeInTheDocument();
  });
});
