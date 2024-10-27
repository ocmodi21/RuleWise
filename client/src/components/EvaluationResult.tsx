import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

interface EvaluationResultProps {
  evaluationResult: boolean | null;
}

const EvaluationResult = ({ evaluationResult }: EvaluationResultProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-semibold text-purple-300">
          Evaluation Result
        </CardTitle>
        <CardDescription className="text-gray-400">
          User eligibility based on rules
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6">
        {evaluationResult === null ? (
          <p className="text-gray-400">No evaluation performed yet.</p>
        ) : evaluationResult ? (
          <div className="flex items-center text-green-500">
            <CheckCircle2 className="mr-2" />
            <span>User is eligible</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <AlertCircle className="mr-2" />
            <span>User is not eligible</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EvaluationResult;
