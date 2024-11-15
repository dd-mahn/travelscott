import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import CountryOverview from "src/pages/Country/Components/Overview/CountryOverview";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, transition, viewport, ...validProps } = props;
      return <div data-testid="motion-div" {...validProps}>{children}</div>;
    },
    p: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, transition, viewport, ...validProps } = props;
      return <p data-testid="motion-p" {...validProps}>{children}</p>;
    }
  },
}));

describe("CountryOverview", () => {
  const mockCountry = {
    _id: "test-id",
    name: "Test Country",
    images: {
      flagImages: [],
      mapImages: [],
      otherImages: []
    },
    description: ["Test description 1", "Test description 2"],
    capital: "Test Capital",
    continent: "Test Continent",
    currency: "USD",
    language: "English",
    visaRequirement: "Visa Required",
    dialInCode: "+1",
    timeZone: "GMT+0",
    additionalInfo: {
      whenToVisit: "",
      transportation: "",
      healthAndSafety: ""
    },
    totalDestinations: 0
  };

  it("renders country description correctly", () => {
    render(<CountryOverview country={mockCountry} />);

    mockCountry.description.forEach(desc => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it("renders all info items with correct content", () => {
    render(<CountryOverview country={mockCountry} />);

    // Check if all labels are present
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Currency")).toBeInTheDocument();
    expect(screen.getByText("Capital")).toBeInTheDocument();
    expect(screen.getByText("Visa requirement")).toBeInTheDocument();
    expect(screen.getByText("Dial-in code")).toBeInTheDocument();
    expect(screen.getByText("Time zone")).toBeInTheDocument();

    // Check if all values are present
    expect(screen.getByText(mockCountry.language)).toBeInTheDocument();
    expect(screen.getByText(mockCountry.currency)).toBeInTheDocument();
    expect(screen.getByText(mockCountry.capital)).toBeInTheDocument();
    expect(screen.getByText(mockCountry.visaRequirement)).toBeInTheDocument();
    expect(screen.getByText(mockCountry.dialInCode)).toBeInTheDocument();
    expect(screen.getByText(mockCountry.timeZone)).toBeInTheDocument();
  });

  it("renders correct icons for info items", () => {
    render(<CountryOverview country={mockCountry} />);

    const expectedIcons = [
      "ri-global-line",
      "ri-money-dollar-circle-line", 
      "ri-government-line",
      "ri-visa-fill",
      "ri-phone-line",
      "ri-time-line"
    ];

    expectedIcons.forEach(iconClass => {
      const icon = document.querySelector(`.${iconClass}`);
      expect(icon).toBeInTheDocument();
    });
  });

  it("applies correct layout classes", () => {
    render(<CountryOverview country={mockCountry} />);

    // Check section classes
    const section = screen.getByTestId("country-overview");
    expect(section).toHaveClass("brief", "px-sect", "flex", "flex-col", "md:flex-row");

    // Check description container classes
    const descContainer = screen.getAllByTestId("motion-div")[0];
    expect(descContainer).toHaveClass("flex", "w-full", "md:w-1/2", "flex-col");

    // Check info grid classes
    const infoGrid = screen.getAllByTestId("motion-div")[1];
    expect(infoGrid).toHaveClass("grid", "w-full", "md:w-2/5", "grid-cols-2", "grid-rows-3");
  });
});
