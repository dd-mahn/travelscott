import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useFetch from 'src/hooks/useFetch/useFetch';

describe('useFetch', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { data: { id: 1, name: 'Test' } };
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    });
    global.fetch = mockFetch;

    const { result } = renderHook(() => useFetch<{ id: number; name: string }>('/test-url'));

    // Should start with loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');
    expect(result.current.data).toBeUndefined();

    // Wait for fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.error).toBe('');
    expect(mockFetch).toHaveBeenCalledWith('/test-url');
  });

  it('should handle fetch error when response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false
    });
    global.fetch = mockFetch;

    const { result } = renderHook(() => useFetch('/test-url'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Maybe something went wrong, please try again later.');
    expect(result.current.data).toBeUndefined();
  });

  it('should handle network error', async () => {
    const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
    global.fetch = mockFetch;

    const { result } = renderHook(() => useFetch('/test-url'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toBeUndefined();
  });

  it('should refetch when dependencies change', async () => {
    const mockData1 = { data: { id: 1 } };
    const mockData2 = { data: { id: 2 } };
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData1)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData2)
      });
    global.fetch = mockFetch;

    const { result, rerender } = renderHook(
      ({ dep }) => useFetch<{ id: number }>('/test-url', [dep]),
      { initialProps: { dep: 1 } }
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData1.data);

    // Trigger refetch by changing dependency
    rerender({ dep: 2 });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData2.data);

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should not update state if data is the same', async () => {
    const mockData = { data: { id: 1 } };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });
    global.fetch = mockFetch;

    const { result, rerender } = renderHook(() => useFetch<{ id: number }>('/test-url'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData.data);

    const previousData = result.current.data;
    
    // Trigger refetch
    rerender();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Data reference should remain the same since the data hasn't changed
    expect(result.current.data).toBe(previousData);
  });
});
