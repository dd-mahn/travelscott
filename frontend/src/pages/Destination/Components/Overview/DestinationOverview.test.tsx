import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DestinationOverview from "src/pages/Destination/Components/Overview/DestinationOverview";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    h2: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    p: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  },
}));

vi.mock("src/pages/Destination/Components/Menu/DestinationMenu", () => ({
  default: () => <div data-testid="mock-destination-menu"></div>,
}));

describe("DestinationOverview", () => {
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
    tags: ["tag1", "tag2"],
    insight: {},
    summary: "Test summary",
    featured: false
  };

  it("renders location heading", () => {
    render(<DestinationOverview destination={mockDestination} />);
    expect(screen.getByText("Test Location")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<DestinationOverview destination={mockDestination} />);
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<DestinationOverview destination={mockDestination} />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders DestinationMenu component", () => {
    render(<DestinationOverview destination={mockDestination} />);
    expect(screen.getByTestId("mock-destination-menu")).toBeInTheDocument();
  });
});
