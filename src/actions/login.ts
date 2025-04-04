"use server";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/schemas/login-schema";
import { signIn } from "@/lib/auth/server";
import { APIError as AuthError } from "better-auth/api";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, twoFactorCode } }) => {
    try {
      await signIn(email, password, true); 
      return {
        success: true,
        message: "Successfully logged in",
      };
    } catch (error: unknown) {

      if(error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: "An error occurred during login",
      };
    }
  });
