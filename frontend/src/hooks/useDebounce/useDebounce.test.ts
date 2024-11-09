import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    // Initial value
    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 500 });

    // Value should not have changed yet
    expect(result.current).toBe('initial');

    // Fast forward time
    vi.advanceTimersByTime(500);

    // Now value should be updated
    expect(result.current).toBe('updated');
  });

  it('should handle multiple rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    // Multiple rapid updates
    rerender({ value: 'update1', delay: 500 });
    vi.advanceTimersByTime(200);
    
    rerender({ value: 'update2', delay: 500 });
    vi.advanceTimersByTime(200);
    
    rerender({ value: 'update3', delay: 500 });

    // Value should still be initial
    expect(result.current).toBe('initial');

    // Fast forward remaining time
    vi.advanceTimersByTime(500);

    // Should have the latest value
    expect(result.current).toBe('update3');
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 }
      }
    );

    // Change delay
    rerender({ value: 'updated', delay: 1000 });
    
    // Advance less than new delay
    vi.advanceTimersByTime(500);
    expect(result.current).toBe('test');

    // Advance to new delay
    vi.advanceTimersByTime(500);
    expect(result.current).toBe('updated');
  });

  it('should cleanup timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useDebounce('test', 500));
    
    // Create spy for clearTimeout
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
