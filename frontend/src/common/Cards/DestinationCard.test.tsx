import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import Destination from "src/types/Destination";

// Mock OptimizedImage component
vi.mock("src/common/OptimizedImage/OptimizedImage", () => {
  return {
    __esModule: true,
    default: ({ src, alt, className }: any) => (
      <img src={src} alt={alt} className={className} data-testid="optimized-image" />
    ),
  };
});

const mockDestination = {
  _id: "123",
  name: "Test Destination",
  country: "Test Country",
  images: ["test-image.jpg"],
  tags: ["nature", "adventure"],
} as Destination;

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("DestinationCard", () => {
  it("renders without crashing", () => {
    render(
      <RouterWrapper>
        <DestinationCard destination={mockDestination} />
      </RouterWrapper>
    );
  });

  it("displays destination name and country", () => {
    render(
      <RouterWrapper>
        <DestinationCard destination={mockDestination} />
      </RouterWrapper>
    );
    expect(screen.getByText("Test Destination")).toBeInTheDocument();
    expect(screen.getByText("Test Country")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(
      <RouterWrapper>
        <DestinationCard destination={mockDestination} />
      </RouterWrapper>
    );
    const image = screen.getByTestId("optimized-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Destination");
  });

  it("renders tags correctly", () => {
    render(
      <RouterWrapper>
        <DestinationCard destination={mockDestination} />
      </RouterWrapper>
    );
    mockDestination.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("links to correct destination detail page", () => {
    render(
      <RouterWrapper>
        <DestinationCard destination={mockDestination} />
      </RouterWrapper>
    );
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute(
        "href",
        `/discover/destinations/${mockDestination._id}`
      );
    });
  });

  it("has correct styling classes", () => {
    render(
      <RouterWrapper>
        <DestinationCard destination={mockDestination} />
      </RouterWrapper>
    );
    const container = screen.getByTestId("destination-card");
    expect(container).toHaveClass("destination-card");
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("w-full");
    expect(container).toHaveClass("flex-col");
  });
});
