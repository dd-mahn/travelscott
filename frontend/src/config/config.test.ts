import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { z } from 'zod';

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      VITE_NODE_ENV: 'test',
      VITE_API_BASE_URL: 'http://test-api.com',
      VITE_API_TIMEOUT: '3000',
      VITE_API_VERSION: 'v2',
      VITE_ENABLE_ANALYTICS: 'true',
      VITE_ENABLE_PWA: 'true'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads configuration with environment variables', async () => {
    const config = (await import('./config')).default;
    
    expect(config.api.baseUrl).toBe('http://test-api.com');
    expect(config.api.timeout).toBe(3000);
    expect(config.api.version).toBe('v2');
    expect(config.app.environment).toBe('test');
    expect(config.app.isTest).toBe(true);
  });

  it('uses default values when environment variables are not set', async () => {
    process.env.VITE_API_BASE_URL = undefined;
    process.env.VITE_API_TIMEOUT = undefined;
    process.env.VITE_API_VERSION = undefined;
    
    const config = (await import('./config')).default;
    
    expect(config.api.baseUrl).toBe('http://localhost:4080/api');
    expect(config.api.timeout).toBe(5000);
    expect(config.api.version).toBe('v1');
  });

  it('validates configuration schema', async () => {
    const config = (await import('./config')).default;
    
    expect(() => {
      const { configSchema } = require('./config');
      configSchema.parse(config);
    }).not.toThrow();
  });

  it('throws error for invalid configuration', () => {
    const invalidConfig = {
      api: {
        baseUrl: 'not-a-url',
        timeout: 'invalid',
        version: 123
      }
    };

    expect(() => {
      const { configSchema } = require('./config');
      configSchema.parse(invalidConfig);
    }).toThrow(z.ZodError);
  });
});
