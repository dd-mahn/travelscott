import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Notification from './Notification';

describe('Notification Component', () => {
  it('renders message when visible', () => {
    render(<Notification message="Test notification" visible={true} />);
    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('has correct opacity classes based on visibility', () => {
    const { rerender } = render(
      <Notification message="Test notification" visible={true} />
    );
    expect(screen.getByText('Test notification').parentElement)
      .toHaveClass('opacity-100');

    rerender(<Notification message="Test notification" visible={false} />);
    expect(screen.getByText('Test notification').parentElement)
      .toHaveClass('opacity-0');
  });

  it('renders with correct styles', () => {
    render(<Notification message="Test notification" visible={true} />);
    const notification = screen.getByText('Test notification').parentElement;
    expect(notification).toHaveClass('fixed', 'top-20', 'left-1/2');
  });
});
