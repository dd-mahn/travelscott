import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './404';

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('NotFoundPage', () => {
  it('renders 404 heading', async () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    
    // Advance timers to account for animation delays
    await vi.advanceTimersByTimeAsync(1000);
    
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    // The second '4' will be found by the same query
    
    vi.useRealTimers();
  });

  it('renders error message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/The page you are looking for/i)).toBeInTheDocument();
  });

  it('renders back to home button with correct link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('link', { name: /back to home/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
  });

  it('renders background blob elements', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const blobs = screen.getAllByTestId(/blur-blob/);
    expect(blobs).toHaveLength(2);
  });
});
