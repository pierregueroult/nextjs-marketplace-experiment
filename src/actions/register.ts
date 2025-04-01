"use server";
import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/schemas/register-schema";
import { signUp } from "@/services/auth-server";

export const register = actionClient
  .schema(registerSchema)
  .action(
    async ({
      parsedInput: {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      },
    }) => {
      if (password !== passwordConfirmation) {
        return {
          success: false,
          message: "Les mots de passe ne correspondent pas.",
        };
      }
      try {
        await signUp(email, password, `${firstName} ${lastName}`, false);

        return {
          success: true,
          message: "Inscription réussie. Veuillez vérifier votre email.",
        };
      } catch (error) {
        console.error("Error during registration", error);
        return {
          success: false,
          message: "Une erreur est survenue lors de l'inscription.",
          infos: error instanceof Error ? error.message : undefined,
        };
      }
    }
  );
