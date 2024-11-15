import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Notification from 'src/components/Notification/Notification';

describe('Notification Component', () => {
  it('renders message when visible', () => {
    render(<Notification message="Test notification" visible={true} />);
    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('has correct opacity classes based on visibility', () => {
    const { rerender } = render(
      <Notification message="Test notification" visible={true} />
    );
    const element = screen.getByText('Test notification');
    expect(element.className).toMatch(/opacity-100/);

    rerender(<Notification message="Test notification" visible={false} />);
    expect(element.className).toMatch(/opacity-0/);
  });

  it('renders with correct styles', () => {
    render(<Notification message="Test notification" visible={true} />);
    const notification = screen.getByText('Test notification');
    
    expect(notification.className).toMatch(/fixed/);
    expect(notification.className).toMatch(/top-20/);
    expect(notification.className).toMatch(/left-1\/2/);
  });
});
