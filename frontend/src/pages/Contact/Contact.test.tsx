import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from 'src/pages/Contact/Contact';
import { NotificationProvider } from 'src/context/NotificationContext/NotificationContext';
import { sendFeedback } from 'src/services/apis/sendFeedback';
import { act } from 'react';

// Mock the sendFeedback API
vi.mock('src/services/apis/sendFeedback', () => ({
  sendFeedback: vi.fn().mockResolvedValue(true)
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, whileHover, whileTap, whileInView, layout, ...props }: any, ref) => 
      <div ref={ref} {...props}>{children}</div>
    ),
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

// Mock NotificationContext
vi.mock('src/context/NotificationContext/NotificationContext', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useNotification: () => ({
    showNotification: vi.fn()
  })
}));

// Mock Button components
vi.mock('src/common/Buttons/Button', () => ({
  SecondaryButton: ({ text, onClick, type, title }: any) => (
    <button onClick={onClick} type={type} title={title}>
      {text}
      <img src="plane-icon.svg" alt="" />
    </button>
  )
}));

// Mock resetForm utility
vi.mock('src/utils/resetForm', () => ({
  resetForm: vi.fn()
}));

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
    
    const button = screen.getByTitle('Toggle emailing');
    
    // Click emailing section button
    fireEvent.click(button);
    expect(screen.getByText('Reach out to us via:')).toBeInTheDocument();
    
    // Click again to hide
    fireEvent.click(button);
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
    const button = screen.getByTitle('Toggle emailing');
    fireEvent.click(button);

    // Click email button
    const emailButton = screen.getByText('hello@travelscott.com');
    fireEvent.click(emailButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('hello@travelscott.com');
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('handles feedback form submission', async () => {
    const mockSendFeedback = vi.fn().mockResolvedValueOnce(true);
    (sendFeedback as Mock).mockImplementation(mockSendFeedback);
    
    renderContact();

    // Open feedback section
    const button = screen.getByTitle('Toggle feedback');
    fireEvent.click(button);

    // Fill out form
    await act(async () => {
      fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
      fireEvent.change(screen.getByLabelText('What you want to tell us'), { target: { value: 'Great website!' } });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByTitle('Send feedback'));
    });

    expect(mockSendFeedback).toHaveBeenCalledWith({
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
    const button = screen.getByTitle('Toggle feedback');
    fireEvent.click(button);

    // Submit empty form
    const submitButton = screen.getByText('Send it');
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('All fields are required.');
  });
});
