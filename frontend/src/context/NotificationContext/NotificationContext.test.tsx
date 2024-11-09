import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { NotificationProvider, useNotification } from './NotificationContext';

// Mock the Notification component
vi.mock('src/components/Notification/Notification', () => ({
  default: ({ message, visible }: { message: string; visible: boolean }) => (
    <div data-testid="notification" data-visible={visible}>
      {message}
    </div>
  ),
}));

describe('NotificationContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders children correctly', () => {
    render(
      <NotificationProvider>
        <div>Test Child</div>
      </NotificationProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('shows and hides notification with correct message', () => {
    // Create a test component that uses the notification context
    const TestComponent = () => {
      const { showNotification } = useNotification();
      return (
        <button onClick={() => showNotification('Test message')}>
          Show Notification
        </button>
      );
    };

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Click button to show notification
    screen.getByText('Show Notification').click();

    // Check if notification is visible with correct message
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveTextContent('Test message');
    expect(notification).toHaveAttribute('data-visible', 'true');

    // Fast-forward time to check if notification hides
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(notification).toHaveAttribute('data-visible', 'false');
  });

  it('throws error when useNotification is used outside provider', () => {
    // Create a test component that uses the notification context
    const TestComponent = () => {
      useNotification();
      return null;
    };

    // Suppress console.error for this test as we expect an error
    const consoleSpy = vi.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useNotification must be used within a NotificationProvider');

    consoleSpy.mockRestore();
  });
});
