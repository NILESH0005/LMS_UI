import React from "react";

const QuizStartHeader = ({ quizData }) => {
  if (!quizData) return <h2 className="text-xl font-bold text-red-500">No quiz data available.</h2>;

  return (
    <div className="w-full max-w-4xl bg-blue-500 text-white rounded-xl shadow-lg p-6 text-center">
      <h1 className="text-3xl font-bold">{quizData.name}</h1>
      <p className="text-lg mt-2">Level: {quizData.level} | Duration: {quizData.duration} min</p>
      <p className="text-sm mt-1">
        Start: {quizData.startDate} {quizData.startTime} | End: {quizData.endDate} {quizData.endTime}
      </p>
      <p className="mt-2">{quizData.negativeMarking ? "Negative Marking: Enabled" : "Negative Marking: Disabled"}</p>
    </div>
  );
};

export default QuizStartHeader;
