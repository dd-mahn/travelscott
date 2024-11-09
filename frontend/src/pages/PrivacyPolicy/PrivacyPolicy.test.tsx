import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('renders privacy policy page with all sections', () => {
    render(<PrivacyPolicy />);

    // Check if main privacy policy section is rendered
    expect(screen.getByRole('main')).toHaveClass('privacy-policy');

    // Verify heading and last updated date
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/last updated:/i)).toBeInTheDocument();

    // Verify all major sections are present
    const sections = [
      'Introduction',
      'Information We Collect',
      'How We Use Your Information', 
      'Data Protection',
      'Third-Party Services',
      'Cookies',
      'Your Rights',
      'Changes to This Policy',
      'Contact Us'
    ];

    sections.forEach(section => {
      expect(screen.getByText(new RegExp(section, 'i'))).toBeInTheDocument();
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
