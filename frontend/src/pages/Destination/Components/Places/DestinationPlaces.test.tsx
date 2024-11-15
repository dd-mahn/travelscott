import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DestinationPlaces from "src/pages/Destination/Components/Places/DestinationPlaces";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    span: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    h2: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    p: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("src/common/SlideRevealIconHeading/SlideRevealIconHeading", () => ({
  default: () => <div data-testid="mock-slide-reveal-icon-heading"></div>,
}));

vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt, onClick }: { src: string, alt: string, onClick: () => void }) => (
    <img src={src} alt={alt} onClick={onClick} data-testid="mock-optimized-image" />
  ),
}));

vi.mock("src/pages/Destination/Components/Places/PlaceDialog", () => ({
  default: ({ place, category, onClose }: { place: any; category: string; onClose?: () => void }) => (
    <div data-testid="mock-place-dialog" onClick={onClose}>
      <span>{place.name}</span>
      <span>{category}</span>
    </div>
  ),
}));

import { destinationPlace } from "src/types/Destination";

const mockPlaces: destinationPlace = {
  to_visit: [
    { name: "Place 1", type: "visit", image_url: "image1.jpg", description: "", location: { on_map: "", address: "" }, tips: [] },
    { name: "Place 2", type: "visit", image_url: "image2.jpg", description: "", location: { on_map: "", address: "" }, tips: [] },
  ],
  to_eat: [
    { name: "Restaurant 1", type: "eat", image_url: "image3.jpg", description: "", location: { on_map: "", address: "" }, price: { currency: "", value: 0 }, favorites: [], rating: [{ website: "", value: 0, link: "" }] },
    { name: "Restaurant 2", type: "eat", image_url: "image4.jpg", description: "", location: { on_map: "", address: "" }, price: { currency: "", value: 0 }, favorites: [], rating: [{ website: "", value: 0, link: "" }] },
  ],
  to_stay: [
    { name: "Hotel 1", type: "stay", image_url: "image5.jpg", description: "", location: { on_map: "", address: "" }, price: { currency: "", value: 0 }, rating: [{ website: "", value: 0, link: "" }] },
    { name: "Hotel 2", type: "stay", image_url: "image6.jpg", description: "", location: { on_map: "", address: "" }, price: { currency: "", value: 0 }, rating: [{ website: "", value: 0, link: "" }] },
  ],
};

describe("DestinationPlaces", () => {
  it("renders SlideRevealIconHeading component", () => {
    render(<DestinationPlaces places={mockPlaces} />);
    expect(screen.getByTestId("mock-slide-reveal-icon-heading")).toBeInTheDocument();
  });

  it("renders places based on selected category", () => {
    render(<DestinationPlaces places={mockPlaces} />);
    expect(screen.getByText("Place 1")).toBeInTheDocument();
    expect(screen.getByText("Place 2")).toBeInTheDocument();
  });

  it("changes category and renders new places", () => {
    render(<DestinationPlaces places={mockPlaces} />);
    fireEvent.click(screen.getByText("/eat"));
    expect(screen.getByText("Restaurant 1")).toBeInTheDocument();
    expect(screen.getByText("Restaurant 2")).toBeInTheDocument();
  });

  it("opens and closes PlaceDialog on place click and scroll", () => {
    // Mock window innerHeight for consistent testing
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000, // 1000px height
    });

    render(<DestinationPlaces places={mockPlaces} />);
    
    // Click the image to open dialog
    const placeImage = screen.getAllByTestId("mock-optimized-image")[0];
    fireEvent.click(placeImage);
    
    expect(screen.getByTestId("mock-place-dialog")).toBeInTheDocument();

    // Simulate scrolling down
    fireEvent.scroll(window, { target: { scrollY: 800 } });
    
    expect(screen.queryByTestId("mock-place-dialog")).not.toBeInTheDocument();
  });
});
