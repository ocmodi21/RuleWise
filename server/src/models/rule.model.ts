import mongoose, { Schema, Document } from "mongoose";

// Define the type for the data parameter to ensure it matches the expected structure
interface JSONAST {
  type: "operator" | "operand";
  value: string;
  left: JSONAST | null;
  right: JSONAST | null;
}

// Node structure for ruleAST
export class Node {
  constructor(
    public type: "operator" | "operand",
    public value: string,
    public left: Node | null = null,
    public right: Node | null = null
  ) {}

  // Convert Node to JSON
  convertToJson(): JSONAST {
    return {
      type: this.type,
      value: this.value,
      left: this.left?.convertToJson() || null,
      right: this.right?.convertToJson() || null,
    };
  }

  // Reconstruct Node from JSON
  static convertFromJson(data: JSONAST | null): Node | null {
    return data
      ? new Node(
          data.type,
          data.value,
          Node.convertFromJson(data.left),
          Node.convertFromJson(data.right)
        )
      : null;
  }
}

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
