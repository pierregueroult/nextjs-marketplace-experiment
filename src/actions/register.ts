"use server";
import { EmailDeliveryError, SMTPServerError } from "@/emails/error";
import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/schemas/register-schema";
import { signUp } from "@/services/auth-server";
import { APIError as AuthError } from "better-auth/api";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { firstName, lastName, email, password, passwordConfirmation } }) => {
    if (password !== passwordConfirmation) {
      return {
        success: false,
        message: "Both passwords do not match.",
      };
    }
    try {
      await signUp(email, password, `${firstName} ${lastName}`, false);

      return {
        success: true,
        message: "Registration successful. Please check your email to verify your account before logging in.",
      };
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (error instanceof EmailDeliveryError) {
        return {
          success: false,
          message: "We are unable to send the verification email at this email address. Use a different email address.",
        }
      }

      if (error instanceof SMTPServerError) {
        return {
          success: false,
          message: "We are unable to send the verification email at this time. Your account has been created and we will send you an email as soon as possible.",
        };
      }

      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  });
