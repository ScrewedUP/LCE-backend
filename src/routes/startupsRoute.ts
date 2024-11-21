import express from "express";
import {
  getStartupList,
  approveStartup,
  rejectStartup,
  getCurrentStartup,
  updateStartup,
} from "../controllers/startupController";

const router = express.Router();

router.get("/getStartupList", getStartupList);
router.put("/approve/:id", approveStartup);
router.delete("/reject/:id", rejectStartup);
router.get("/getCurrentStartup", getCurrentStartup);
router.patch("/update/:id", updateStartup);

export default router;
