import { Request, Response } from "express";
import ASTManager, { Node } from "../utils/AST-manager";
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
      const rule = await RuleModel.create({ rule: ruleString, ruleAST: AST });

      // Respond with a success message and the created AST
      return res.status(201).json({
        message: "Rule created successfully.",
        data: {
          id: rule._id,
          ruleString: rule.rule,
        },
      });
    } catch (error) {
      // Handle generic errors
      return res.status(500).json({
        message: "An internal server error occurred while creating rule.",
      });
    }
  }

  // Evaluates a rule AST against provided user data
  async evaluateRule(req: Request, res: Response): Promise<any> {
    const { ruleId, userData } = req.body;

    try {
      // retrieve the rule by its ID
      const rule = await RuleModel.findById(ruleId);

      // If rule is not found, return a 404 error
      if (!rule) {
        return res.status(404).json({ message: "Rule not found." });
      }

      // Convert the stored ruleAST JSON into an AST Node structure
      const node = Node.convertFromJson(rule?.ruleAST ?? null);

      // If node conversion fails, return a 400 error
      if (!node) {
        return res.status(400).json({ message: "Invalid rule AST format." });
      }

      // Evaluate the rule AST against the provided user data
      const isValid = ASTManager.evaluateAST(node, userData);

      // Send evaluation result along with rule data
      return res.status(200).json({
        data: {
          rule: rule.rule,
          isValid: isValid,
        },
      });
    } catch (error) {
      // Handle generic errors
      return res.status(500).json({
        message: "An internal server error occurred while evaluating the rule.",
      });
    }
  }

  async modifyRule(req: Request, res: Response): Promise<any> {
    const { ruleId, ruleString } = req.body;

    try {
      // retrieve the rule by its ID
      const rule = await RuleModel.findById(ruleId, {
        _id: 1,
        rule: 1,
        ruleAST: 1,
      });

      // If rule is not found, return a 404 error
      if (!rule) {
        return res.status(404).json({ message: "Rule not found." });
      }

      const newRule = rule;
      newRule.rule = ruleString;
      newRule.ruleAST = ASTManager.parseRuleString(ruleString);

      await RuleModel.updateOne({ _id: ruleId }, newRule);

      // Respond with a success message and the created AST
      return res.status(200).json({
        message: "Rule updated successfully.",
        data: newRule,
      });
    } catch (error) {
      // Handle generic errors
      return res.status(500).json({
        message: "An internal server error occurred while modifying the rule.",
      });
    }
  }
}

export default new RuleController();
