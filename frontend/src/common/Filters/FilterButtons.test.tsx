import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterButton from "src/common/Filters/FilterButton";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, whileHover, whileTap, whileInView, animate, variants, ...props }: any, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )),
    button: React.forwardRef(({ children, whileHover, whileTap, whileInView, animate, variants, ...props }: any, ref) => (
      <button ref={ref} {...props}>
        {children}
      </button>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("FilterButton", () => {
  it("renders filter button with icon", () => {
    render(<FilterButton>Test Content</FilterButton>);
    const button = screen.getByTitle("filter");
    expect(button).toBeInTheDocument();
    expect(button.querySelector(".ri-filter-3-line")).toBeInTheDocument();
  });

  it("toggles filter board on button click", () => {
    render(
      <FilterButton>
        <div data-testid="filter-content">Filter Content</div>
      </FilterButton>
    );

    // Initially content should not be visible
    expect(screen.queryByTestId("filter-content")).not.toBeInTheDocument();

    // Click to show content
    fireEvent.click(screen.getByTitle("filter"));
    expect(screen.getByTestId("filter-content")).toBeInTheDocument();

    // Click again to hide content
    fireEvent.click(screen.getByTitle("filter"));
    expect(screen.queryByTestId("filter-content")).not.toBeInTheDocument();
  });

  it("calls onFilterBoardClose when clicking outside", () => {
    const mockOnClose = vi.fn();
    render(
      <div>
        <FilterButton onFilterBoardClose={mockOnClose}>
          <div data-testid="filter-content">Filter Content</div>
        </FilterButton>
        <div data-testid="outside">Outside Content</div>
      </div>
    );

    // Open filter board
    fireEvent.click(screen.getByTitle("filter"));
    expect(screen.getByTestId("filter-content")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("applies correct styling to filter button", () => {
    render(<FilterButton>Test Content</FilterButton>);
    const button = screen.getByTitle("filter");
    
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("bg-background-dark");
    expect(button).toHaveClass("shadow-component");
  });

  it("rotates icon when filter board is open", () => {
    render(<FilterButton>Test Content</FilterButton>);
    const button = screen.getByTitle("filter");
    const icon = button.querySelector(".ri-filter-3-line");

    // Initially no rotation
    expect(icon).not.toHaveClass("rotate-180");

    // Click to open
    fireEvent.click(button);
    expect(icon).toHaveClass("rotate-180");

    // Click to close
    fireEvent.click(button);
    expect(icon).not.toHaveClass("rotate-180");
  });
});
