import { useState } from "react";

import CreateRule from "@/components/CreateRule";
import EvaluateRule from "@/components/EvaluateRule";
import EvaluationResult from "@/components/EvaluationResult";

export default function Dashboard() {
  const [newRule, setNewRule] = useState("");
  const [userData, setUserData] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<boolean | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-8 md:px-6 lg:px-16 xl:px-40">
      <div className="container mx-auto p-4 space-y-6">
        <CreateRule newRule={newRule} setNewRule={setNewRule} />
        <EvaluateRule userData={userData} setUserData={setUserData} />
        <EvaluationResult evaluationResult={evaluationResult} />
      </div>
    </div>
  );
}
