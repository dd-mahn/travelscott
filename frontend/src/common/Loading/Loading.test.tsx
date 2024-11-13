import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Loading from "src/common/Loading/Loading";

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
    expect(container).toHaveClass("h-screen", "w-screen", "bg-transparent");
  });
});
