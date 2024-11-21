import { Request, Response } from "express";
import { prisma } from "../index";

export const updateStartup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract the startup ID from the route parameters
    const updateData = req.body; // Extract the fields to be updated from the request body

    if (!Object.keys(updateData).length) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // Update the startup profile with the provided fields
    const updatedStartup = await prisma.startup_Profile.update({
      where: { user_id: id },
      data: updateData,
    });

    res.status(200).json({
      message: "Startup profile updated successfully",
      startup: updatedStartup,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update startup profile" });
  }
};
// Get the list of all startups
export const getStartupList = async (req: Request, res: Response) => {
  try {
    const startups = await prisma.startup_Profile.findMany({
      include: {
        registrations: true,
        addresses: true,
        founders: true,
        documents: true,
      },
    });
    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch startup profiles" });
  }
};

// Approve a startup by ID
export const approveStartup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const startup = await prisma.startup_Profile.update({
      where: { user_id: id },
      data: { isApproved: true },
    });
    console.log(startup);
    res.status(200).json({ message: "Startup approved successfully", startup });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve startup" });
  }
};

// Reject a startup by ID
export const rejectStartup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete the startup profile
    await prisma.startup_Profile.delete({
      where: { user_id: id },
    });

    res
      .status(200)
      .json({ message: "Startup rejected and deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject startup" });
  }
};

export const getCurrentStartup = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; // Get the email from query params.

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the founder based on email
    const founder = await prisma.founders.findUnique({
      where: { email: email },
    });

    if (!founder) {
      return res.status(404).json({ message: "Founder not found" });
    }

    // Find the associated startup using the founder's user_id
    const startup = await prisma.startup_Profile.findUnique({
      where: { user_id: founder.user_id },
      include: {
        registrations: true,
        addresses: true,
        founders: true,
        documents: true,
      },
    });

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch current startup details" });
  }
};
