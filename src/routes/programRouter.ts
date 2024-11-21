import express from "express";
import {
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
  addProgram,
} from "../controllers/programController";

const router = express.Router();
router.get("/programs", getPrograms);
router.post("/addProgram", addProgram);
router.get("/programs/:id", getProgram);
router.put("/programs/:id", updateProgram);
router.delete("/programs/:id", deleteProgram);

export default router;
