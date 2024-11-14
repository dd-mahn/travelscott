import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Starter from 'src/pages/Home/Components/Starter/Starter';
import Blog from 'src/types/Blog';

// Mock the components and assets
vi.mock('src/pages/Home/Components/Starter/StarterBlog', () => ({
  default: ({ blogs }: { blogs: any[] }) => (
    <div data-testid="starter-blogs">
      {blogs.map((blog, index) => (
        <div key={index} data-testid="blog-item">{blog.title}</div>
      ))}
    </div>
  ),
}));

vi.mock('src/common/Buttons/Button', () => ({
  SecondaryButton: ({ text, link }: { text: string; link: string }) => (
    <button data-testid="secondary-button" data-link={link}>{text}</button>
  ),
}));

vi.mock('src/assets/svg/airplane-1.svg', () => ({
  default: 'mocked-airplane-path'
}));

// Update Framer Motion mock
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, whileInView, variants, viewport, ...props }: any) => (
      <div 
        className={className} 
        data-testid="motion-div"
        data-motion-props={{ whileInView, variants, viewport }}
        {...props}
      >
        {children}
      </div>
    ),
    img: ({ src, alt, className, whileInView, drag, dragConstraints, variants, viewport, initial, transition, ...props }: any) => (
      <img
        src={src}
        alt={alt}
        className={className}
        data-testid="motion-img"
        data-motion-props={{
          whileInView,
          drag,
          dragConstraints,
          variants,
          viewport,
          initial,
          transition
        }}
        {...props}
      />
    ),
  },
  // Add any motion-specific constants or hooks you're using
  variants: vi.fn(),
}));

const mockBlogs: Blog[] = [
  {
    _id: '1',
    title: 'Test Blog 1',
    author: 'Test Author',
    category: 'FirstTimeAbroad',
    image: 'test-image-1.jpg',
    content: [{ sectionText: ['Test Description 1'], sectionTitle: 'Test Title', sectionImages: [] }],
    time: '2024-01-01',
    tags: ['travel'],
    related_destination: 'Test Destination',
    featured: false
  },
  {
    _id: '2', 
    title: 'Test Blog 2',
    author: 'Test Author',
    category: 'FirstTimeAbroad',
    image: 'test-image-2.jpg',
    content: [{ sectionText: ['Test Description 2'], sectionTitle: 'Test Title', sectionImages: [] }],
    time: '2024-01-02',
    tags: ['adventure'],
    related_destination: 'Test Destination',
    featured: false
  }
];

describe('Starter Component', () => {
  const renderStarter = () => {
    return render(
      <BrowserRouter>
        <Starter blogs={mockBlogs as Blog[]} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderStarter();
    expect(screen.getByTestId('starter-blogs')).toBeInTheDocument();
  });

  it('renders StarterBlogs component with correct props', () => {
    renderStarter();
    const blogItems = screen.getAllByTestId('blog-item');
    
    expect(blogItems).toHaveLength(mockBlogs.length);
    expect(blogItems[0]).toHaveTextContent(mockBlogs[0].title);
    expect(blogItems[1]).toHaveTextContent(mockBlogs[1].title);
  });

  it('renders the Find More button with correct link', () => {
    renderStarter();
    const button = screen.getByTestId('secondary-button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Find More');
    expect(button).toHaveAttribute('data-link', '/inspiration');
  });
});
