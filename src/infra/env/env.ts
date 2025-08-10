import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(4000),
});

export type Env = z.infer<typeof envSchema>;
