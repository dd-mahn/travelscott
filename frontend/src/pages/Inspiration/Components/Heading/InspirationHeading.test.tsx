import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import InspirationHeading from "src/pages/Inspiration/Components/Heading/InspirationHeading";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    h1: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, ...validProps } = props;
      return <h1 data-testid="motion-h1" {...validProps}>{children}</h1>;
    },
  },
}));

// Mock SeasonHeading component
vi.mock("src/common/SeasonHeading/SeasonHeading", () => ({
  default: () => <div data-testid="season-heading">Mocked Season Heading</div>,
}));

// Mock getInspirationHeading utility
vi.mock("src/utils/inspirationUtils", () => ({
  getInspirationHeading: (category: string) => `${category} Inspiration`,
}));

describe("InspirationHeading", () => {
  it("renders SeasonHeading when category is 'All'", () => {
    render(<InspirationHeading currentCategory="All" />);
    
    expect(screen.getByTestId("season-heading")).toBeInTheDocument();
    expect(screen.queryByTestId("motion-h1")).not.toBeInTheDocument();
  });

  it("renders category heading when category is not 'All'", () => {
    render(<InspirationHeading currentCategory="Nature" />);
    
    expect(screen.getByText("Nature Inspiration")).toBeInTheDocument();
    expect(screen.queryByTestId("season-heading")).not.toBeInTheDocument();
  });

  it("applies correct classes to container", () => {
    render(<InspirationHeading currentCategory="Nature" />);
    
    const container = screen.getByText("Nature Inspiration").closest("div");
    expect(container?.parentElement).toHaveClass("z-20", "h-fit", "overflow-hidden", "pt-28", "lg:pt-10", "2xl:pt-20");
  });

  it("applies correct classes to heading", () => {
    render(<InspirationHeading currentCategory="Nature" />);
    
    const heading = screen.getByTestId("motion-h1");
    expect(heading).toHaveClass("big-heading", "text-text-dark");
  });
});
