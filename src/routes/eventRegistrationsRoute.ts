// routes/eventRegistrationsRoute.ts
import express from "express";
import {
  getRegistrations,
  registerEvent,
} from "../controllers/eventRegistrationsController";

const router = express.Router();
router.get("/getRegistrations/:eventId", getRegistrations);
router.post("/registerEvent", registerEvent);

export default router;
