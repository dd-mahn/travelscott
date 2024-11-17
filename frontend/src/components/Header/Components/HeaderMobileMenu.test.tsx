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

// Mock viewport width hook
const mockUseViewportWidth = vi.fn().mockReturnValue(767);
vi.mock('src/hooks/useViewportWidth/useViewportWidth', () => ({
  useViewportWidth: () => mockUseViewportWidth()
}));

// Mock scroll lock hook
vi.mock('src/hooks/useScrollLock/useScrollLock', () => ({
  useScrollLock: vi.fn()
}));

// Mock ReactDOM
vi.mock('react-dom', async () => ({
  default: {
    createPortal: (node: React.ReactNode) => node,
  },
}));

// Mock framer-motion
vi.mock('framer-motion', async () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe("HeaderMobileMenu", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    mockUseViewportWidth.mockReturnValue(767); // Reset to mobile width
  });

  const renderWithRouter = () => {
    return render(
      <TestWrapper>
        <HeaderMobileMenu />
      </TestWrapper>
    );
  };

  it("renders menu button when closed", () => {
    renderWithRouter();
    expect(screen.getByTitle("Open Menu")).toBeInTheDocument();
  });

  it("opens menu when menu button is clicked", async () => {
    renderWithRouter();
    const menuButton = screen.getByTitle("Open Menu");
    fireEvent.click(menuButton);
    
    // Check if navigation links are visible
    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Inspiration")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("displays social media links when menu is open", async () => {
    renderWithRouter();
    fireEvent.click(screen.getByTitle("Open Menu"));

    expect(await screen.findByText("ProductHunt")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
  });

  it("closes menu when close button is clicked", async () => {
    renderWithRouter();
    
    // Open menu
    fireEvent.click(screen.getByTitle("Open Menu"));
    expect(await screen.findByText("Home")).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(screen.getByTitle("Close Menu"));
    
    // Menu button should be visible again
    expect(screen.getByTitle("Open Menu")).toBeInTheDocument();
  });

  it("does not render when viewport width is >= 768px", () => {
    mockUseViewportWidth.mockReturnValue(768);
    const { container } = renderWithRouter();
    expect(container.firstChild).toBeNull();
  });
});
