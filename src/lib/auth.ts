import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor } from "better-auth/plugins";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { prisma } from "@/database";

export const auth = betterAuth({
  appName: "Next.js Marketplace Experiment",
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [twoFactor(), nextCookies()],
});

export const { POST, GET } = toNextJsHandler(auth);
