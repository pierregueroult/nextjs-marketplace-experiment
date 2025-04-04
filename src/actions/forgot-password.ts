"use server";
import { actionClient } from "@/lib/safe-action";
import { forgotPasswordSchema } from "@/schemas/forgot-password-schema";
import { forgotPassword } from "@/lib/auth/server";
import { APIError as AuthError } from "better-auth/api";

export const forgotPasswordAction = actionClient
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      await forgotPassword(email);
      return {
        success: true,
        message: "Reset password link sent to your email",
      };
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: "An error occurred while sending the reset password link",
      };
    }
  });
