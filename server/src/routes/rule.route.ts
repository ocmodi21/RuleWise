import { Router } from "express";
import ruleController from "../conntrollers/rule.controller";

const router = Router();

router.post("/createRule", ruleController.createRule);
router.post("/evaluateRule", ruleController.evaluateRule);

export default router;
