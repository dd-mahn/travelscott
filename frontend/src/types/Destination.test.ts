import { describe, it, expect } from 'vitest';
import type Destination from 'src/types/Destination';

describe('Destination Type', () => {
  it('should match the expected interface structure', () => {
    const mockDestination: Destination = {
      _id: '1',
      name: 'Test Destination',
      location: 'Test Location',
      video: 'test-video.mp4',
      images: ['image1.jpg', 'image2.jpg'],
      country: 'Test Country',
      continent: 'Test Continent',
      description: 'Test Description',
      additionalInfo: {
        whenToVisit: 'Test Season',
        whoToGoWith: 'Test Group',
        whatToExpect: 'Test Expectations',
        healthAndSafety: 'Test Safety Info'
      },
      places: {
        to_stay: [{
          name: 'Test Hotel',
          type: 'Hotel',
          image_url: 'hotel.jpg',
          description: 'Test Hotel Description',
          location: {
            on_map: 'map-location',
            address: 'Test Address'
          },
          price: {
            currency: 'USD',
            value: 100
          },
          rating: {
            website: 'Test Website',
            value: 4.5,
            link: 'rating-link'
          }
        }],
        to_visit: [{
          name: 'Test Attraction',
          type: 'Museum',
          image_url: 'museum.jpg',
          description: 'Test Attraction Description',
          location: {
            on_map: 'map-location',
            address: 'Test Address'
          },
          tips: ['Tip 1', 'Tip 2']
        }],
        to_eat: [{
          name: 'Test Restaurant',
          type: 'Restaurant',
          image_url: 'restaurant.jpg',
          description: 'Test Restaurant Description',
          location: {
            on_map: 'map-location',
            address: 'Test Address'
          },
          price: {
            currency: 'USD',
            value: 50
          },
          favorites: ['Dish 1', 'Dish 2'],
          rating: {
            website: 'Test Website',
            value: 4.2,
            link: 'rating-link'
          }
        }]
      },
      transportation: {
        overview: 'Test Transportation Overview',
        types: [{
          name: 'Test Transport',
          image: 'transport.jpg',
          description: 'Test Transport Description',
          options: [{
            name: 'Option 1',
            description: 'Option Description'
          }],
          price_range: {
            currency: 'USD',
            min_price: 10,
            max_price: 50
          },
          additional_info: {
            note: 'Test Note',
            phone_numbers: {
              'support': '+1234567890'
            }
          },
          quick_review: 'Test Review',
          recommended: true
        }]
      },
      tags: ['tag1', 'tag2'],
      insight: {
        from_us: {
          tips: ['Tip 1', 'Tip 2'],
          article: [{
            title: 'Test Article',
            id: 'article-1'
          }]
        },
        from_others: [{
          title: 'External Article',
          link: 'external-link'
        }]
      },
      summary: 'Test Summary',
      featured: true
    };

    // Test required properties
    expect(mockDestination).toHaveProperty('_id');
    expect(mockDestination).toHaveProperty('name');
    expect(mockDestination).toHaveProperty('location');
    expect(mockDestination).toHaveProperty('video');
    expect(mockDestination).toHaveProperty('images');
    expect(mockDestination).toHaveProperty('country');
    expect(mockDestination).toHaveProperty('continent');
    expect(mockDestination).toHaveProperty('description');
    expect(mockDestination).toHaveProperty('additionalInfo');
    expect(mockDestination).toHaveProperty('places');
    expect(mockDestination).toHaveProperty('transportation');
    expect(mockDestination).toHaveProperty('tags');
    expect(mockDestination).toHaveProperty('insight');
    expect(mockDestination).toHaveProperty('summary');
    expect(mockDestination).toHaveProperty('featured');
  });

  it('should allow optional fields in places', () => {
    const mockDestination: Destination = {
      _id: '1',
      name: 'Test Destination',
      location: 'Test Location',
      video: 'test-video.mp4',
      images: ['image1.jpg'],
      country: 'Test Country',
      continent: 'Test Continent',
      description: 'Test Description',
      additionalInfo: {},
      places: {}, // Empty places object
      transportation: {},
      tags: ['test'],
      insight: {},
      summary: 'Test Summary',
      featured: false
    };

    expect(mockDestination.places.to_stay).toBeUndefined();
    expect(mockDestination.places.to_visit).toBeUndefined();
    expect(mockDestination.places.to_eat).toBeUndefined();
  });

  it('should allow optional fields in transportation', () => {
    const mockDestination: Destination = {
      _id: '1',
      name: 'Test Destination',
      location: 'Test Location',
      video: 'test-video.mp4',
      images: ['image1.jpg'],
      country: 'Test Country',
      continent: 'Test Continent',
      description: 'Test Description',
      additionalInfo: {},
      places: {},
      transportation: {
        overview: 'Test Overview'
        // types is optional
      },
      tags: ['test'],
      insight: {},
      summary: 'Test Summary',
      featured: false
    };

    expect(mockDestination.transportation.overview).toBeDefined();
    expect(mockDestination.transportation.types).toBeUndefined();
  });

  it('should allow optional fields in insight', () => {
    const mockDestination: Destination = {
      _id: '1',
      name: 'Test Destination',
      location: 'Test Location',
      video: 'test-video.mp4',
      images: ['image1.jpg'],
      country: 'Test Country',
      continent: 'Test Continent',
      description: 'Test Description',
      additionalInfo: {},
      places: {},
      transportation: {},
      tags: ['test'],
      insight: {
        from_us: {
          tips: ['Tip 1'],
          article: []
        }
        // from_others is optional
      },
      summary: 'Test Summary',
      featured: false
    };

    expect(mockDestination.insight.from_us).toBeDefined();
    expect(mockDestination.insight.from_others).toBeUndefined();
  });
});
