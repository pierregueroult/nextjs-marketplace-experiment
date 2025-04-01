import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor } from "better-auth/plugins";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { prisma } from "@/database";
import send from "@/emails/send";

export const auth = betterAuth({
  appName: "Next.js Marketplace Experiment",
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [twoFactor(), nextCookies()],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await send({
        to: user.email,
        subject: "Verify your email",
        template: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
    sendOnSignUp: true,
    expiresIn: 60 * 20,
  },
});

export const { POST, GET } = toNextJsHandler(auth);
