import { z } from "zod";
import { emailSchema } from "./generics/email";
import { passwordSchema } from "./generics/password";

export const registerSchema = z
  .object({
    firstName: z.string().nonempty({
      message: "First name is required.",
    }),
    lastName: z.string().nonempty({
      message: "Name is required.",
    }),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Both passwords must match.",
    path: ["passwordConfirmation"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
