import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoadingState, ErrorState, NotFoundState } from "./CatalogStates";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("CatalogStates", () => {
  describe("LoadingState", () => {
    it("renders loading message", () => {
      render(<LoadingState keyName="test-loading" />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("has correct layout classes", () => {
      render(<LoadingState keyName="test-loading" />);
      const container = screen.getByText("Loading...").parentElement;
      expect(container).toHaveClass("grid");
      expect(container).toHaveClass("h-[50svh]");
      expect(container).toHaveClass("w-full");
      expect(container).toHaveClass("place-items-center");
    });
  });

  describe("ErrorState", () => {
    it("renders error message", () => {
      render(<ErrorState keyName="test-error" />);
      expect(
        screen.getByText("Error... Please reload the page or try again later.")
      ).toBeInTheDocument();
    });

    it("has correct layout classes", () => {
      render(<ErrorState keyName="test-error" />);
      const container = screen.getByRole("heading").parentElement;
      expect(container).toHaveClass("grid");
      expect(container).toHaveClass("h-[50svh]");
      expect(container).toHaveClass("w-full");
      expect(container).toHaveClass("place-items-center");
    });
  });

  describe("NotFoundState", () => {
    it("renders not found message", () => {
      render(<NotFoundState keyName="test-not-found" />);
      expect(screen.getByText("Nothing found.")).toBeInTheDocument();
    });

    it("has correct layout classes", () => {
      render(<NotFoundState keyName="test-not-found" />);
      const container = screen.getByText("Nothing found.").parentElement;
      expect(container).toHaveClass("grid");
      expect(container).toHaveClass("h-[50svh]");
      expect(container).toHaveClass("w-full");
      expect(container).toHaveClass("place-items-center");
    });
  });

  describe("Common styling", () => {
    it("applies h3-md class to all headings", () => {
      render(
        <>
          <LoadingState keyName="loading" />
          <ErrorState keyName="error" />
          <NotFoundState keyName="not-found" />
        </>
      );

      const headings = screen.getAllByRole("heading");
      headings.forEach(heading => {
        expect(heading).toHaveClass("h3-md");
      });
    });
  });
});
