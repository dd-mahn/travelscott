import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DestinationVideo from "src/pages/Destination/Components/Video/DestinationVideo";

// Mock the dependencies
vi.mock("framer-motion", () => ({
  motion: {
    section: React.forwardRef(({ children, variants, initial, whileInView, viewport, transition, className }: any, ref: any) => (
      <section ref={ref} className={className}>
        {children}
      </section>
    )),
  },
  useInView: () => true,
}));

vi.mock("react-player", () => ({
  default: ({ url, playing, loop, controls, width, height }: any) => (
    <div data-testid="mock-react-player" data-url={url} data-playing={playing} data-loop={loop} data-controls={controls} data-width={width} data-height={height}></div>
  ),
}));

describe("DestinationVideo", () => {
  const mockVideoCode = "test-video-code";

  it("renders ReactPlayer with correct props", () => {
    render(<DestinationVideo videoCode={mockVideoCode} />);

    const reactPlayer = screen.getByTestId("mock-react-player");
    expect(reactPlayer).toBeInTheDocument();
    expect(reactPlayer).toHaveAttribute("data-url", `https://www.youtube.com/watch?v=${mockVideoCode}`);
    expect(reactPlayer).toHaveAttribute("data-playing", "true");
    expect(reactPlayer).toHaveAttribute("data-loop", "true");
    expect(reactPlayer).toHaveAttribute("data-controls", "true");
    expect(reactPlayer).toHaveAttribute("data-width", "100%");
    expect(reactPlayer).toHaveAttribute("data-height", "100%");
  });

  it("renders motion section with correct className", () => {
    render(<DestinationVideo videoCode={mockVideoCode} />);

    const motionSection = document.querySelector('section');
    expect(motionSection).toBeInTheDocument();
    expect(motionSection).toHaveClass("px-sect video h-screen py-sect-short");
  });
});
