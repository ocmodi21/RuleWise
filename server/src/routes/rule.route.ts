import { Router } from "express";
import ruleController from "../conntrollers/rule.controller";

const router = Router();

router.post("/createRule", ruleController.createRule);

export default router;