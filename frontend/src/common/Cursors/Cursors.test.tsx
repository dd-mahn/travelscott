import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Cursor from "./Cursors";

vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, animate, variants, className }: any, ref) => {
      const currentVariant = variants[animate] || {};
      const style = {
        width: currentVariant.width || "2svw",
        height: currentVariant.height || "2svw",
        opacity: currentVariant.opacity === undefined ? 1 : currentVariant.opacity,
        x: currentVariant.x || 0,
        y: currentVariant.y || 0
      };
      
      return (
        <div 
          ref={ref as React.LegacyRef<HTMLDivElement>}
          data-testid="cursor"
          className={className}
          data-animate={animate}
          style={style}
        >
          {children}
        </div>
      );
    }),
  },
}));

vi.mock("lodash", () => ({
  debounce: (fn: Function) => fn,
}));

describe("Cursor", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders without crashing", () => {
    render(<Cursor />);
    expect(screen.getByTestId("cursor")).toBeInTheDocument();
  });

  it("updates cursor position on mouse move", async () => {
    render(<Cursor />);
    
    await act(async () => {
      fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    });

    const cursor = screen.getByTestId("cursor");
    expect(cursor).toHaveAttribute("data-animate", "default");
  });

  it("changes state when hovering over elements with cursor-hover class", async () => {
    render(<Cursor />);
    const hoverElement = document.createElement("div");
    hoverElement.classList.add("cursor-hover");
    document.body.appendChild(hoverElement);

    await act(async () => {
      fireEvent.mouseOver(hoverElement);
    });
    
    expect(screen.getByTestId("cursor")).toHaveAttribute("data-animate", "hover");
  });

  it("changes state when clicking", async () => {
    render(<Cursor />);
    
    await act(async () => {
      fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    });
    
    await act(async () => {
      fireEvent.mouseDown(document);
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const cursor = screen.getByTestId("cursor");
    expect(cursor).toHaveStyle({
      width: "0.75svw",
      height: "0.75svw"
    });
    
    await act(async () => {
      fireEvent.mouseUp(document);
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(cursor).toHaveStyle({
      width: "2svw",
      height: "2svw"
    });
  });

  it("shows arrow icon when in hover state", () => {
    render(<Cursor />);
    const hoverElement = document.createElement("div");
    hoverElement.classList.add("cursor-hover");
    document.body.appendChild(hoverElement);
    fireEvent.mouseOver(hoverElement);
    expect(screen.getByTestId("ri-arrow-right-line")).toBeInTheDocument();
  });

  it("shows up arrow icon when in hoverLink state", () => {
    render(<Cursor />);
    const linkElement = document.createElement("div");
    linkElement.classList.add("cursor-hover-link");
    document.body.appendChild(linkElement);
    fireEvent.mouseOver(linkElement);
    expect(screen.getByTestId("ri-arrow-right-up-line")).toBeInTheDocument();
  });
});
