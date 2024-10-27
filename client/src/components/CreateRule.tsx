import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

interface CreateRuleProps {
  newRule: string;
  setNewRule: React.Dispatch<React.SetStateAction<string>>;
}

const CreateRule = ({ newRule, setNewRule }: CreateRuleProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-700 pb-6">
        <CardTitle className="text-3xl font-bold text-purple-300">
          Rule Engine
        </CardTitle>
        <CardDescription className="text-gray-400">
          Create and evaluate rules based on user data
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Label htmlFor="new-rule" className="text-purple-300 block">
          New Rule
        </Label>
        <Textarea
          id="new-rule"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
          className="bg-gray-700 border-gray-600 text-gray-200 my-4"
        />
        <Button onClick={() => {}} className="bg-blue-600 hover:bg-blue-700">
          Add Rule
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateRule;
