import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

export const generateAccessToken = (
  userId: string,
  email: string,
  isFounder: boolean
) => {
  const payload = {
    userId,
    email,
    ...(isFounder ? { founder_id: userId } : { admin_id: userId }),
  };
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId }, refreshTokenSecret, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, accessTokenSecret);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, refreshTokenSecret);
