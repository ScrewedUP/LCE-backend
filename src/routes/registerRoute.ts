import express from "express";
import { registerStartup } from "../controllers/registerController";

const router = express.Router();

router.post("/", registerStartup);

export default router;
