import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FeaturedContentSlider from "./FeaturedContentSlider";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => true,
}));

describe("FeaturedContentSlider", () => {
  const mockSlides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  it("renders first slide initially", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  it("navigates to next slide when clicking next button", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  it("navigates to previous slide when clicking previous button", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    
    // Go to slide 2 first
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    
    // Then go back to slide 1
    const prevButton = screen.getByLabelText("Go to previous page");
    fireEvent.click(prevButton);
    
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  it("does not navigate past the last slide", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    
    // Try to go to last slide
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton); // This click should have no effect
    
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("does not navigate before the first slide", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    
    const prevButton = screen.getByLabelText("Go to previous page");
    fireEvent.click(prevButton); // This click should have no effect
    
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  it("renders dot pagination with correct number of dots", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    
    const dots = screen.getAllByRole("button");
    // Add 2 for next/prev buttons
    expect(dots.length).toBe(mockSlides.length + 2);
  });

  it("updates active dot when navigating slides", () => {
    render(<FeaturedContentSlider children={mockSlides} />);
    
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    
    const dots = screen.getAllByTestId("dot");
    expect(dots[1]).toHaveClass("bg-text-light");
  });
});
