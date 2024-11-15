import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchResult from "src/common/SearchResult/SearchResult";
import Country from "src/types/Country";
import Blog from "src/types/Blog";
import Destination from "src/types/Destination";

// Mock Lenis since it's a client-side library
vi.mock("lenis", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      raf: vi.fn(),
      destroy: vi.fn(),
    })),
  };
});

describe("SearchResult", () => {
  const mockProps = {
    open: true,
    blogs: [
      {
        _id: "1",
        title: "Test Blog",
        image: "test-blog.jpg",
        category: "travel",
        tags: ["test"],
        author: "Test Author",
        content: [{
        }],
        time: "2024-03-20",
        related_destination: "1",
        featured: false
      } as Blog,
    ],
    countries: [
      {
        _id: "1",
        name: "Test Country", 
        description: ["Test description"],
        capital: "Test Capital",
        continent: "Europe",
        currency: "EUR",
        language: "Test Language",
        visaRequirement: "Test Visa Requirement",
        dialInCode: "Test Dial-in Code",
        timeZone: "UTC+1",
        additionalInfo: {
          whenToVisit: "Test When to Visit",
          transportation: "Test Transportation",
          healthAndSafety: "Test Health and Safety",
        },
        totalDestinations: 10,
        images: {
          mapImages: ["test-map.jpg"],
          flagImages: ["test-flag.jpg"],
          otherImages: [],
        },
      } as Country,
    ],
    destinations: [
      {
        _id: "1",
        name: "Test Destination",
        description: "Test description",
        continent: "Europe",
        country: "Test Country",
        tags: ["test"],
        images: ["test-dest.jpg"],
        featured: false,
        additionalInfo: {
          whenToVisit: "Test When to Visit",
          whoToGoWith: "Test Who to Go With",
          whatToExpect: "Test What to Expect",
          healthAndSafety: "Test Health and Safety",
        },
        places: {
          main: "Test Main",
          nearby: "Test Nearby",
        },
        transportation: {
            overview: "Test Overview",
            types: [],
        },
        insight: {
          from_us: {
            tips: ["Test Tips"],
            article: [{
                title: "Test Title",
                id: "1",
            }],
          },
          from_others: [{
            title: "Test Title",
            link: "Test Link",
          }],
        },
        summary: "Test Summary",
        location: "Test Location",
        video: "Test Video",
      } as Destination,
    ],
    closeFunc: vi.fn(),
  };

  it("renders search result when open is true", () => {
    render(
      <BrowserRouter>
        <SearchResult {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("3 results found")).toBeInTheDocument();
    expect(screen.getByText("Test Blog")).toBeInTheDocument();
    expect(screen.getByText("Test Country")).toBeInTheDocument();
    expect(screen.getByText("Test Destination")).toBeInTheDocument();
  });

  it("doesn't render when open is false", () => {
    render(
      <BrowserRouter>
        <SearchResult {...mockProps} open={false} />
      </BrowserRouter>
    );

    expect(screen.queryByText("3 results found")).not.toBeInTheDocument();
  });

  it("calls closeFunc when close button is clicked", () => {
    render(
      <BrowserRouter>
        <SearchResult {...mockProps} />
      </BrowserRouter>
    );

    const closeButton = screen.getByTitle("Close");
    fireEvent.click(closeButton);
    expect(mockProps.closeFunc).toHaveBeenCalled();
  });

  it("renders correct number of results", () => {
    render(
      <BrowserRouter>
        <SearchResult {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Destinations")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  it("doesn't render sections with no results", () => {
    const propsWithoutResults = {
      ...mockProps,
      blogs: [],
      countries: [],
      destinations: [],
    };

    render(
      <BrowserRouter>
        <SearchResult {...propsWithoutResults} />
      </BrowserRouter>
    );

    expect(screen.getByText("0 results found")).toBeInTheDocument();
    expect(screen.queryByText("Countries")).not.toBeInTheDocument();
    expect(screen.queryByText("Destinations")).not.toBeInTheDocument();
    expect(screen.queryByText("Articles")).not.toBeInTheDocument();
  });

  it("renders correct links for each result type", () => {
    render(
      <BrowserRouter>
        <SearchResult {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("link", { name: /test blog/i })).toHaveAttribute(
      "href",
      "/inspiration/1"
    );
    expect(screen.getByRole("link", { name: /test country/i })).toHaveAttribute(
      "href",
      "/discover/countries/1"
    );
    expect(screen.getByRole("link", { name: /test destination/i })).toHaveAttribute(
      "href",
      "/discover/destinations/1"
    );
  });
});
