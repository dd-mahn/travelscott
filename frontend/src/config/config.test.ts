import { describe, it, expect, beforeEach, vi } from 'vitest';
import config from 'src/config/config';

describe('Config', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    // Clear import.meta.env before each test
    vi.stubGlobal('import', {
      meta: {
        env: {}
      }
    });
  });

  it('loads configuration with environment variables', () => {
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_API_BASE_URL: 'http://test-api.com',
          VITE_API_VERSION: 'v2',
          VITE_NODE_ENV: 'test'
        }
      }
    });

    expect(config.api.baseUrl).toBe('http://test-api.com');
    expect(config.api.version).toBe('v2');
    expect(config.app.environment).toBe('test');
  });

  it('uses default values when environment variables are not set', () => {
    expect(config.api.baseUrl).toBe('http://localhost:4080/api');
    expect(config.api.timeout).toBe(5000);
    expect(config.api.version).toBe('v1');
  });

  it('validates configuration schema', () => {
    expect(config).toMatchObject({
      api: {
        baseUrl: expect.any(String),
        timeout: expect.any(Number),
        version: expect.any(String)
      },
      app: {
        name: expect.any(String),
        environment: expect.any(String),
        isDevelopment: expect.any(Boolean),
        isProduction: expect.any(Boolean), 
        isTest: expect.any(Boolean)
      },
      features: {
        enableAnalytics: expect.any(Boolean),
        enablePWA: expect.any(Boolean),
        enableDarkMode: expect.any(Boolean)
      }
    });
  });

  it('throws error for invalid configuration', () => {
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_API_BASE_URL: 'not-a-url'
        }
      }
    });
    
    expect(() => config).toThrow();
  });
});
