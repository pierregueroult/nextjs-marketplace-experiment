import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor } from "better-auth/plugins";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { prisma } from "@/database";
import send from "@/emails/send";
import { twoFactorLength } from "@/schemas/login-schema";
import { passwordMaxLength, passwordMinLength } from "@/schemas/generics/password";

export const auth = betterAuth({
  appName: "Next.js Marketplace Experiment",
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: passwordMinLength,
    maxPasswordLength: passwordMaxLength,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await send({
        to: user.email,
        subject: "Reset your password",
        template: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  },
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
  plugins: [
    twoFactor({
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          await send({
            to: user.email,
            subject: "Your OTP code",
            template: `Your OTP code is ${otp}.`,
          });
        },
        digits: twoFactorLength,
        period: 20,
      },
    }),
    nextCookies(),
  ],
});

export const { POST, GET } = toNextJsHandler(auth);
