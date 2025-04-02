import { z } from "zod";
import { emailSchema } from "@/schemas/generics/email";

export const twoFactorLength: number = 6;

const twoFactorCode: RegExp = new RegExp(`^\\d{${twoFactorLength}}$`);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, {
    message: "Password should be at least 8 characters long.",
  }),
  twoFactorCode: z
    .string()
    .length(twoFactorLength, {
      message: `Two-factor code must be exactly ${twoFactorLength} digits.`,
    })
    .regex(twoFactorCode, {
      message: `Invalid two-factor code format. It should be ${twoFactorLength} digits.`,
    })
    .optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
