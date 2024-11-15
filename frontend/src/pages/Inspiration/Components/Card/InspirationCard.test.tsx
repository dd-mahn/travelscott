import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import InspirationCard from "src/pages/Inspiration/Components/Card/InspirationCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, transition, ...validProps } = props;
      return <div data-testid="motion-div" {...validProps}>{children}</div>;
    },
    h3: ({ children, ...props }: any) => {
      const { whileHover, variants, transition, ...validProps } = props;
      return <h3 data-testid="motion-h3" {...validProps}>{children}</h3>;
    },
    img: ({ ...props }: any) => {
      const { whileHover, variants, transition, ...validProps } = props;
      return <img data-testid="motion-img" {...validProps} />;
    }
  },
}));

// Mock OptimizedImage component
vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt, ...props }: any) => {
    const { whileHover, ...validProps } = props;
    return <img data-testid="optimized-image" src={src} alt={alt} {...validProps} />;
  },
}));

// Mock formatDate utility
vi.mock("src/utils/formatDate", () => ({
  formatDate: (date: string) => "Mocked Date",
}));

describe("InspirationCard", () => {
  const mockBlog = {
    _id: "123",
    title: "Test Blog",
    author: "Test Author",
    category: "Test Category", 
    image: "test-image.jpg",
    content: [
      {
        sectionTitle: "Test Section",
        sectionImages: [],
        sectionText: ["Test content preview"]
      }
    ],
    time: "2023-01-01",
    tags: [],
    related_destination: "Test Destination",
    featured: false
  };

  it("renders blog card with correct content", () => {
    render(
      <BrowserRouter>
        <InspirationCard blog={mockBlog} />
      </BrowserRouter>
    );

    // Check if main elements are rendered
    expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    expect(screen.getByText(mockBlog.category)).toBeInTheDocument();
    expect(screen.getByText("Test content preview")).toBeInTheDocument();
    expect(screen.getByText("Mocked Date")).toBeInTheDocument();

    // Check if image is rendered with correct props
    const image = screen.getByTestId("optimized-image");
    expect(image).toHaveAttribute("src", mockBlog.image);
    expect(image).toHaveAttribute("alt", mockBlog.title);
  });

  it("renders correct links", () => {
    render(
      <BrowserRouter>
        <InspirationCard blog={mockBlog} />
      </BrowserRouter>
    );

    const links = screen.getAllByRole("link");
    links.forEach(link => {
      expect(link).toHaveAttribute("href", `/inspiration/${mockBlog._id}`);
    });
  });

  it("handles missing content gracefully", () => {
    const blogWithoutContent = {
      ...mockBlog,
      content: []
    };

    render(
      <BrowserRouter>
        <InspirationCard blog={blogWithoutContent} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    expect(screen.getByText(mockBlog.category)).toBeInTheDocument();
  });

  it("handles missing image gracefully", () => {
    const blogWithoutImage = {
      ...mockBlog,
      image: ""
    };

    render(
      <BrowserRouter>
        <InspirationCard blog={blogWithoutImage} />
      </BrowserRouter>
    );

    const image = screen.getByTestId("optimized-image");
    expect(image).toHaveAttribute("src", "");
  });
});
