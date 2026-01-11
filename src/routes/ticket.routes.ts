import { Router } from "express";
import { createTicket, listTickets, getTicketById } from "../controllers/ticket.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validate.js";
import { validateQuery } from "../middleware/validateQuery.js";
import { validateParams } from "../middleware/validateParams.js";
import { ticketIdParamSchema } from "../schemas/ticket.params.js";
import { createTicketSchema } from "../schemas/ticket.schema.js";
import { listTicketsQuerySchema } from "../schemas/ticket.query.js";

const router = Router();

router.post("/", requireAuth, validateBody(createTicketSchema), createTicket);
router.get("/", requireAuth, validateQuery(listTicketsQuerySchema), listTickets);
router.get("/:id", requireAuth, validateParams(ticketIdParamSchema), getTicketById );
export default router;
