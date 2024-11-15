import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useViewportWidth } from 'src/hooks/useViewportWidth/useViewportWidth';

describe('useViewportWidth', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.innerWidth = 1024;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with current window width', () => {
    const { result } = renderHook(() => useViewportWidth());
    expect(result.current).toBe(1024);
  });

  it('should update width on window resize after debounce', () => {
    const { result } = renderHook(() => useViewportWidth());

    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));
    });

    // Should not update immediately due to debounce
    expect(result.current).toBe(1024);

    // Advance timers by debounce delay
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe(768);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useViewportWidth());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
