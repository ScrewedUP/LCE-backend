// routes/eventRegistrationsRoute.ts
import express from "express";
import {
  getRegistrations,
  getRegistrationsByEmail,
  registerEvent,
} from "../controllers/eventRegistrationsController";

const router = express.Router();
router.get("/getRegistrations/:eventId", getRegistrations);
router.post("/registerEvent", registerEvent);
router.get("/getUserRegistrations", getRegistrationsByEmail);
export default router;
