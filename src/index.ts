import express from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/authRouter";
import eventsRouter from "./routes/eventsRoute";
import registerRouter from "./routes/registerRoute";
import eventRegistrationsRouter from "./routes/eventRegistrationsRoute";
import progamRouter from "./routes/programRouter";
import portfolioRouter from "./routes/portfolioRouter";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import startupsRoute from "./routes/startupsRoute";
export const prisma = new PrismaClient();

const app = express();
async function main() {
  app.use(
    cors({
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/events", eventsRouter);
  app.use("/registrations", eventRegistrationsRouter);
  app.use("/register", registerRouter);
  app.use("/startups", startupsRoute);
  app.use("/program", progamRouter);
  app.use("/portfolio", portfolioRouter);
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
  const server = http.createServer(app);

  server.listen(8080, () => {
    console.log("Backend server running on port 8080");
  });
}
main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
