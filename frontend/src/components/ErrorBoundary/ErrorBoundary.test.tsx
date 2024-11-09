import React from 'react';
import { describe, it, expect, vi, afterAll, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // Check if NotFoundPage is rendered
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});

