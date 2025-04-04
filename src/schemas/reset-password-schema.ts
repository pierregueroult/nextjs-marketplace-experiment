import { z } from "zod";
import { passwordSchema } from "./generics/password";
import { resetTokenSchema } from "./generics/reset-token";

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    token: resetTokenSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Both passwords must match.",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
