import mongoose, { Schema, Document } from "mongoose";
import { Node } from "../utils/AST-manager";

// Interface for the Rule
export interface Rule extends Document {
  rule: string;
  ruleAST: Node;
}

// Rule schema definition
const RuleSchema: Schema = new Schema(
  {
    rule: { type: String, required: true },
    ruleAST: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

// Creating the Rule model
const RuleModel = mongoose.model<Rule>("Rule", RuleSchema);

export default RuleModel;
