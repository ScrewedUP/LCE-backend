import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = verifyAccessToken(token) as { userId: string };
    (req as any).user = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
