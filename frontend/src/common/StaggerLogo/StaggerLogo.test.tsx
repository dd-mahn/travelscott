import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import StaggerLogo from "./StaggerLogo";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

describe("StaggerLogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StaggerLogo />);
    
    // Check if all letters of "TravelScott" are rendered
    "TravelScott".split("").forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  it("renders with custom container className", () => {
    const customClass = "custom-class";
    render(<StaggerLogo containerClassName={customClass} />);
    
    const container = screen.getByText("T").closest("div")?.parentElement;
    expect(container).toHaveClass(customClass);
  });

  it("applies base container classes", () => {
    render(<StaggerLogo />);
    
    const container = screen.getByText("T").closest("div")?.parentElement;
    expect(container).toHaveClass(
      "pointer-events-none",
      "flex",
      "w-screen",
      "items-center",
      "justify-start",
      "overflow-y-hidden",
      "font-logo",
      "leading-[1]"
    );
  });

  it("applies whitespace-nowrap class to text container", () => {
    render(<StaggerLogo />);
    
    const textContainer = screen.getByText("T").closest("div");
    expect(textContainer).toHaveClass("whitespace-nowrap");
  });

  it("renders each character in separate spans", () => {
    render(<StaggerLogo />);
    
    const chars = "TravelScott".split("");
    const spans = screen.getAllByText(/./, { selector: 'span' });
    
    expect(spans).toHaveLength(chars.length);
    spans.forEach((span, index) => {
      expect(span).toHaveTextContent(chars[index]);
      expect(span).toHaveClass("inline-block", "w-fit", "select-none");
    });
  });
});
