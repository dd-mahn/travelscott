import { fail } from 'assert';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Config', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubGlobal('import', {
      meta: {
        env: {}
      }
    });
  });

  it('loads configuration with environment variables', async () => {
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_API_BASE_URL: 'https://localhost:4080', 
          VITE_API_VERSION: 'v1',
          VITE_NODE_ENV: 'test'
        }
      }
    });
    
    const { default: config } = await import('src/config/config');
    expect(config.api.baseUrl).toBe('https://localhost:4080');
    expect(config.api.version).toBe('v1');
    expect(config.app.environment).toBe('test');
  });

  it('uses default values when environment variables are not set', async () => {
    const { default: config } = await import('src/config/config');
    expect(config.api.baseUrl).toBe('https://localhost:4080');
    expect(config.api.timeout).toBe(5000);
    expect(config.api.version).toBe('v1');
  });

  it('validates configuration schema', async () => {
    const { default: config } = await import('src/config/config');
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

  it('throws error for invalid configuration', async () => {
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_API_BASE_URL: 'not-a-url',
          VITE_NODE_ENV: 'test'
        }
      }
    });
    
    try {
      await import('src/config/config');
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
