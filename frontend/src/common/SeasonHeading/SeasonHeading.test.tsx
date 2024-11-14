import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SeasonHeading from "src/common/SeasonHeading/SeasonHeading";
import * as getSeasonModule from "src/utils/getSeason";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, initial, whileInView, transition, viewport, variants, className, style, ...props }: any) => (
      <h1 
        data-initial={JSON.stringify(initial)}
        data-while-in-view={whileInView}
        data-transition={JSON.stringify(transition)}
        data-viewport={JSON.stringify(viewport)}
        data-variants={JSON.stringify(variants)}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </h1>
    ),
  },
}));

// Mock the getSeason utility
vi.mock("src/utils/getSeason", () => ({
  getSeason: vi.fn()
}));

describe("SeasonHeading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the current season", () => {
    vi.mocked(getSeasonModule.getSeason).mockReturnValue("SUMMER");
    
    render(<SeasonHeading />);
    
    "SUMMER".split("").forEach(letter => {
      const elements = screen.getAllByText(letter);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("renders the current year", () => {
    vi.mocked(getSeasonModule.getSeason).mockReturnValue("WINTER");
    
    render(<SeasonHeading />);
    
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it("renders with different seasons", () => {
    const seasons = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
    
    seasons.forEach(season => {
      vi.mocked(getSeasonModule.getSeason).mockReturnValue(season);
      const { unmount } = render(<SeasonHeading />);
      
      season.split("").forEach(letter => {
        const elements = screen.getAllByText(letter);
        expect(elements.length).toBeGreaterThan(0);
      });

      unmount();
    });
  });
});
