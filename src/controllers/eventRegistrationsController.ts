// controllers/eventRegistrationsController.ts
import { Request, Response } from "express";
import { prisma } from "../index";

export const getRegistrations = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const registrations = await prisma.event_Registrations.findMany({
      where: { eventId },
    });
    res.status(200).json(registrations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch registrations for the event" });
  }
};

export const registerEvent = async (req: Request, res: Response) => {
  const { eventId, name, number, email } = req.body;
  try {
    const registration = await prisma.event_Registrations.create({
      data: { eventId, name, number, email },
    });
    res.status(201).json(registration);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register for event", body: req.body });
  }
};

export const getRegistrationsByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const registrations = await prisma.event_Registrations.findMany({
      where: { email },
    });
    res.status(200).json(registrations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch registrations for the user" });
  }
};
