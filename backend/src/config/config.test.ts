import config from 'src/config/config';
import { z } from 'zod';

describe('Config', () => {
  it('should have valid configuration', () => {
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

    const parsedConfig = configSchema.safeParse(config);
    expect(parsedConfig.success).toBe(true);
  });
});
