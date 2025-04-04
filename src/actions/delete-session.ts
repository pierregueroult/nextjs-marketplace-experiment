"use server";

import { getSession } from "@/lib/auth/server";
import { log } from "@/lib/logger";
import { actionClient } from "@/lib/safe-action";
import { deleteSessionSchema } from "@/schemas/delete-session-schema";
import { deleteSession } from "@/services/sessions";

export const deleteSessionAction = actionClient
  .schema(deleteSessionSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { session, user } = await getSession();

    if (!session || !user)
      return {
        success: false,
        message: "Authentication required. Please log in.",
      };

    if (session.id === id)
      return {
        success: false,
        message: "You cannot delete your currently active session.",
      };

    try {
      await deleteSession(id, user);

      return {
        success: true,
        message: "Session deleted successfully.",
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        log(`Error deleting session for user ${user.id}`, {
          level: "ERROR",
          context: "SESSION",
          error,
        });
      }

      return {
        success: false,
        message:
          "An error occurred while deleting the specified session. It might no longer exist or you may not have permission.",
      };
    }
  });
