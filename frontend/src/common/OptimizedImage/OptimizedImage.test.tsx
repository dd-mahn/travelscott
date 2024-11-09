import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OptimizedImage from "./OptimizedImage";
import * as imageUtils from "src/utils/imageUtils";
import * as viewportHook from "src/hooks/useViewportWidth/useViewportWidth";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
  },
}));

// Mock image utils
vi.mock("src/utils/imageUtils", () => ({
  getImageSize: vi.fn().mockReturnValue(800),
  optimizeImage: vi.fn().mockReturnValue({
    src: "optimized-test-image.jpg",
    srcSet: "optimized-test-image.jpg 1x, optimized-test-image@2x.jpg 2x"
  }),
}));

// Mock viewport hook
vi.mock("src/hooks/useViewportWidth/useViewportWidth", () => ({
  useViewportWidth: vi.fn().mockReturnValue(1024),
}));

describe("OptimizedImage", () => {
  const defaultProps = {
    src: "test-image.jpg",
    alt: "Test image",
    className: "test-class"
  };

  it("renders image with correct attributes", () => {
    render(<OptimizedImage {...defaultProps} />);
    const image = screen.getByAltText("Test image");
    
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "optimized-test-image.jpg");
    expect(image).toHaveAttribute("srcset", "optimized-test-image.jpg 1x, optimized-test-image@2x.jpg 2x");
    expect(image).toHaveClass("test-class");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("calls optimizeImage with correct parameters", () => {
    render(<OptimizedImage {...defaultProps} />);
    
    expect(imageUtils.optimizeImage).toHaveBeenCalledWith(
      "test-image.jpg",
      {
        width: 800,
        quality: 80,
        format: "auto"
      }
    );
  });

  it("updates optimized image when viewport width changes", () => {
    const { rerender } = render(<OptimizedImage {...defaultProps} />);

    // Change viewport width
    vi.mocked(viewportHook.useViewportWidth).mockReturnValue(768);
    rerender(<OptimizedImage {...defaultProps} />);

    expect(imageUtils.getImageSize).toHaveBeenCalledWith(768);
  });

  it("renders suspense fallback while loading", () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const fallback = screen.getByRole("generic");
    expect(fallback).toHaveClass("h-full", "w-full", "bg-transparent");
  });

  it("passes additional motion props to image", () => {
    render(
      <OptimizedImage 
        {...defaultProps}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    );

    const image = screen.getByAltText("Test image");
    expect(image).toHaveAttribute("initial", '{"opacity":0}');
    expect(image).toHaveAttribute("animate", '{"opacity":1}');
  });
});
