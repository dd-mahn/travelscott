import mongoose from 'mongoose';

// Mock all required modules
jest.mock('express');
jest.mock('cors');
jest.mock('cookie-parser');
jest.mock('helmet');
jest.mock('express-rate-limit');
jest.mock('mongoose');

// Mock all route modules
jest.mock('src/routes/destination', () => jest.fn());
jest.mock('src/routes/feedback', () => jest.fn());
jest.mock('src/routes/blog', () => jest.fn());
jest.mock('src/routes/country', () => jest.fn());
jest.mock('src/routes/subscribe', () => jest.fn());
jest.mock('src/routes/auth', () => jest.fn());
jest.mock('src/middlewares/errorHandler', () => ({
  errorHandler: jest.fn()
}));

describe('Middleware Setup', () => {
  let app;
  let middlewares;
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the module cache to get fresh corsOptions
    jest.resetModules();
    
    // Create a proper Express app mock with all required methods
    app = {
      use: jest.fn().mockReturnThis(),
      disable: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis()
    };

    // Mock helmet to return a middleware function
    const mockMiddleware = jest.fn();
    require('helmet').mockReturnValue(mockMiddleware);
    require('helmet').contentSecurityPolicy.mockReturnValue(mockMiddleware);

    // Mock other middleware
    require('express-rate-limit').mockReturnValue(mockMiddleware);
    require('cors').mockReturnValue(mockMiddleware);
    require('cookie-parser').mockReturnValue(mockMiddleware);
  });

  describe('setupMiddleware', () => {
    beforeEach(() => {
      middlewares = require('./middlewares');
    });

    it('should set up all middleware correctly', () => {
      middlewares.setupMiddleware(app);
      
      expect(app.use).toHaveBeenCalled();
      expect(app.disable).toHaveBeenCalledWith('x-powered-by');
    });

    it('should set up all routes correctly', () => {
      middlewares.setupMiddleware(app);
      
      expect(app.use).toHaveBeenCalledWith('/api/destinations', expect.any(Function));
      expect(app.use).toHaveBeenCalledWith('/api/feedback', expect.any(Function));
      expect(app.use).toHaveBeenCalledWith('/api/blogs', expect.any(Function));
      expect(app.use).toHaveBeenCalledWith('/api/countries', expect.any(Function));
      expect(app.use).toHaveBeenCalledWith('/api/subscribe', expect.any(Function));
      expect(app.use).toHaveBeenCalledWith('/api/auth', expect.any(Function));
    });
  });

  describe('CORS Options', () => {
    beforeEach(() => {
      // Reset NODE_ENV before each test
      delete process.env.NODE_ENV;
    });

    it('should have correct development CORS settings', () => {
      process.env.NODE_ENV = 'development';
      middlewares = require('./middlewares');
      
      expect(middlewares.corsOptions.origin).toEqual(['https://localhost:5173', 'https://localhost:4173']);
      expect(middlewares.corsOptions.credentials).toBe(true);
      expect(middlewares.corsOptions.methods).toContain('GET');
      expect(middlewares.corsOptions.methods).toContain('POST');
    });

    it('should have correct production CORS settings', () => {
      process.env.NODE_ENV = 'production';
      middlewares = require('./middlewares');
      
      expect(middlewares.corsOptions.origin).toEqual([
        'https://travelscott.vercel.app',
        'https://railway.app',
        'healthcheck.railway.com'
      ]);
    });
  });
});
