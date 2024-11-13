import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagedData } from 'src/hooks/usePagedData/usePagedData';

// Mock Lenis class
const mockLenisInstance = {
  raf: vi.fn(),
  destroy: vi.fn(),
  scrollTo: vi.fn()
};

vi.mock('lenis', () => ({
  default: class MockLenis {
    constructor(config: any) {
      Object.assign(this, mockLenisInstance);
      return mockLenisInstance;
    }
  }
}));

describe('usePagedData', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize with default page', () => {
    const onPageChange = vi.fn();
    const { result } = renderHook(() => usePagedData(1, onPageChange));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.sectionRef.current).toBe(null);
  });

  it('should handle page changes', () => {
    const onPageChange = vi.fn();
    const { result } = renderHook(() => usePagedData(1, onPageChange));

    act(() => {
      result.current.handlePagination(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should scroll to section with offset when page changes', () => {
    const onPageChange = vi.fn();
    const { result } = renderHook(() => usePagedData(1, onPageChange));

    // Mock the section ref
    const mockSectionRef = document.createElement('div');
    Object.defineProperty(result.current.sectionRef, 'current', {
      value: mockSectionRef,
      configurable: true,
      writable: true
    });

    act(() => {
      result.current.handlePagination(2);
    });

    expect(mockLenisInstance.scrollTo).toHaveBeenCalledWith(
      mockSectionRef,
      { offset: -100 }
    );
  });

  it('should cleanup Lenis instance on unmount', () => {
    const onPageChange = vi.fn();
    const { unmount } = renderHook(() => usePagedData(1, onPageChange));

    unmount();

    expect(mockLenisInstance.destroy).toHaveBeenCalled();
  });
});
