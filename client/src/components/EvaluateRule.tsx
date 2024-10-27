import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

interface EvaluateRuleProps {
  userData: string;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
}

const EvaluateRule = ({ userData, setUserData }: EvaluateRuleProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-700 pb-6">
        <CardTitle className="text-2xl font-semibold text-purple-300">
          Evaluate User
        </CardTitle>
        <CardDescription className="text-gray-400">
          Check user eligibility based on rules
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={userData}
          onChange={(e) => setUserData(e.target.value)}
          placeholder='Enter user data as JSON (e.g., {"age": 35, "department": "Sales", "salary": 60000, "experience": 3})'
          className="bg-gray-700 border-gray-600 text-gray-200 my-4"
        />
        <Button onClick={() => {}} className="bg-green-600 hover:bg-green-700">
          Evaluate
        </Button>
      </CardContent>
    </Card>
  );
};

export default EvaluateRule;
