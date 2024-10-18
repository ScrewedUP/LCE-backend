import express from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/authRouter";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
export const prisma = new PrismaClient();

const app = express();
async function main(){
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRouter);

 // Catch unregistered routes
 app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Backend server running on port 8080");
});
}
main().then(
  async () => {
    await prisma.$connect();
  }
).catch(
  async (e) => {
    console.error(e)
    await prisma.$disconnect();
  }
);