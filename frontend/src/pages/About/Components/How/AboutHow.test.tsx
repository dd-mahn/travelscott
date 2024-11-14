import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutHow from './AboutHow';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <div {...validProps}>{children}</div>;
    },
    h1: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <h1 {...validProps}>{children}</h1>;
    },
    span: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <span {...validProps}>{children}</span>;
    }
  }
}));

describe('AboutHow', () => {
  it('renders correctly', () => {
    render(<AboutHow />);

    // Check if main section exists
    const howSection = screen.getByTestId('about-how');
    expect(howSection).toBeInTheDocument();
    expect(howSection).toHaveClass('how', 'relative');

    // Check if all three sections are rendered with correct content
    const sections = [
      {
        title: 'Optimal',
        subtitle: 'Information',
        number: ['0', '1'],
        description: /From the must-see landmarks to the hidden gems/
      },
      {
        title: 'Vibrant', 
        subtitle: 'Experience',
        number: ['0', '2'],
        description: /We provide a streamlined research experience/
      },
      {
        title: 'Verified',
        subtitle: 'Resource', 
        number: ['0', '3'],
        description: /Our platform curates content from renowned travel websites/
      }
    ];

    sections.forEach(section => {
      // Check title
      expect(screen.getByText(section.title)).toBeInTheDocument();
      
      // Check subtitle
      expect(screen.getByText(section.subtitle)).toBeInTheDocument();
      
      // Check numbers
      section.number.forEach(num => {
        if(num !== '0') {
          expect(screen.getByText(num)).toBeInTheDocument();
        }
      });

      // Check description
      expect(screen.getByText(section.description)).toBeInTheDocument();
    });
  });

  it('renders sections with correct styling', () => {
    render(<AboutHow />);

    const sections = screen.getAllByRole('heading', { level: 1 });
    expect(sections).toHaveLength(3);

    sections.forEach(section => {
      expect(section).toHaveClass('h1-md-bold');
    });
  });
});
