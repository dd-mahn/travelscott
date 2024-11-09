import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SeasonHeading from "./SeasonHeading";
import * as getSeasonModule from "src/utils/getSeason";

// Mock the getSeason utility
vi.mock("src/utils/getSeason", () => ({
  getSeason: vi.fn()
}));

describe("SeasonHeading", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("renders the current season", () => {
    vi.mocked(getSeasonModule.getSeason).mockReturnValue("SUMMER");
    
    render(<SeasonHeading />);
    
    // Check if each letter of "SUMMER" is rendered
    "SUMMER".split("").forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
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
      
      // Check if each letter of the season is rendered
      season.split("").forEach(letter => {
        expect(screen.getByText(letter)).toBeInTheDocument();
      });

      unmount();
    });
  });
});
