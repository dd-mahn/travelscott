import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PlaceDialog from "./PlaceDialog";
import { placeToVisit, placeToStay, placeToEat } from "src/types/Destination";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    dialog: ({ children, open, className }: any) => (
      <dialog open={open} className={className}>
        {children}
      </dialog>
    ),
    div: ({ children, className, onClick }: any) => (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    ),
    span: ({ children, className }: any) => (
      <span className={className}>{children}</span>
    ),
    h3: ({ children, className }: any) => (
      <h3 className={className}>{children}</h3>
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

describe("PlaceDialog", () => {
  const mockPlace: placeToStay = {
    name: "Test Place",
    type: "stay",
    image_url: "test-image.jpg",
    description: "Test description",
    location: { on_map: "test-map-link", address: "Test Address" },
    price: { currency: "USD", value: 100 },
    rating: [
      {  
        website: "booking.com", 
        value: 4.5, 
        link: "test-booking-link" 
      },
      { 
        website: "tripadvisor.com", 
        value: 4.0, 
        link: "test-tripadvisor-link" 
      }
    ],
  };

  it("renders PlaceDialog with correct content for 'to_visit' category", () => {
    render(<PlaceDialog place={mockPlace} category="to_visit" />);

    expect(screen.getByText("Test Place")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Test Address")).toBeInTheDocument();
  });

  it("renders PlaceDialog with correct content for 'to_eat' category", () => {
    render(<PlaceDialog place={mockPlace} category="to_eat" />);

    expect(screen.getByText("Test Place")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Test Address")).toBeInTheDocument();
    expect(screen.getByText("From: USD - 100")).toBeInTheDocument();
  });

  it("renders PlaceDialog with correct content for 'to_stay' category", () => {
    render(<PlaceDialog place={mockPlace} category="to_stay" />);

    expect(screen.getByText("Test Place")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Test Address")).toBeInTheDocument();
    expect(screen.getByText("From: USD - 100")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
