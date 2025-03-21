"use server";
import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/schemas/register-schema";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { firstName, lastName, email, password, passwordConfirmation } }) => {
    console.log(firstName, lastName, email, password, password);
  });
