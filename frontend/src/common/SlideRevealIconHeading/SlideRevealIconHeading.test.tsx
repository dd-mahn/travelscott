import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SlideRevealIconHeading from "./SlideRevealIconHeading";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    i: ({ children, className }: any) => <i className={className}>{children}</i>,
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
    div: ({ children, className }: any) => <div className={className}>{children}</div>
  },
  useAnimation: () => ({
    start: vi.fn(),
  }),
  useInView: () => true,
}));

describe("SlideRevealIconHeading", () => {
  const defaultProps = {
    iconClass: "test-icon",
    headingText: "Test Heading",
  };

  it("renders with provided props", () => {
    render(<SlideRevealIconHeading {...defaultProps} />);

    // Check if icon is rendered with correct class
    expect(screen.getByTestId("icon")).toHaveClass("test-icon");

    // Check if heading text is rendered
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders with different icon class and heading text", () => {
    const props = {
      iconClass: "different-icon",
      headingText: "Different Heading",
    };

    render(<SlideRevealIconHeading {...props} />);

    expect(screen.getByTestId("icon")).toHaveClass("different-icon");
    expect(screen.getByText("Different Heading")).toBeInTheDocument();
  });

  it("applies correct base classes", () => {
    render(<SlideRevealIconHeading {...defaultProps} />);

    // Check if icon has the base heading class
    expect(screen.getByTestId("icon")).toHaveClass("h1-md");

    // Check if heading has the base heading class and line height
    const heading = screen.getByText("Test Heading");
    expect(heading).toHaveClass("h1-md");
    expect(heading.closest("h1")).toHaveClass("leading-[1.2]");
  });

  it("wraps heading in overflow hidden container", () => {
    render(<SlideRevealIconHeading {...defaultProps} />);

    const heading = screen.getByText("Test Heading");
    expect(heading.closest("div")).toHaveClass("overflow-hidden");
  });
});
