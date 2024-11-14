import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReactDOM from 'react-dom';
import HeaderSearch from './HeaderSearch';

// Mock ReactDOM
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal() as typeof ReactDOM;
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
    default: actual,
  };
});

// Mock framer-motion similar to Header.test.tsx
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    input: ({ children, ...props }: any) => <input {...props}>{children}</input>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('HeaderSearch', () => {
  it('renders search button', () => {
    render(<HeaderSearch />);
    expect(screen.getByTitle('Search')).toBeInTheDocument();
  });

  // Add more tests as needed
});
