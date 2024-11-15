import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DestinationInsight from "src/pages/Destination/Components/Insight/DestinationInsight";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: any) => (
      <div className={className}>{children}</div>
    ),
    h2: ({ children, className }: any) => (
      <h2 className={className}>{children}</h2>
    ),
    p: ({ children, className }: any) => (
      <p className={className}>{children}</p>
    ),
  },
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to, target, className }: any) => (
    <a href={to} target={target} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("src/common/RelatedSections/RelatedSections", () => ({
  default: () => <div data-testid="mock-related-sections"></div>,
}));

vi.mock("src/common/SlideRevealIconHeading/SlideRevealIconHeading", () => ({
  default: () => <div data-testid="mock-slide-reveal-icon-heading"></div>,
}));

const mockDestination = {
  _id: "sample-id",
  name: "Sample Destination",
  location: "Sample Location",
  video: "http://example.com/video",
  description: "Sample Description",
  images: ["http://example.com/image1", "http://example.com/image2"],
  country: "Sample Country",
  continent: "Sample Continent",
  additionalInfo: {
    whenToVisit: "Spring",
    whoToGoWith: "Friends",
    whatToExpect: "Sunny",
    healthAndSafety: "Sample Safety Information",
  },
  places: {
    to_visit: [],
    to_eat: [],
    to_stay: [],
  },
  transportation: {
    overview: "Sample Transportation Overview",
    types: [],
  },
  tags: ["Sample Tag 1", "Sample Tag 2"],
  insight: {
    from_us: {
      tips: ["Tip 1", "Tip 2"],
      article: [],
    },
    from_others: [
      { title: "Article 1", link: "http://example.com/article1" },
      { title: "Article 2", link: "http://example.com/article2" },
    ],
  },
  summary: "Sample Summary",
  featured: true,
};

describe("DestinationInsight", () => {
  it("renders tips from 'from_us'", () => {
    render(<DestinationInsight destination={mockDestination} />);
    expect(screen.getByText("Tip 1")).toBeInTheDocument();
    expect(screen.getByText("Tip 2")).toBeInTheDocument();
  });

  it("renders articles from 'from_others'", () => {
    render(<DestinationInsight destination={mockDestination} />);
    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
  });

  it("renders RelatedSections component", () => {
    render(<DestinationInsight destination={mockDestination} />);
    expect(screen.getByTestId("mock-related-sections")).toBeInTheDocument();
  });

  it("renders SlideRevealIconHeading component", () => {
    render(<DestinationInsight destination={mockDestination} />);
    expect(screen.getByTestId("mock-slide-reveal-icon-heading")).toBeInTheDocument();
  });
});
