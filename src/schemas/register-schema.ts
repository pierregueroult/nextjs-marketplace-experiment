import { z } from "zod";
import { emailSchema } from "./generics/email";
import { passwordSchema } from "./generics/password";

export const registerSchema = z.object({
    firstName: z.string().nonempty({
        message: "Le prénom est requis.",
    }),
    lastName: z.string().nonempty({
        message: "Le nom est requis.",
    }),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["passwordConfirmation"]
});

export type RegisterSchema = z.infer<typeof registerSchema>;