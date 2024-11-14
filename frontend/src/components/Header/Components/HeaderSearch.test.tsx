import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HeaderSearch from "./HeaderSearch";
import config from "src/config/config";

// Mock ReactDOM.createPortal
vi.mock("react-dom", () => ({
  createPortal: (children: React.ReactNode) => children,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock hooks
vi.mock("src/hooks/useDebounce/useDebounce", () => ({
  default: (value: string) => value,
}));

vi.mock("src/hooks/useFetch/useFetch", () => ({
  default: () => ({
    data: {
      result: [],
    },
  }),
}));

vi.mock("src/hooks/useViewportWidth/useViewportWidth", () => ({
  useViewportWidth: () => 1024,
}));

describe("HeaderSearch", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders search button", () => {
    render(<HeaderSearch />);
    expect(screen.getByTitle("Search")).toBeInTheDocument();
  });

  it("shows search input when search button is clicked", () => {
    render(<HeaderSearch />);
    const searchButton = screen.getByTitle("Search");
    
    fireEvent.click(searchButton);
    
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("handles search input change", async () => {
    render(<HeaderSearch />);
    
    // Open search input
    fireEvent.click(screen.getByTitle("Search"));
    const input = screen.getByPlaceholderText("Search");
    
    // Type in search
    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    
    expect(input).toHaveValue("test");
  });

  it("closes search input when blurred with empty value", () => {
    render(<HeaderSearch />);
    
    // Open search
    fireEvent.click(screen.getByTitle("Search"));
    const input = screen.getByPlaceholderText("Search");
    
    // Blur with empty value
    fireEvent.blur(input);
    
    // Input should not be visible
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  it("keeps search input open when blurred with value", () => {
    render(<HeaderSearch />);
    
    // Open search
    fireEvent.click(screen.getByTitle("Search"));
    const input = screen.getByPlaceholderText("Search");
    
    // Type and blur
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.blur(input);
    
    // Input should still be visible
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("closes search results when clicking outside", () => {
    render(<HeaderSearch />);
    
    // Open search and type
    fireEvent.click(screen.getByTitle("Search"));
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    // Input should be closed
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });
});
