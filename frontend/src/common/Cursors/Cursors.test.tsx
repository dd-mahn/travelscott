import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Cursor from "./Cursors";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock lodash debounce to execute immediately in tests
vi.mock("lodash", () => ({
  debounce: (fn: Function) => fn,
}));

describe("Cursor", () => {
  beforeEach(() => {
    // Reset the body before each test
    document.body.innerHTML = "";
  });

  it("renders without crashing", () => {
    render(<Cursor />);
  });

  it("updates cursor position on mouse move", () => {
    render(<Cursor />);
    const event = new MouseEvent("mousemove", {
      clientX: 100,
      clientY: 100,
    });
    document.dispatchEvent(event);
    
    const cursor = screen.getByRole("generic");
    expect(cursor).toHaveStyle({ transform: expect.stringContaining("84") }); // 100 - 16
  });

  it("changes state when hovering over elements with cursor-hover class", () => {
    render(<Cursor />);
    const hoverElement = document.createElement("div");
    hoverElement.classList.add("cursor-hover");
    document.body.appendChild(hoverElement);

    fireEvent.mouseOver(hoverElement);
    const cursor = screen.getByRole("generic");
    expect(cursor).toHaveClass("bg-aurora-brown");
  });

  it("changes state when hovering over links", () => {
    render(<Cursor />);
    const link = document.createElement("a");
    link.href = "#";
    document.body.appendChild(link);

    fireEvent.mouseOver(link);
    const cursor = screen.getByRole("generic");
    expect(cursor).toHaveStyle({ width: "1svw", height: "1svw" });
  });

  it("changes state when hovering over buttons", () => {
    render(<Cursor />);
    const button = document.createElement("button");
    document.body.appendChild(button);

    fireEvent.mouseOver(button);
    const cursor = screen.getByRole("generic");
    expect(cursor).toHaveStyle({ width: "1svw", height: "1svw" });
  });

  it("changes state when clicking", () => {
    render(<Cursor />);
    
    fireEvent.mouseDown(document);
    const cursor = screen.getByRole("generic");
    expect(cursor).toHaveStyle({ width: "0.75svw", height: "0.75svw" });
    
    fireEvent.mouseUp(document);
    expect(cursor).not.toHaveStyle({ width: "0.75svw" });
  });

  it("handles iframe mouse events", () => {
    render(<Cursor />);
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    fireEvent.mouseEnter(iframe);
    const cursor = screen.getByRole("generic");
    expect(cursor).toHaveStyle({ opacity: 0 });

    fireEvent.mouseLeave(iframe);
    expect(cursor).not.toHaveStyle({ opacity: 0 });
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
