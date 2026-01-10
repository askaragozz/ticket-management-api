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

export async function listTickets(req: Request, res: Response) {
  const userId = req.user?.id;
  const role = req.user?.role ?? "USER";
  if (!userId) return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Unauthorized" } });

  const { page, pageSize, status, priority } = res.locals.query as {
    page: number;
    pageSize: number;
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    priority?: "LOW" | "MEDIUM" | "HIGH";
  };

  const where: any = {};

  if (status) where.status = status;
  if (priority) where.priority = priority;

  if (role !== "ADMIN") {
    where.OR = [{ createdById: userId }, { assignedToId: userId }];
  }

  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        assignedToId: true,
      },
    }),
    prisma.ticket.count({ where }),
  ]);

  return res.json({
    page,
    pageSize,
    total,
    items,
  });
}
