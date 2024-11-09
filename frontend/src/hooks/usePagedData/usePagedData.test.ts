import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagedData } from './usePagedData';

// Mock Lenis
vi.mock('lenis', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      raf: vi.fn(),
      destroy: vi.fn(),
      scrollTo: vi.fn()
    }))
  };
});

describe('usePagedData', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
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

  it('should initialize Lenis with correct configuration', () => {
    const onPageChange = vi.fn();
    renderHook(() => usePagedData(1, onPageChange));

    const Lenis = require('lenis').default;
    expect(Lenis).toHaveBeenCalledWith({
      duration: 2,
      easing: expect.any(Function),
      touchMultiplier: 2,
      infinite: false
    });
  });

  it('should cleanup Lenis instance on unmount', () => {
    const onPageChange = vi.fn();
    const { unmount } = renderHook(() => usePagedData(1, onPageChange));

    const mockLenisInstance = require('lenis').default.mock.results[0].value;
    
    unmount();

    expect(mockLenisInstance.destroy).toHaveBeenCalled();
  });

  it('should scroll to section with offset when page changes', () => {
    const onPageChange = vi.fn();
    const { result } = renderHook(() => usePagedData(1, onPageChange));

    const mockLenisInstance = require('lenis').default.mock.results[0].value;

    // Mock the section ref
    const mockSectionRef = document.createElement('div');
    result.current.sectionRef = { current: mockSectionRef };

    act(() => {
      result.current.handlePagination(2);
    });
    expect(mockLenisInstance.scrollTo).toHaveBeenCalledWith(
      mockSectionRef,
      { offset: -100 }
    );
  });
});
