import { describe, it, expect } from 'vitest';
import type { Feedback } from 'src/types/Feedback';

describe('Feedback Type', () => {
  it('should match the expected interface structure', () => {
    const mockFeedback: Feedback = {
      name: 'John Doe',
      email: 'john@example.com',
      feedback: 'Great website!'
    };

    // Test required properties
    expect(mockFeedback).toHaveProperty('name');
    expect(mockFeedback).toHaveProperty('email');
    expect(mockFeedback).toHaveProperty('feedback');

    // Test property types
    expect(typeof mockFeedback.name).toBe('string');
    expect(typeof mockFeedback.email).toBe('string');
    expect(typeof mockFeedback.feedback).toBe('string');
  });

  it('should validate email format', () => {
    const mockFeedback: Feedback = {
      name: 'Jane Doe',
      email: 'invalid-email',
      feedback: 'Test feedback'
    };

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(mockFeedback.email)).toBe(false);

    // Update with valid email
    mockFeedback.email = 'jane@example.com';
    expect(emailRegex.test(mockFeedback.email)).toBe(true);
  });
});
