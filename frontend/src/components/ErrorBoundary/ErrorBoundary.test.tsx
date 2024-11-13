import React from 'react';
import { describe, it, expect, vi, afterAll, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders NotFoundPage when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Check for individual 404 numbers and error message
    const fours = screen.getAllByText('4');
    expect(fours).toHaveLength(2);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });
});

