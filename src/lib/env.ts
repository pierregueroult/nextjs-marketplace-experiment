import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SMTP_EMAIL_FROM: z.string().email(),
    SMTP_SERVER_HOST: z.string(),
    SMTP_SERVER_PORT: z
      .string()
      .regex(/^\d+$/)
      .transform((val) => parseInt(val, 10)),
    SMTP_SERVER_USER: z.string(),
    SMTP_SERVER_PASS: z.string(),
    SMTP_SERVER_SECURE: z.string().default("false").transform(val => val === "true"),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_EMAIL_FROM: process.env.SMTP_EMAIL_FROM,
    SMTP_SERVER_HOST: process.env.SMTP_SERVER_HOST,
    SMTP_SERVER_PORT: process.env.SMTP_SERVER_PORT,
    SMTP_SERVER_USER: process.env.SMTP_SERVER_USER,
    SMTP_SERVER_PASS: process.env.SMTP_SERVER_PASS,
    SMTP_SERVER_SECURE: process.env.SMTP_SERVER_SECURE,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
