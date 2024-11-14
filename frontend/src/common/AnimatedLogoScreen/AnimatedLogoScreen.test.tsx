import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AnimatedLogoScreen from "./AnimatedLogoScreen";

vi.mock("src/common/StaggerLogo/StaggerLogo", () => ({
  default: function MockStaggerLogo() {
    return <div data-testid="stagger-logo">Mock Stagger Logo</div>;
  }
}));

describe("AnimatedLogoScreen", () => {
  it("renders without crashing", () => {
    render(<AnimatedLogoScreen />);
  });

  it("renders with correct background classes", () => {
    render(<AnimatedLogoScreen />);
    const container = screen.getByTestId("animated-logo-container");
    expect(container).toHaveClass("bg-background-light");
    expect(container).toHaveClass("dark:bg-background-dark");
  });

  it("renders StaggerLogo component", () => {
    render(<AnimatedLogoScreen />);
    const staggerLogo = screen.getByTestId("stagger-logo");
    expect(staggerLogo).toBeInTheDocument();
  });

  it("has correct layout classes", () => {
    render(<AnimatedLogoScreen />);
    const container = screen.getByTestId("animated-logo-container");
    expect(container).toHaveClass("grid");
    expect(container).toHaveClass("h-screen");
    expect(container).toHaveClass("w-screen");
    expect(container).toHaveClass("place-items-center");
  });

  it("has correct text styling classes", () => {
    render(<AnimatedLogoScreen />);
    const textContainer = screen.getByTestId("animated-logo-text");
    expect(textContainer).toHaveClass("pointer-events-none");
    expect(textContainer).toHaveClass("w-screen");
    expect(textContainer).toHaveClass("overflow-hidden");
    expect(textContainer).toHaveClass("text-center");
    expect(textContainer).toHaveClass("font-logo");
    expect(textContainer).toHaveClass("leading-[1]");
  });
});
