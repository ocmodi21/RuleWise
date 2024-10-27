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
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useStorage from "@/hooks/useStorage";

interface CreateRuleProps {
  newRule: string;
  setNewRule: React.Dispatch<React.SetStateAction<string>>;
}

const CreateRule = ({ newRule, setNewRule }: CreateRuleProps) => {
  const { toast } = useToast();
  const { httpPost } = useFetch();
  const { setDataToStorage } = useStorage();
  const [isLoading, setLoading] = useState(false);

  const handleCreateRule = async () => {
    setLoading(true); // Start loading indicator
    const data = await httpPost("createRule", { ruleString: newRule });

    if (data.isError) {
      // Display error toast if there was an error in the POST request
      toast({
        title: "Error adding rule",
        description: "Please enter a rule before adding.",
        variant: "destructive",
      });
      setLoading(false); // Stop loading indicator
      return;
    } else if (!data.data || !data.data.id) {
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

    // Store rule ID and reset state after successful addition
    setDataToStorage("ruleId", data.data.id);
    setLoading(false);
    setNewRule("");
  };

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
        <Button
          onClick={handleCreateRule}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Rule
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateRule;
