import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const {
  getSession,
  signUp,
  signOut,
  forgetPassword: forgotPassword,
  resetPassword,
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [twoFactorClient()],
});
