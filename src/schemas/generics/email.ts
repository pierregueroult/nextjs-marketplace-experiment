import { z } from "zod";

export const emailSchema = z.string().email({
  message: "L'adresse email fournie n'est pas valide.",
});
