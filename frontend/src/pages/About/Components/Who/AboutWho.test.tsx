import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutWho from 'src/pages/About/Components/Who/AboutWho';
import { people } from 'src/data/about-people';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref) => {
      const { whileInView, whileHover, animate, ...validProps } = props;
      return <div ref={ref} {...validProps}>{children}</div>;
    }),
    p: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <p {...validProps}>{children}</p>;
    },
    h1: ({ children, ...props }: any) => {
      const { whileInView, ...validProps } = props;
      return <h1 {...validProps}>{children}</h1>;
    }
  },
  useInView: () => true
}));

// Mock OptimizedImage component
vi.mock('src/common/OptimizedImage/OptimizedImage', () => ({
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} data-testid="optimized-image" />
  )
}));

describe('AboutWho', () => {
  it('renders correctly', () => {
    render(<AboutWho />);

    // Check if main section exists with correct classes
    const whoSection = screen.getByTestId('about-who');
    expect(whoSection).toBeInTheDocument();
    expect(whoSection).toHaveClass('who', 'px-sect', 'sticky');

    // Check if title is rendered
    expect(screen.getByText('Who?')).toBeInTheDocument();

    // Check if all people are rendered
    people.forEach(person => {
      // Use getAllByText to handle potential duplicate names
      const nameElements = screen.getAllByText(person.name);
      expect(nameElements.length).toBeGreaterThan(0);
      
      const roleElements = screen.getAllByText(person.role);
      expect(roleElements.length).toBeGreaterThan(0);
    });

    // Check if description paragraph is rendered
    expect(screen.getByText(/In 2024, we came together/)).toBeInTheDocument();
  });

  it('renders all team member images', () => {
    render(<AboutWho />);
    
    // Check if OptimizedImage components are rendered for each team member
    const images = screen.getAllByTestId('optimized-image');
    expect(images.length).toBeGreaterThan(0);

    // Verify people images are rendered
    people.forEach(person => {
      if (person.img) {
        const personImage = images.find(img => img.getAttribute('src') === person.img);
        expect(personImage).toBeInTheDocument();
      }
    });
  });

  it('renders with correct styling', () => {
    render(<AboutWho />);

    // Check grid layout
    const peopleGrid = screen.getByText('Who?').parentElement?.nextElementSibling;
    expect(peopleGrid).toHaveClass('grid', 'grid-cols-3');

    // Check person cards styling
    const personCards = screen.getAllByText(people[0].name)[0].closest('.person');
    expect(personCards).toHaveClass('flex', 'flex-col', 'items-center');
  });
});
