import config from 'src/config/config';
import { z } from 'zod';

describe('Config', () => {
  it('should have valid configuration', () => {
    const configSchema = z.object({
      port: z.number().default(4080),
      database: z.object({
        uri: z.string().nonempty(),
        name: z.string(),
        development: z.string().optional(),
        production: z.string().optional(),
        test: z.string().optional()
      }),
      jwtSecret: z.string().nonempty(),
      environment: z.enum(['development', 'production', 'test']),
      security: z.object({
        rateLimitWindowMs: z.number(),
        rateLimitMax: z.number(),
        allowedOrigins: z.array(z.string()),
        requestSizeLimit: z.string()
      })
    });

    const parsedConfig = configSchema.safeParse(config);
    expect(parsedConfig.success).toBe(true);
  });
});
