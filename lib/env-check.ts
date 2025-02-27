import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  PASSWORD_ENCRYPTION_KEY: z.string(),
});

// Validate and parse the environment variables
export const env = envSchema.parse(process.env);
