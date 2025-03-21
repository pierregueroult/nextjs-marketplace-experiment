import { z } from "zod";

export const twoFactorLength: number = 6;

const lowercase: RegExp = /[a-z]/;
const uppercase: RegExp = /[A-Z]/;
const number: RegExp = /\d/;
const specialCharacter: RegExp = /[^a-zA-Z0-9]/;
const twoFactorCode: RegExp = new RegExp(`^\\d{${twoFactorLength}}$`);

export const loginSchema = z.object({
  email: z.string().email({
    message: "L'adresse email fournie n'est pas valide.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères.",
    })
    .regex(lowercase, {
      message: "Le mot de passe doit contenir au moins une lettre minuscule.",
    })
    .regex(uppercase, {
      message: "Le mot de passe doit contenir au moins une lettre majuscule.",
    })
    .regex(number, {
      message: "Le mot de passe doit contenir au moins un chiffre.",
    })
    .regex(specialCharacter, {
      message: "Le mot de passe doit contenir au moins un caractère spécial.",
    }),
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