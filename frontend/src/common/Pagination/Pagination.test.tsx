import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CatalogPagination, ButtonPagination, DotPagination } from "./Pagination";

// Update the framer-motion mock
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, layout, ...props }: any) => (
      <div data-layout={layout} {...props}>
        {children}
      </div>
    ),
    button: ({ children, whileHover, whileTap, variants, ...props }: any) => (
      <button 
        data-framer-hover={whileHover}
        data-framer-tap={whileTap}
        data-variants={JSON.stringify(variants)}
        {...props}
      >
        {children}
      </button>
    ),
    span: ({ children, variants, animate, ...props }: any) => (
      <span 
        data-variants={JSON.stringify(variants)}
        data-animate={animate}
        {...props}
      >
        {children}
      </span>
    ),
  },
}));

describe("CatalogPagination", () => {
  const defaultProps = {
    count: 100,
    page: 1,
    limit: 10,
    handlePreviousClick: vi.fn(),
    handlePageClick: vi.fn(),
    handleNextClick: vi.fn(),
  };

  it("renders correct range text", () => {
    render(<CatalogPagination {...defaultProps} />);
    expect(screen.getByText((content, element) => {
      const hasText = (node: Element | null) => node?.textContent === 'Showing 1 to 10 of 100 results';
      const elementHasText = hasText(element);
      return elementHasText;
    })).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<CatalogPagination {...defaultProps} />);
    const prevButton = screen.getByTitle("Previous");
    expect(prevButton.querySelector(".opacity-50")).toBeInTheDocument();
  });

  it("enables previous button after first page", () => {
    render(<CatalogPagination {...defaultProps} page={2} />);
    const prevButton = screen.getByTitle("Previous");
    fireEvent.click(prevButton);
    expect(defaultProps.handlePreviousClick).toHaveBeenCalled();
  });

  it("renders correct number of page buttons", () => {
    render(<CatalogPagination {...defaultProps} />);
    const pageButtons = screen.getAllByRole("button")
      .filter(button => {
        const text = button.textContent;
        return text && !isNaN(Number(text)) && text.trim() !== '';
      });
    expect(pageButtons).toHaveLength(10);
  });
});

describe("ButtonPagination", () => {
  const defaultProps = {
    count: 3,
    index: 0,
    handlePreviousClick: vi.fn(),
    handleNextClick: vi.fn(),
  };

  it("hides previous button on first page", () => {
    render(<ButtonPagination {...defaultProps} />);
    expect(screen.queryByText("Previous")).not.toBeInTheDocument();
  });

  it("shows both buttons on middle page", () => {
    render(<ButtonPagination {...defaultProps} index={1} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("hides next button on last page", () => {
    render(<ButtonPagination {...defaultProps} index={2} />);
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});

describe("DotPagination", () => {
  const defaultProps = {
    count: 3,
    index: 0,
    handlePreviousClick: vi.fn(),
    handleNextClick: vi.fn(),
  };

  it("renders three dots", () => {
    render(<DotPagination {...defaultProps} />);
    const dots = screen.getAllByTestId('pagination-dot');
    expect(dots).toHaveLength(3);
  });

  it("disables previous button on first page", () => {
    render(<DotPagination {...defaultProps} />);
    const prevButton = screen.getByTitle("Prev");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<DotPagination {...defaultProps} index={2} />);
    const nextButton = screen.getByTitle("Next");
    expect(nextButton).toBeDisabled();
  });

  it("calls handlers on button clicks", () => {
    render(<DotPagination {...defaultProps} index={1} />);
    
    fireEvent.click(screen.getByTitle("Prev"));
    expect(defaultProps.handlePreviousClick).toHaveBeenCalled();

    fireEvent.click(screen.getByTitle("Next"));
    expect(defaultProps.handleNextClick).toHaveBeenCalled();
  });
});
