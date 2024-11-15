import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DestinationTransportation from "src/pages/Destination/Components/Transportation/DestinationTransportation";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    p: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
    button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
      <button onClick={onClick}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("src/common/SlideRevealIconHeading/SlideRevealIconHeading", () => ({
  default: () => <div data-testid="mock-slide-reveal-icon-heading"></div>,
}));

describe("DestinationTransportation", () => {
  const mockTransportation = {
    overview: "Test overview",
    types: [
      {
        name: "Type 1",
        image: "image1.jpg",
        description: "Description 1",
        options: [{ name: "Option 1" }],
        price_range: { currency: "USD", min_price: 10, max_price: 20 },
        quick_review: "Quick review 1",
      },
      {
        name: "Type 2",
        image: "image2.jpg",
        description: "Description 2",
        options: [{ name: "Option 2" }],
        price_range: { currency: "USD", min_price: 15, max_price: 25 },
        quick_review: "Quick review 2",
      },
    ],
  };

  it("renders transportation overview", () => {
    render(<DestinationTransportation transportation={mockTransportation} />);
    expect(screen.getByText("Test overview")).toBeInTheDocument();
  });

  it("renders transportation types and handles click events", () => {
    render(<DestinationTransportation transportation={mockTransportation} />);
    
    const type2Button = screen.getByText("Type 2");

    // Initially, no type details should be visible
    expect(screen.queryByText("Description 1")).toBeInTheDocument();
    expect(screen.queryByText("Description 2")).not.toBeInTheDocument();

    // Click on Type 2 button
    fireEvent.click(type2Button);
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("USD 15 - 25")).toBeInTheDocument();
    expect(screen.getByText("Quick review 2")).toBeInTheDocument();
  });
});
