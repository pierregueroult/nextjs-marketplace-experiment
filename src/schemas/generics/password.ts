import { z } from "zod";

const lowercase: RegExp = /[a-z]/;
const uppercase: RegExp = /[A-Z]/;
const number: RegExp = /\d/;
const specialCharacter: RegExp = /[^a-zA-Z0-9]/;

export const passwordSchema = z
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
})