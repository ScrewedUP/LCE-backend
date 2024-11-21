import { Router } from "express";
import * as portfolioController from "../controllers/portfolioController";

const router = Router();
router.post("/addPortfolios", portfolioController.addStartup);
router.get("/portfolios", portfolioController.getStartups);
router.get("/portfolios/:id", portfolioController.getStartup);
router.put("/portfolios/:id", portfolioController.updateStartup);
router.delete("/portfolios/:id", portfolioController.deleteStartup);

export default router;
