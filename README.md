# RuleWise

## Objective
The objective of this project is to develop a 3-tier rule engine application with a frontend interface, API layer, and backend database to evaluate user eligibility based on specified attributes (e.g., age, department, income, spend). Using an Abstract Syntax Tree (AST), the system dynamically represents, creates, and modifies complex conditional rules. The AST structure allows flexibility in rule configuration, enabling efficient parsing, validation, and combination of conditions. This rule engine can be useful in scenarios like:

## Features

- **Rule Creation and Combination**
  - Create individual rules by defining conditions with operators (e.g., `AND`, `OR`) and operands (e.g., `age > 30`, `department = 'Sales'`).
  - Combine multiple rules into a single, optimized AST to minimize redundant evaluations and improve efficiency.
  - Automatically parse rule strings into AST nodes, simplifying rule management.

- **Real-Time Rule Evaluation**
  - Evaluate rules against live user data, allowing instant determination of eligibility based on defined criteria.
  - Supports various input scenarios by applying JSON-based user data and validating rules against provided attributes.

- **Database-Driven Rule Storage**
  - Store rules and their corresponding AST representations in a relational database, ensuring persistence and ease of retrieval.
  - Update and manage rules without code changes, providing a scalable solution for frequently changing rule sets.

- **API-Driven Architecture**
  - **Create Rule**: API for creating a new rule from a string input, converting it into an AST representation.
  - **Combine Rules**: API for combining multiple rules into a single AST, enabling complex multi-rule evaluations.
  - **Evaluate Rule**: API to evaluate a rule against user data, returning `true` or `false` based on eligibility.

- **Flexible Rule Modification**
  - Easily add or modify rules without extensive code changes, thanks to the AST structure and database-driven design.
  - Enables adaptable use in scenarios where eligibility criteria may frequently change.
