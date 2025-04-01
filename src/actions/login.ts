"use server";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/schemas/login-schema";
import { signIn } from "@/services/auth-server";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, twoFactorCode } }) => {
    try {
      await signIn(email, password, true); 
      return {
        success: true,
        message: "Connexion réussie.",
      };
    } catch (error) {
      console.error("Error during login", error);
      return {
        success: false,
        message: "Une erreur est survenue lors de la connexion.",
        infos: error instanceof Error ? error.message : undefined,
      };
    }
  });
