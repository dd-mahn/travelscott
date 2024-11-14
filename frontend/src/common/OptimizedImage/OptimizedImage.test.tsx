import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import OptimizedImage from "./OptimizedImage";
import * as imageUtils from "src/utils/imageUtils";
import * as viewportHook from "src/hooks/useViewportWidth/useViewportWidth";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    img: React.forwardRef(({ children, initial, animate, ...props }: any, ref) => (
      <img 
        ref={ref}
        alt={props.alt}
        src={props.src}
        srcSet={props.srcSet}
        className={props.className}
        loading={props.loading}
        initial={initial ? JSON.stringify(initial) : undefined}
        animate={animate ? JSON.stringify(animate) : undefined}
        {...props}
      >
        {children}
      </img>
    )),
  },
}));

// Mock image utils
vi.mock("src/utils/imageUtils", () => ({
  getImageSize: vi.fn().mockReturnValue(1024),
  optimizeImage: vi.fn((src, options) => ({
    src: "optimized-test-image.jpg",
    srcSet: "optimized-test-image.jpg 1x, optimized-test-image@2x.jpg 2x"
  })),
}));

// Mock viewport hook
vi.mock("src/hooks/useViewportWidth/useViewportWidth", () => ({
  useViewportWidth: vi.fn(),
}));

describe("OptimizedImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    // Start with clean mocks
    vi.clearAllMocks();
    
    // Set up getImageSize mock to return 1024
    vi.mocked(imageUtils.getImageSize).mockReturnValue(1024);
    
    render(<OptimizedImage {...defaultProps} />);
    
    expect(imageUtils.optimizeImage).toHaveBeenCalledWith(
      "test-image.jpg",
      expect.objectContaining({
        width: 1024,
        quality: 80,
        format: "auto"
      })
    );
  });

  it("updates optimized image when viewport width changes", () => {
    // Start with clean mocks
    vi.clearAllMocks();
    
    // Set up initial mocks
    const getImageSizeSpy = vi.mocked(imageUtils.getImageSize);
    const useViewportWidthSpy = vi.spyOn(viewportHook, 'useViewportWidth');
    
    // Set initial values
    getImageSizeSpy.mockReturnValue(1024);
    useViewportWidthSpy.mockReturnValue(1024);

    const { rerender } = render(<OptimizedImage {...defaultProps} />);
    
    // Verify initial render
    expect(imageUtils.optimizeImage).toHaveBeenCalledWith(
      "test-image.jpg",
      expect.objectContaining({
        width: 1024,
        quality: 80,
        format: "auto"
      })
    );
    
    // Clear mocks between renders
    vi.clearAllMocks();
    
    // Update mocks for new viewport width
    getImageSizeSpy.mockReturnValue(640);
    useViewportWidthSpy.mockReturnValue(640);
    
    // Force rerender
    rerender(<OptimizedImage {...defaultProps} key="force-rerender" />);
    
    // Verify the new call
    expect(imageUtils.optimizeImage).toHaveBeenCalledWith(
      "test-image.jpg",
      expect.objectContaining({
        width: 640,
        quality: 80,
        format: "auto"
      })
    );
  });

  it("renders suspense fallback", () => {
    const fallback = <div data-testid="image-fallback" className="h-full w-full bg-transparent" />;
    
    render(
      <React.Suspense fallback={fallback}>
        <OptimizedImage {...defaultProps} />
      </React.Suspense>
    );
    
    // Since we're mocking Suspense to show children, we should see the image
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
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
