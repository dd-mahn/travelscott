import { z } from 'zod';

// Configuration schema
const configSchema = z.object({
  api: z.object({
    baseUrl: z.string().url(),
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

// Type inference
type Config = z.infer<typeof configSchema>;

// Environment variables with fallbacks
const environment = import.meta.env.VITE_NODE_ENV || 'development';

const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4080/api',
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

// Validate configuration
configSchema.parse(config);

export default config;
