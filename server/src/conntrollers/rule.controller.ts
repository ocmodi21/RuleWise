import { Request, Response } from "express";
import ASTManager from "../utils/AST-manager";
import RuleModel from "../models/rule.model";

class RuleController {
  async createRule(req: Request, res: Response): Promise<any> {
    // Destructure the ruleString from the request body
    const { ruleString } = req.body;

    // Check if ruleString is provided
    if (!ruleString) {
      return res.status(400).json({ message: "Rule string is required" });
    }

    try {
      // Parse the rule string to create an Abstract Syntax Tree (AST)
      const AST = ASTManager.parseRuleString(ruleString);

      // Create a new rule in the database with the parsed AST
      await RuleModel.create({ rule: ruleString, ruleAST: AST });

      // Respond with a success message and the created AST
      return res.status(201).json({
        message: "Rule created successfully.",
        data: AST,
      });
    } catch (error) {
      // Handle generic errors
      return res.status(500).json({
        message: "An internal server error occurred while creating rule.",
      });
    }
  }
}

export default new RuleController();
