import { z } from "zod";

export const ticketIdParamSchema = z.object({
  id: z.string().min(1),
});
