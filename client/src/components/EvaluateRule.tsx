import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";
import useStorage from "@/hooks/useStorage";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";

interface EvaluateRuleProps {
  userData: string;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  setEvaluationResult: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const EvaluateRule = ({
  userData,
  setUserData,
  setEvaluationResult,
}: EvaluateRuleProps) => {
  const { toast } = useToast();
  const { httpPost } = useFetch();
  const { getDataFromStorage } = useStorage();
  const [isLoading, setLoading] = useState(false);

  const handleEvaluateRule = async () => {
    const ruleId = getDataFromStorage("ruleId");
    if (!ruleId) {
      toast({
        title: "RuleId not found",
        description: "RuleId required for evaluating rule.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Start loading indicator
    const data = await httpPost("evaluateRule", {
      ruleId: ruleId,
      userData: userData,
    });

    if (data.isError) {
      // Display error toast if there was an error in the POST request
      toast({
        title: "Error while evaluating rule",
        description: "Please enter a valid rule data.",
        variant: "destructive",
      });
      setLoading(false); // Stop loading indicator
      return;
    } else if (!data.data) {
      // Additional check for response data integrity
      toast({
        title: "Unexpected response",
        description: "The server returned an invalid response.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Success case: display success toast
    toast({
      title: "Rule added successfully",
      description: "Your new rule has been added to the list.",
      variant: "default",
    });

    setEvaluationResult(data.data.isValid);
    setLoading(false);
    setUserData("");
  };
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
        <Button
          onClick={handleEvaluateRule}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Evaluate
        </Button>
      </CardContent>
    </Card>
  );
};

export default EvaluateRule;
