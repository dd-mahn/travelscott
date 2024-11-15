import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DestinationMenu from "src/pages/Destination/Components/Menu/DestinationMenu";

// Mock framer-motion with forwardRef
vi.mock("framer-motion", () => ({
  motion: {
    button: React.forwardRef(({ children, onClick, title }: any, ref: any) => (
      <button ref={ref} onClick={onClick} title={title}>
        {children}
      </button>
    )),
    div: React.forwardRef(({ children }: any, ref: any) => <div ref={ref}>{children}</div>),
    a: React.forwardRef(({ children, href }: any, ref: any) => <a ref={ref} href={href}>{children}</a>),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("DestinationMenu", () => {
  it("renders menu button initially", () => {
    render(<DestinationMenu />);
    const menuButton = screen.getByTitle("open-menu");
    expect(menuButton).toBeInTheDocument();
  });

  it("opens menu board when button is clicked", () => {
    render(<DestinationMenu />);
    const menuButton = screen.getByTitle("open-menu");
    
    fireEvent.click(menuButton);
    
    expect(screen.getByText("Table of content")).toBeInTheDocument();
    expect(screen.getByText("If this is your first time, don't use this!")).toBeInTheDocument();
  });

  it("renders all menu items when opened", () => {
    render(<DestinationMenu />);
    fireEvent.click(screen.getByTitle("open-menu"));

    const menuItems = [
      { href: "#overview", text: "1. Overview" },
      { href: "#additional", text: "2. Needy information" },
      { href: "#transportation", text: "3. Transportation" },
      { href: "#places", text: "4. Places" },
      { href: "#insight", text: "5. Insight" },
      { href: "#summary", text: "6. Summary" },
    ];

    menuItems.forEach(item => {
      const link = screen.getByText(item.text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", item.href);
    });
  });

  it("closes menu when clicking button again", () => {
    render(<DestinationMenu />);
    
    // Open menu
    fireEvent.click(screen.getByTitle("open-menu"));
    expect(screen.getByText("Table of content")).toBeInTheDocument();
    
    // Use click event
    fireEvent.click(screen.getByTitle("open-menu"));
    
    // Check if menu content is not in document instead of checking visibility
    expect(screen.queryByText("Table of content")).not.toBeInTheDocument();
  });

  it("keeps menu open when clicking inside menu board", () => {
    render(<DestinationMenu />);
    
    // Open menu
    fireEvent.click(screen.getByTitle("open-menu"));
    
    // Click inside menu
    fireEvent.mouseDown(screen.getByText("Table of content"));
    
    // Menu should still be visible
    expect(screen.getByText("Table of content")).toBeInTheDocument();
  });
});
