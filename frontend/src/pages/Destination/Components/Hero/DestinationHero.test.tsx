import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DestinationHero from "src/pages/Destination/Components/Hero/DestinationHero";

// Mock the dependencies
vi.mock("@material-tailwind/react", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-carousel">{children}</div>,
}));

vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="mock-optimized-image" src={src} alt={alt} />
  ),
}));

describe("DestinationHero", () => {
  const mockDestination = {
    _id: "test-id",
    name: "CITY",
    country: "Test Country",
    images: ["image1.jpg", "image2.jpg"],
    description: "Test description",
    location: "Test Location",
    continent: "Test Continent",
    video: "test-video.mp4",
    additionalInfo: {
      whenToVisit: "",
      whoToGoWith: "",
      whatToExpect: "",
      healthAndSafety: ""
    },
    places: {},
    transportation: {},
    tags: [],
    insight: {},
    summary: "Test summary",
    featured: false
  };

  it("renders destination name and country", () => {
    render(<DestinationHero destination={mockDestination} />);
    
    expect(screen.getByText("Test Country")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument(); // First letter
    expect(screen.getByText("I")).toBeInTheDocument(); // Second letter
    expect(screen.getByText("T")).toBeInTheDocument(); // Third letter
    expect(screen.getByText("Y")).toBeInTheDocument(); // Fourth letter
  });

  it("renders carousel with images", () => {
    render(<DestinationHero destination={mockDestination} />);
    
    const carousel = screen.getByTestId("mock-carousel");
    expect(carousel).toBeInTheDocument();
    
    const images = screen.getAllByTestId("mock-optimized-image");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "image1.jpg");
    expect(images[0]).toHaveAttribute("alt", "CITY");
    expect(images[1]).toHaveAttribute("src", "image2.jpg");
    expect(images[1]).toHaveAttribute("alt", "CITY");
  });

  it("renders with empty images array", () => {
    const destinationNoImages = {
      ...mockDestination,
      images: [],
    };
    
    render(<DestinationHero destination={destinationNoImages} />);
    
    const carousel = screen.getByTestId("mock-carousel");
    expect(carousel).toBeInTheDocument();
    expect(screen.queryAllByTestId("mock-optimized-image")).toHaveLength(0);
  });
});
