import { describe, it, expect } from 'vitest';
import type Country from './Country';

describe('Country Type', () => {
  it('should match the expected interface structure', () => {
    const mockCountry: Country = {
      _id: '1',
      name: 'Test Country',
      images: {
        flagImages: ['flag.jpg'],
        mapImages: ['map.jpg'],
        otherImages: ['other.jpg']
      },
      description: ['Test description'],
      capital: 'Test Capital',
      continent: 'Test Continent',
      currency: 'Test Currency',
      language: 'Test Language',
      visaRequirement: 'Test Visa Requirement',
      dialInCode: '+123',
      timeZone: 'UTC+0',
      additionalInfo: {
        whenToVisit: 'Test When to Visit',
        transportation: 'Test Transportation',
        healthAndSafety: 'Test Health and Safety'
      },
      totalDestinations: 5
    };

    // Test required properties
    expect(mockCountry).toHaveProperty('_id');
    expect(mockCountry).toHaveProperty('name');
    expect(mockCountry).toHaveProperty('images');
    expect(mockCountry).toHaveProperty('description');
    expect(mockCountry).toHaveProperty('capital');
    expect(mockCountry).toHaveProperty('continent');
    expect(mockCountry).toHaveProperty('currency');
    expect(mockCountry).toHaveProperty('language');
    expect(mockCountry).toHaveProperty('visaRequirement');
    expect(mockCountry).toHaveProperty('dialInCode');
    expect(mockCountry).toHaveProperty('timeZone');
    expect(mockCountry).toHaveProperty('additionalInfo');
    expect(mockCountry).toHaveProperty('totalDestinations');

    // Test images structure
    expect(Array.isArray(mockCountry.images.flagImages)).toBe(true);
    expect(Array.isArray(mockCountry.images.mapImages)).toBe(true);
    expect(Array.isArray(mockCountry.images.otherImages)).toBe(true);

    // Test description array
    expect(Array.isArray(mockCountry.description)).toBe(true);
  });

  it('should allow optional image arrays', () => {
    const mockCountry: Country = {
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
    };

    expect(mockCountry.images.flagImages).toBeUndefined();
    expect(mockCountry.images.mapImages).toBeUndefined();
    expect(mockCountry.images.otherImages).toBeUndefined();
  });

  it('should allow optional additional info fields', () => {
    const mockCountry: Country = {
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
      additionalInfo: {
        whenToVisit: 'Test Season'
        // Omitting transportation and healthAndSafety
      },
      totalDestinations: 0
    };

    expect(mockCountry.additionalInfo.whenToVisit).toBeDefined();
    expect(mockCountry.additionalInfo.transportation).toBeUndefined();
    expect(mockCountry.additionalInfo.healthAndSafety).toBeUndefined();
  });
});
