import express from 'express';
import { setupMiddleware, corsOptions } from 'src/middlewares/middlewares';
import { errorHandler } from 'src/middlewares/errorHandler';

jest.mock('src/routes/destination');
jest.mock('src/routes/feedback');
jest.mock('src/routes/blog');
jest.mock('src/routes/country');
jest.mock('src/routes/subscribe');
jest.mock('src/middlewares/errorHandler');

describe('Middleware Setup', () => {
  let app;

  beforeEach(() => {
    app = express();
    setupMiddleware(app);
  });

  it('should set up middleware in correct order', () => {
    const middleware = app._router.stack.map(layer => layer.name);
    
    // Check core middleware
    expect(middleware).toContain('jsonParser');
    expect(middleware).toContain('corsMiddleware');
    expect(middleware).toContain('cookieParser');
    
    // Check route middleware presence
    const routerMiddleware = app._router.stack.filter(layer => layer.name === 'router');
    expect(routerMiddleware).toHaveLength(5); // 5 route handlers
  });

  it('should set up CORS with correct options', () => {
    expect(corsOptions.origin).toBe(true);
    expect(corsOptions.credentials).toBe(true);
  });

  it('should set up routes with correct paths', () => {
    const routes = app._router.stack
      .filter(layer => layer.name === 'router')
      .map(layer => {
        const path = layer.regexp.toString()
          .match(/^\/\^\\\/api\\\/([^\\]+)/);
        return path ? `/api/${path[1]}` : '';
      })
      .filter(Boolean);

    expect(routes).toEqual(
      expect.arrayContaining([
        '/api/destinations',
        '/api/feedback',
        '/api/blogs',
        '/api/countries',
        '/api/subscribe'
      ])
    );
  });

  it('should set up error handler as last middleware', () => {
    const lastLayer = app._router.stack[app._router.stack.length - 1];
    expect(lastLayer.name).toBe('errorHandler');
  });
});
