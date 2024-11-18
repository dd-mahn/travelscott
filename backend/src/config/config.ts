import dotenv from 'dotenv';
import { z } from 'zod';

// Load the correct .env file based on environment
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production'
  : process.env.NODE_ENV === 'test'
  ? '.env.test'
  : '.env.development';

dotenv.config({ path: envFile });

const configSchema = z.object({
  port: z.number().default(4080),
  database: z.object({
    uri: z.string().nonempty(),
    name: z.string().default('CollectionDB'),
    development: z.string().optional(),
    production: z.string().optional(),
    test: z.string().optional()
  }),
  jwt: z.object({
    secret: z.string().nonempty(),
    expiresIn: z.string().default('24h'),
    refreshToken: z.object({
      secret: z.string().nonempty(),
      expiresIn: z.string().default('7d')
    })
  }),
  environment: z.enum(['development', 'production', 'test']).default('development'),
  security: z.object({
    rateLimitWindowMs: z.number().default(15 * 60 * 1000),
    rateLimitMax: z.number().default(100),
    allowedOrigins: z.array(z.string()).default([]),
    requestSizeLimit: z.string().default('10mb')
  })
});

type Config = z.infer<typeof configSchema>;

const config: Config = configSchema.parse({
  port: Number(process.env.PORT),
  database: {
    uri: process.env.NODE_ENV === 'production' 
    ? process.env.MONGO_URI_PROD 
    : process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_TEST,
    name: process.env.DB_NAME || 'CollectionDB',
    development: process.env.MONGO_URI_DEV,
    production: process.env.MONGO_URI_PROD,
    test: process.env.MONGO_URI_TEST
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    }
  },
  environment: process.env.NODE_ENV as 'development' | 'production' | 'test',
  security: {
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
    requestSizeLimit: process.env.REQUEST_SIZE_LIMIT || '10mb'
  }
});

export default config;
