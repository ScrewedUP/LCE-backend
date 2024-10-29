import { Request, Response } from "express";
import * as authService from "../services/authService";
import { verifyRefreshToken, generateAccessToken } from "../utils/jwt";

export const registerFounder = async (req: Request, res: Response) => {
  const { email, password, userId } = req.body;
  try {
    const existingFounder = await authService.findFounderByEmail(email);
    if (existingFounder) {
      return res.status(400).json({ error: "Founder already exists" });
    }
    const founder = await authService.registerFounder(email, password, userId);
    res.status(201).json({ founder });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await authService.findAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }
    const admin = await authService.registerAdmin(email, password);
    res.status(201).json({ admin });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginFounder = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const {
      accessToken,
      founder_id,
      email: userEmail,
    } = await authService.loginFounder(email, password);
    res.status(201).json({
      message: "Founder signed in successfully",
      success: true,
      token: accessToken,
      email: userEmail,
      founder_id,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const {
      accessToken,
      admin_id,
      email: userEmail,
    } = await authService.loginAdmin(email, password);
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      token: accessToken,
      email: userEmail,
      admin_id,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const payload: any = verifyRefreshToken(refreshToken);
    const userId = payload.userId;

    let user;
    if (payload.founder_id) {
      user = await authService.findFounderByEmail(userId);
    } else {
      user = await authService.findAdminByEmail(userId);
    }

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Pass the user’s ID, email, and role to generate a new access token
    const newAccessToken = generateAccessToken(
      userId,
      user.email,
      !!payload.founder_id
    );
    res.json({ accessToken: newAccessToken });
  } catch (error: any) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};
