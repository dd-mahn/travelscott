import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollLock } from './useScrollLock';

describe('useScrollLock', () => {
  beforeEach(() => {
    // Reset all mocks and document styles before each test
    vi.clearAllMocks();
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo = vi.fn();
  });
 
  it('should lock scroll when isOpen is true', () => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true
    });

    renderHook(() => useScrollLock(true));

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
    expect(document.body.style.top).toBe('-100px');
  });

  it('should unlock scroll when isOpen is false', () => {
    // Set initial locked state
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '-100px';

    renderHook(() => useScrollLock(false));

    expect(document.body.style.position).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.top).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });

  it('should handle case when top style is empty on unlock', () => {
    // Set initial locked state without top value
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '';

    renderHook(() => useScrollLock(false));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should not modify scroll position when isOpen remains false', () => {
    renderHook(() => useScrollLock(false));

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(document.body.style.position).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.top).toBe('');
  });

  it('should maintain lock state when isOpen remains true', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true
    });

    const { rerender } = renderHook(({ isOpen }) => useScrollLock(isOpen), {
      initialProps: { isOpen: true }
    });

    rerender({ isOpen: true });

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
    expect(document.body.style.top).toBe('-100px');
  });
});
