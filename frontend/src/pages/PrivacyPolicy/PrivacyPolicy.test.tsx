import React from 'react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

describe('PrivacyPolicy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders privacy policy page with all sections', () => {
    render(<PrivacyPolicy />);

    // Check main container
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('privacy-policy');

    // Check heading and date
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByTestId('last-updated')).toBeInTheDocument();

    // Check all major sections using data-testid
    const sections = [
      'introduction',
      'information-collection',
      'information-usage',
      'data-protection',
      'third-party',
      'cookies',
      'user-rights',
      'policy-changes',
      'contact'
    ];

    sections.forEach(section => {
      expect(screen.getByTestId(`section-${section}`)).toBeInTheDocument();
    });
  });

  it('renders contact email correctly', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText('hello@travelscott.com')).toBeInTheDocument();
  });

  it('renders lists of collected information', () => {
    render(<PrivacyPolicy />);
    
    const listItems = [
      'Feedback:',
      'Subscription Information:',
      'Usage Data:'
    ];

    listItems.forEach(item => {
      expect(screen.getByText(new RegExp(item, 'i'))).toBeInTheDocument();
    });
  });

  it('renders user rights section with all rights listed', () => {
    render(<PrivacyPolicy />);

    const rights = [
      'Access the personal information',
      'Request correction',
      'Unsubscribe from our newsletters',
      'Request deletion'
    ];

    rights.forEach(right => {
      expect(screen.getByText(new RegExp(right, 'i'))).toBeInTheDocument();
    });
  });
});
