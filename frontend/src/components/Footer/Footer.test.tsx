import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import { NotificationProvider } from 'src/context/NotificationContext/NotificationContext';
import * as sendSubscribeModule from 'src/services/apis/sendSubscribe';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock scrollToTop function
vi.mock('src/utils/scrollToTop', () => ({
  scrollToTop: vi.fn(),
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </NotificationProvider>
  );
};

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main footer text', () => {
    render(<Footer />, { wrapper: TestWrapper });
    expect(screen.getByText(/Made and curated by people with/i)).toBeInTheDocument();
    expect(screen.getByText(/passion in travel, Travel, and TRAVEL./i)).toBeInTheDocument();
  });

  it('renders the email subscription input', () => {
    render(<Footer />, { wrapper: TestWrapper });
    expect(screen.getByLabelText(/Leave your email/i)).toBeInTheDocument();
    expect(screen.getByTitle('subscribe')).toBeInTheDocument();
  });

  it('renders all sitemap links', () => {
    render(<Footer />, { wrapper: TestWrapper });
    
    const sitemapLinks = ['Home', 'About', 'Discover', 'Inspiration', 'Contact'];
    sitemapLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders all social media links', () => {
    render(<Footer />, { wrapper: TestWrapper });
    
    const socialLinks = ['ProductHunt', 'Twitter', 'Instagram', 'Facebook'];
    socialLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders the back to top button', () => {
    render(<Footer />, { wrapper: TestWrapper });
    expect(screen.getByText(/Back to top/i)).toBeInTheDocument();
  });

  it('renders the copyright text', () => {
    render(<Footer />, { wrapper: TestWrapper });
    expect(screen.getByText(/Copyright TravelScott 2024/i)).toBeInTheDocument();
  });

  it('renders privacy policy link', () => {
    render(<Footer />, { wrapper: TestWrapper });
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('handles successful email subscription', async () => {
    const mockSendSubscribe = vi.spyOn(sendSubscribeModule, 'sendSubscribe')
      .mockResolvedValue(true);

    render(<Footer />, { wrapper: TestWrapper });
    
    const input = screen.getByLabelText(/Leave your email/i) as HTMLInputElement;
    const subscribeButton = screen.getByTitle('subscribe');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    expect(mockSendSubscribe).toHaveBeenCalledWith('test@example.com');
  });

  it('handles failed email subscription', async () => {
    const mockSendSubscribe = vi.spyOn(sendSubscribeModule, 'sendSubscribe')
      .mockResolvedValue(false);

    render(<Footer />, { wrapper: TestWrapper });
    
    const input = screen.getByLabelText(/Leave your email/i) as HTMLInputElement;
    const subscribeButton = screen.getByTitle('subscribe');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    expect(mockSendSubscribe).toHaveBeenCalledWith('test@example.com');
  });
});

