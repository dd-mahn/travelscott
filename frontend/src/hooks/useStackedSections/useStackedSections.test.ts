import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";

describe("useStackedSections", () => {
  let mutationObserverMock: any;
  let resizeObserverMock: any;
  let requestAnimationFrameMock: any;

  beforeEach(() => {
    vi.useFakeTimers();
    
    // Mock requestAnimationFrame
    requestAnimationFrameMock = vi.fn((cb) => {
      cb();
      return 0;
    });
    window.requestAnimationFrame = requestAnimationFrameMock;

    // Mock window innerHeight
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1000,
    });

    // Mock MutationObserver
    mutationObserverMock = vi.fn(function MutationObserver(callback: any) {
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        callback,
      };
    });
    global.MutationObserver = mutationObserverMock;

    // Mock ResizeObserver
    resizeObserverMock = vi.fn(function ResizeObserver(callback: any) {
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        callback,
      };
    });
    global.ResizeObserver = resizeObserverMock;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
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
    Object.defineProperty(mockElement1, "style", { value: {} });
    mockElement1.querySelectorAll = vi.fn().mockReturnValue([]);

    const mockElement2 = document.createElement("div");
    Object.defineProperty(mockElement2, "offsetHeight", { value: 1200 });
    Object.defineProperty(mockElement2, "style", { value: {} });
    mockElement2.querySelectorAll = vi.fn().mockReturnValue([]);

    act(() => {
      result.current.setRef(0)(mockElement1);
      result.current.setRef(1)(mockElement2);
      vi.advanceTimersByTime(100);
      vi.runAllTimers();
    });

    expect(mockElement1.style.top).toBe("0px");
    expect(mockElement2.style.top).toBe("-200px");
  });

  it("should handle window resize", () => {
    const { result } = renderHook(() => useStackedSections());

    const mockElement1 = document.createElement("div");
    Object.defineProperty(mockElement1, "offsetHeight", { value: 500 });
    Object.defineProperty(mockElement1, "style", { value: {} });
    mockElement1.querySelectorAll = vi.fn().mockReturnValue([]);

    const mockElement2 = document.createElement("div");
    Object.defineProperty(mockElement2, "offsetHeight", { value: 1200 });
    Object.defineProperty(mockElement2, "style", { value: {} });
    mockElement2.querySelectorAll = vi.fn().mockReturnValue([]);

    act(() => {
      result.current.setRef(0)(mockElement1);
      result.current.setRef(1)(mockElement2);
      vi.advanceTimersByTime(100);
      vi.runAllTimers();
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
      vi.advanceTimersByTime(100);
      vi.runAllTimers();
    });

    expect(mockElement1.style.top).toBe("0px");
    expect(mockElement2.style.top).toBe("-400px");
  });

  it("should setup observers when refs are added", () => {
    const { result } = renderHook(() => useStackedSections());

    const mockElement = document.createElement("div");
    Object.defineProperty(mockElement, "style", { value: {} });
    mockElement.querySelectorAll = vi.fn().mockReturnValue([]);

    act(() => {
      result.current.setRef(0)(mockElement);
    });

    // Force effects to run
    act(() => {
      vi.runAllTimers();
      vi.runAllTicks();
    });

    expect(mutationObserverMock).toHaveBeenCalled();
    expect(resizeObserverMock).toHaveBeenCalled();
  });

  it("should cleanup observers and event listeners on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useStackedSections());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});
