import { z } from "zod";

const lowercase: RegExp = /[a-z]/;
const uppercase: RegExp = /[A-Z]/;
const number: RegExp = /\d/;
const specialCharacter: RegExp = /[^a-zA-Z0-9]/;

export const passwordMinLength: number = 8;
export const passwordMaxLength: number = 64;

export const passwordSchema = z
  .string()
  .min(passwordMinLength, {
    message: `Password must be at least ${passwordMinLength} characters long.`,
  })
  .max(passwordMaxLength, {
    message: `Password must be at most ${passwordMaxLength} characters long.`,
  })
  .regex(lowercase, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(uppercase, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(number, {
    message: "Password must contain at least one number.",
  })
  .regex(specialCharacter, {
    message: "Password must contain at least one special character.",
  });
