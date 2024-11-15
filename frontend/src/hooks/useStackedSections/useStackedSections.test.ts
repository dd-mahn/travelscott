import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";

describe("useStackedSections", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock window innerHeight
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should initialize with empty refs array", () => {
    const { result } = renderHook(() => useStackedSections());
    expect(result.current.refs.current).toEqual([]);
  });

  it("should set refs correctly", () => {
    const { result } = renderHook(() => useStackedSections());

    const mockElement1 = document.createElement("div");
    const mockElement2 = document.createElement("div");

    act(() => {
      result.current.setRef(0)(mockElement1);
      result.current.setRef(1)(mockElement2);
    });

    expect(result.current.refs.current).toHaveLength(2);
    expect(result.current.refs.current[0]).toBe(mockElement1);
    expect(result.current.refs.current[1]).toBe(mockElement2);
  });

  it("should update section tops after timeout", () => {
    const { result } = renderHook(() => useStackedSections());

    const mockElement1 = document.createElement("div");
    Object.defineProperty(mockElement1, "offsetHeight", { value: 500 });

    const mockElement2 = document.createElement("div");
    Object.defineProperty(mockElement2, "offsetHeight", { value: 1200 });

    act(() => {
      result.current.setRef(0)(mockElement1);
      result.current.setRef(1)(mockElement2);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockElement1.style.top).toBe("0px"); // Height < window.innerHeight
    expect(mockElement2.style.top).toBe("-200px"); // Min(500, 1000 - 1200)
  });

  it("should handle window resize", () => {
    const { result } = renderHook(() => useStackedSections());

    const mockElement1 = document.createElement("div");
    Object.defineProperty(mockElement1, "offsetHeight", { value: 500 });

    const mockElement2 = document.createElement("div");
    Object.defineProperty(mockElement2, "offsetHeight", { value: 1200 });

    act(() => {
      result.current.setRef(0)(mockElement1);
      result.current.setRef(1)(mockElement2);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockElement1.style.top).toBe("0px");
    expect(mockElement2.style.top).toBe("-200px");

    act(() => {
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 800,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(mockElement1.style.top).toBe("0px");
    expect(mockElement2.style.top).toBe("-400px"); // Min(500, 800 - 1200)
  });

  it("should cleanup on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useStackedSections());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  // Note: MutationObserver behavior is not explicitly tested as it's an optimization
  // for handling dynamic content changes. The core section positioning logic is
  // covered by other test cases.
});
