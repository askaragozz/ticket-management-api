import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(1).max(5000).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(), // default handled by DB or service
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
