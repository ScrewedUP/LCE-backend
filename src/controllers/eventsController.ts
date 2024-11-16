import { Request, Response } from "express";
import { prisma } from "../index";
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.events.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
export const addEvent = async (req: Request, res: Response) => {
  const { name, posterLink, date, description } = req.body;

  try {
    const event = await prisma.events.create({
      data: { name, posterLink, date: new Date(date), description },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to add event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const { name, posterLink, date, description } = req.body;
  try {
    const eventToUpdate = await prisma.events.update({
      where: {
        id: eventId,
      },
      data: { name, posterLink, date, description },
    });
    res
      .status(201)
      .json({ success: "Event Updated Successfully", eventToUpdate });
  } catch (e) {
    res.status(500).json({ error: "Error while updating" });
  }
};
