import { z } from "zod";

export const deleteSessionSchema = z.object({
  id: z.string(),
});

export type DeleteSessionSchema = z.infer<typeof deleteSessionSchema>;
