import { z } from "zod";
import { emailSchema } from "@/schemas/generics/email";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;