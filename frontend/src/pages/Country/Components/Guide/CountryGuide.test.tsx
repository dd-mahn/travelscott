import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CountryGuide from "src/pages/Country/Components/Guide/CountryGuide";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, whileInView, animate, variants, transition, viewport, ...validProps } = props;
      return <div data-testid="motion-div" {...validProps}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, variants, animate, transition, ...validProps } = props;
      return <button data-testid="motion-button" {...validProps}>{children}</button>;
    }
  },
  AnimatePresence: ({ children }: any) => <div data-testid="animate-presence">{children}</div>
}));

describe("CountryGuide", () => {
  const mockCountry = {
    _id: "test-id",
    name: "Test Country",
    images: {
      flagImages: [],
      mapImages: [],
      otherImages: []
    },
    description: [],
    capital: "",
    continent: "",
    currency: "",
    language: "",
    visaRequirement: "",
    dialInCode: "",
    timeZone: "",
    additionalInfo: {
      whenToVisit: "Best time to visit is summer",
      transportation: "Public transport is available", 
      healthAndSafety: "Healthcare is good"
    },
    totalDestinations: 0
  };

  it("renders all guide sections", () => {
    render(<CountryGuide country={mockCountry} />);

    expect(screen.getByText("When to visit?")).toBeInTheDocument();
    expect(screen.getByText("Transportation")).toBeInTheDocument();
    expect(screen.getByText("Health & Safety")).toBeInTheDocument();
  });

  it("toggles content visibility when clicking buttons", () => {
    render(<CountryGuide country={mockCountry} />);

    // Initially content should be hidden
    expect(screen.queryByTestId("when-to-visit?-content")).not.toBeInTheDocument();

    // Click to show content
    const buttons = screen.getAllByTitle("open btn");
    fireEvent.click(buttons[0]);

    // Content should now be visible
    const content = screen.getByTestId("when-to-visit?-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Best time to visit is summer");

    // Click again to hide
    fireEvent.click(buttons[0]);

    // Content should be hidden again
    expect(screen.queryByTestId("when-to-visit?-content")).not.toBeInTheDocument();
  });

  it("applies correct layout classes", () => {
    render(<CountryGuide country={mockCountry} />);

    // Use getAllByTestId and get the first element for the main container
    const mainContainer = screen.getAllByTestId("motion-div")[0];
    expect(mainContainer).toHaveClass("px-sect", "flex", "h-screen", "w-full", "flex-col");

    // Get all sections (skip the first one which is the main container)
    const sections = screen.getAllByTestId("motion-div").slice(1);
    sections.forEach(section => {
      expect(section).toHaveClass("z-10", "w-full", "md:w-[80%]", "lg:w-[60%]", "rounded-xl", "md:rounded-3xl");
    });
  });

  it("shows only one section at a time", () => {
    render(<CountryGuide country={mockCountry} />);

    const buttons = screen.getAllByTitle("open btn");

    // Click first section
    fireEvent.click(buttons[0]);
    expect(screen.getByTestId("when-to-visit?-content")).toBeInTheDocument();
    expect(screen.queryByTestId("transportation-content")).not.toBeInTheDocument();

    // Click second section
    fireEvent.click(buttons[1]);
    expect(screen.queryByTestId("when-to-visit?-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("transportation-content")).toBeInTheDocument();
  });
});
