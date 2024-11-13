import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
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

  it('should update value after specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });
    
    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Advance timer by delay amount
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should update after delay
    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on new value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    // First update
    rerender({ value: 'update1', delay: 500 });
    
    // Advance timer partially
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    // Second update before first delay completes
    rerender({ value: 'update2', delay: 500 });
    
    // Advance to just before second delay would complete
    act(() => {
      vi.advanceTimersByTime(499);
    });
    
    // Value should not have changed yet
    expect(result.current).toBe('initial');
    
    // Complete the delay
    act(() => {
      vi.advanceTimersByTime(1);
    });
    
    // Should get the second update
    expect(result.current).toBe('update2');
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 }
      }
    );

    // Change both value and delay
    rerender({ value: 'updated', delay: 1000 });

    // Advance by original delay
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Should not have updated yet due to new longer delay
    expect(result.current).toBe('test');

    // Advance remaining time
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Should update after new delay time
    expect(result.current).toBe('updated');
  });

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() => useDebounce('test', 500));
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
