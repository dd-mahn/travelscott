import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from './Contact';
import { NotificationProvider } from 'src/context/NotificationContext/NotificationContext';
import { sendFeedback } from 'src/services/apis/sendFeedback';

// Mock the sendFeedback API
vi.mock('src/services/apis/sendFeedback');

const renderContact = () => {
  return render(
    <BrowserRouter>
      <NotificationProvider>
        <Contact />
      </NotificationProvider>
    </BrowserRouter>
  );
};

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main contact sections', () => {
    renderContact();
    
    expect(screen.getByText(/Need assistance planning your next adventure?/i)).toBeInTheDocument();
    expect(screen.getByText(/Want to share your experience as resource?/i)).toBeInTheDocument();
    expect(screen.getByText(/Want to give us a feedback?/i)).toBeInTheDocument();
  });

  it('toggles section visibility when clicking buttons', () => {
    renderContact();
    
    const buttons = screen.getAllByTitle('open btn');
    
    // Click emailing section button
    fireEvent.click(buttons[0]);
    expect(screen.getByText('Reach out to us via:')).toBeInTheDocument();
    
    // Click again to hide
    fireEvent.click(buttons[0]);
    expect(screen.queryByText('Reach out to us via:')).not.toBeInTheDocument();
  });

  it('copies email to clipboard when clicking email buttons', async () => {
    const mockClipboard = {
      writeText: vi.fn()
    };
    Object.assign(navigator, {
      clipboard: mockClipboard
    });

    renderContact();
    
    // Open emailing section
    const buttons = screen.getAllByTitle('open btn');
    fireEvent.click(buttons[0]);

    // Click email button
    const emailButton = screen.getByText('hello@travelscott.com');
    fireEvent.click(emailButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('hello@travelscott.com');
  });

  it('handles feedback form submission', async () => {
    (sendFeedback as Mock).mockResolvedValueOnce(true);
    
    renderContact();

    // Open feedback section
    const buttons = screen.getAllByTitle('open btn');
    fireEvent.click(buttons[2]);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/What you want to tell us/i), { target: { value: 'Great website!' } });

    // Submit form
    const submitButton = screen.getByText('Send it');
    fireEvent.click(submitButton);

    expect(sendFeedback).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      age: '25',
      country: 'USA',
      message: 'Great website!'
    });
  });

  it('shows error when submitting empty feedback form', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderContact();

    // Open feedback section
    const buttons = screen.getAllByTitle('open btn');
    fireEvent.click(buttons[2]);

    // Submit empty form
    const submitButton = screen.getByText('Send it');
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('All fields are required.');
  });

  it('renders animated blobs', () => {
    renderContact();
    
    const blobs = screen.getAllByTestId('blur-blob');
    expect(blobs).toHaveLength(2);
    expect(blobs[0]).toHaveClass('blob-brown');
    expect(blobs[1]).toHaveClass('blob-green');
  });
});
