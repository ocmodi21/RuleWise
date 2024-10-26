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

class ASTManager {
  parseRuleString(ruleString: string): Node {
    const tokens: string[] = ruleString
      .replace(/\(/g, " ( ")
      .replace(/\)/g, " ) ")
      .split(/\s+/)
      .filter((token) => token.length > 0);

    function parseExpression(): Node {
      const stack: (string | Node)[][] = [[]];

      tokens.forEach((token) => {
        if (token === "(") {
          stack.push([]);
        } else if (token === ")") {
          const expr = stack.pop();
          if (expr) {
            stack[stack.length - 1].push(buildTree(expr));
          }
        } else if (token === "AND" || token === "OR") {
          stack[stack.length - 1].push(token);
        } else {
          stack[stack.length - 1].push(token);
        }
      });

      function buildTree(expr: (string | Node)[]): Node {
        if (expr.length === 1) {
          const single = expr[0];
          return typeof single === "string"
            ? new Node("operand", single)
            : single;
        }

        const operatorIndex = expr.findIndex((e) => e === "AND" || e === "OR");
        if (operatorIndex !== -1) {
          const operator = expr[operatorIndex];
          const left = buildTree(expr.slice(0, operatorIndex));
          const right = buildTree(expr.slice(operatorIndex + 1));
          return new Node("operator", operator as "operator", left, right);
        }

        return new Node("operand", expr.join(" "));
      }

      return buildTree(stack[0]);
    }

    return parseExpression();
  }
}

export default new ASTManager();
