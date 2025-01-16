import React, { useState } from 'react';
import GuidelineTable from './CommunityGuidelineComponent/GuidelineTable';
import GuidelineForm from './CommunityGuidelineComponent/GuidelineForm';

const initialGuidelines = [
  {
    id: 1,
    title: "Providing Feedback",
    description: "Share constructive feedback on features, suggesting specific improvements that could benefit the entire community."
  },
  {
    id: 2,
    title: "Feature Suggestions",
    description: "When proposing new features, clearly outline their potential impact on user experience and how they align with platform goals."
  },
  {
    id: 3,
    title: "Bug Reporting",
    description: "Report technical issues with a detailed explanation, including steps to reproduce the bug, helping developers resolve problems efficiently."
  },
  {
    id: 4,
    title: "Testing Features",
    description: "Participate in beta tests of new features, providing feedback to help refine and improve the platform’s usability."
  },
  {
    id: 5,
    title: "User Engagement",
    description: "Contribute to discussions about platform development, offering insights from your experience to guide future updates."
  }
];

const GuidelineManager = () => {
  const [isTableView, setIsTableView] = useState(true);
  const [guidelines, setGuidelines] = useState(initialGuidelines);
  const toggleView = () => setIsTableView(!isTableView);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{isTableView ? "Guidelines" : "Add New Guideline"}</h1>
        <button onClick={toggleView} className="bg-DGXgreen text-white py-2 px-4 rounded-lg">
          {isTableView ? "Add New Guideline" : "View Guidelines"}
        </button>
      </div>
      {isTableView ? (
        <GuidelineTable guidelines={guidelines} />
      ) : (
        <GuidelineForm guidelines={guidelines} setGuidelines={setGuidelines} setIsTableView={setIsTableView} />
      )}
    </div>
  );
};

export default GuidelineManager;
