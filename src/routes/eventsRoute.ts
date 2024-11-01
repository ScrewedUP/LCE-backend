import express from "express";
import { getEvents, addEvent } from "../controllers/eventsController";

const router = express.Router();
router.get("/getEvents", getEvents);
router.post("/addEvent", addEvent);

export default router;
