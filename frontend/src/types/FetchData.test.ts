import { describe, it, expect } from 'vitest';
import type { FetchDestinationType, FetchCountriesType, FetchBlogsType } from 'src/types/FetchData';
import type Destination from 'src/types/Destination';
import type Country from 'src/types/Country';
import type Blog from 'src/types/Blog';

describe('FetchData Types', () => {
  it('should match FetchDestinationType structure', () => {
    const mockFetchDestination: FetchDestinationType = {
      result: [{
        _id: '1',
        name: 'Test Destination',
        location: 'Test Location',
        video: 'test.mp4',
        images: ['image1.jpg'],
        country: 'Test Country',
        continent: 'Test Continent',
        description: 'Test Description',
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: ['test'],
        insight: {},
        summary: 'Test Summary',
        featured: false
      }],
      count: 1,
      page: '1',
      totalPages: 1
    };

    expect(Array.isArray(mockFetchDestination.result)).toBe(true);
    expect(mockFetchDestination.result[0]).toHaveProperty('_id');
    expect(mockFetchDestination.count).toBeDefined();
    expect(mockFetchDestination.page).toBeDefined();
    expect(mockFetchDestination.totalPages).toBeDefined();
  });

  it('should match FetchCountriesType structure', () => {
    const mockFetchCountries: FetchCountriesType = {
      result: [{
        _id: '1',
        name: 'Test Country',
        images: {},
        description: ['Test'],
        capital: 'Test Capital',
        continent: 'Test Continent',
        currency: 'Test Currency',
        language: 'Test Language',
        visaRequirement: 'Test Visa',
        dialInCode: '+123',
        timeZone: 'UTC+0',
        additionalInfo: {},
        totalDestinations: 0
      }],
      count: 1,
      page: '1',
      totalPages: 1
    };

    expect(Array.isArray(mockFetchCountries.result)).toBe(true);
    expect(mockFetchCountries.result[0]).toHaveProperty('_id');
    expect(mockFetchCountries.count).toBeDefined();
    expect(mockFetchCountries.page).toBeDefined();
    expect(mockFetchCountries.totalPages).toBeDefined();
  });

  it('should match FetchBlogsType structure', () => {
    const mockFetchBlogs: FetchBlogsType = {
      result: [{
        _id: '1',
        title: 'Test Blog',
        author: 'Test Author',
        category: 'Test Category',
        image: 'test.jpg',
        content: [{
          sectionTitle: 'Test Section',
          sectionImages: [{ url: 'test.jpg' }],
          sectionText: ['Test text']
        }],
        time: '2024-01-01',
        tags: ['test'],
        related_destination: 'Test Destination',
        featured: false
      }],
      count: 1,
      page: '1',
      totalPages: 1
    };

    expect(Array.isArray(mockFetchBlogs.result)).toBe(true);
    expect(mockFetchBlogs.result[0]).toHaveProperty('_id');
    expect(mockFetchBlogs.count).toBeDefined();
    expect(mockFetchBlogs.page).toBeDefined();
    expect(mockFetchBlogs.totalPages).toBeDefined();
  });

  it('should allow optional pagination fields', () => {
    const mockFetchData: FetchDestinationType = {
      result: [{
        _id: '1',
        name: 'Test Destination',
        location: 'Test Location',
        video: 'test.mp4',
        images: ['image1.jpg'],
        country: 'Test Country',
        continent: 'Test Continent',
        description: 'Test Description',
        additionalInfo: {},
        places: {},
        transportation: {},
        tags: ['test'],
        insight: {},
        summary: 'Test Summary',
        featured: false
      }]
    };

    expect(Array.isArray(mockFetchData.result)).toBe(true);
    expect(mockFetchData.count).toBeUndefined();
    expect(mockFetchData.page).toBeUndefined();
    expect(mockFetchData.totalPages).toBeUndefined();
  });
});
