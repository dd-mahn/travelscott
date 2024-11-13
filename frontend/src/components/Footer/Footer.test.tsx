import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from 'src/components/Footer/Footer';
import { NotificationProvider } from 'src/context/NotificationContext/NotificationContext';
import * as sendSubscribeModule from 'src/services/apis/sendSubscribe';
import { act } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
      <div {...props}>{children}</div>,
    p: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
      <p {...props}>{children}</p>,
    li: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
      <li {...props}>{children}</li>,
    button: ({ children, whileInView, whileHover, whileTap, ...props }: any) => 
      <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock scrollToTop function
vi.mock('src/utils/scrollToTop', () => ({
  scrollToTop: vi.fn(),
}));

// Mock StaggerLogo
vi.mock('src/common/StaggerLogo/StaggerLogo', () => ({
  default: () => <div>Mocked StaggerLogo</div>,
}));

// Screen size breakpoints from tailwind config
const SCREEN_SIZES = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920
};

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
    // Reset window width
    window.innerWidth = SCREEN_SIZES.xl;
    window.dispatchEvent(new Event('resize'));
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

  describe('Desktop Layout (>= 768px)', () => {
    beforeEach(() => {
      window.innerWidth = SCREEN_SIZES.md;
      window.dispatchEvent(new Event('resize'));
    });

    it('renders sitemap section', () => {
      render(<Footer />, { wrapper: TestWrapper });
      expect(screen.getByText('Sitemap')).toBeInTheDocument();
      const sitemapLinks = ['Home', 'About', 'Discover', 'Inspiration', 'Contact'];
      sitemapLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('renders social media section', () => {
      render(<Footer />, { wrapper: TestWrapper });
      expect(screen.getByText('Socials')).toBeInTheDocument();
      const socialLinks = ['ProductHunt', 'Twitter', 'Instagram', 'Facebook'];
      socialLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });
  });

  describe('Mobile Layout (< 768px)', () => {
    beforeEach(() => {
      window.innerWidth = SCREEN_SIZES.sm;
      window.dispatchEvent(new Event('resize'));
    });

    it('does not render sitemap and social sections', () => {
      render(<Footer />, { wrapper: TestWrapper });
      expect(screen.queryByText('Sitemap')).not.toBeInTheDocument();
      expect(screen.queryByText('Socials')).not.toBeInTheDocument();
    });

    it('renders in a stacked layout', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('flex-col');
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

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.click(subscribeButton);
    });

    expect(mockSendSubscribe).toHaveBeenCalledWith('test@example.com');
  });

  it('handles failed email subscription', async () => {
    const mockSendSubscribe = vi.spyOn(sendSubscribeModule, 'sendSubscribe')
      .mockResolvedValue(false);

    render(<Footer />, { wrapper: TestWrapper });
    
    const input = screen.getByLabelText(/Leave your email/i) as HTMLInputElement;
    const subscribeButton = screen.getByTitle('subscribe');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.click(subscribeButton);
    });

    expect(mockSendSubscribe).toHaveBeenCalledWith('test@example.com');
  });
});
