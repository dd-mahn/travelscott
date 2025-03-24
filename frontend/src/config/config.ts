import { z } from 'zod';

// Configuration schema
const configSchema = z.object({
  api: z.object({
    baseUrl: z.string().url().startsWith('https', { message: `Production API must use HTTPS. Received URL: ${import.meta.env.VITE_API_BASE_URL}` }),
    timeout: z.number().default(5000),
    version: z.string().default('v1'),
  }),
  app: z.object({
    name: z.string().default('TravelScott'),
    environment: z.enum(['development', 'production', 'test']),
    isDevelopment: z.boolean(),
    isProduction: z.boolean(),
    isTest: z.boolean(),
  }),
  features: z.object({
    enableAnalytics: z.boolean().default(true),
    enablePWA: z.boolean().default(true),
    enableDarkMode: z.boolean().default(true),
  }),
});

// Environment variables with fallbacks
const environment = import.meta.env.VITE_NODE_ENV || 'development';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://travelscott-production.up.railway.app/api'

// Create config object first
const config = {
  api: {
    baseUrl: apiBaseUrl,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
    version: import.meta.env.VITE_API_VERSION || 'v1',
  },
  app: {
    name: 'TravelScott',
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    isTest: environment === 'test',
  },
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
    enablePWA: import.meta.env.VITE_ENABLE_PWA !== 'false',
    enableDarkMode: true,
  },
};

// Only validate in production
if (environment === 'production') {
  try {
    configSchema.parse(config);
  } catch (error: any) {
    console.error('Configuration validation error:', error);
    throw new Error(`Invalid configuration: ${error.message}`);
  }
}

export default config;
