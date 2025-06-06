import React from "react";
import Results from "../../../components/results";


export default function SurveyResultsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Survey Results</h1>
      <Results />
    </div>
  );
}