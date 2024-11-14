import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import FeaturedBlogs from "./FeaturedBlogs";
import Blog from "src/types/Blog";

// Mock OptimizedImage component
vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock FeaturedContentSlider component
vi.mock("src/common/FeaturedBlogsSlider/FeaturedContentSlider", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock DotPagination component
vi.mock("src/common/Pagination/Pagination", () => ({
  DotPagination: ({ count, index, handleNextClick, handlePreviousClick }: any) => (
    <div>
      <button aria-label="Go to previous page" onClick={handlePreviousClick}>Previous</button>
      <div>{Array.from({ length: count }, (_, i) => (
        <button key={i} aria-label={`Go to page ${i + 1}`} aria-current={i === index}>
          {i + 1}
        </button>
      ))}</div>
      <button aria-label="Go to next page" onClick={handleNextClick}>Next</button>
    </div>
  ),
}));

// Mock formatDate utility
vi.mock("src/utils/formatDate", () => ({
  formatDate: (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}));

// Update the framer-motion mock
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, layout, whileHover, whileTap, variants, ...props }: any) => (
      <div 
        data-layout={layout}
        data-framer-hover={whileHover}
        data-framer-tap={whileTap}
        data-variants={JSON.stringify(variants)}
        {...props}
      >
        {children}
      </div>
    ),
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    img: ({ children, whileHover, whileTap, variants, ...props }: any) => (
      <img 
        data-framer-hover={whileHover}
        data-framer-tap={whileTap}
        data-variants={JSON.stringify(variants)}
        {...props}
      >
        {children}
      </img>
    ),
  },
  useInView: () => [null, true],
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock variants
vi.mock("src/utils/constants/variants", () => ({
  HoverVariants: {
    hoverScale: { scale: 1.05 }
  },
  TapVariants: {
    tapScale: { scale: 0.95 }
  },
  VisibilityVariants: {
    hiddenY: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
}));

const mockBlogs = [
  {
    _id: "1",
    title: "Test Blog 1",
    category: "Travel",
    image: "/test-image-1.jpg",
    content: [
      {
        sectionText: ["Test blog content 1"]
      }
    ],
    time: "2024-01-01"
  } as Blog,
  {
    _id: "2", 
    title: "Test Blog 2",
    category: "Adventure",
    image: "/test-image-2.jpg",
    content: [
      {
        sectionText: ["Test blog content 2"]
      }
    ],
    time: "2024-01-02"
  } as Blog
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe("FeaturedBlogs", () => {
  it("renders blog titles", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    expect(screen.getByText("Test Blog 1")).toBeInTheDocument();
  });

  it("renders blog categories", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("renders blog content previews", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    expect(screen.getByText("Test blog content 1")).toBeInTheDocument();
  });

  it("renders formatted dates", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
  });

  it("renders correct number of blog slides", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    const blogLinks = screen.getAllByRole("link", { name: /Test Blog/i });
    expect(blogLinks).toHaveLength(mockBlogs.length * 2); // Each blog has 2 links (image and title)
  });

  it("has correct link paths", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    const blogLinks = screen.getAllByRole("link", { name: /Test Blog 1/i });
    blogLinks.forEach(link => {
      expect(link).toHaveAttribute("href", "/inspiration/1");
    });
  });

  it("renders images with correct attributes", () => {
    renderWithRouter(<FeaturedBlogs blogs={mockBlogs} />);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/test-image-1.jpg");
    expect(images[0]).toHaveAttribute("alt", "Test Blog 1");
  });
});
