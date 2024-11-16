import express from "express";
import {
  getEvents,
  addEvent,
  updateEvent,
} from "../controllers/eventsController";

const router = express.Router();
router.get("/getEvents", getEvents);
router.post("/addEvent", addEvent);
router.put("/update/:id", updateEvent);

export default router;
