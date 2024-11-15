import config from 'src/config/config';
import { z } from 'zod';

describe('Config', () => {
  it('should have valid configuration', () => {
    const configSchema = z.object({
      port: z.number().default(4080),
      dbUri: z.string().nonempty(),
      jwtSecret: z.string().nonempty(),
      environment: z.enum(['development', 'production', 'test']).default('development'),
    });

    const parsedConfig = configSchema.safeParse(config);

    expect(parsedConfig.success).toBe(true);
    if (!parsedConfig.success) {
      console.error(parsedConfig.error);
    }
  });

  it('should have the correct default values', () => {
    expect(config.port).toBe(4080);
    expect(config.environment).toBe('test');
  });

  it('should load environment variables correctly', () => {
    expect(config.dbUri).toBe(process.env.MONGO_URI);
    expect(config.jwtSecret).toBe(process.env.JWT_SECRET);
  });
});
