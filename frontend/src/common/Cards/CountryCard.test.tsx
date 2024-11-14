import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CountryCard from "./CountryCard";
import Country from "src/types/Country";

// Mock OptimizedImage component
vi.mock("src/common/OptimizedImage/OptimizedImage", () => {
  return {
    __esModule: true,
    default: ({ src, alt, className }: any) => (
      <img src={src} alt={alt} className={className} data-testid="optimized-image" />
    ),
  };
});

const mockCountry = {
  _id: "123",
  name: "Test Country",
  totalDestinations: 5,
  images: {
    flagImages: ["test-flag.jpg"]
  }
} as Country;

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("CountryCard", () => {
  it("renders without crashing", () => {
    render(
      <RouterWrapper>
        <CountryCard country={mockCountry} />
      </RouterWrapper>
    );
  });

  it("displays country name", () => {
    render(
      <RouterWrapper>
        <CountryCard country={mockCountry} />
      </RouterWrapper>
    );
    expect(screen.getByText("Test Country")).toBeInTheDocument();
  });

  it("displays total destinations count", () => {
    render(
      <RouterWrapper>
        <CountryCard country={mockCountry} />
      </RouterWrapper>
    );
    expect(screen.getByText("5 destinations")).toBeInTheDocument();
  });

  it("renders flag image when provided", () => {
    render(
      <RouterWrapper>
        <CountryCard country={mockCountry} />
      </RouterWrapper>
    );
    const image = screen.getByTestId("optimized-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-flag.jpg");
    expect(image).toHaveAttribute("alt", "Test Country");
  });

  it("links to correct country detail page", () => {
    render(
      <RouterWrapper>
        <CountryCard country={mockCountry} />
      </RouterWrapper>
    );
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/countries/123");
    });
  });

  it("has correct layout classes", () => {
    render(
      <RouterWrapper>
        <CountryCard country={mockCountry} />
      </RouterWrapper>
    );
    const container = screen.getByText("Test Country").closest(".flex");
    expect(container).toHaveClass("h-fit");
    expect(container).toHaveClass("flex-col");
    expect(container).toHaveClass("justify-start");
    expect(container).toHaveClass("gap-0");
  });
});
