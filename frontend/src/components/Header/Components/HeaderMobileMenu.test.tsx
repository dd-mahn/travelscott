import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import HeaderMobileMenu from "./HeaderMobileMenu";

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

describe("HeaderMobileMenu", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <HeaderMobileMenu />
      </BrowserRouter>
    );
  };

  it("renders menu button when closed", () => {
    renderWithRouter();
    expect(screen.getByTitle("Menu")).toBeInTheDocument();
  });

  it("opens menu when menu button is clicked", () => {
    renderWithRouter();
    const menuButton = screen.getByTitle("Menu");
    fireEvent.click(menuButton);
    
    // Check if navigation links are visible
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Inspiration")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("displays social media links when menu is open", () => {
    renderWithRouter();
    const menuButton = screen.getByTitle("Menu");
    fireEvent.click(menuButton);

    expect(screen.getByText("ProductHunt")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
  });

  it("closes menu when close button is clicked", () => {
    renderWithRouter();
    
    // Open menu
    fireEvent.click(screen.getByTitle("Menu"));
    expect(screen.getByText("Home")).toBeInTheDocument();
    
    // Close menu
    const closeButton = screen.getAllByTitle("Menu")[1];
    fireEvent.click(closeButton);
    
    // Menu button should be visible again
    expect(screen.getByTitle("Menu")).toBeInTheDocument();
  });

  it("manages body overflow style when menu opens and closes", () => {
    renderWithRouter();
    
    // Open menu
    fireEvent.click(screen.getByTitle("Menu"));
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.height).toBe("100vh");
    
    // Close menu
    const closeButton = screen.getAllByTitle("Menu")[1];
    fireEvent.click(closeButton);
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.height).toBe("");
  });
});
