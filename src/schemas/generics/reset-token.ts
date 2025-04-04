import { z } from "zod";

export const resetTokenSchema = z.string().regex(/^[A-Za-z0-9]{24}$/);