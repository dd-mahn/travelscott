import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DestinationCatalog from "src/common/Catalogs/DestinationCatalog";
import Destination from "src/types/Destination";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, whileInView, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock DestinationCard component
vi.mock("src/common/Cards/DestinationCard", () => {
  return {
    __esModule: true,
    default: ({ destination }: { destination: Destination }) => (
      <div data-testid="destination-card">{destination.name}</div>
    ),
  };
});

// Mock CatalogPagination component
vi.mock("src/common/Pagination/Pagination", () => ({
  CatalogPagination: function MockCatalogPagination({ 
    count, 
    page, 
    handlePreviousClick, 
    handleNextClick 
  }: {
    count: number;
    page: number;
    handlePreviousClick: () => void;
    handleNextClick: () => void;
  }) {
    return (
      <div data-testid="catalog-pagination">
        <button onClick={handlePreviousClick} aria-label="Go to previous page">Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextClick} aria-label="Go to next page">Next</button>
      </div>
    );
  }
}));

const mockDestinations = [
  {
    _id: "1",
    name: "Test Destination 1",
    country: "Test Country",
    images: ["test1.jpg"],
    tags: ["nature"],
  },
  {
    _id: "2",
    name: "Test Destination 2",
    country: "Test Country",
    images: ["test2.jpg"],
    tags: ["adventure"],
  },
] as Destination[];

describe("DestinationCatalog", () => {
  const defaultProps = {
    destinations: mockDestinations,
    totalDestinations: 2,
    loading: false,
    error: null,
    currentPage: 1,
    onPageChange: vi.fn(),
    limit: 10,
    filterKey: "test",
  };

  it("renders without crashing", () => {
    render(<DestinationCatalog {...defaultProps} />);
  });

  it("displays loading state when loading", () => {
    render(<DestinationCatalog {...defaultProps} loading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state when there is an error", () => {
    render(<DestinationCatalog {...defaultProps} error="Test error" />);
    expect(
      screen.getByText("Error... Please reload or try again later.")
    ).toBeInTheDocument();
  });

  it("displays not found state when no destinations", () => {
    render(
      <DestinationCatalog {...defaultProps} destinations={[]} totalDestinations={0} />
    );
    expect(screen.getByText("Nothing available at the moment, please reload or try again later.")).toBeInTheDocument();
  });

  it("renders destination cards when destinations are provided", () => {
    render(<DestinationCatalog {...defaultProps} />);
    const cards = screen.getAllByTestId("destination-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Test Destination 1")).toBeInTheDocument();
    expect(screen.getByText("Test Destination 2")).toBeInTheDocument();
  });

  it("has correct grid layout classes", () => {
    render(<DestinationCatalog {...defaultProps} />);
    const grid = screen.getByText("Test Destination 1").closest(".grid");
    expect(grid).toHaveClass("grid-cols-2");
    expect(grid).toHaveClass("md:grid-cols-3");
    expect(grid).toHaveClass("gap-x-4");
    expect(grid).toHaveClass("gap-y-8");
  });

  it("calls onPageChange when pagination is used", async () => {
    const onPageChange = vi.fn();
    render(<DestinationCatalog {...defaultProps} onPageChange={onPageChange} />);
    
    // Find and click next page button
    const nextButton = screen.getByLabelText("Go to next page");
    
    await act(async () => {
      nextButton.click();
    });
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
