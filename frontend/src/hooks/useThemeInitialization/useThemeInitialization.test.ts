import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useThemeInitialization } from './useThemeInitialization';
import { useDispatch } from 'react-redux';
import { setDarkMode } from 'src/store/slices/themeSlice';

// Mock Redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));
 
// Mock themeSlice
vi.mock('src/store/slices/themeSlice', () => ({
  setDarkMode: vi.fn(),
}));

describe('useThemeInitialization', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize theme from localStorage if value exists', () => {
    // Set initial dark mode value in localStorage
    localStorage.setItem('isDarkMode', 'true');

    renderHook(() => useThemeInitialization());

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setDarkMode(true));
  });

  it('should not dispatch if no theme value in localStorage', () => {
    renderHook(() => useThemeInitialization());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(setDarkMode).not.toHaveBeenCalled();
  });

  it('should handle invalid localStorage value', () => {
    // Set invalid JSON in localStorage
    localStorage.setItem('isDarkMode', 'invalid-json');

    renderHook(() => useThemeInitialization());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(setDarkMode).not.toHaveBeenCalled();
  });

  it('should handle localStorage.getItem throwing an error', () => {
    // Mock localStorage.getItem to throw an error
    const mockGetItem = vi.spyOn(Storage.prototype, 'getItem');
    mockGetItem.mockImplementationOnce(() => {
      throw new Error('localStorage error');
    });

    renderHook(() => useThemeInitialization());

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(setDarkMode).not.toHaveBeenCalled();
  });
});
