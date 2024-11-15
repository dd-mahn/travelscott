import { describe, it, expect } from 'vitest';
import type Blog from 'src/types/Blog';

describe('Blog Type', () => {
  it('should match the expected interface structure', () => {
    const mockBlog: Blog = {
      _id: '1',
      title: 'Test Blog',
      author: 'John Doe',
      category: 'Travel',
      image: 'test.jpg',
      content: [
        {
          sectionTitle: 'Test Section',
          sectionImages: [
            {
              url: 'section1.jpg',
              description: 'Test description'
            }
          ],
          sectionText: ['Test paragraph']
        }
      ],
      time: '2024-01-01',
      tags: ['travel', 'adventure'],
      related_destination: 'Paris',
      featured: true
    };

    // Test required properties
    expect(mockBlog).toHaveProperty('_id');
    expect(mockBlog).toHaveProperty('title');
    expect(mockBlog).toHaveProperty('author');
    expect(mockBlog).toHaveProperty('category');
    expect(mockBlog).toHaveProperty('image');
    expect(mockBlog).toHaveProperty('content');
    expect(mockBlog).toHaveProperty('time');
    expect(mockBlog).toHaveProperty('tags');
    expect(mockBlog).toHaveProperty('related_destination');
    expect(mockBlog).toHaveProperty('featured');

    // Test content structure
    expect(Array.isArray(mockBlog.content)).toBe(true);
    const section = mockBlog.content[0];
    expect(section).toHaveProperty('sectionTitle');
    expect(section).toHaveProperty('sectionImages');
    expect(section).toHaveProperty('sectionText');

    // Test arrays
    expect(Array.isArray(mockBlog.tags)).toBe(true);
    expect(Array.isArray(section.sectionImages)).toBe(true);
    expect(Array.isArray(section.sectionText)).toBe(true);
  });

  it('should allow optional description in section images', () => {
    const mockBlog: Blog = {
      _id: '1',
      title: 'Test Blog',
      author: 'John Doe',
      category: 'Travel',
      image: 'test.jpg',
      content: [
        {
          sectionTitle: 'Test Section',
          sectionImages: [
            { url: 'image1.jpg' }, // Without description
            { url: 'image2.jpg', description: 'With description' } // With description
          ],
          sectionText: ['Test']
        }
      ],
      time: '2024-01-01',
      tags: ['travel'],
      related_destination: 'Paris',
      featured: false
    };

    const image1 = mockBlog.content[0].sectionImages[0];
    const image2 = mockBlog.content[0].sectionImages[1];

    expect(image1.description).toBeUndefined();
    expect(image2.description).toBeDefined();
    expect(image2.description).toBe('With description');
  });
});
