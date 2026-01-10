import { Router } from "express";
import { createTicket } from "../controllers/ticket.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { validateBody } from "../middlewares/validate.js";
import { createTicketSchema } from "../schemas/ticket.schema.js";

const router = Router();

router.post("/", requireAuth, validateBody(createTicketSchema), createTicket);

export default router;
