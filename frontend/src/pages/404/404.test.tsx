import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from 'src/pages/404/404';

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

vi.mock("src/common/Buttons/Button", () => ({
  NoirButton: ({ text, link, ...props }: any) => (
    <a href={link} {...props}>{text}</a>
  ),
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
    
    // Check for all three digits since they are mapped separately in the component
    const digits = screen.getAllByText(/[404]/);
    expect(digits).toHaveLength(3);
    
    vi.useRealTimers();
  });

  it('renders error message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/The page you are looking for might have been removed/i)).toBeInTheDocument();
    expect(screen.getByText(/had its name changed or is temporarily unavailable/i)).toBeInTheDocument();
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

    const blobs = screen.getAllByTestId('blur-blob');
    expect(blobs).toHaveLength(2);
  });
});
