import { afterAll, beforeAll, jest, expect } from '@jest/globals';
import mongoose from 'mongoose';

// Set default timeout for all tests
jest.setTimeout(30000);

// Global setup before all tests
beforeAll(async () => {
  // Suppress console logs during tests unless explicitly needed
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
  
  // Clear all mocks before starting
  jest.clearAllMocks();
});

// Global cleanup after all tests
afterAll(async () => {
  // Restore console
  jest.restoreAllMocks();
  
  // Close mongoose connection if it's open
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  // Handle any remaining promises
  await new Promise(resolve => setTimeout(resolve, 500));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Promise Rejection:', error);
});

// Add custom matchers if needed
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  }
});
