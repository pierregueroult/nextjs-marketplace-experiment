"use server";
import { actionClient } from "@/lib/safe-action";
import { resetPasswordSchema } from "@/schemas/reset-password-schema";
import { resetPassword } from "@/services/auth-server";
import { APIError as AuthError } from "better-auth/api";

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { token, password, passwordConfirmation } }) => {
    if (password !== passwordConfirmation) {
      return {
        success: false,
        message: "Both passwords do not match.",
      };
    }
    try {
      await resetPassword(token, password);
      return {
        success: true,
        message: "Password reset successfully.",
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
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  });
