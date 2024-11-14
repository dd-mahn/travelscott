import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import DiscoverPoster from "src/pages/Discover/Components/Poster/DiscoverPoster";

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: any) => {
      const { initial, animate, variants, ...validProps } = props;
      return <section {...validProps}>{children}</section>;
    },
    div: ({ children, ...props }: any) => {
      const { initial, animate, variants, ...validProps } = props;
      return <div {...validProps}>{children}</div>;
    },
    h1: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, ...validProps } = props;
      return <h1 {...validProps}>{children}</h1>;
    },
    span: ({ children, ...props }: any) => {
      const { variants, ...validProps } = props;
      return <span {...validProps}>{children}</span>;
    },
  },
}));

// Mock Material Tailwind Carousel
vi.mock("@material-tailwind/react", () => ({
  Carousel: ({ children, ...props }: any) => (
    <div data-testid="carousel" {...props}>
      {children}
    </div>
  ),
}));

// Mock OptimizedImage component
vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt, className }: any) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="optimized-image"
    />
  ),
}));

const mockDestinations = [
  {
    _id: "1",
    name: "Test Destination",
    location: "Test Location",
    video: "test-video.mp4",
    images: ["test-image.jpg"],
    country: "Test Country",
    continent: "Test Continent",
    description: "Test description",
    additionalInfo: {
      whenToVisit: "Test when to visit",
      whoToGoWith: "Test who to go with",
      whatToExpect: "Test what to expect",
      healthAndSafety: "Test health and safety",
    },
    places: {},
    transportation: {},
    tags: ["test-tag"],
    insight: {},
    summary: "Test summary",
    featured: true,
  },
  {
    _id: "2",
    name: "Another Destination",
    location: "Another Location",
    video: "another-video.mp4",
    images: ["another-image.jpg"],
    country: "Another Country",
    continent: "Another Continent",
    description: "Another description",
    additionalInfo: {
      whenToVisit: "Another when to visit",
      whoToGoWith: "Another who to go with",
      whatToExpect: "Another what to expect",
      healthAndSafety: "Another health and safety",
    },
    places: {},
    transportation: {},
    tags: ["another-tag"],
    insight: {},
    summary: "Another summary",
    featured: true,
  },
];

describe("DiscoverPoster", () => {
  it("renders nothing when no featured destinations provided", () => {
    const { container } = render(<DiscoverPoster featuredDestinations={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders correctly with featured destinations", () => {
    render(
      <BrowserRouter>
        <DiscoverPoster featuredDestinations={mockDestinations} />
      </BrowserRouter>,
    );

    // Check if carousel exists
    expect(screen.getByTestId("carousel")).toBeInTheDocument();

    // Check if destinations are rendered
    mockDestinations.forEach((destination) => {
      expect(screen.getByText(destination.country)).toBeInTheDocument();
      expect(screen.getByText(destination.continent)).toBeInTheDocument();
    });

    // Check if images are rendered
    const images = screen.getAllByTestId("optimized-image");
    expect(images).toHaveLength(mockDestinations.length);

    // Verify image sources
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", mockDestinations[index].images[0]);
      expect(image).toHaveAttribute(
        "alt",
        `Featured destination: ${mockDestinations[index].name}`,
      );
    });
  });

  it("renders with correct navigation links", () => {
    render(
      <BrowserRouter>
        <DiscoverPoster featuredDestinations={mockDestinations} />
      </BrowserRouter>,
    );

    // Check if links are rendered correctly
    mockDestinations.forEach((destination) => {
      const link = screen.getByRole("link", {
        name: new RegExp(destination.name, "i"),
      });
      expect(link).toHaveAttribute("href", `/destinations/${destination._id}`);
    });
  });

  it("handles destinations with missing images gracefully", () => {
    const destinationsWithMissingImages = [
      {
        _id: "1",
        name: "Test Destination",
        location: "",
        video: "",
        images: [],
        country: "Test Country",
        continent: "Test Continent",
        description: "",
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: [],
        insight: {},
        summary: "",
        featured: false,
      },
    ];

    render(
      <BrowserRouter>
        <DiscoverPoster featuredDestinations={destinationsWithMissingImages} />
      </BrowserRouter>,
    );

    const image = screen.getByTestId("optimized-image");
    expect(image).toHaveAttribute("src", "");
  });
});
