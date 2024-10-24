import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(4080),
  dbUri: z.string().nonempty(),
  jwtSecret: z.string().nonempty(),
  environment: z.enum(['development', 'production', 'test']).default('development'),
});

type Config = z.infer<typeof configSchema>;

const config: Config = configSchema.parse({
  port: Number(process.env.PORT),
  dbUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV,
});

export default config;
