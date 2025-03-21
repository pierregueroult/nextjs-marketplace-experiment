import { z } from "zod";
import { passwordSchema } from "@/schemas/generics/password";
import { emailSchema } from "@/schemas/generics/email";

export const twoFactorLength: number = 6;

const twoFactorCode: RegExp = new RegExp(`^\\d{${twoFactorLength}}$`);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  twoFactorCode: z
    .string()
    .length(twoFactorLength, {
      message: `Le code à ${twoFactorLength} chiffres est requis.`,
    })
    .regex(twoFactorCode, {
      message: `Le code à ${twoFactorLength} chiffres est requis.`,
    })
    .optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
