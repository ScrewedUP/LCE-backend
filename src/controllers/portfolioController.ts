import { Request, Response } from "express";
import { prisma } from "../index";

// Add a new startup
export const addStartup = async (req: Request, res: Response) => {
  const { name, icon, description, website, category, impact, team, growth } =
    req.body;
  try {
    const startup = await prisma.startup.create({
      data: {
        name,
        icon,
        description,
        website,
        category,
        impact,
        team,
        growth,
      },
    });
    res.status(201).json(startup);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

// Get all startups
export const getStartups = async (req: Request, res: Response) => {
  try {
    const startups = await prisma.startup.findMany();
    res.json(startups);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

// Get a single startup by id
export const getStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const startup = await prisma.startup.findUnique({
      where: { id: parseInt(id) },
    });
    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }
    res.json(startup);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

// Update a startup
export const updateStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, icon, description, website, category, impact, team, growth } =
    req.body;
  try {
    const startup = await prisma.startup.update({
      where: { id: parseInt(id) },
      data: {
        name,
        icon,
        description,
        website,
        category,
        impact,
        team,
        growth,
      },
    });
    res.json(startup);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

// Delete a startup
export const deleteStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.startup.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};
