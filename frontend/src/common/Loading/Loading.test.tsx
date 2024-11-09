import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Loading from "./Loading";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("Loading", () => {
  it("renders loading container with correct dimensions", () => {
    render(<Loading />);
    const container = screen.getByRole("generic");
    expect(container).toHaveClass("h-screen");
    expect(container).toHaveClass("w-screen");
  });

  /*
  it("renders animated blob elements", () => {
    render(<Loading />);
    
    const blobs = screen.getAllByRole("generic").slice(1); // Skip container div
    expect(blobs).toHaveLength(2);
    
    // First blob
    expect(blobs[0]).toHaveClass("blur-blob");
    expect(blobs[0]).toHaveClass("blob-brown");
    expect(blobs[0]).toHaveClass("left-1/4");
    expect(blobs[0]).toHaveClass("top-[15%]");
    
    // Second blob
    expect(blobs[1]).toHaveClass("blur-blob");
    expect(blobs[1]).toHaveClass("blob-green"); 
    expect(blobs[1]).toHaveClass("right-1/4");
    expect(blobs[1]).toHaveClass("top-[10%]");
  });
  */
});
