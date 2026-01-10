import type { Request, Response } from "express";
import { prisma } from "../db/prisma.js";

export async function createTicket(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Unauthorized" },
    });
  }

  const { title, description, priority } = req.body as {
    title: string;
    description?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
  };

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      priority: priority ?? undefined, // let DB default if not provided
      createdById: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      createdAt: true,
      updatedAt: true,
      createdById: true,
      assignedToId: true,
    },
  });

  return res.status(201).json({ ticket });
}
