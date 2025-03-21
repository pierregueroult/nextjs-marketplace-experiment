import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/database";
import { twoFactor } from "better-auth/plugins";
import { toNextJsHandler } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Next.js Marketplace Experiment",
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [twoFactor()],
});

export const { POST, GET } = toNextJsHandler(auth);
