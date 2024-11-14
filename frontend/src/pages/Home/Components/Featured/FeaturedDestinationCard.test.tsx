import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import FeaturedDestinationCard from './FeaturedDestinationCard';
import Destination from 'src/types/Destination';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    span: React.forwardRef(({ children, whileHover, ...props }: any, ref) => (
      <span ref={ref} {...props}>{children}</span>
    ))
  }
}));

// Mock OptimizedImage
vi.mock('src/common/OptimizedImage/OptimizedImage', () => ({
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} data-testid="optimized-image" />
  )
}));

describe('FeaturedDestinationCard', () => {
  const mockDestination: Destination = {
    _id: '1',
    name: 'Paris',
    country: 'France',
    images: ['paris.jpg'],
    tags: ['Culture', 'Food'],
    location: 'Paris, France',
    video: '',
    continent: 'Europe',
    description: 'City of Lights',
    additionalInfo: {
      whenToVisit: '',
      whoToGoWith: '',
      whatToExpect: '',
      healthAndSafety: ''
    },
    places: {},
    transportation: {},
    insight: {},
    summary: '',
    featured: true
  };

  const renderCard = () => {
    return render(
      <BrowserRouter>
        <FeaturedDestinationCard destination={mockDestination} />
      </BrowserRouter>
    );
  };

  it('renders destination information correctly', () => {
    renderCard();
    
    // Check if image is rendered
    const image = screen.getByTestId('optimized-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'paris.jpg');
    expect(image).toHaveAttribute('alt', 'Image of Paris');

    // Check if name and country are displayed
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();

    // Check if tags are rendered
    expect(screen.getByText('Culture')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('contains correct navigation links', () => {
    renderCard();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    
    // Check image link
    expect(links[0]).toHaveAttribute('href', '/discover/destinations/1');
    
    // Check name link
    expect(links[1]).toHaveAttribute('href', '/destinations/1');
    expect(links[1]).toHaveAttribute('aria-label', 'View Paris');
  });

  it('handles missing image gracefully', () => {
    const destinationNoImage = {
      ...mockDestination,
      images: []
    };

    render(
      <BrowserRouter>
        <FeaturedDestinationCard destination={destinationNoImage} />
      </BrowserRouter>
    );

    const image = screen.getByTestId('optimized-image');
    expect(image).toHaveAttribute('src', '');
  });
});
