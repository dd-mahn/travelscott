import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSectionTransition, useSectionTransition2 } from './useSectionTransition';
import { useScroll, useTransform } from 'framer-motion';

// Mock framer-motion hooks
vi.mock('framer-motion', () => ({
  useScroll: vi.fn(),
  useTransform: vi.fn(),
  motion: {
    div: 'div'
  }
}));

describe('useSectionTransition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useScroll as Mock).mockReturnValue({ scrollYProgress: 'mockProgress' });
    (useTransform as Mock).mockReturnValue('mockTransform');
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSectionTransition());

    expect(result.current.ref.current).toBe(null);
    expect(useScroll).toHaveBeenCalledWith({
      target: result.current.ref,
      offset: ['start end', 'start center']
    });
    expect(useTransform).toHaveBeenCalledWith('mockProgress', [0, 1], [1, 0.7]);
    expect(useTransform).toHaveBeenCalledWith('mockProgress', [0, 1], [1, 0]);
  });

  it('should use custom offset and transform values', () => {
    const customOffset = ['start start', 'end end'];
    const customScale = [0.5, 1];
    const customOpacity = [0, 0.8];

    const { result } = renderHook(() => 
      useSectionTransition(customOffset, customScale, customOpacity)
    );

    expect(useScroll).toHaveBeenCalledWith({
      target: result.current.ref,
      offset: customOffset
    });
    expect(useTransform).toHaveBeenCalledWith('mockProgress', [0, 1], customScale);
    expect(useTransform).toHaveBeenCalledWith('mockProgress', [0, 1], customOpacity);
  });
});

describe('useSectionTransition2', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useScroll as Mock).mockReturnValue({ scrollYProgress: 'mockProgress' });
    (useTransform as Mock).mockReturnValue('mockTransform');
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSectionTransition2());

    expect(result.current.ref.current).toBe(null);
    expect(useScroll).toHaveBeenCalledWith({
      target: result.current.ref,
      offset: ['start end', 'start center']
    });
    expect(useTransform).toHaveBeenCalledWith('mockProgress', [0, 1], [1, 0.95]);
  });

  it('should use custom offset and scale values', () => {
    const customOffset = ['center center', 'end end'];
    const customScale = [0.8, 1.2];

    const { result } = renderHook(() => 
      useSectionTransition2(customOffset, customScale)
    );

    expect(useScroll).toHaveBeenCalledWith({
      target: result.current.ref,
      offset: customOffset
    });
    expect(useTransform).toHaveBeenCalledWith('mockProgress', [0, 1], customScale);
  });
});
