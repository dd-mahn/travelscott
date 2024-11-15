import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StyledInput from "src/common/StyledInput/StyledInput";

describe("StyledInput", () => {
  const defaultProps = {
    type: "text",
    id: "test-input",
    label: "Test Label"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<StyledInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    const label = screen.getByText("Test Label");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("id", "test-input");
    expect(label).toBeInTheDocument();
  });

  it("adds active class on focus", () => {
    render(<StyledInput {...defaultProps} />);
    
    const input = screen.getByRole("textbox");
    const styledInput = input.closest(".styled-input");
    
    fireEvent.focus(input);
    expect(styledInput).toHaveClass("active");
  });

  it("removes active class on blur when input is empty", () => {
    render(<StyledInput {...defaultProps} />);
    
    const input = screen.getByRole("textbox");
    const styledInput = input.closest(".styled-input");
    
    // Focus and blur with empty input
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(styledInput).not.toHaveClass("active");
  });

  it("keeps active class on blur when input has value", () => {
    render(<StyledInput {...defaultProps} />);
    
    const input = screen.getByRole("textbox");
    const styledInput = input.closest(".styled-input");
    
    // Set value, focus and blur
    fireEvent.change(input, { target: { value: "test value" } });
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(styledInput).toHaveClass("active");
  });

  it("applies correct base classes", () => {
    render(<StyledInput {...defaultProps} />);
    
    const container = screen.getByRole("textbox").closest(".styled-input");
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Test Label");

    expect(container).toHaveClass("flex", "w-full", "items-center", "border-b");
    expect(input).toHaveClass("input", "p-regular", "w-full", "border-0", "bg-transparent");
    expect(label).toHaveClass("label", "span-regular");
  });

  it("handles autofill on mount", () => {
    const { rerender } = render(<StyledInput {...defaultProps} />);
    
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const styledInput = input.closest(".styled-input");
    
    // Set the value directly and trigger input event
    input.value = 'autofilled';
    fireEvent.input(input);
    
    // Trigger animationstart event to simulate autofill
    fireEvent.animationStart(input, {
      animationName: 'onAutoFillStart'
    });
    
    // Force a rerender
    rerender(<StyledInput {...defaultProps} />);
    
    expect(styledInput).toHaveClass("active");
  });
});
