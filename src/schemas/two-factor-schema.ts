import { z } from "zod";

export const twoFactorSchema = z.object({
  initial: z.boolean(),
  enabled: z.boolean(),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters long.",
  }),
});

export type TwoFactorSchema = z.infer<typeof twoFactorSchema>;