import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ThemeButton from "./ThemeButton";
import themeReducer, { toggleDarkMode } from "src/store/slices/themeSlice";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock viewport width hook
vi.mock("src/hooks/useViewportWidth/useViewportWidth", () => ({
  useViewportWidth: () => 1024,
}));

describe("ThemeButton", () => {
  let store: any;

  beforeEach(() => {
    // Clear localStorage mock
    localStorage.clear();
    
    // Reset document body
    document.documentElement.classList.remove("dark");
    
    // Create fresh store for each test
    store = configureStore({
      reducer: {
        theme: themeReducer,
      },
    });
  });

  const renderWithRedux = () => {
    return render(
      <Provider store={store}>
        <ThemeButton />
      </Provider>
    );
  };

  it("renders theme toggle button", () => {
    renderWithRedux();
    expect(screen.getByTitle("Toggle Contrast")).toBeInTheDocument();
  });

  it("toggles dark mode when clicked", () => {
    renderWithRedux();
    const button = screen.getByTitle("Toggle Contrast");
    
    // Initial state
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    
    // Click to enable dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    
    // Click to disable dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("loads dark mode preference from localStorage on mount", () => {
    // Set dark mode preference in localStorage
    localStorage.setItem("isDarkMode", "true");
    
    renderWithRedux();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies correct styling based on viewport width", () => {
    renderWithRedux();
    const button = screen.getByTitle("Toggle Contrast");
    expect(button).toHaveClass("p-large");
  });
});
