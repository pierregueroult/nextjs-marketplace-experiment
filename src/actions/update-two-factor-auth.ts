"use server";

import { auth } from "@/lib/auth";
import { disableTwoFactor, enableTwoFactor } from "@/lib/auth/server";
import { log } from "@/lib/logger";
import { actionClient } from "@/lib/safe-action";
import { twoFactorSchema } from "@/schemas/two-factor-schema";

export const updateTwoFactorAuthAction = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: { initial, enabled, password } }) => {
    if (enabled === initial) {
      return {
        success: false,
        message: "No changes detected.",
      };
    }

    try {
      if (!enabled) {
        await enableTwoFactor(password);
      } else {
        await disableTwoFactor(password);
      }
      
      return {
        success: true,
        message: "Two factor authentication updated successfully.",
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        log(`Two factor auth error: ${error.message}`, {
          level: "ERROR",
          context: "2FA",
          error,
        });

        return {
          success: false,
          message: `An error occurred: ${error.message}`,
        };
      } else {
        return {
          success: false,
          message: "An unknown error occurred.",
        };
      }
    }
  });
