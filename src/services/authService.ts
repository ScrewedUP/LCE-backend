import { Prisma } from "@prisma/client";
import { prisma } from "../index";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const findFounderByEmail = async (email: string) => {
  return await prisma.founders.findUnique({ where: { email } });
};

export const findAdminByEmail = async (email: string) => {
  return await prisma.admin.findUnique({ where: { email } });
};
export const registerFounder = async (
  email: string,
  password: string,
  userId: string
) => {
  try {
    const hashedPassword = await hashPassword(password);
    return await prisma.founders.create({
      data: {
        email,
        password: hashedPassword,
        user_id: userId,
      } as Prisma.FoundersUncheckedCreateInput,
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Founder with this email already exists.");
      }
    }
    throw new Error("Error registering founder: " + error.message);
  }
};

export const registerAdmin = async (email: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password);
    return await prisma.admin.create({
      data: { email, password: hashedPassword },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Admin with this email already exists.");
      }
    }
    throw new Error("Error registering admin: " + error.message);
  }
};

export const loginFounder = async (email: string, password: string) => {
  try {
    const founder = await prisma.founders.findUnique({ where: { email } });
    if (!founder || !(await comparePassword(password, founder.password))) {
      throw new Error("Invalid credentials");
    }
    const accessToken = generateAccessToken(
      founder.founderid,
      founder.email,
      true
    );
    const refreshToken = generateRefreshToken(founder.founderid);
    return {
      accessToken,
      refreshToken,
      email: founder.email,
      founder_id: founder.founderid,
    };
  } catch (error: any) {
    throw new Error("Error logging in founder: " + error.message);
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await comparePassword(password, admin.password))) {
      throw new Error("Invalid credentials");
    }
    const accessToken = generateAccessToken(admin.admin_id, admin.email, false);
    const refreshToken = generateRefreshToken(admin.admin_id);
    return {
      accessToken,
      refreshToken,
      email: admin.email,
      admin_id: admin.admin_id,
    };
  } catch (error: any) {
    throw new Error("Error logging in admin: " + error.message);
  }
};
