import { Request, Response } from "express";
import { prisma } from "../index";

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany();
    res.json(programs);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id) },
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, icon, features } = req.body;
  try {
    const program = await prisma.program.update({
      where: { id: parseInt(id) },
      data: { title, description, icon, features },
    });
    res.json(program);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.program.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
export const addProgram = async (req: Request, res: Response) => {
  const { title, description, icon, features } = req.body;
  try {
    const newProgram = await prisma.program.create({
      data: {
        title,
        description,
        icon,
        features,
      },
    });
    res.status(201).json(newProgram);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
