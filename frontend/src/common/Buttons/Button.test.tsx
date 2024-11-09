import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { PrimaryButton, SecondaryButton, NoirButton } from "./Button";

// Wrapper component for Router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Button Components", () => {
  describe("PrimaryButton", () => {
    it("renders with correct text", () => {
      render(<PrimaryButton text="Click me" />);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
      const handleClick = vi.fn();
      render(<PrimaryButton text="Click me" onClick={handleClick} />);
      fireEvent.click(screen.getByText("Click me"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as a link when link prop is provided", () => {
      render(
        <RouterWrapper>
          <PrimaryButton text="Go to Home" link="/home" />
        </RouterWrapper>
      );
      expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
    });

    it("has correct button type when specified", () => {
      render(<PrimaryButton text="Submit" type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  describe("SecondaryButton", () => {
    it("renders with correct text and plane icon", () => {
      render(<SecondaryButton text="Click me" />);
      expect(screen.getByText("Click me")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
      const handleClick = vi.fn();
      render(<SecondaryButton text="Click me" onClick={handleClick} />);
      fireEvent.click(screen.getByText("Click me"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as a link when link prop is provided", () => {
      render(
        <RouterWrapper>
          <SecondaryButton text="Go to About" link="/about" />
        </RouterWrapper>
      );
      expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
    });

    it("has correct button type when specified", () => {
      render(<SecondaryButton text="Submit" type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  describe("NoirButton", () => {
    it("renders with correct text", () => {
      render(<NoirButton text="Click me" />);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
      const handleClick = vi.fn();
      render(<NoirButton text="Click me" onClick={handleClick} />);
      fireEvent.click(screen.getByText("Click me"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as a link when link prop is provided", () => {
      render(
        <RouterWrapper>
          <NoirButton text="Go to Contact" link="/contact" />
        </RouterWrapper>
      );
      expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
    });

    it("has correct button type when specified", () => {
      render(<NoirButton text="Submit" type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("has correct styling classes", () => {
      render(<NoirButton text="Dark Button" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-background-dark");
      expect(button).toHaveClass("text-text-dark");
      expect(button).toHaveClass("uppercase");
    });
  });
});
