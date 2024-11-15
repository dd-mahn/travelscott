import React from "react";
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from 'src/store/slices/themeSlice';
import HeaderMobileMenu from "src/components/Header/Components/HeaderMobileMenu";

// Create a mock store
const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

// Mock ReactDOM
vi.mock('react-dom', async () => ({
  default: {
    createPortal: (node: React.ReactNode) => node,
  },
}));

// Mock framer-motion
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal() as { motion: any };
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <div {...props}>{children}</div>,
      button: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <button {...props}>{children}</button>,
      nav: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <nav {...props}>{children}</nav>,
      ul: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <ul {...props}>{children}</ul>,
      li: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
        <li {...props}>{children}</li>,
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

describe("HeaderMobileMenu", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const renderWithRouter = () => {
    return render(
      <HeaderMobileMenu />,
      { wrapper: TestWrapper }
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
    const closeButton = screen.getByTitle("Close Menu");
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
    const closeButton = screen.getByTitle("Close Menu");
    fireEvent.click(closeButton);
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.height).toBe("");
  });
});
