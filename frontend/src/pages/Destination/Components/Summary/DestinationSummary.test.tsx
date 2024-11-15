import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DestinationSummary from "src/pages/Destination/Components/Summary/DestinationSummary";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    p: ({ children, className, initial, whileInView, viewport, variants, transition }: any) => (
      <p className={className}>{children}</p>
    ),
  },
}));

vi.mock("src/common/SlideRevealIconHeading/SlideRevealIconHeading", () => ({
  default: () => <div data-testid="mock-slide-reveal-icon-heading"></div>,
}));

describe("DestinationSummary", () => {
  const mockSummary = "This is a sample summary for the destination.";

  it("renders SlideRevealIconHeading component", () => {
    render(<DestinationSummary summary={mockSummary} />);
    expect(screen.getByTestId("mock-slide-reveal-icon-heading")).toBeInTheDocument();
  });

  it("renders the summary text", () => {
    render(<DestinationSummary summary={mockSummary} />);
    expect(screen.getByText(mockSummary)).toBeInTheDocument();
  });

  it("renders the additional message", () => {
    render(<DestinationSummary summary={mockSummary} />);
    expect(screen.getByText("Have a good trip!")).toBeInTheDocument();
  });
});
