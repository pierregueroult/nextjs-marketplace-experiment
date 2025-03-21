"use server";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/schemas/login-schema";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, twoFactorCode } }) => {
    console.log(email, password, twoFactorCode);
  });
